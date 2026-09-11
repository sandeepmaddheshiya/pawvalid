'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Do not render marketing footer on dashboard pages
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0A192F] text-zinc-300 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-3 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group select-none">
              <div className="w-8 h-8 rounded-lg bg-transparent flex items-center justify-center text-white shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 11c-2.4 0-4 1.8-4 3.5 0 2.2 2 3.5 4 3.5s4-1.3 4-3.5C16 12.8 14.4 11 12 11z" />
                  <ellipse cx="6.5" cy="11.5" rx="1.8" ry="2.2" />
                  <ellipse cx="9.2" cy="7" rx="1.8" ry="2.2" />
                  <ellipse cx="14.8" cy="7" rx="1.8" ry="2.2" />
                  <ellipse cx="17.5" cy="11.5" rx="1.8" ry="2.2" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg font-bold text-white tracking-tight">
                  PawValid
                </span>
                <span className="text-[9px] text-zinc-400 font-medium">
                  Pet Travel Compliance
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed pt-1">
              Clearer paperwork. Safer journeys.
            </p>
          </div>

          {/* Product */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="#pet-passport" className="hover:text-white transition-colors">
                  Digital Pet Passport
                </Link>
              </li>
              <li>
                <Link href="#customs-qr" className="hover:text-white transition-colors">
                  Digital Verification Pass
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/en/pet-travel" className="hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/en/guides" className="hover:text-white transition-colors">
                  Regulatory Guides &amp; Manuals
                </Link>
              </li>
              <li>
                <Link href="/en/pet-travel" className="hover:text-white transition-colors">
                  Country Requirements (15 Corridors)
                </Link>
              </li>
              <li>
                <Link href="/en/airlines" className="hover:text-white transition-colors">
                  Airline Pet Policies (10 Carriers)
                </Link>
              </li>
              <li>
                <Link href="/en/checker" className="hover:text-white transition-colors">
                  IATA Crate Calculator
                </Link>
              </li>
              <li>
                <a
                  href="https://visareadynow.com"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-white transition-colors"
                >
                  Passport &amp; Visa Photos (VisaReadyNow)
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:support@pawvalid.online" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/en/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/en/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/en/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay informed newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-1">
              Stay informed
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get the latest travel tips and regulation updates.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-1.5 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white text-zinc-900 placeholder:text-zinc-400 rounded-lg px-3 py-2 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold shrink-0 transition-colors"
              >
                {subscribed ? 'Joined!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Separate Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="text-center sm:text-left">
            © 2026 PawValid. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            <Link href="/en/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-zinc-600">•</span>
            <Link href="/en/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-zinc-600">•</span>
            <Link href="/en/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
            <span className="text-zinc-600">•</span>
            <Link href="/en/privacy" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
