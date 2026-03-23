"use client";

import { useState } from "react";
import { Loader2, Briefcase, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFirestore } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";

export default function AICareerTool() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    jobRole: "",
    address: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Save Application to Firestore
      const applicationRef = doc(collection(firestore, 'job_applications'));
      const applicationData = {
        id: applicationRef.id,
        jobOpeningId: formData.jobRole,
        applicantName: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        resumeUrl: "manual-entry",
        coverLetter: `Address: ${formData.address}`,
        status: "pending",
        submissionDate: new Date().toISOString()
      };

      setDocumentNonBlocking(applicationRef, applicationData, { merge: true });

      toast({
        title: "Application Submitted!",
        description: "Your details have been saved successfully. We will contact you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        jobRole: "",
        address: ""
      });

    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="glass-card overflow-hidden shadow-2xl border-primary/10">
        <div className="bg-primary h-2 w-full" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold font-headline">
            <Briefcase className="h-6 w-6 text-primary" /> Join Our Team
          </CardTitle>
          <p className="text-muted-foreground text-sm">Fill out the form below to apply for a position at Chhaya Bajaj.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-tight">Your Full Name</label>
                <Input 
                  placeholder="e.g. Abhi Mishra" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-12 border-blue-100"
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-tight">Email Address</label>
                <Input 
                  type="email"
                  placeholder="abhi@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="h-12 border-blue-100"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-tight">Phone Number</label>
                <Input 
                  placeholder="+91 99999 99999" 
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  className="h-12 border-blue-100"
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-tight">Position of Interest</label>
                <Select 
                  value={formData.jobRole}
                  onValueChange={(value) => setFormData({...formData, jobRole: value})}
                  required
                >
                  <SelectTrigger className="h-12 border-blue-100">
                    <SelectValue placeholder="Select a job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Sales Executive">Sales Executive</SelectItem>
                    <SelectItem value="Service Technician">Service Technician</SelectItem>
                    <SelectItem value="Customer Relationship Manager">Customer Relationship Manager</SelectItem>
                    <SelectItem value="Computer Operator">Computer Operator</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-blue-900 uppercase tracking-tight">Current Residential Address</label>
              <Textarea 
                placeholder="Enter your full address in Varanasi..." 
                className="min-h-[120px] border-blue-100"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" disabled={loading} className="flex-1 bg-primary text-white hover:bg-primary/90 font-bold h-14 text-lg rounded-xl">
                {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : <><Send className="mr-2 h-5 w-5" /> Submit Application</>}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 border-primary text-primary hover:bg-primary/5 font-bold h-14 text-lg rounded-xl"
                asChild
              >
                <a href="https://wa.me/94153557605" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat on Whatsapp
                </a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}