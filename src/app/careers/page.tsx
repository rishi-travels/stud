import { Button } from "@/components/ui/button";
import AICareerTool from "@/components/AICareerTool";

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-24">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Join the <span className="text-primary">Chhaya Family</span></h1>
        <p className="text-muted-foreground text-lg">
          We're looking for passionate individuals who want to redefine the future of automotive service and retail. Build your career with an industry leader.
        </p>
      </div>

      {/* AI Tool Section */}
      <section className="max-w-4xl mx-auto">
        <AICareerTool />
      </section>

      {/* Application of Interest */}
      <section className="bg-primary/5 rounded-3xl p-8 md:p-16 text-center space-y-8">
        <h2 className="text-3xl font-bold font-headline">Don't see a <span className="text-primary">perfect fit?</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Send us your resume anyway! We're always looking for talented people to join our talent pool for future opportunities.
        </p>
        <Button size="lg" variant="outline" className="h-14 px-12 border-primary text-primary hover:bg-primary/10">
          Submit General Application
        </Button>
      </section>
    </div>
  );
}
