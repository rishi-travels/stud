
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Bike, Info, Phone, Briefcase, LayoutGrid, Wrench, MessageCircle, Mail } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerTestRide = () => {
    window.dispatchEvent(new CustomEvent('open-test-ride'));
    setIsOpen(false);
  };

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
            
            {/* Conditional rendering after mount to avoid hydration mismatch */}
            {mounted ? (
              <button 
                onClick={triggerTestRide}
                className="bg-accent hover:bg-accent/90 font-bold text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Book a Test Ride
              </button>
            ) : (
              <Link 
                href="/contact"
                className="bg-accent hover:bg-accent/90 font-bold text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Book a Test Ride
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-blue-950 border-l border-white/10 text-white overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Access all pages of Chhaya Bajaj including Home, Vehicles, Service, About, Careers, and Contact.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-12 pb-8">
                  <div className="space-y-4">
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
                  </div>
                  
                  <div className="pt-6 space-y-4 border-t border-white/10">
                    <Button 
                      onClick={triggerTestRide}
                      className="w-full font-bold bg-accent hover:bg-accent/90 h-12"
                    >
                      Book a Test Ride
                    </Button>
                    
                    <Button variant="outline" asChild className="w-full font-bold border-accent text-accent hover:bg-accent/20 h-12">
                      <a 
                        href="https://wa.me/94153557605" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => setIsOpen(false)} 
                        className="flex items-center justify-center"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" /> Chat on Whatsapp
                      </a>
                    </Button>

                    <Button variant="outline" asChild className="w-full font-bold border-accent text-accent hover:bg-accent/20 h-12">
                      <a 
                        href="mailto:ashwanimishra3172001@gmail.com" 
                        onClick={() => setIsOpen(false)} 
                        className="flex items-center justify-center"
                      >
                        <Mail className="mr-2 h-5 w-5" /> Chat on E-mail
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
