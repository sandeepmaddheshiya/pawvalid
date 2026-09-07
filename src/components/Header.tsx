'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-zinc-700">
            <Link
              href="#how-it-works"
              className="hover:text-emerald-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/en/pet-travel"
              className="hover:text-emerald-600 transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="/en/checker"
              className="hover:text-emerald-600 transition-colors"
            >
              Pricing
            </Link>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onMouseEnter={() => setResourcesOpen(true)}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors focus:outline-none"
              >
                <span>Resources</span>
                <svg
                  className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${
                    resourcesOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {resourcesOpen && (
                <div
                  onMouseLeave={() => setResourcesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-zinc-100 py-2 z-50 animate-fade-in"
                >
                  <Link
                    href="/en/pet-travel/usa-to-germany"
                    className="block px-4 py-2 text-sm text-zinc-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    Sample Report (Germany)
                  </Link>
                  <Link
                    href="/en/pet-travel"
                    className="block px-4 py-2 text-sm text-zinc-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    Country Requirements
                  </Link>
                  <Link
                    href="/en/checker"
                    className="block px-4 py-2 text-sm text-zinc-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    Airline Policies Guide
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="#about"
              className="hover:text-emerald-600 transition-colors"
            >
              About Us
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant="header" />
            <Link
              href="/en/checker"
              className="text-[15px] font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/en/checker"
              className="bg-[#0E1B33] hover:bg-[#16274a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-xs hover:shadow active:scale-98"
            >
              Get My Report
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher variant="header" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-100 animate-fade-in">
            <div className="flex flex-col space-y-3 pb-3">
              <Link
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-zinc-700 hover:bg-zinc-50"
              >
                How It Works
              </Link>
              <Link
                href="/en/pet-travel"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Destinations
              </Link>
              <Link
                href="/en/checker"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Pricing
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-zinc-700 hover:bg-zinc-50"
              >
                About Us
              </Link>
            </div>
            <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
              <Link
                href="/en/checker"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-semibold text-zinc-700"
              >
                Log in
              </Link>
              <Link
                href="/en/checker"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#0E1B33] text-white py-3 rounded-lg font-semibold text-sm shadow-xs"
              >
                Get My Report
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

