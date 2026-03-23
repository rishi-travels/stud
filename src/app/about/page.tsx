import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
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
    name: "Raghvendra Mishra",
    role: "Executive Director",
    image: PlaceHolderImages.find(p => p.id === "team-member-1"),
    bio: "With over 5 years in the automotive industry, Raghvendra leads the vision of Chhaya Bajaj."
  },
  {
    name: "Ashwini Mishra",
    role: "Management Head",
    image: PlaceHolderImages.find(p => p.id === "team-member-2"),
    bio: "Ashwini ensures every customer finds their perfect ride through personalized consultation."
  },
  {
    name: "Abhishek Mishra",
    role: "Technical Head",
    image: PlaceHolderImages.find(p => p.id === "team-member-3"),
    bio: "An engineering veteran who oversees our state-of-the-art service and maintenance operations."
  },
  {
    name: "Diwakar Mishra",
    role: "Marketing Head",
    image: PlaceHolderImages.find(p => p.id === "team-member-4"),
    bio: "Diwakar specializes in strategic market analysis and marketing excellence at Chhaya Bajaj."
  }
];

export default function AboutPage() {
  return (
    <div className="py-20 space-y-32">
      {/* Introduction */}
      <section className="container mx-auto px-4 text-center max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight font-headline">
              About <span className="text-primary">Chhaya Bajaj</span>
            </h1>
            <div className="h-1.5 w-24 bg-accent rounded-full mx-auto" />
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Chhaya Bajaj has grown from a sub dealership to one of the most respected names in the automotive industry. We believe that buying a vehicle is not just a transaction; it's the start of a lifelong journey.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our commitment to excellence is reflected in every aspect of our business, from the carefully selected range of Bajaj vehicles to our state-of-the-art service center.
          </p>
        </div>
      </section>

      {/* Leadership Team Carousel */}
      <section className="container mx-auto px-4 pb-20">
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
    </div>
  );
}