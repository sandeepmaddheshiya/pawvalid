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
                    className="flex items-center gap-2 px-3.5 py-2 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <span>Digital Pet Passport</span>
                  </Link>
                  <Link
                    href="#customs-qr"
                    className="flex items-center gap-2 px-3.5 py-2 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    <span>Digital Verification Pass</span>
                  </Link>
                  <Link
                    href="/verify/PV-2026-UKDE-9842"
                    className="flex items-center gap-2 px-3.5 py-2 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span>Live Travel Verification Pass</span>
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
                  id="user-profile-menu-button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-zinc-200/90 hover:border-zinc-300 bg-white hover:bg-zinc-50/80 transition-all cursor-pointer shadow-2xs group"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0E2342] text-white font-semibold text-xs flex items-center justify-center tracking-tight shadow-xs">
                    {activeUser.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-zinc-700 group-hover:text-zinc-900 max-w-[120px] truncate hidden sm:inline">
                    {activeUser.petName || activeUser.email.split('@')[0]}
                  </span>
                  <svg
                    className={`w-3 h-3 text-zinc-400 group-hover:text-zinc-600 transition-transform duration-200 ${
                      userDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu on Hover */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-zinc-200/90 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {/* User Identity Header */}
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 mb-1">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#0E2342] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {activeUser.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-zinc-900 truncate leading-tight">
                            {activeUser.email}
                          </p>
                          {activeUser.petName ? (
                            <p className="text-[11px] text-zinc-500 mt-0.5 truncate flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                              <span>Traveling pet: <strong className="font-semibold text-zinc-800">{activeUser.petName}</strong></span>
                            </p>
                          ) : (
                            <p className="text-[11px] text-zinc-400 mt-0.5">Petvia Traveler</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="py-0.5 space-y-0.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-zinc-100 group-hover:bg-white group-hover:shadow-2xs flex items-center justify-center text-zinc-500 group-hover:text-zinc-900 transition-all shrink-0">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-zinc-800 group-hover:text-zinc-950 leading-tight">Dashboard</p>
                          <p className="text-[10px] text-zinc-400 group-hover:text-zinc-500">Command center &amp; timeline</p>
                        </div>
                      </Link>

                      <Link
                        href="/dashboard?tab=overview"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-zinc-100 group-hover:bg-white group-hover:shadow-2xs flex items-center justify-center text-zinc-500 group-hover:text-zinc-900 transition-all shrink-0">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-zinc-800 group-hover:text-zinc-950 leading-tight">Trip Settings</p>
                          <p className="text-[10px] text-zinc-400 group-hover:text-zinc-500">Route details &amp; preferences</p>
                        </div>
                      </Link>
                    </div>

                    <div className="border-t border-zinc-100 pt-1 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleSignOut();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer group text-left"
                      >
                        <div className="w-7 h-7 rounded-lg bg-zinc-100 group-hover:bg-red-100/60 flex items-center justify-center text-zinc-400 group-hover:text-red-600 transition-all shrink-0">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold">Log out</span>
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
                  <div className="px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-[#0E2342] text-white font-semibold text-[11px] flex items-center justify-center shrink-0">
                        {activeUser.email.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-medium text-zinc-900 truncate">{activeUser.email}</span>
                    </div>
                    {activeUser.petName && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                        {activeUser.petName}
                      </span>
                    )}
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-zinc-800 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/60 flex items-center gap-2.5 transition-colors"
                  >
                    <svg className="w-4 h-4 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard?tab=overview"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-100 flex items-center gap-2.5 transition-colors"
                  >
                    <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                    <span>Trip Settings</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full py-2 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
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

