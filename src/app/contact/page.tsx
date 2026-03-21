"use client";

import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
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

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="h-6 w-6 text-accent" /> Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Mon - Sat</span>
                <span className="font-semibold">09:00 AM - 08:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sunday</span>
                <span className="text-destructive font-semibold">Closed</span>
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
                  <Input placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input placeholder="+91 99999 99999" required />
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
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-bold">
                Send Message <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full rounded-3xl overflow-hidden grayscale opacity-80 hover:grayscale-0 transition-all duration-500">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57662.33649520442!2d82.9500645607062!3d25.31764522332679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db768153095%3A0x33e30f148887413!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
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
