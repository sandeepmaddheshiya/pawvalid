'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<{ email: string; petName?: string } | null>(null);

  useEffect(() => {
    try {
      const cached = localStorage.getItem('petvia_active_trip');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.userEmail) {
          setActiveUser({ email: parsed.userEmail, petName: parsed.petName });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Do not render marketing header on dashboard pages (dashboard has its own DashboardHeader)
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  const handleSignOut = () => {
    try {
      localStorage.removeItem('petvia_active_trip');
      localStorage.removeItem('petvia_user_email');
    } catch {
      // ignore
    }
    setActiveUser(null);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* ─── TOP ANNOUNCEMENT & TRUST BAR (matching reference) ──── */}
      <div className="w-full bg-[#08162A] text-zinc-300 border-b border-white/10 text-[10px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 sm:h-9 flex items-center justify-between gap-2">
          {/* Left / Center: Shield + Verification Statement */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden min-w-0">
            <svg className="w-3.5 h-3.5 text-[#0FA958] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-medium tracking-wide truncate text-zinc-300">
              Independent Pet Travel Service <span className="text-zinc-500 mx-1">•</span> Verified Against Official Government Rules
            </span>
          </div>

          {/* Right: Language Switcher + Help Center */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher variant="topbar" />
            <span className="text-zinc-600 text-xs hidden sm:inline">|</span>
            <Link
              href="#faqs"
              className="hidden sm:inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-colors text-[10px] sm:text-[11px]"
            >
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help Center</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── MAIN NAVBAR ─────────────────────────────────────────── */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-zinc-600">
            <Link
              href="/"
              className="hover:text-zinc-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-zinc-900 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/en/pet-travel"
              className="hover:text-zinc-900 transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="#pricing"
              className="hover:text-zinc-900 transition-colors"
            >
              Pricing
            </Link>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onMouseEnter={() => setResourcesOpen(true)}
                className="flex items-center gap-1 hover:text-zinc-900 transition-colors focus:outline-none"
              >
                <span>Resources</span>
                <svg
                  className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
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
                    href="#pet-passport"
                    className="block px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                  >
                    🪪 Digital Pet Passport
                  </Link>
                  <Link
                    href="#customs-qr"
                    className="block px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                  >
                    📱 Digital Verification Pass
                  </Link>
                  <Link
                    href="/verify/PV-2026-UKDE-9842"
                    className="block px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                  >
                    🛂 Live Travel Verification Pass
                  </Link>
                  <div className="my-1 border-t border-zinc-100" />
                  <Link
                    href="/en/pet-travel/usa-to-germany"
                    className="block px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                  >
                    Sample Report (Germany)
                  </Link>
                  <Link
                    href="/en/pet-travel"
                    className="block px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                  >
                    Country Requirements
                  </Link>
                  <Link
                    href="/en/checker"
                    className="block px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                  >
                    Airline Policies Guide
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="#about"
              className="hover:text-zinc-900 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Persistent Primary CTA matching reference */}
            <Link
              href="#scanner"
              className="bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-xs hover:shadow active:scale-98 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Check Requirements →</span>
            </Link>

            {activeUser ? (
              <div
                className="relative"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                {/* Profile Trigger Button */}
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-zinc-200/90 hover:border-emerald-500 bg-white hover:bg-zinc-50 transition-all cursor-pointer shadow-2xs"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {activeUser.email.charAt(0).toUpperCase()}
                  </div>
                  <svg
                    className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${
                      userDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu on Hover */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-zinc-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {/* User Header */}
                    <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/60 rounded-t-2xl">
                      <p className="text-xs font-bold text-zinc-900 truncate">
                        {activeUser.email}
                      </p>
                      {activeUser.petName && (
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          Traveling pet: <strong className="text-emerald-700">{activeUser.petName}</strong>
                        </p>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        <span className="text-base">📊</span>
                        <div>
                          <p className="leading-tight">Dashboard</p>
                          <p className="text-[10px] text-zinc-400 font-normal">Command center &amp; timeline</p>
                        </div>
                      </Link>

                      <Link
                        href="/dashboard?tab=overview"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        <span className="text-base">⚙️</span>
                        <div>
                          <p className="leading-tight">Settings</p>
                          <p className="text-[10px] text-zinc-400 font-normal">Trip &amp; account preferences</p>
                        </div>
                      </Link>
                    </div>

                    <div className="border-t border-zinc-100 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleSignOut();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <span className="text-base">🚪</span>
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition-colors px-2 py-1"
              >
                Log in
              </Link>
            )}
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
              {activeUser ? (
                <>
                  <div className="px-3 py-2.5 text-xs font-bold text-zinc-700 bg-zinc-50 border border-zinc-200/70 rounded-xl flex items-center justify-between">
                    <span>🐾 Logged in:</span>
                    <span className="font-mono text-zinc-900 truncate max-w-[160px]">{activeUser.email}</span>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-3 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 flex items-center gap-2"
                  >
                    <span>📊</span>
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard?tab=overview"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-3 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-100 flex items-center gap-2"
                  >
                    <span>⚙️</span>
                    <span>Settings</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-center py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>🚪</span>
                    <span>Log out</span>
                  </button>
                </>
              ) : (

                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 rounded-lg"
                  >
                    Log in / Register
                  </Link>
                  <Link
                    href="/en/checker"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow-xs"
                  >
                    Check Requirements →
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}

