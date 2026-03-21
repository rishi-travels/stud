
import Image from "next/image";
import { Users, History, Target, Heart, Linkedin, Mail } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

const TEAM_MEMBERS = [
  {
    name: "Rajesh Chhaya",
    role: "Managing Director",
    image: PlaceHolderImages.find(p => p.id === "team-member-1"),
    bio: "With over 25 years in the automotive industry, Rajesh leads the vision of Chhaya Bajaj."
  },
  {
    name: "Priya Sharma",
    role: "Head of Sales",
    image: PlaceHolderImages.find(p => p.id === "team-member-2"),
    bio: "Priya ensures every customer finds their perfect ride through personalized consultation."
  },
  {
    name: "Amit Verma",
    role: "Technical Director",
    image: PlaceHolderImages.find(p => p.id === "team-member-3"),
    bio: "An engineering veteran who oversees our state-of-the-art service and maintenance operations."
  }
];

export default function AboutPage() {
  const serviceImg = PlaceHolderImages.find(p => p.id === "service-center");
  const teamImg = PlaceHolderImages.find(p => p.id === "team-members");

  return (
    <div className="py-20 space-y-32">
      {/* Introduction */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight font-headline">
                Leading the way in <span className="text-primary">Automotive Excellence</span>
              </h1>
              <div className="h-1.5 w-24 bg-accent rounded-full" />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 1998, Chhaya Bajaj has grown from a small dealership to one of the most respected names in the automotive industry. We believe that buying a vehicle is not just a transaction; it's the start of a lifelong journey.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our commitment to excellence is reflected in every aspect of our business, from the carefully selected range of Bajaj vehicles to our state-of-the-art service center.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-4xl font-bold text-primary">25+</h4>
                <p className="text-muted-foreground">Years of Experience</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-primary">50k+</h4>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {serviceImg?.imageUrl && (
              <Image
                src={serviceImg.imageUrl}
                alt="Service Center"
                fill
                className="object-cover"
                data-ai-hint={serviceImg.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/20 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-4xl font-bold font-headline">Our Core <span className="text-primary">Values</span></h2>
            <p className="text-muted-foreground">The principles that guide everything we do at Chhaya Bajaj.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: History, title: "Heritage", text: "Honoring our roots while driving towards a technologically advanced future." },
              { icon: Target, title: "Precision", text: "Meticulous attention to detail in every service and sales interaction." },
              { icon: Heart, title: "Customer-First", text: "Building genuine relationships founded on trust and transparency." }
            ].map((val, i) => (
              <div key={i} className="text-center space-y-4 p-8 glass-card rounded-2xl">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <val.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{val.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specific Team Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-4xl font-bold font-headline">Meet Our <span className="text-primary">Leadership Team</span></h2>
          <p className="text-muted-foreground">The experts dedicated to delivering excellence at every touchpoint.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative h-[400px] w-full">
                {member.image?.imageUrl && (
                  <Image
                    src={member.image.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={member.image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-4">
                    <Linkedin className="h-5 w-5 text-white cursor-pointer hover:text-primary transition-colors" />
                    <Mail className="h-5 w-5 text-white cursor-pointer hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-2 text-center">
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-primary font-semibold text-sm uppercase tracking-wider">{member.role}</p>
                <p className="text-muted-foreground text-sm pt-2">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* General Team Description Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
            {teamImg?.imageUrl && (
              <Image
                src={teamImg.imageUrl}
                alt="Our Team"
                fill
                className="object-cover"
                data-ai-hint={teamImg.imageHint}
              />
            )}
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl font-bold font-headline">The People <span className="text-primary">Behind the Brand</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our team consists of automotive enthusiasts, seasoned engineers, and customer service experts who share a common goal: delivering the best experience possible.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We invest heavily in continuous training to ensure our staff stays at the cutting edge of automotive technology and service standards.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <span className="font-semibold text-lg">Over 150+ Dedicated Employees</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
