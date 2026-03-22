
import { Button } from "@/components/ui/button";
import AICareerTool from "@/components/AICareerTool";
import { Mail } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-24">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Join the <span className="text-primary">Bajaj Family</span></h1>
        <p className="text-muted-foreground text-lg italic">
          We're looking for passionate individuals who want to redefine the future of automotive service and retail. Build your career with an industry leader.
        </p>
      </div>

      {/* AI Tool Section */}
      <section className="max-w-4xl mx-auto">
        <AICareerTool />
      </section>

      {/* Application of Interest */}
      <section className="bg-primary/5 rounded-3xl p-8 md:p-16 text-center space-y-8">
        <div className="space-y-4">
          <p className="text-primary font-black text-2xl uppercase italic tracking-tighter">
            Open Application
          </p>
          <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
            We're always looking for talented people to join our talent pool for future opportunities. For a quick response, please reach out to our team.
          </p>
        </div>
        <Button size="lg" variant="outline" className="h-14 px-12 border-accent text-accent hover:bg-accent/10 font-bold text-lg" asChild>
          <a href="mailto:ashwanimishra3172001@gmail.com" className="flex items-center gap-2">
            <Mail className="h-5 w-5" /> Chat on E-mail
          </a>
        </Button>
      </section>
    </div>
  );
}
