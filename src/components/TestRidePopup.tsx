
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
import { Send, Sparkles, CheckCircle2, CalendarDays } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

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
  const { toast } = useToast();
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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      toast({
        title: "Booking Successful!",
        description: "Get ready for a thrilling ride! Our team will contact you soon.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl group/content">
        {/* Header with Background */}
        <div className="relative h-40 w-full bg-blue-950 flex flex-col items-center justify-center text-center p-6 overflow-hidden">
          {popupImg?.imageUrl && (
            <Image
              src={popupImg.imageUrl}
              alt="Premium Bajaj"
              fill
              className="object-cover opacity-30 scale-110"
              data-ai-hint={popupImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/90" />
          
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-md px-3 py-1 rounded-full border border-accent/30 mb-2">
              <Sparkles className="h-3 w-3 text-accent animate-pulse" />
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Exclusive Opportunity</span>
            </div>
            <DialogTitle className="text-white text-3xl font-black font-headline italic uppercase tracking-tighter drop-shadow-lg">
              Feel the <span className="text-accent">Thrill</span>
            </DialogTitle>
            <DialogDescription className="text-white/80 font-medium text-sm">
              Experience the unmatched performance of Bajaj.
            </DialogDescription>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-bold uppercase text-muted-foreground ml-1">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Abhi Mishra" 
                className="bg-muted/30 border-none focus-visible:ring-primary h-11" 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-bold uppercase text-muted-foreground ml-1">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+91 96285 10443" 
                className="bg-muted/30 border-none focus-visible:ring-primary h-11" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="vehicle" className="text-xs font-bold uppercase text-muted-foreground ml-1">Choose Machine</Label>
              <Select required>
                <SelectTrigger className="bg-muted/30 border-none h-11">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_MODELS.map((model) => (
                    <SelectItem key={model} value={model} className="font-medium">
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ride-date" className="text-xs font-bold uppercase text-muted-foreground ml-1">Ride Date</Label>
              <div className="relative">
                <Input 
                  id="ride-date" 
                  type="date" 
                  className="bg-muted/30 border-none focus-visible:ring-primary h-11" 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-xs font-bold uppercase text-muted-foreground ml-1">Address</Label>
            <Textarea 
              id="address" 
              placeholder="Your area/landmark in Varanasi" 
              className="min-h-[70px] bg-muted/30 border-none focus-visible:ring-primary" 
              required 
            />
          </div>

          <DialogFooter className="pt-2">
            <Button 
              type="submit" 
              className={cn(
                "w-full h-14 text-lg font-bold rounded-2xl transition-all active:scale-95 group",
                "bg-gradient-to-r from-primary to-blue-800 hover:shadow-primary/20 hover:shadow-xl"
              )} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Booking Your Slot...
                </div>
              ) : (
                <>
                  Book Now <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </Button>
          </DialogFooter>

          <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest pt-1">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-green-500" /> Free Test Ride</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-green-500" /> Instant Confirmation</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
