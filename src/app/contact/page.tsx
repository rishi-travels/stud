
"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Our team will get back to you within 24 hours.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-20 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Get in <span className="text-primary">Touch</span></h1>
        <p className="text-muted-foreground">Have a question or want to book a service? We're here to help you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Our Location</h4>
                  <p className="text-muted-foreground text-sm">Kachare, Bhopapur, Varanasi, Uttar Pradesh</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Call Us</h4>
                  <p className="text-muted-foreground text-sm">+91 96285 10443</p>
                  <p className="text-muted-foreground text-sm">+91 96285 10575</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                  <p className="text-muted-foreground text-sm">intelcorei5136@gmail.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="e.g. Abhi Mishra" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input placeholder="+91 96285 10443" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for Inquiry</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>New Vehicle Purchase</option>
                  <option>Service Booking</option>
                  <option>Spare Parts</option>
                  <option>Financing/EMI Query</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Tell us more about your query..." className="min-h-[150px]" required />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 py-6 text-lg font-bold">
                  Send Message <Send className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 border-primary text-primary hover:bg-primary/10 py-6 text-lg font-bold"
                  asChild
                >
                  <a href="https://wa.me/919628510443" target="_blank" rel="noopener noreferrer">
                    Direct Message
                  </a>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <section className="h-[400px] w-full rounded-3xl overflow-hidden grayscale opacity-80 hover:grayscale-0 transition-all duration-500 shadow-xl border border-border">
        <iframe
          src="https://www.google.com/maps?q=25.4540,82.9418&z=15&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </section>
    </div>
  );
}
