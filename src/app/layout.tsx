import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import TestRidePopup from '@/components/TestRidePopup';
import { FirebaseClientProvider } from '@/firebase';

export const viewport: Viewport = {
  themeColor: '#003399',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://chhayabajaj.in'),
  title: {
    default: 'Chhaya Bajaj | Official Bajaj Bike Showroom in Varanasi',
    template: '%s | Chhaya Bajaj Varanasi',
  },
  description: 'Chhaya Bajaj is the premier authorized Bajaj automobile showroom in Varanasi. Explore Pulsar, Dominar, Chetak EV, and more. Visit chhayabajaj.in for the best Bajaj bikes near you.',
  keywords: [
    'chhayabajaj',
    'chhaya bajaj',
    'bajaj bikes',
    '@chhayabajajbhopapur',
    'Chhaya',
    'Bajaj',
    'Bajaj near me',
    'chhayabajaj.in',
    'Bajaj Varanasi',
    'Pulsar Varanasi',
    'Dominar Varanasi',
    'Chetak EV Varanasi',
    'Bajaj service center Varanasi',
    'best bike showroom in Varanasi',
    'Bajaj automobile Varanasi'
  ],
  authors: [{ name: 'Chhaya Bajaj' }],
  creator: 'Chhaya Bajaj',
  publisher: 'Chhaya Bajaj',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Chhaya Bajaj | Official Bajaj Showroom in Varanasi',
    description: 'Premier Bajaj dealership in Varanasi. Explore the latest Bajaj bikes and electric vehicles at chhayabajaj.in.',
    url: 'https://chhayabajaj.in',
    siteName: 'Chhaya Bajaj',
    images: [
      {
        url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/345d4170217053.5b9bd43b46c8c.jpg',
        width: 1200,
        height: 630,
        alt: 'Chhaya Bajaj Varanasi Showroom',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chhaya Bajaj | Authorized Bajaj Showroom in Varanasi',
    description: 'Official Bajaj dealership in Varanasi. Discover Pulsar, Dominar, and Chetak EV at chhayabajaj.in.',
    images: ['https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/345d4170217053.5b9bd43b46c8c.jpg'],
    site: '@chhayabajajbhopapur',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Chhaya Bajaj",
    "alternateName": ["Chhaya Bajaj Bhopapur", "Chhaya Bajaj Varanasi"],
    "image": "https://chhayabajaj.in/hero-image.jpg",
    "url": "https://chhayabajaj.in",
    "telephone": "+919415357605",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kachare, Bhopapur",
      "addressLocality": "Varanasi",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "221001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.4540,
      "longitude": 82.9418
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://m.facebook.com/profile.php?id=111457522057376",
      "https://www.instagram.com/chhayabajajbhopapur/",
      "https://wa.me/94153557605"
    ]
  };

  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased selection:bg-primary/30 min-h-screen flex flex-col">
        <FirebaseClientProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
          <TestRidePopup />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
