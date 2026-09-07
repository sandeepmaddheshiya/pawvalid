import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Petvia — Pet Travel Compliance Checker',
    template: '%s | Petvia',
  },
  description:
    'Know if your pet is actually ready to travel. Route-specific, source-backed compliance assessments for international pet travel.',
  keywords: ['pet travel', 'pet compliance', 'dog travel international', 'pet import requirements', 'pet travel checklist'],
  authors: [{ name: 'Petvia' }],
  openGraph: {
    type: 'website',
    siteName: 'Petvia',
    title: 'Petvia — Pet Travel Compliance Checker',
    description: 'Route-specific, source-backed readiness assessments for international pet travel.',
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
