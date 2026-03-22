"use client";

import { useState } from "react";
import { Sparkles, Loader2, Briefcase, Info, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recommendCareerPathway, type AICareerPathwayOutput } from "@/ai/flows/ai-career-pathway-tool";

export default function AICareerTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AICareerPathwayOutput | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    jobRole: "",
    address: ""
  });

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const output = await recommendCareerPathway({
        skills: `Applicant Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phoneNumber}\nAddress: ${formData.address}`,
        interests: `Highly interested in the ${formData.jobRole} position at Chhaya Bajaj Auto.`,
        currentJobRole: formData.jobRole,
      });
      setResult(output);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <Card className="glass-card overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 h-2 w-full" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold font-headline">
            <Sparkles className="h-6 w-6 text-accent" /> Apply For Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input 
                  placeholder="e.g. Abhi Mishra" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input 
                  placeholder="+91 99999 99999" 
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input 
                  type="email"
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Role</label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, jobRole: value})}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Mechanic">Mechanic</SelectItem>
                    <SelectItem value="Salesman">Salesman</SelectItem>
                    <SelectItem value="Computer Operator">Computer Operator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Residential Address</label>
              <Textarea 
                placeholder="Enter your full address..." 
                className="min-h-[100px]"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" disabled={loading} className="flex-1 bg-accent text-background hover:bg-accent/80 font-bold py-4 text-base sm:py-6 sm:text-lg">
                {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : "Submit"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 border-primary text-primary hover:bg-primary/10 font-bold py-4 text-base sm:py-6 sm:text-lg"
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

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" /> Recommended Roles
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {result.recommendedJobRoles.map((role, i) => (
                <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {role}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-accent" /> Feedback for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.applicationImprovements}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" /> Career Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "{result.careerAdvice}"
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}