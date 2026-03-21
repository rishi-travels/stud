
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bike, ShieldCheck, Zap, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const PERFORMANCE_VEHICLES = [
  { name: "Pulsar N250", type: "Naked Sports", image: PlaceHolderImages.find(p => p.id === "pulsar-n250") },
  { name: "Pulsar NS200", type: "Street Fighter", image: PlaceHolderImages.find(p => p.id === "hero-performance") },
  { name: "Pulsar RS200", type: "Racing", image: PlaceHolderImages.find(p => p.id === "hero-performance") },
  { name: "Pulsar N160", type: "Street", image: PlaceHolderImages.find(p => p.id === "pulsar-n250") },
];

const ECO_VEHICLES = [
  { name: "Chetak Premium", type: "Electric Scooter", image: PlaceHolderImages.find(p => p.id === "chetak-electric") },
  { name: "Chetak Urbane", type: "Smart EV", image: PlaceHolderImages.find(p => p.id === "chetak-electric") },
  { name: "Freedom 125", type: "Innovative", image: PlaceHolderImages.find(p => p.id === "freedom-125") },
];

const HERO_IMAGES = [
  PlaceHolderImages.find(p => p.id === "hero-1"),
  PlaceHolderImages.find(p => p.id === "hero-2"),
  PlaceHolderImages.find(p => p.id === "hero-3"),
  PlaceHolderImages.find(p => p.id === "hero-4"),
  PlaceHolderImages.find(p => p.id === "hero-5"),
].filter((img): img is any => !!img);

export default function Home() {
  const isMobile = useIsMobile();
  const [heroIndex, setHeroIndex] = React.useState(0);

  const nextHero = React.useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const prevHero = React.useCallback(() => {
    setHeroIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      nextHero();
    }, 3000);
    return () => clearInterval(timer);
  }, [nextHero]);

  const autoplayPlugin = React.useMemo(
    () => Autoplay({ delay: 1500, stopOnInteraction: false }),
    []
  );

  const autoplayPlugin3 = React.useMemo(
    () => Autoplay({ delay: 2500, stopOnInteraction: false }),
    []
  );

  return (
    <div className="space-y-0 pb-24">
      {/* Hero Section - Banner Mode with Navigation */}
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

        {/* Navigation Arrows - Always Visible */}
        <button
          onClick={(e) => { e.preventDefault(); prevHero(); }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all opacity-100"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); nextHero(); }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all opacity-100"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        
        {/* Banner Badges Overlay */}
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

      {/* Transition Page Status Indicators - Rectangular lines below hero */}
      <div className="flex justify-center gap-2 py-4 bg-white border-b border-border">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setHeroIndex(idx)}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              idx === heroIndex 
                ? "w-10 bg-primary" 
                : "w-4 bg-muted hover:bg-primary/40"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Welcome Section - Reduced Size */}
      <section className="py-4 md:py-8 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <div className="space-y-0">
            <h2 className="text-xl md:text-2xl font-bold font-headline text-accent uppercase tracking-wider italic">Welcome to</h2>
            <h1 className="text-3xl md:text-5xl font-black font-headline text-blue-950 uppercase italic tracking-tighter">Chhaya Bajaj</h1>
          </div>
          
          <div className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto">
            <p>
              Chhaya Bajaj is one of the most respected, loved and renowned business house of Varanasi. We bring you the world-class performance and reliability of Bajaj vehicles.
            </p>
          </div>
          
          <div className="pt-2">
            <Button size="default" asChild className="bg-primary hover:bg-primary/90 text-sm h-10 px-8 rounded-full font-bold">
              <Link href="/vehicles">Explore Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Daring Collection */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold font-headline italic uppercase">Daring <span className="text-primary">Collection</span></h2>
          <div className="h-1 w-20 bg-accent rounded-full" />
        </div>
        <Carousel 
          opts={{ align: "start", loop: true }} 
          plugins={[autoplayPlugin]}
          className="w-full"
        >
          <CarouselContent className="-ml-8">
            {PERFORMANCE_VEHICLES.map((vehicle, i) => (
              <CarouselItem key={i} className="pl-8 basis-full md:basis-1/3">
                <Card className="group overflow-hidden border-none shadow-xl transition-all hover:translate-y-[-4px] bg-white h-full border border-border">
                  <div className="relative h-64 w-full">
                    {vehicle.image?.imageUrl && (
                      <Image
                        src={vehicle.image.imageUrl}
                        alt={vehicle.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={vehicle.image.imageHint}
                      />
                    )}
                    <div className="absolute bottom-4 left-4">
                      <p className="bg-primary/90 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest">{vehicle.type}</p>
                    </div>
                  </div>
                  <CardContent className="p-4 flex justify-between items-center">
                    <span className="font-bold text-primary text-lg">{vehicle.name}</span>
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold" asChild>
                      <Link href="/vehicles">More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Comfort Collection */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold font-headline italic uppercase">Comfort <span className="text-primary">Collection</span></h2>
          <div className="h-1 w-20 bg-accent rounded-full" />
        </div>
        <Carousel 
          opts={{ align: "start", loop: true }} 
          plugins={[autoplayPlugin3]}
          className="w-full"
        >
          <CarouselContent className="-ml-8">
            {ECO_VEHICLES.map((vehicle, i) => (
              <CarouselItem key={i} className="pl-8 basis-full md:basis-1/3">
                <Card className="group overflow-hidden border-none shadow-xl transition-all hover:translate-y-[-4px] bg-white h-full border border-border">
                  <div className="relative h-64 w-full">
                    {vehicle.image?.imageUrl && (
                      <Image
                        src={vehicle.image.imageUrl}
                        alt={vehicle.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={vehicle.image.imageHint}
                      />
                    )}
                    <div className="absolute bottom-4 left-4">
                      <p className="bg-accent/90 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest">{vehicle.type}</p>
                    </div>
                  </div>
                  <CardContent className="p-4 flex justify-between items-center">
                    <span className="font-bold text-primary text-lg">{vehicle.name}</span>
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold" asChild>
                      <Link href="/vehicles">More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Why Choose Us - Advantage */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold font-headline italic uppercase">The Chhaya <span className="text-primary">Advantage</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Varanasi's most trusted destination for Bajaj performance and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Trusted Service", desc: "Expert technicians with years of certified experience." },
              { icon: Zap, title: "Flash Delivery", desc: "Minimal waiting times with our streamlined process." },
              { icon: Bike, title: "Wide Selection", desc: "The complete range of Bajaj motorcycles and scooters." },
              { icon: Award, title: "Legacy of Trust", desc: "Building trust across Varanasi through excellence." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-border space-y-4 hover:translate-y-[-5px] transition-transform">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Bird Offer Section - Shifted below Advantage */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative rounded-[40px] overflow-hidden bg-blue-950 text-white shadow-2xl">
          <div className="absolute inset-0 opacity-10">
             {PlaceHolderImages.find(p => p.id === "hero-performance")?.imageUrl && (
              <Image
                src={PlaceHolderImages.find(p => p.id === "hero-performance")!.imageUrl}
                alt="Promotion background"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16">
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
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <Button size="lg" asChild className="bg-white text-blue-950 hover:bg-blue-50 font-bold px-10 rounded-full h-14 text-lg w-full sm:w-auto">
                <Link href="/contact">Book Now & Save</Link>
              </Button>
            </div>
            <div className="hidden lg:block relative h-[450px]">
               {PlaceHolderImages.find(p => p.id === "promotion-1")?.imageUrl && (
                <Image
                  src={PlaceHolderImages.find(p => p.id === "promotion-1")!.imageUrl}
                  alt="Special Offer"
                  fill
                  className="object-contain drop-shadow-2xl"
                  data-ai-hint="motorcycle offer"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
