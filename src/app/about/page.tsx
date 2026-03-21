import Image from "next/image";
import { Users, History, Target, Heart, Linkedin, Mail } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

      {/* Leadership Team Carousel */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-4xl font-bold font-headline">Meet Our <span className="text-primary">Leadership Team</span></h2>
          <p className="text-muted-foreground">The experts dedicated to delivering excellence at every touchpoint.</p>
        </div>

        <div className="relative max-w-5xl mx-auto px-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {TEAM_MEMBERS.map((member, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow group h-full">
                    <div className="relative h-[350px] w-full">
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
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary font-semibold text-xs uppercase tracking-wider">{member.role}</p>
                      <p className="text-muted-foreground text-xs pt-2 line-clamp-3">{member.bio}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-none bg-primary text-white hover:bg-primary/90 shadow-lg" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-none bg-primary text-white hover:bg-primary/90 shadow-lg" />
          </Carousel>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto bg-white text-primary rounded-[40px] p-12 md:p-16 shadow-xl border border-primary/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center">
            <div className="space-y-2">
              <h4 className="text-6xl md:text-7xl font-extrabold tracking-tighter italic">25+</h4>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Years of Experience</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-6xl md:text-7xl font-extrabold tracking-tighter italic">50k+</h4>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Happy Customers</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-6xl md:text-7xl font-extrabold tracking-tighter italic">17+</h4>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Dedicated Employees</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
