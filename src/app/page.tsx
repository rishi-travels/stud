import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bike, ShieldCheck, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const VEHICLES = [
  { name: "Pulsar N250", type: "Naked Sports", price: "₹ 1.51 Lakh", image: PlaceHolderImages.find(p => p.id === "pulsar-n250") },
  { name: "Dominar 400", type: "Sports Tourer", price: "₹ 2.29 Lakh", image: PlaceHolderImages.find(p => p.id === "dominar-400") },
  { name: "Chetak Electric", type: "Electric Scooter", price: "₹ 1.20 Lakh", image: PlaceHolderImages.find(p => p.id === "chetak-electric") },
];

export default function Home() {
  const heroImg = PlaceHolderImages.find(p => p.id === "hero-showroom");
  const promoImg = PlaceHolderImages.find(p => p.id === "promotion-1");

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImg?.imageUrl ? (
            <Image
              src={heroImg.imageUrl}
              alt={heroImg.description || "Hero"}
              fill
              className="object-cover opacity-40"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 space-y-8">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight font-headline">
              Unleash the <span className="gradient-text">Power Within</span>
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl max-w-2xl">
              Experience performance redefined at Chhaya Bajaj. Your gateway to the most iconic machines on the road.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg h-14 px-8">
                <Link href="/contact">Book Test Ride</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold font-headline">Featured <span className="text-primary">Lineup</span></h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              From high-octane performance to sustainable urban mobility.
            </p>
          </div>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {VEHICLES.map((vehicle, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden border-border bg-card/40 hover:border-primary/50 transition-all group">
                  <div className="relative h-64 w-full">
                    {vehicle.image?.imageUrl ? (
                      <Image
                        src={vehicle.image.imageUrl}
                        alt={vehicle.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={vehicle.image.imageHint}
                      />
                    ) : null}
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {vehicle.type}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold">{vehicle.name}</h3>
                      <p className="text-accent font-semibold">{vehicle.price}</p>
                    </div>
                    <Button variant="ghost" className="w-full justify-between hover:bg-primary/10 hover:text-primary p-0">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold font-headline">The Chhaya <span className="text-primary">Advantage</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Setting the gold standard in automotive retail and service for over two decades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Trusted Service", desc: "Expert technicians with years of certified experience." },
              { icon: Zap, title: "Swift Delivery", desc: "Minimal waiting times with our streamlined process." },
              { icon: Bike, title: "Wide Selection", desc: "The complete range of Bajaj motorcycles and scooters." },
              { icon: Award, title: "Award Winning", desc: "Recognized multiple times for excellence in customer satisfaction." }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl space-y-4 hover:translate-y-[-5px] transition-transform">
                <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold">{feature.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-center">
          {promoImg?.imageUrl ? (
            <Image
              src={promoImg.imageUrl}
              alt="Promotion"
              fill
              className="object-cover"
              data-ai-hint={promoImg.imageHint}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="relative z-10 p-8 md:p-16 space-y-6 max-w-2xl">
            <h2 className="text-4xl font-bold font-headline">Festival Festive <span className="text-accent">Dhamaka</span></h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Get exchange bonuses up to ₹5000 and low down payment starting at just ₹9,999. Valid until the end of this month!
            </p>
            <Button size="lg" className="bg-accent text-background hover:bg-accent/80 font-bold">
              Claim Offer Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
