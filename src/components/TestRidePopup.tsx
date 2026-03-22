
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useFirestore } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const VEHICLE_MODELS = [
  "Pulsar 150",
  "Pulsar NS200",
  "Pulsar N160",
  "Pulsar N250",
  "Dominar 400",
  "Platina 110",
  "CT 110X",
  "Freedom 125 (CNG)",
  "Chetak Premium (EV)",
  "Chetak Urbane (EV)"
];

export default function TestRidePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const { toast } = useToast();
  const firestore = useFirestore();
  const popupImg = PlaceHolderImages.find(p => p.id === "hero-ns400");

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenTestRidePopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenTestRidePopup", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }

    const handleOpenPopup = () => setIsOpen(true);
    window.addEventListener('open-test-ride', handleOpenPopup);
    return () => window.removeEventListener('open-test-ride', handleOpenPopup);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const bookingRef = doc(collection(firestore, 'test_ride_bookings'));
    const bookingId = bookingRef.id;

    const data = {
      id: bookingId,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      model: selectedModel,
      date: formData.get("date") as string,
      address: formData.get("address") as string,
      submittedAt: new Date().toISOString(),
    };

    setDocumentNonBlocking(bookingRef, data, { merge: true });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      toast({
        title: "Booking Successful!",
        description: "Your details have been saved in our records. We will contact you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="sm:max-w-[420px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="relative h-32 w-full bg-blue-950 flex flex-col items-center justify-center text-center p-4">
          {popupImg?.imageUrl && (
            <Image
              src={popupImg.imageUrl}
              alt="Premium Bajaj"
              fill
              className="object-cover opacity-30 scale-105"
              data-ai-hint={popupImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/90" />
          
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-accent/30 mb-1">
              <Sparkles className="h-2.5 w-2.5 text-accent animate-pulse" />
              <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Exclusive Opportunity</span>
            </div>
            <DialogTitle className="text-white text-xl font-black font-headline italic uppercase tracking-tighter drop-shadow-lg leading-tight">
              Feel the <span className="text-accent">Thrill</span>
            </DialogTitle>
            <DialogDescription className="text-white/80 font-medium text-xs">
              Experience the unmatched performance of Bajaj.
            </DialogDescription>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-[10px] font-bold uppercase text-muted-foreground">Full Name</Label>
              <Input 
                id="name" 
                name="name"
                placeholder="Abhi Mishra" 
                className="bg-muted/30 border-none h-10 text-sm" 
                required 
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-[10px] font-bold uppercase text-muted-foreground">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                type="tel" 
                placeholder="+919999999999" 
                className="bg-muted/30 border-none h-10 text-sm" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Choose Model</Label>
              <Select onValueChange={setSelectedModel} required>
                <SelectTrigger className="bg-muted/30 border-none h-10 text-sm">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_MODELS.map((model) => (
                    <SelectItem key={model} value={model} className="text-sm font-medium">
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="ride-date" className="text-[10px] font-bold uppercase text-muted-foreground">Date</Label>
              <Input 
                id="ride-date" 
                name="date"
                type="date" 
                placeholder="select date"
                className="bg-muted/30 border-none h-10 text-sm" 
                required 
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="address" className="text-[10px] font-bold uppercase text-muted-foreground">Address</Label>
            <Textarea 
              id="address" 
              name="address"
              placeholder="Your area/landmark in Varanasi" 
              className="min-h-[60px] bg-muted/30 border-none text-sm" 
              required 
            />
          </div>

          <DialogFooter className="pt-2">
            <Button 
              type="submit" 
              className={cn(
                "w-full h-12 text-base font-bold rounded-xl transition-all active:scale-95",
                "bg-gradient-to-r from-primary to-blue-800 hover:shadow-primary/20 hover:shadow-xl"
              )} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving to Records..." : "Book Now"}
            </Button>
          </DialogFooter>

          <div className="flex items-center justify-center gap-4 text-[9px] text-muted-foreground font-bold uppercase tracking-widest pt-1">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5 text-green-500" /> Free Test Ride</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5 text-green-500" /> Lead Recorded</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
