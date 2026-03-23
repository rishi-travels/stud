"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bike, ShieldCheck, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
  PlaceHolderImages.find(p => p.id === "hero-1"),
  PlaceHolderImages.find(p => p.id === "hero-2"),
  PlaceHolderImages.find(p => p.id === "hero-3"),
  PlaceHolderImages.find(p => p.id === "hero-4"),
].filter((img): img is any => !!img);

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
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <h2 className="text-xl md:text-2xl font-bold font-headline text-accent uppercase tracking-wider italic">Welcome to</h2>
          <h1 className="text-3xl md:text-5xl font-black font-headline text-blue-950 uppercase italic tracking-tighter">Chhaya Bajaj</h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto">
            Chhaya Bajaj is one of the most respected and renowned business houses of Varanasi, bringing you world-class Bajaj performance and reliability.
          </p>
          <div className="pt-2">
            <Button size="default" asChild className="bg-primary hover:bg-primary/90 rounded-full font-bold">
              <Link href="/vehicles">Explore Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Early Bird Offer Section - Centered Content Optimized for Laptop */}
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