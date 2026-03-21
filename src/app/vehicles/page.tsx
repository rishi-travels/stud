import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bike, Zap, Shield, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VEHICLE_DATA = [
  {
    category: "Sports",
    vehicles: [
      {
        name: "Pulsar N250",
        price: "₹ 1.51 Lakh",
        description: "The ultimate naked sports machine with DNA of performance.",
        specs: { engine: "249cc", power: "24.5 PS", torque: "21.5 Nm" },
        image: PlaceHolderImages.find(p => p.id === "pulsar-n250"),
        tag: "Best Seller"
      },
      {
        name: "Pulsar NS200",
        price: "₹ 1.48 Lakh",
        description: "Raw power meets aggressive styling for the modern street fighter.",
        specs: { engine: "199.5cc", power: "24.5 PS", torque: "18.74 Nm" },
        image: PlaceHolderImages.find(p => p.id === "hero-performance"),
        tag: "Iconic"
      }
    ]
  },
  {
    category: "Touring",
    vehicles: [
      {
        name: "Dominar 400",
        price: "₹ 2.29 Lakh",
        description: "Engineered for those who want to dominate every road and landscape.",
        specs: { engine: "373.3cc", power: "40 PS", torque: "35 Nm" },
        image: PlaceHolderImages.find(p => p.id === "dominar-400"),
        tag: "Premium"
      },
      {
        name: "Dominar 250",
        price: "₹ 1.84 Lakh",
        description: "The perfect entry into the world of sports touring.",
        specs: { engine: "248.8cc", power: "27 PS", torque: "23.5 Nm" },
        image: PlaceHolderImages.find(p => p.id === "hero-style"),
        tag: "Tourer"
      }
    ]
  },
  {
    category: "Electric",
    vehicles: [
      {
        name: "Chetak Premium",
        price: "₹ 1.47 Lakh",
        description: "The future of urban mobility. Timeless design, cutting-edge tech.",
        specs: { range: "108 km", speed: "73 kmph", charge: "4.5 hrs" },
        image: PlaceHolderImages.find(p => p.id === "chetak-electric"),
        tag: "EV"
      }
    ]
  },
  {
    category: "Commuter",
    vehicles: [
      {
        name: "Freedom 125",
        price: "₹ 1.07 Lakh",
        description: "Unmatched reliability and style for your daily city travels.",
        specs: { engine: "125cc", mileage: "65 kmpl", gears: "5 Speed" },
        image: PlaceHolderImages.find(p => p.id === "freedom-125"),
        tag: "New Launch"
      }
    ]
  }
];

export default function VehiclesPage() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Explore the <span className="text-primary">Bajaj Lineup</span></h1>
        <p className="text-muted-foreground text-lg italic">
          From high-performance sports bikes to sustainable electric mobility, find your perfect match.
        </p>
      </div>

      <Tabs defaultValue="Sports" className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList className="bg-blue-50/50 p-1 border border-blue-100 h-auto flex flex-wrap justify-center">
            {VEHICLE_DATA.map((cat) => (
              <TabsTrigger 
                key={cat.category} 
                value={cat.category}
                className="px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all rounded-md font-bold"
              >
                {cat.category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {VEHICLE_DATA.map((cat) => (
          <TabsContent key={cat.category} value={cat.category} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {cat.vehicles.map((vehicle, idx) => (
                <Card key={idx} className="overflow-hidden border-none shadow-xl glass-card flex flex-col group">
                  <div className="relative h-[300px] w-full bg-muted/20">
                    {vehicle.image?.imageUrl && (
                      <Image
                        src={vehicle.image.imageUrl}
                        alt={vehicle.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        data-ai-hint={vehicle.image.imageHint}
                      />
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent hover:bg-accent text-white font-bold px-4 py-1">
                        {vehicle.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-3xl font-bold font-headline">{vehicle.name}</CardTitle>
                    <span className="text-xl font-extrabold text-primary">{vehicle.price}</span>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed">
                      {vehicle.description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-blue-50">
                      {Object.entries(vehicle.specs).map(([key, val], i) => (
                        <div key={i} className="text-center">
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{key}</p>
                          <p className="text-sm font-bold text-blue-900">{val}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-6 mt-auto">
                      <Button asChild className="flex-1 bg-primary hover:bg-primary/90 font-bold py-6">
                        <Link href="/contact">Book Test Ride</Link>
                      </Button>
                      <Button variant="outline" asChild className="flex-1 border-primary text-primary hover:bg-primary/5 font-bold py-6">
                        <Link href="/contact">Enquire Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Trust Banner */}
      <section className="bg-blue-900 text-white rounded-[40px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 mt-20">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-bold font-headline">The Bajaj <span className="text-accent">Promise</span></h2>
          <p className="text-blue-100/80 max-w-lg">
            Every vehicle comes with the assurance of 5-year warranty, free roadside assistance, and the world's most extensive service network.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Shield className="h-10 w-10 text-accent" />
            <span className="text-sm font-bold">5-Year Warranty</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Gauge className="h-10 w-10 text-accent" />
            <span className="text-sm font-bold">Genuine Spares</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="h-10 w-10 text-accent" />
            <span className="text-sm font-bold">24/7 Support</span>
          </div>
        </div>
      </section>
    </div>
  );
}
