"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Bike, Info, Phone, Briefcase, LayoutGrid, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Bike },
  { name: "Vehicles", href: "/vehicles", icon: LayoutGrid },
  { name: "Service", href: "/service", icon: Wrench },
  { name: "About", href: "/about", icon: Info },
  { name: "Careers", href: "/careers", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-blue-950/95 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter text-white font-headline">
              CHHAYA <span className="text-accent">BAJAJ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold transition-colors text-white/90 hover:text-accent"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="bg-accent hover:bg-accent/90 font-bold text-white border-0">
              <Link href="/contact">Book a Test Ride</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-blue-950 border-l border-white/10 text-white">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Access all pages of Chhaya Bajaj Auto including Home, Vehicles, Service, About, Careers, and Contact.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-12">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-4 text-lg font-bold text-white/90 hover:text-accent"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <Button asChild className="w-full mt-4 font-bold bg-accent hover:bg-accent/90">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Book a Test Ride
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
