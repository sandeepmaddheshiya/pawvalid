'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const pathname = usePathname();

  // Do not render marketing footer on dashboard pages
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-zinc-200/80 pt-16 pb-12 text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-zinc-200/70">
          {/* Brand Info & Primary CTA */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-zinc-600 max-w-sm leading-relaxed font-normal">
              Pet travel paperwork without the guesswork. Accurate route checks, document verification, and chronological departure timelines for pet parents worldwide.
            </p>

            <div className="pt-1">
              <Link
                href="/en/checker"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>Check Requirements →</span>
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-600">
              <li>
                <Link href="#how-it-works" className="hover:text-emerald-700 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/en/pet-travel" className="hover:text-emerald-700 transition-colors">
                  Destinations &amp; Corridors
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-emerald-700 transition-colors">
                  Transparent Pricing
                </Link>
              </li>
              <li>
                <Link href="#scanner" className="hover:text-emerald-700 transition-colors">
                  Document Check
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-4">
              Resources
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-600">
              <li>
                <Link href="/en/pet-travel" className="hover:text-emerald-700 transition-colors">
                  Pet Travel Guides
                </Link>
              </li>
              <li>
                <Link href="/en/pet-travel" className="hover:text-emerald-700 transition-colors">
                  Country Requirements
                </Link>
              </li>
              <li>
                <Link href="/en/pet-travel" className="hover:text-emerald-700 transition-colors">
                  Airline Policies Guide
                </Link>
              </li>
              <li>
                <Link href="/en/checker" className="hover:text-emerald-700 transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-600">
              <li>
                <Link href="#about" className="hover:text-emerald-700 transition-colors">
                  About Petvia
                </Link>
              </li>
              <li>
                <Link href="/en/privacy" className="hover:text-emerald-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/en/terms" className="hover:text-emerald-700 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/en/disclaimer" className="hover:text-emerald-700 transition-colors">
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separate Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="text-center sm:text-left">
            © 2026 Petvia. Requirements can change. Always verify with relevant government authorities and operating airlines before travel.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] text-zinc-400 hidden md:inline">Continental Transit Hubs:</span>
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
