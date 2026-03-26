
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
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
import { Send, Sparkles, CheckCircle2, X } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useFirestore, useFirebaseApp } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const VEHICLE_MODELS = [
  "Pulsar",
  "Pulsar NS",
  "Pulsar N",
  "Dominar",
  "Platina",
  "CT",
  "Freedom 125 (CNG)",
  "Chetak (EV)"
];

export default function TestRidePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const { toast } = useToast();
  const firestore = useFirestore();
  const firebaseApp = useFirebaseApp();
  const popupImg = PlaceHolderImages.find(p => p.id === "hero-ns400");

  useEffect(() => {
    // 1. Register the manual trigger listener immediately and always
    const handleOpenPopup = () => setIsOpen(true);
    window.addEventListener('open-test-ride', handleOpenPopup);

    // 2. Handle the automatic popup logic separately
    const hasSeenPopup = sessionStorage.getItem("hasSeenTestRidePopup");
    let timer: NodeJS.Timeout;
    
    if (!hasSeenPopup) {
      timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenTestRidePopup", "true");
      }, 5000);
    }

    // 3. Cleanup both
    return () => {
      window.removeEventListener('open-test-ride', handleOpenPopup);
      if (timer) clearTimeout(timer);
    };
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

    // Log analytics event
    try {
      const analytics = getAnalytics(firebaseApp);
      logEvent(analytics, 'test_ride_submission', {
        vehicle_model: selectedModel
      });
    } catch (err) {
      // Analytics might be blocked
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      toast({
        title: "Booking Successful!",
        description: "Your details have been saved. We will contact you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="sm:max-w-[380px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="relative h-28 w-full bg-blue-950 flex flex-col items-center justify-center text-center p-4">
          {popupImg?.imageUrl && (
            <Image
              src={popupImg.imageUrl}
              alt="Premium Bajaj"
              fill
              className="object-cover opacity-20"
              data-ai-hint={popupImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/90" />
          
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-accent/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-accent/30 mb-1">
              <Sparkles className="h-2.5 w-2.5 text-accent animate-pulse" />
              <span className="text-[8px] font-bold text-accent uppercase tracking-widest">Limited Offer</span>
            </div>
            <DialogTitle className="text-white text-lg font-black font-headline italic uppercase tracking-tighter leading-tight">
              Book Your <span className="text-accent">Test Ride</span>
            </DialogTitle>
          </div>

          <DialogClose className="absolute right-3 top-3 rounded-full bg-white/10 hover:bg-white/20 p-1 text-white z-50 transition-colors">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-[10px] font-bold uppercase text-muted-foreground">Full Name</Label>
              <Input 
                id="name" 
                name="name"
                placeholder="Abhi Mishra" 
                className="bg-muted/30 border-none h-9 text-xs" 
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
                className="bg-muted/30 border-none h-9 text-xs" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Choose Model</Label>
              <Select onValueChange={setSelectedModel} required>
                <SelectTrigger className="bg-muted/30 border-none h-9 text-xs">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_MODELS.map((model) => (
                    <SelectItem key={model} value={model} className="text-xs font-medium">
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
                className="bg-muted/30 border-none h-9 text-xs" 
                required 
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="address" className="text-[10px] font-bold uppercase text-muted-foreground">Address</Label>
            <Textarea 
              id="address" 
              name="address"
              placeholder="Your location in Varanasi" 
              className="min-h-[50px] bg-muted/30 border-none text-xs" 
              required 
            />
          </div>

          <DialogFooter className="pt-1">
            <Button 
              type="submit" 
              className={cn(
                "w-full h-10 text-sm font-bold rounded-lg transition-all active:scale-95",
                "bg-gradient-to-r from-primary to-blue-800"
              )} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>
          </DialogFooter>

          <div className="flex items-center justify-center gap-3 text-[8px] text-muted-foreground font-bold uppercase tracking-widest pt-1">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-2 w-2 text-green-500" /> Lead Captured</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-2 w-2 text-green-500" /> Free Ride</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
