
"use client";

import Image from "next/image";
import { Wrench, Settings, ShieldCheck, Clock, CheckCircle2, Phone, Calendar, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const SERVICES = [
  {
    title: "Periodic Maintenance",
    desc: "Comprehensive check-ups and oil changes to keep your Bajaj running like new.",
    icon: Clock,
  },
  {
    title: "Engine Diagnostics",
    desc: "Advanced computer diagnostics for modern fuel-injected and electric powertrains.",
    icon: Settings,
  },
  {
    title: "Brake & Suspension",
    desc: "Expert adjustment and part replacement for maximum safety and comfort.",
    icon: ShieldCheck,
  },
  {
    title: "Electrical Repair",
    desc: "Specialized service for Chetak EV and electronic systems of Pulsar & Dominar.",
    icon: Wrench,
  }
];

export default function ServicePage() {
  const { toast } = useToast();
  const serviceImg = PlaceHolderImages.find(p => p.id === "service-center");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Service Request Received",
      description: "We will contact you shortly to confirm your appointment time.",
    });
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-blue-900">
        {serviceImg?.imageUrl && (
          <Image
            src={serviceImg.imageUrl}
            alt="Service Center"
            fill
            className="object-cover opacity-40"
            data-ai-hint={serviceImg.imageHint}
          />
        )}
        <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold font-headline text-white italic">
            World-Class <span className="text-accent">Care</span> for Your Bajaj
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
            Expert technicians, genuine spare parts, and state-of-the-art facilities dedicated to your machine's longevity.
          </p>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold font-headline">Our <span className="text-primary">Service Offerings</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From routine check-ups to complex repairs, we ensure your ride stays in peak performance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, i) => (
            <Card key={i} className="glass-card hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Booking Form & Contact */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold font-headline">Book Your <span className="text-primary">Service</span></h2>
            <p className="text-lg text-muted-foreground">
              Schedule your visit in less than a minute. Our team will verify the slot and get back to you with a confirmation.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: CheckCircle2, text: "Free vehicle pick-up and drop-off" },
                { icon: CheckCircle2, text: "Transparent pricing with no hidden costs" },
                { icon: CheckCircle2, text: "Real-time updates via WhatsApp/SMS" },
                { icon: CheckCircle2, text: "6-month warranty on labor and parts" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-accent/10 p-1 rounded-full">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="font-semibold text-blue-900">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-8 rounded-3xl space-y-4 border border-blue-100">
              <h4 className="font-bold text-xl flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" /> Urgent Assistance?
              </h4>
              <p className="text-sm text-blue-900/70">
                For roadside assistance or immediate technical help, call our 24/7 helpline:
              </p>
              <p className="text-2xl font-bold text-primary tracking-tight">+91 1800 200 1234</p>
            </div>
          </div>

          <Card className="shadow-2xl border-none">
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle>Service Appointment Form</CardTitle>
              <CardDescription className="text-white/80">Please fill in your details and preferred date.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                       Full Name
                    </label>
                    <Input placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                       Phone Number
                    </label>
                    <Input placeholder="+91 99999 99999" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Preferred Date
                    </label>
                    <Input type="date" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <PenTool className="h-4 w-4" /> Vehicle Model
                    </label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option>Pulsar N250</option>
                      <option>Dominar 400</option>
                      <option>Chetak Electric</option>
                      <option>Freedom 125</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Service Type</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option>Free Service (Scheduled)</option>
                    <option>Paid Service</option>
                    <option>Accidental Repair</option>
                    <option>Running Repair</option>
                    <option>EV Health Check</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Additional Comments</label>
                  <Textarea placeholder="Any specific issues you'd like us to look at?" className="min-h-[100px]" />
                </div>

                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-7 text-lg">
                  Submit Service Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
