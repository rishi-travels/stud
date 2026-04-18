
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
      {/* Improved Hero Section */}
      <section className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] flex items-center overflow-hidden bg-black group">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Navigation Controls */}
        <div className="container relative mx-auto px-4 h-full flex items-center justify-between z-20 pointer-events-none">
          <button
            onClick={(e) => { e.preventDefault(); setHeroIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length); }}
            className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95 border border-white/10"
          >
            <ChevronLeft className="h-6 w-6 md:h-10 md:w-10" />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-end h-full pb-20 text-center text-white space-y-4">
             {/* Text over hero could go here in future if needed */}
          </div>

          <button
            onClick={(e) => { e.preventDefault(); setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length); }}
            className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95 border border-white/10"
          >
            <ChevronRight className="h-6 w-6 md:h-10 md:w-10" />
          </button>
        </div>
        
        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-lg py-4 hidden md:block border-t border-white/5">
          <div className="container mx-auto px-6 flex justify-between items-center text-white text-[11px] lg:text-xs uppercase font-bold tracking-[0.2em]">
            <div className="flex items-center gap-8 lg:gap-12">
              <span className="flex items-center gap-2 drop-shadow-sm"><Zap className="h-4 w-4 text-accent fill-accent" /> Chhaya Bajaj Bhopapur</span>
              <span className="flex items-center gap-2 drop-shadow-sm"><Bike className="h-4 w-4 text-accent fill-accent" /> Premium Showroom Varanasi</span>
              <span className="flex items-center gap-2 drop-shadow-sm"><ShieldCheck className="h-4 w-4 text-accent fill-accent" /> Authorized Dealer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/80 animate-pulse">DEFINITELY DARING</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Indicator Dots */}
      <div className="flex justify-center gap-3 py-6 bg-white border-b border-border/50">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setHeroIndex(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500 ease-out",
              idx === heroIndex ? "w-12 bg-primary" : "w-4 bg-muted hover:bg-muted-foreground/30"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Welcome Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
          <h2 className="text-lg md:text-xl font-bold font-headline text-accent uppercase tracking-[0.3em] italic animate-in fade-in slide-in-from-bottom-2 duration-500">Experience Excellence</h2>
          <h1 className="text-4xl md:text-6xl font-black font-headline text-blue-950 uppercase italic tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-4 duration-700">
            Chhaya Bajaj
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Welcome to Chhaya Bajaj Bhopapur, your official destination for Bajaj showroom services in Varanasi. We are one of the most trusted names for Bajaj automobile sales and service near you.
          </p>
        </div>
      </section>

      {/* Daring Collection Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-3">
              <Badge variant="outline" className="border-primary text-primary font-bold px-4 py-1">Bajaj bikes Varanasi</Badge>
              <h2 className="text-4xl lg:text-5xl font-black font-headline uppercase italic tracking-tighter text-blue-950">
                The <span className="text-primary">Daring</span> Collection
              </h2>
              <p className="text-muted-foreground font-medium text-lg">Engineered for those who thrive on Bajaj performance at our showroom.</p>
            </div>
            <Button variant="ghost" asChild className="text-primary font-bold hover:text-primary/80 hover:bg-primary/5 text-lg h-12">
              <Link href="/vehicles" className="flex items-center gap-2">Explore All Bikes <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>

          <Carousel 
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {DARING_VEHICLES.map((vehicle, idx) => (
                <CarouselItem key={idx} className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-none shadow-xl glass-card group h-full flex flex-col hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-[250px] md:h-[350px]">
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
                        <Badge className="bg-primary/90 backdrop-blur-md text-white border-white/20 font-bold uppercase tracking-wider px-3 py-1">
                          {vehicle.tag}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col space-y-5">
                      <h3 className="text-3xl font-bold text-blue-950 font-headline italic uppercase tracking-tighter">
                        {vehicle.name}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base font-medium line-clamp-2">
                        {vehicle.desc}
                      </p>
                      <Button onClick={triggerTestRide} className="bg-primary hover:bg-primary/90 text-white font-bold w-full sm:w-fit h-12 px-8">
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-3">
              <Badge variant="outline" className="border-accent text-accent font-bold px-4 py-1">Bajaj Bhopapur</Badge>
              <h2 className="text-4xl lg:text-5xl font-black font-headline uppercase italic tracking-tighter text-blue-950">
                The <span className="text-accent">Comfort</span> Collection
              </h2>
              <p className="text-muted-foreground font-medium text-lg">Chhaya Bajaj reliability for your everyday journey in Varanasi.</p>
            </div>
            <Button variant="ghost" asChild className="text-accent font-bold hover:text-accent/80 hover:bg-accent/5 text-lg h-12">
              <Link href="/vehicles" className="flex items-center gap-2">Browse Comfort Models <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>

          <Carousel 
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {COMFORT_VEHICLES.map((vehicle, idx) => (
                <CarouselItem key={idx} className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-none shadow-xl glass-card group h-full flex flex-col hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-[250px] md:h-[350px]">
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
                        <Badge className="bg-accent/90 backdrop-blur-md text-white border-white/20 font-bold uppercase tracking-wider px-3 py-1">
                          {vehicle.tag}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col space-y-5">
                      <h3 className="text-3xl font-bold text-blue-950 font-headline italic uppercase tracking-tighter">
                        {vehicle.name}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base font-medium line-clamp-2">
                        {vehicle.desc}
                      </p>
                      <Button onClick={triggerTestRide} className="bg-accent hover:bg-accent/90 text-white font-bold w-full sm:w-fit h-12 px-8">
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
            <p className="text-muted-foreground font-medium text-xl">
              Visit Chhaya Bajaj Bhopapur for the best Bajaj bikes and showroom experience in Varanasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADVANTAGES.map((advantage, i) => (
              <Card key={i} className="border-none shadow-lg glass-card hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <CardContent className="p-10 space-y-6 text-center">
                  <div className={cn(
                    "w-20 h-20 rounded-[2rem] mx-auto flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                    advantage.bg
                  )}>
                    <advantage.icon className={cn("h-10 w-10", advantage.color)} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-blue-950">{advantage.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {advantage.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full border border-border/50 shadow-md transform hover:scale-105 transition-transform">
              <ThumbsUp className="h-6 w-6 text-accent" />
              <span className="text-base font-bold text-blue-950">Trusted by 10,000+ customers - Chhaya Bajaj Bhopapur</span>
            </div>
          </div>
        </div>
      </section>

      {/* Early Bird Offer */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative rounded-[3rem] overflow-hidden bg-blue-950 text-white shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/40 mix-blend-overlay" />
          <div className="relative z-10 p-10 md:p-24 max-w-5xl mx-auto text-center flex flex-col items-center">
            <div className="space-y-10">
              <div className="inline-block bg-accent px-6 py-2 rounded-full text-sm font-bold tracking-[0.2em] uppercase italic shadow-lg transform group-hover:scale-110 transition-transform">
                Exclusive Promotion @chhayabajajbhopapur
              </div>
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-extrabold font-headline italic uppercase tracking-tighter leading-none drop-shadow-lg">
                  Early Bird <span className="text-accent">Offer</span>
                </h2>
                <p className="text-xl md:text-2xl text-blue-100/90 font-medium max-w-2xl mx-auto">
                  Book your Bajaj bike today at Chhaya Bajaj Bhopapur and unlock benefits worth ₹10,000*.
                </p>
              </div>
              <Button 
                onClick={triggerTestRide}
                size="lg" 
                className="bg-white text-blue-950 hover:bg-blue-50 font-bold px-12 rounded-full h-16 text-xl w-full sm:w-auto mt-6 shadow-2xl transition-all hover:px-16"
              >
                Book Now & Save
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-4 md:py-6 bg-white overflow-hidden whitespace-nowrap border-y border-primary/10 relative">
        <div className="flex animate-marquee gap-8 md:gap-16 items-center min-w-full">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-2xl md:text-4xl font-black font-headline uppercase italic text-primary tracking-tighter px-4">
              Book Now & Save - Chhaya Bajaj
            </span>
          ))}
          {[...Array(8)].map((_, i) => (
            <span key={i + 8} className="text-2xl md:text-4xl font-black font-headline uppercase italic text-primary tracking-tighter px-4">
              Book Now & Save - chhayabajaj.in
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
