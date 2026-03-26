"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useFirebaseApp } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useState } from "react";

export default function ContactPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const firebaseApp = useFirebaseApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const inquiryRef = doc(collection(firestore, 'contact_inquiries'));
    const inquiryId = inquiryRef.id;

    const data = {
      id: inquiryId,
      applicantName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("reason") as string,
      message: formData.get("message") as string,
      submissionDate: new Date().toISOString(),
      isResolved: false
    };

    setDocumentNonBlocking(inquiryRef, data, { merge: true });

    // Log analytics event
    try {
      const analytics = getAnalytics(firebaseApp);
      logEvent(analytics, 'contact_form_submission', {
        subject: data.subject
      });
    } catch (err) {
      // Analytics might be blocked or not supported
    }

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Our team will get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 800);
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
                  <p className="text-muted-foreground text-sm">+91 94153 57605</p>
                  <p className="text-muted-foreground text-sm">+91 96285 10575</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                  <p className="text-muted-foreground text-sm">ashwanimishra3172001@gmail.com</p>
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
                  <Input name="fullName" placeholder="e.g. Abhi Mishra" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input name="email" type="email" placeholder="abhi@example.com" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input name="phone" placeholder="+91 94153 57605" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reason for Inquiry</label>
                  <select name="reason" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="New Vehicle Purchase">New Vehicle Purchase</option>
                    <option value="Service Booking">Service Booking</option>
                    <option value="Spare Parts">Spare Parts</option>
                    <option value="Financing/EMI Query">Financing/EMI Query</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea name="message" placeholder="Tell us more about your query..." className="min-h-[150px]" required />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary hover:bg-primary/90 py-3 text-sm sm:py-4 sm:text-lg font-bold">
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 border-primary text-primary hover:bg-primary/10 py-3 text-sm sm:py-4 sm:text-lg font-bold"
                  asChild
                >
                  <a href="https://wa.me/94153557605" target="_blank" rel="noopener noreferrer">
                    Chat on Whatsapp
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
