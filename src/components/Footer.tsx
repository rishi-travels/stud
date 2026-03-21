import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-100 border-t border-blue-200 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary font-headline tracking-tighter">CHHAYA BAJAJ</h3>
            <p className="text-sm text-blue-900/70 font-medium">
              Your trusted partner in automotive excellence. We bring you the best of Bajaj's performance and innovation with world-class service.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-blue-900 hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-blue-900 hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-blue-900 hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-blue-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-900/70 font-medium">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/vehicles" className="hover:text-primary transition-colors">Vehicles</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-blue-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-blue-900/70 font-medium">
              <li><Link href="/service" className="hover:text-primary transition-colors">Service Booking</Link></li>
              <li><Link href="/service" className="hover:text-primary transition-colors">Maintenance Tips</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Spare Parts</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Warranty Info</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-blue-900 mb-4">Contact Details</h4>
            <div className="flex items-start space-x-3 text-sm text-blue-900/70 font-medium">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span>Kachare, Bhopapur, Varanasi, Uttar Pradesh</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-blue-900/70 font-medium">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <span>+91 96285 10443</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-blue-900/70 font-medium">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>intelcorei5136@gmail.com</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-200 mt-12 pt-8 text-center text-sm text-blue-900/50">
          <p>&copy; {new Date().getFullYear()} Chhaya Bajaj Auto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
