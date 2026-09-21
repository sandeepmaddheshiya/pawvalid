import type { Metadata } from 'next';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'Pet Travel Readiness & Document Checker | PawValid',
  description:
    'Upload your pet\'s veterinary records, microchip details, and rabies vaccinations for instant statutory cross-checking against official destination country border rules.',
  alternates: getHreflangAlternates('/checker'),
};

export default function CheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
