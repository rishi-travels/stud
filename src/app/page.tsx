"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bike, ShieldCheck, Zap, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
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
    name: "Pulsar NS200",
    image: PlaceHolderImages.find(p => p.id === "hero-performance"),
    tag: "Street Fighter",
    desc: "Raw power for the modern street fighter."
  },
  {
    name: "Dominar 400",
    image: PlaceHolderImages.find(p => p.id === "dominar-400"),
    tag: "Hyper Tourer",
    desc: "Experience ultimate touring performance."
  }
];

const COMFORT_VEHICLES = [
  {
    name: "Platina 110",
    image: PlaceHolderImages.find(p => p.id === "platina-110"),
    tag: "Comfort",
    desc: "Smooth rides for your daily commute."
  },
  {
    name: "Freedom 125",
    image: PlaceHolderImages.find(p => p.id === "freedom-125"),
    tag: "Innovative",
    desc: "The world's first multi-fuel performance bike."
  }
];

export default function Home() {
  const [heroIndex, setHeroIndex] = React.useState(0);

  const triggerTestRide = () => {
    window.dispatchEvent(new CustomEvent('open-test-ride'));
  };

  const nextHero = React.useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const prevHero = React.useCallback(() => {
    setHeroIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      nextHero();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextHero]);

  return (
    <div className="space-y-0 pb-24">
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
          onClick={(e) => { e.preventDefault(); prevHero(); }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); nextHero(); }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        
        <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md py-3 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center text-white text-[10px] uppercase font-bold tracking-widest">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-accent" /> Fastest In Segment</span>
              <span className="flex items-center gap-1"><Bike className="h-3 w-3 text-accent" /> Most Powerful Engine</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-accent" /> Dual Channel ABS</span>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <h2 className="text-xl md:text-2xl font-bold font-headline text-accent uppercase tracking-wider italic">Welcome to</h2>
          <h1 className="text-3xl md:text-5xl font-black font-headline text-blue-950 uppercase italic tracking-tighter">Chhaya Bajaj</h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto">
            Chhaya Bajaj is one of the most respected and renowned business houses of Varanasi, bringing you world-class Bajaj performance and reliability.
          </p>
        </div>
      </section>

      {/* Daring Collection Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="border-primary text-primary font-bold">Performance Series</Badge>
              <h2 className="text-4xl font-black font-headline uppercase italic tracking-tighter text-blue-950">
                The <span className="text-primary">Daring</span> Collection
              </h2>
              <p className="text-muted-foreground font-medium">Engineered for those who thrive on adrenaline.</p>
            </div>
            <Button variant="ghost" asChild className="text-primary font-bold hover:text-primary/80">
              <Link href="/vehicles" className="flex items-center gap-2">View All <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <Carousel 
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {DARING_VEHICLES.map((vehicle, idx) => (
                <CarouselItem key={idx} className="pl-4 basis-full md:basis-1/2">
                  <Card className="overflow-hidden border-none shadow-xl glass-card group h-full">
                    <div className="relative h-[300px] md:h-[400px]">
                      {vehicle.image?.imageUrl && (
                        <Image
                          src={vehicle.image.imageUrl}
                          alt={vehicle.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          data-ai-hint={vehicle.image.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 md:p-8 flex flex-col justify-end">
                        <Badge className="bg-primary/20 backdrop-blur-md text-white border-white/20 w-fit mb-2 md:mb-4">
                          {vehicle.tag}
                        </Badge>
                        <h3 className="text-2xl md:text-4xl font-bold text-white font-headline italic uppercase tracking-tighter mb-1 md:mb-2">
                          {vehicle.name}
                        </h3>
                        <p className="text-white/80 text-xs md:text-sm font-medium mb-4 md:mb-6 line-clamp-2 max-w-sm">
                          {vehicle.desc}
                        </p>
                        <Button onClick={triggerTestRide} className="bg-primary hover:bg-primary/90 text-white font-bold w-fit text-xs md:text-sm">
                          Book Test Ride
                        </Button>
                      </div>
                    </div>
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
              <Badge variant="outline" className="border-accent text-accent font-bold">Commuter Series</Badge>
              <h2 className="text-4xl font-black font-headline uppercase italic tracking-tighter text-blue-950">
                The <span className="text-accent">Comfort</span> Collection
              </h2>
              <p className="text-muted-foreground font-medium">Reliability meets luxury for your everyday journey.</p>
            </div>
            <Button variant="ghost" asChild className="text-accent font-bold hover:text-accent/80">
              <Link href="/vehicles" className="flex items-center gap-2">View All <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <Carousel 
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {COMFORT_VEHICLES.map((vehicle, idx) => (
                <CarouselItem key={idx} className="pl-4 basis-full md:basis-1/2">
                  <Card className="overflow-hidden border-none shadow-xl glass-card group h-full">
                    <div className="relative h-[300px] md:h-[400px]">
                      {vehicle.image?.imageUrl && (
                        <Image
                          src={vehicle.image.imageUrl}
                          alt={vehicle.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          data-ai-hint={vehicle.image.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 md:p-8 flex flex-col justify-end">
                        <Badge className="bg-accent/20 backdrop-blur-md text-white border-white/20 w-fit mb-2 md:mb-4">
                          {vehicle.tag}
                        </Badge>
                        <h3 className="text-2xl md:text-4xl font-bold text-white font-headline italic uppercase tracking-tighter mb-1 md:mb-2">
                          {vehicle.name}
                        </h3>
                        <p className="text-white/80 text-xs md:text-sm font-medium mb-4 md:mb-6 line-clamp-2 max-w-sm">
                          {vehicle.desc}
                        </p>
                        <Button onClick={triggerTestRide} className="bg-accent hover:bg-accent/90 text-white font-bold w-fit text-xs md:text-sm">
                          Book Test Ride
                        </Button>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Early Bird Offer Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative rounded-[40px] overflow-hidden bg-blue-950 text-white shadow-2xl">
          <div className="relative z-10 p-8 md:p-20 max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="space-y-8">
              <div className="inline-block bg-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase italic">
                Exclusive Promotion
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-extrabold font-headline italic uppercase tracking-tighter leading-none">
                  Early Bird <span className="text-accent">Offer</span>
                </h2>
                <p className="text-xl text-blue-100/80 font-medium">
                  Be among the first 50 bookings this month and unlock exclusive benefits worth up to <span className="text-white font-bold">₹10,000*</span>.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                {[
                  "Free Extended Warranty",
                  "Complimentary Service Kit",
                  "Loyalty Bonus Points",
                  "Instant Delivery Option"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                    <div className="bg-accent p-1 rounded-full shrink-0">
                      <Zap className="h-3 w-3 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
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
    </div>
  );
}
