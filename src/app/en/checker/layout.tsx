import type { Metadata } from 'next';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'Pet Document Verification & Travel Readiness Checker | PawValid',
  description:
    'Instant pet document verification engine. Upload your pet\'s veterinary records, microchip details, and rabies vaccinations for statutory cross-checking against official destination country border rules.',
  alternates: getHreflangAlternates('/checker'),
};

export default function CheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
