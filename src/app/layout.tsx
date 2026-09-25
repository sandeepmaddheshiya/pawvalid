import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getOrganizationSchema, getSoftwareApplicationSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  metadataBase: new URL('https://pawvalid.online'),
  title: {
    default: 'PawValid — Pet Travel Compliance Checker',
    template: '%s | PawValid',
  },
  description:
    'Know if your pet is actually ready to travel. Route-specific, source-backed compliance assessments for international pet travel.',
  keywords: [
    'pet document verification',
    'pet travel',
    'pet travel compliance',
    'dog travel international',
    'cat travel international',
    'pet import requirements',
    'pet travel checklist',
    'rabies titer test',
    'pet passport',
    'USDA pet travel certificate',
    'DEFRA pet travel',
    'EU pet passport regulations',
    'IATA live animal crate guidelines',
    'pawvalid',
  ],
  authors: [{ name: 'PawValid Regulatory Team', url: 'https://pawvalid.online' }],
  creator: 'PawValid',
  publisher: 'PawValid',
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
  openGraph: {
    type: 'website',
    siteName: 'PawValid',
    title: 'PawValid — Pet Travel Compliance Checker',
    description: 'Route-specific, source-backed readiness assessments for international pet travel.',
    url: 'https://pawvalid.online',
    locale: 'en_US',
    images: [
      {
        url: '/hero-dog-airport.jpg',
        width: 1200,
        height: 630,
        alt: 'PawValid — International Pet Travel Compliance Checker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pawvalid',
    creator: '@pawvalid',
    title: 'PawValid — Pet Travel Compliance Checker',
    description: 'Route-specific, source-backed readiness assessments for international pet travel.',
    images: ['/hero-dog-airport.jpg'],
  },
  alternates: {
    canonical: 'https://pawvalid.online',
    languages: {
      en: 'https://pawvalid.online/en/checker',
      de: 'https://pawvalid.online/de/checker',
      fr: 'https://pawvalid.online/fr/checker',
      es: 'https://pawvalid.online/es/checker',
      'x-default': 'https://pawvalid.online',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const appSchema = getSoftwareApplicationSchema();

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ynvr2mqt2x");
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
