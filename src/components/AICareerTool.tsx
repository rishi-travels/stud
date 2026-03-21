
"use client";

import { useState } from "react";
import { Sparkles, Loader2, Briefcase, Info, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recommendCareerPathway, type AICareerPathwayOutput } from "@/ai/flows/ai-career-pathway-tool";

export default function AICareerTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AICareerPathwayOutput | null>(null);
  const [formData, setFormData] = useState({
    skills: "",
    interests: "",
    currentJobRole: "",
    resumeText: ""
  });

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const output = await recommendCareerPathway({
        skills: formData.skills,
        interests: formData.interests,
        currentJobRole: formData.currentJobRole,
        resumeText: formData.resumeText
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
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" /> Apply For Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Core Skills</label>
                <Input 
                  placeholder="e.g. Mechanical engineering, customer service..." 
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Role (Optional)</label>
                <Input 
                  placeholder="e.g. Sales Associate, Mechanic..." 
                  value={formData.currentJobRole}
                  onChange={(e) => setFormData({...formData, currentJobRole: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Career Interests & Preferences</label>
              <Textarea 
                placeholder="What kind of work excites you? e.g. Electric vehicles, fleet management..." 
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Resume Content (Optional)</label>
              <Textarea 
                placeholder="Paste your resume text for deeper analysis..." 
                className="min-h-[120px]"
                value={formData.resumeText}
                onChange={(e) => setFormData({...formData, resumeText: e.target.value})}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-accent text-background hover:bg-accent/80 font-bold py-6">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Generate Career Pathway"}
            </Button>
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
                <Info className="h-5 w-5 text-accent" /> Application Tips
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
