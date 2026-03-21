
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bike, ShieldCheck, Zap, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-mobile";

const VEHICLES = [
  { name: "Pulsar N250", type: "Naked Sports", image: PlaceHolderImages.find(p => p.id === "pulsar-n250") },
  { name: "Dominar 400", type: "Sports Tourer", image: PlaceHolderImages.find(p => p.id === "dominar-400") },
  { name: "Chetak Electric", type: "Electric Scooter", image: PlaceHolderImages.find(p => p.id === "chetak-electric") },
];

const HERO_SLIDES = [
  PlaceHolderImages.find(p => p.id === "hero-stunt"),
  PlaceHolderImages.find(p => p.id === "hero-style"),
  PlaceHolderImages.find(p => p.id === "hero-performance"),
];

const GALLERY_IMAGES = [
  PlaceHolderImages.find(p => p.id === "gallery-1"),
  PlaceHolderImages.find(p => p.id === "gallery-2"),
  PlaceHolderImages.find(p => p.id === "gallery-3"),
  PlaceHolderImages.find(p => p.id === "hero-performance"),
];

export default function Home() {
  const isMobile = useIsMobile();
  const promoImg = PlaceHolderImages.find(p => p.id === "promotion-1");

  const autoplayPlugin = React.useMemo(
    () => Autoplay({ delay: 1500, stopOnInteraction: false }),
    []
  );

  return (
    <div className="space-y-16 pb-24">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[85vh] w-full flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Carousel opts={{ loop: true }} className="w-full h-full">
            <CarouselContent className="h-[85vh]">
              {HERO_SLIDES.map((slide, index) => (
                <CarouselItem key={index} className="relative w-full h-full">
                  {slide?.imageUrl ? (
                    <Image
                      src={slide.imageUrl}
                      alt={slide.description || `Slide ${index + 1}`}
                      fill
                      className="object-cover opacity-80 transition-opacity duration-1000"
                      priority={index === 0}
                      data-ai-hint={slide.imageHint}
                    />
                  ) : null}
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </Carousel>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 space-y-8">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight font-headline text-white drop-shadow-2xl italic">
              Unleash the <span className="text-accent">Power</span> <br />
              Within
            </h1>
            <p className="text-xl text-white/90 md:text-2xl max-w-2xl font-medium drop-shadow-md">
              Experience the thrill of performance and the elegance of style. Chhaya Bajaj brings you the ultimate road machines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg h-14 px-8 border-0">
                <Link href="/contact">Book Test Ride</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-lg h-14 px-8 border-white/30">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Carousel */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold font-headline">Featured <span className="text-primary">Lineup</span></h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              From high-octane performance to sustainable urban mobility.
            </p>
          </div>
        </div>

        <div className="relative group/carousel">
          <Carousel 
            plugins={isMobile ? [autoplayPlugin] : []}
            opts={{ loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {VEHICLES.map((vehicle, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-border bg-card hover:border-primary/50 transition-all group shadow-sm hover:shadow-md">
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
                    <CardContent className="p-6 flex items-center justify-between">
                      <h3 className="text-2xl font-bold">{vehicle.name}</h3>
                      <Button variant="outline" size="sm" asChild className="border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-full px-5 transition-all">
                        <Link href="/vehicles">
                          More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Why Choose Us - Chhaya Advantage */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
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

      {/* Gallery Frame Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold font-headline">Showroom <span className="text-primary">Gallery</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse of the premium experience and high-performance machines waiting for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px]">
          {/* Main Large Frame */}
          <div className="relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden group shadow-xl">
            {GALLERY_IMAGES[0]?.imageUrl && (
              <Image
                src={GALLERY_IMAGES[0].imageUrl}
                alt="Main Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={GALLERY_IMAGES[0].imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white text-xl font-bold font-headline italic">Modern Showroom</span>
            </div>
          </div>

          {/* Top Right Frame */}
          <div className="relative rounded-3xl overflow-hidden group shadow-lg min-h-[250px]">
            {GALLERY_IMAGES[1]?.imageUrl && (
              <Image
                src={GALLERY_IMAGES[1].imageUrl}
                alt="Gallery 2"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={GALLERY_IMAGES[1].imageHint}
              />
            )}
          </div>

          {/* Middle Right Frame */}
          <div className="relative rounded-3xl overflow-hidden group shadow-lg min-h-[250px]">
            {GALLERY_IMAGES[2]?.imageUrl && (
              <Image
                src={GALLERY_IMAGES[2].imageUrl}
                alt="Gallery 3"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={GALLERY_IMAGES[2].imageHint}
              />
            )}
          </div>

          {/* Bottom Wide Frame */}
          <div className="relative md:col-span-2 rounded-3xl overflow-hidden group shadow-lg min-h-[250px]">
            {GALLERY_IMAGES[3]?.imageUrl && (
              <Image
                src={GALLERY_IMAGES[3].imageUrl}
                alt="Gallery 4"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={GALLERY_IMAGES[3].imageHint}
              />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="secondary" asChild className="rounded-full font-bold">
                <Link href="/about">View Full Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Early Bird Offer Heading Section */}
      <section className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block relative">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight uppercase italic">
            Early Bird <span className="text-accent">Offer</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Promotions Section - Festival Dhamaka */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden min-h-[350px] flex items-center mb-8">
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
          </div>
        </div>
        
        {/* Claim Offer Button to the right side */}
        <div className="flex justify-end">
          <Button className="bg-accent text-white hover:bg-accent/80 font-bold animate-bounce shadow-2xl h-12 px-8 rounded-full text-base" asChild>
            <Link href="/contact">Claim Offer</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
