import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 border-t border-white/10 mt-12 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-headline tracking-tighter text-white uppercase">CHHAYA BAJAJ</h3>
            <p className="text-sm text-white/70 font-medium">
              Varanasi's premier destination for Bajaj performance. We bring you innovation with world-class service and a legacy of trust.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://m.facebook.com/profile.php?id=111457522057376" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/80 hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="https://wa.me/94153557605" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/80 hover:text-accent transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.instagram.com/chhayabajajbhopapur/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/80 hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70 font-medium">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/vehicles" className="hover:text-accent transition-colors">Vehicles</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li className="pt-2">
                <Link href="/admin/bookings" className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors">
                  <Lock className="h-3 w-3" /> Admin Leads
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-white/70 font-medium">
              <li><Link href="/contact" className="hover:text-accent transition-colors">Service Booking</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Maintenance Tips</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Spare Parts</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Warranty Info</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white mb-4">Contact Details</h4>
            <div className="flex items-start space-x-3 text-sm text-white/70 font-medium">
              <MapPin className="h-5 w-5 text-accent shrink-0" />
              <span>Kachare, Bhopapur, Varanasi, Uttar Pradesh</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-white/70 font-medium">
              <Phone className="h-5 w-5 text-accent shrink-0" />
              <span>+91 94153 57605</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-white/70 font-medium">
              <Mail className="h-5 w-5 text-accent shrink-0" />
              <span>ashwanimishra3172001@gmail.com</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Chhaya Bajaj. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
