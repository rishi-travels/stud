import AICareerTool from "@/components/AICareerTool";
import { Mail, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          <Briefcase className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Work With Us</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-headline uppercase italic tracking-tighter text-blue-950">
          Build Your Career at <span className="text-primary">Chhaya Bajaj</span>
        </h1>
        <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Become a part of Varanasi's leading automotive legacy. We are looking for dedicated professionals to join our sales, service, and operations teams.
        </p>
      </div>

      {/* Application Form Section */}
      <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
        <AICareerTool />
      </section>

      {/* Quick Contact Section */}
      <section className="bg-blue-950 rounded-[40px] p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline italic uppercase tracking-tighter">Direct Application</h2>
            <p className="text-blue-100/70 font-medium max-w-2xl mx-auto">
              If you have a specific query regarding our hiring process or want to follow up on your application, feel free to reach out directly.
            </p>
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold h-14 px-12 rounded-full text-lg shadow-xl" asChild>
            <a href="mailto:ashwanimishra3172001@gmail.com" className="flex items-center gap-2">
              <Mail className="h-5 w-5" /> Email Our HR Team
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}