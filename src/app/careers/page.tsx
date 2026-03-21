
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AICareerTool from "@/components/AICareerTool";

const JOB_OPENINGS = [
  {
    title: "Senior Sales Consultant",
    type: "Full-time",
    location: "Main Showroom",
    desc: "Drive sales of premium Bajaj motorcycles and manage high-value customer relationships."
  },
  {
    title: "Service Engineer",
    type: "Full-time",
    location: "Service Center",
    desc: "Perform technical diagnostics and high-level mechanical repairs on Bajaj's latest fuel-injected engines."
  },
  {
    title: "Electric Vehicle Specialist",
    type: "Full-time",
    location: "Chetak Zone",
    desc: "Passionate about sustainable mobility? Join us to lead our electric vehicle division."
  },
  {
    title: "Inventory Manager",
    type: "Part-time",
    location: "Warehouse",
    desc: "Efficiently manage spare parts and vehicle inventory using modern tracking systems."
  }
];

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

      {/* Current Openings */}
      <section className="space-y-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold font-headline">Current <span className="text-primary">Opportunities</span></h2>
          <p className="text-sm text-muted-foreground">Updated 2 days ago</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JOB_OPENINGS.map((job, i) => (
            <Card key={i} className="glass-card hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                <Badge variant="outline" className="border-accent text-accent">
                  {job.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-primary font-medium">{job.location}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{job.desc}</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="secondary" className="flex-1">View Details</Button>
                  <Button className="flex-1 bg-primary">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
