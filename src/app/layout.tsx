import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://pawvalid.online'),
  title: {
    default: 'PawValid — Pet Travel Compliance Checker',
    template: '%s | PawValid',
  },
  description:
    'Know if your pet is actually ready to travel. Route-specific, source-backed compliance assessments for international pet travel.',
  keywords: ['pet travel', 'pet compliance', 'dog travel international', 'pet import requirements', 'pet travel checklist', 'pawvalid'],
  authors: [{ name: 'PawValid' }],
  openGraph: {
    type: 'website',
    siteName: 'PawValid',
    title: 'PawValid — Pet Travel Compliance Checker',
    description: 'Route-specific, source-backed readiness assessments for international pet travel.',
    url: 'https://pawvalid.online',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
