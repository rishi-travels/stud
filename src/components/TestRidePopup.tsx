
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
  const popupImg = PlaceHolderImages.find(p => p.id === "hero-ns400");

  useEffect(() => {
    // Timer-based popup
    const hasSeenPopup = sessionStorage.getItem("hasSeenTestRidePopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenTestRidePopup", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }

    // Event-based trigger for buttons
    const handleOpenPopup = () => setIsOpen(true);
    window.addEventListener('open-test-ride', handleOpenPopup);
    return () => window.removeEventListener('open-test-ride', handleOpenPopup);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      model: selectedModel,
      date: formData.get("date"),
      address: formData.get("address"),
      submittedAt: new Date().toLocaleString(),
    };

    try {
      // NOTE: You must deploy a Google Apps Script as a Web App on your sheet
      // and replace this URL with your actual deployed Script ID URL.
      // The script should handle a POST request and append the data to your sheet.
      const scriptUrl = "https://script.google.com/macros/s/AKfycbz_W-W0-L-K-Y-Y-Y/exec"; // Placeholder URL
      
      // Attempting to send data to the sheet bridge
      // We use no-cors because Google Scripts return a redirect that fetch often fails on with CORS
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Simulation delay for UI feedback
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSubmitting(false);
      setIsOpen(false);
      toast({
        title: "Booking Successful!",
        description: "Your details have been saved. We will contact you shortly to confirm your slot.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "We couldn't save your details. Please check your connection or call us directly.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="sm:max-w-[440px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl group/content"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="relative h-32 w-full bg-blue-950 flex flex-col items-center justify-center text-center p-4 overflow-hidden">
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
          
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-accent/30 mb-1">
              <Sparkles className="h-3 w-3 text-accent animate-pulse" />
              <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Exclusive Opportunity</span>
            </div>
            <DialogTitle className="text-white text-2xl font-black font-headline italic uppercase tracking-tighter drop-shadow-lg leading-tight">
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
              <Label htmlFor="name" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Full Name</Label>
              <Input 
                id="name" 
                name="name"
                placeholder="Abhi Mishra" 
                className="bg-muted/30 border-none focus-visible:ring-primary h-10 text-sm" 
                required 
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                type="tel" 
                placeholder="+919999999999" 
                className="bg-muted/30 border-none focus-visible:ring-primary h-10 text-sm" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Choose Model</Label>
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
              <Label htmlFor="ride-date" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Date</Label>
              <Input 
                id="ride-date" 
                name="date"
                type="date" 
                placeholder="select date"
                className="bg-muted/30 border-none focus-visible:ring-primary h-10 text-sm" 
                required 
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="address" className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Address</Label>
            <Textarea 
              id="address" 
              name="address"
              placeholder="Your area/landmark in Varanasi" 
              className="min-h-[60px] bg-muted/30 border-none focus-visible:ring-primary text-sm" 
              required 
            />
          </div>

          <DialogFooter className="pt-2">
            <Button 
              type="submit" 
              className={cn(
                "w-full h-12 text-base font-bold rounded-xl transition-all active:scale-95 group",
                "bg-gradient-to-r from-primary to-blue-800 hover:shadow-primary/20 hover:shadow-xl"
              )} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving to Records...
                </div>
              ) : (
                <>
                  Book Now <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </Button>
          </DialogFooter>

          <div className="flex items-center justify-center gap-4 text-[9px] text-muted-foreground font-bold uppercase tracking-widest pt-1">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5 text-green-500" /> Free Test Ride</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5 text-green-500" /> Instant Confirmation</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
