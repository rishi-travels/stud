"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Bike, 
  ShieldCheck, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Wrench, 
  BadgeCheck, 
  Coins,
  ThumbsUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HERO_IMAGES = [
  PlaceHolderImages.find(p => p.id === "hero-1"),
  PlaceHolderImages.find(p => p.id === "hero-2"),
  PlaceHolderImages.find(p => p.id === "hero-3"),
  PlaceHolderImages.find(p => p.id === "hero-4"),
].filter((img): img is any => !!img);

const DARING_VEHICLES = [
  {
    name: "Pulsar NS",
    image: PlaceHolderImages.find(p => p.id === "hero-performance"),
    tag: "Street Fighter",
    desc: "Experience the raw power of Bajaj bikes in Varanasi."
  },
  {
    name: "Dominar",
    image: PlaceHolderImages.find(p => p.id === "dominar-400"),
    tag: "Hyper",
    desc: "The ultimate hyper tourer for daring riders."
  },
  {
    name: "Pulsar",
    image: PlaceHolderImages.find(p => p.id === "pulsar-150"),
    tag: "Classic",
    desc: "The iconic sports bike from Chhaya Bajaj."
  },
  {
    name: "Pulsar N",
    image: PlaceHolderImages.find(p => p.id === "pulsar-125"),
    tag: "Racing",
    desc: "Race-bred performance for the urban rider."
  }
];

const COMFORT_VEHICLES = [
  {
    name: "Platina",
    image: PlaceHolderImages.find(p => p.id === "platina-110"),
    tag: "Comfort",
    desc: "Smooth rides for your daily commute in Varanasi."
  },
  {
    name: "Freedom 125",
    image: PlaceHolderImages.find(p => p.id === "freedom-125"),
    tag: "Innovative",
    desc: "The world's first multi-fuel performance bike."
  },
  {
    name: "CT",
    image: PlaceHolderImages.find(p => p.id === "ct-110"),
    tag: "Rugged",
    desc: "Built for durability and every tough terrain."
  },
  {
    name: "Chetak",
    image: PlaceHolderImages.find(p => p.id === "chetak-electric"),
    tag: "Electric",
    desc: "Sustainable urban mobility from chhayabajaj.in."
  }
];

const ADVANTAGES = [
  {
    title: "5-Year Warranty",
    desc: "Extensive warranty coverage on all new Bajaj bikes.",
    icon: ShieldCheck,
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    title: "Genuine Spares",
    desc: "We use only 100% authentic Bajaj Genuine Parts.",
    icon: BadgeCheck,
    color: "text-accent",
    bg: "bg-red-100"
  },
  {
    title: "Expert Service",
    desc: "Certified technicians at your service in Varanasi.",
    icon: Wrench,
    color: "text-primary",
    bg: "bg-blue-50"
  },
  {
    title: "Easy Finance",
    desc: "Flexible EMI schemes tailored to your budget.",
    icon: Coins,
    color: "text-green-600",
    bg: "bg-green-100"
  }
];

export default function Home() {
  const [heroIndex, setHeroIndex] = React.useState(0);

  const triggerTestRide = () => {
    window.dispatchEvent(new CustomEvent('open-test-ride'));
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-0 pb-0">
      {/* Hero Section */}
      <section className="relative w-full aspect-[4/3] md:aspect-[21/8] flex items-center overflow-hidden bg-black group">
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((img, idx) => (
            <div
              key={img.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                idx === heroIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={img.imageUrl}
                alt={img.description}
                fill
                className="object-cover"
                priority={idx === 0}
                sizes="100vw"
                data-ai-hint={img.imageHint}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        <button
          onClick={(e) => { e.preventDefault(); setHeroIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length); }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length); }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        
        <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md py-3 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center text-white text-[10px] uppercase font-bold tracking-widest">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-accent" /> Chhaya Bajaj Bhopapur</span>
              <span className="flex items-center gap-1"><Bike className="h-3 w-3 text-accent" /> Best Bajaj Showroom Varanasi</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-accent" /> Authorized Dealer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/60">DEFINITELY DARING</span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center gap-2 py-4 bg-white border-b border-border">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setHeroIndex(idx)}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              idx === heroIndex ? "w-10 bg-primary" : "w-4 bg-muted"
            )}
          />
        ))}
      </div>

      {/* Welcome Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <h2 className="text-xl md:text-2xl font-bold font-headline text-accent uppercase tracking-wider italic">Experience Excellence</h2>
          <h1 className="text-3xl md:text-5xl font-black font-headline text-blue-950 uppercase italic tracking-tighter">
            Chhaya Bajaj
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto">
            Welcome to Chhaya Bajaj Bhopapur, your official destination for Bajaj showroom services in Varanasi. We are one of the most trusted names for Bajaj automobile sales and service near you.
          </p>
        </div>
      </section>

      {/* Daring Collection Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="border-primary text-primary font-bold">Bajaj bikes Varanasi</Badge>
              <h2 className="text-4xl font-black font-headline uppercase italic tracking-tighter text-blue-950">
                The <span className="text-primary">Daring</span> Collection
              </h2>
              <p className="text-muted-foreground font-medium">Engineered for those who thrive on Bajaj performance at our showroom.</p>
            </div>
            <Button variant="ghost" asChild className="text-primary font-bold hover:text-primary/80">
              <Link href="/vehicles" className="flex items-center gap-2">Explore All Bikes <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <Carousel 
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {DARING_VEHICLES.map((vehicle, idx) => (
                <CarouselItem key={idx} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-none shadow-xl glass-card group h-full flex flex-col">
                    <div className="relative h-[250px] md:h-[300px]">
                      {vehicle.image?.imageUrl && (
                        <Image
                          src={vehicle.image.imageUrl}
                          alt={vehicle.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          data-ai-hint={vehicle.image.imageHint}
                        />
                      )}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-primary/90 backdrop-blur-md text-white border-white/20 font-bold uppercase tracking-wider">
                          {vehicle.tag}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 md:p-8 flex flex-col space-y-4">
                      <h3 className="text-2xl font-bold text-blue-950 font-headline italic uppercase tracking-tighter">
                        {vehicle.name}
                      </h3>
                      <p className="text-muted-foreground text-sm font-medium line-clamp-2">
                        {vehicle.desc}
                      </p>
                      <Button onClick={triggerTestRide} className="bg-primary hover:bg-primary/90 text-white font-bold w-full sm:w-fit">
                        Book Test Ride
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Comfort Collection Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="border-accent text-accent font-bold">Bajaj Bhopapur</Badge>
              <h2 className="text-4xl font-black font-headline uppercase italic tracking-tighter text-blue-950">
                The <span className="text-accent">Comfort</span> Collection
              </h2>
              <p className="text-muted-foreground font-medium">Chhaya Bajaj reliability for your everyday journey in Varanasi.</p>
            </div>
            <Button variant="ghost" asChild className="text-accent font-bold hover:text-accent/80">
              <Link href="/vehicles" className="flex items-center gap-2">Browse Comfort Models <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <Carousel 
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {COMFORT_VEHICLES.map((vehicle, idx) => (
                <CarouselItem key={idx} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-none shadow-xl glass-card group h-full flex flex-col">
                    <div className="relative h-[250px] md:h-[300px]">
                      {vehicle.image?.imageUrl && (
                        <Image
                          src={vehicle.image.imageUrl}
                          alt={vehicle.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          data-ai-hint={vehicle.image.imageHint}
                        />
                      )}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-accent/90 backdrop-blur-md text-white border-white/20 font-bold uppercase tracking-wider">
                          {vehicle.tag}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 md:p-8 flex flex-col space-y-4">
                      <h3 className="text-2xl font-bold text-blue-950 font-headline italic uppercase tracking-tighter">
                        {vehicle.name}
                      </h3>
                      <p className="text-muted-foreground text-sm font-medium line-clamp-2">
                        {vehicle.desc}
                      </p>
                      <Button onClick={triggerTestRide} className="bg-accent hover:bg-accent/90 text-white font-bold w-full sm:w-fit">
                        Book Test Ride
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-4xl font-black font-headline uppercase italic tracking-tighter text-blue-950">
              The <span className="text-primary">Chhaya</span> Advantage
            </h2>
            <p className="text-muted-foreground font-medium text-lg">
              Visit Chhaya Bajaj Bhopapur for the best Bajaj bikes and showroom experience in Varanasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADVANTAGES.map((advantage, i) => (
              <Card key={i} className="border-none shadow-lg glass-card hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 space-y-6 text-center">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3",
                    advantage.bg
                  )}>
                    <advantage.icon className={cn("h-8 w-8", advantage.color)} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-blue-950">{advantage.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {advantage.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-border shadow-sm">
              <ThumbsUp className="h-5 w-5 text-accent" />
              <span className="text-sm font-bold text-blue-950">Trusted by customer - Chhaya Bajaj Bhopapur</span>
            </div>
          </div>
        </div>
      </section>

      {/* Early Bird Offer */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative rounded-[40px] overflow-hidden bg-blue-950 text-white shadow-2xl">
          <div className="relative z-10 p-8 md:p-20 max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="space-y-8">
              <div className="inline-block bg-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase italic">
                Exclusive Promotion @chhayabajajbhopapur
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-extrabold font-headline italic uppercase tracking-tighter leading-none">
                  Early Bird <span className="text-accent">Offer</span>
                </h2>
                <p className="text-xl text-blue-100/80 font-medium">
                  Book your Bajaj bike today at Chhaya Bajaj Bhopapur and unlock benefits worth ₹10,000*.
                </p>
              </div>
              <Button 
                onClick={triggerTestRide}
                size="lg" 
                className="bg-white text-blue-950 hover:bg-blue-50 font-bold px-10 rounded-full h-14 text-lg w-full sm:w-auto mt-4"
              >
                Book Now & Save
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-2 md:py-3 bg-white overflow-hidden whitespace-nowrap border-y border-primary/10 relative">
        <div className="flex animate-marquee gap-4 md:gap-8 items-center min-w-full">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="text-xl md:text-3xl font-black font-headline uppercase italic text-primary tracking-tighter px-2 md:px-4">
              Book Now & Save - Chhaya Bajaj
            </span>
          ))}
          {[...Array(12)].map((_, i) => (
            <span key={i + 12} className="text-xl md:text-3xl font-black font-headline uppercase italic text-primary tracking-tighter px-2 md:px-4">
              Book Now & Save - chhayabajaj.in
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
