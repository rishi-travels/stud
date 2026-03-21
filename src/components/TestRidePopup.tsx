
"use client";

import { useState, useEffect } from "react";
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
import { Bike, Send } from "lucide-react";

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

  useEffect(() => {
    // Check if the user has already seen the popup in this session
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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      toast({
        title: "Test Ride Requested!",
        description: "Our team will contact you shortly to confirm your slot.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] border-primary/20 bg-white/95 backdrop-blur-md">
        <DialogHeader>
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Bike className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold font-headline italic uppercase tracking-tighter">
            Book a <span className="text-primary">Test Ride</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Experience the thrill of Bajaj performance first-hand. Fill in your details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+91 94153557605" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehicle Model</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_MODELS.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Enter your residential address" className="min-h-[80px]" required />
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold h-12 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : (
                <>Confirm Request <Send className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
