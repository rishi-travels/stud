"use client";

import Image from "next/image";
import { Wrench, Settings, ShieldCheck, Clock, CheckCircle2, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    title: "Genuine Spare Parts",
    desc: "We stock and use only 100% authentic Bajaj genuine parts for all repairs and replacements.",
    icon: ShieldCheck,
  },
  {
    title: "Electrical Repair",
    desc: "Specialized service for Chetak EV and electronic systems of Pulsar & Dominar.",
    icon: Wrench,
  }
];

export default function ServicePage() {
  const serviceImg = PlaceHolderImages.find(p => p.id === "service-center");

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

      {/* Benefits & Contact */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold font-headline">Quality <span className="text-primary">Service</span> Guaranteed</h2>
            <p className="text-lg text-muted-foreground">
              We provide professional maintenance for all Bajaj vehicles. Our team of certified technicians ensures that your vehicle gets the best treatment using genuine parts.
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
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-8 rounded-3xl space-y-6 border border-blue-100 shadow-sm">
              <div className="space-y-2">
                <h4 className="font-bold text-2xl flex items-center gap-2">
                  <Phone className="h-6 w-6 text-primary" /> Service Helpline
                </h4>
                <p className="text-blue-900/70">
                  Contact us directly to schedule your service appointment or for any technical queries.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Call for Booking</p>
                  <p className="text-3xl font-extrabold text-primary tracking-tight">+91 94153 57605</p>
                </div>
                <div className="pt-4 border-t border-blue-200">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Emergency/Roadside Assistance</p>
                  <p className="text-2xl font-bold text-accent tracking-tight">+91 96285 10575</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
