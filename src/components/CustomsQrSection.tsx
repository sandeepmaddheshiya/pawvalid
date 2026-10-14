'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const QrCode = dynamic(() => import('@/components/QrCode'), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center bg-zinc-50 border border-zinc-200 rounded-lg animate-pulse"
      style={{ width: 160, height: 160 }}
    >
      <span className="text-[10px] text-zinc-400">Loading QR...</span>
    </div>
  ),
});

export default function CustomsQrSection() {
  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/verify/PV-2026-UKDE-9842`
    : 'https://pawvalid.online/verify/PV-2026-UKDE-9842';

  return (
    <section id="customs-qr" className="py-16 sm:py-20 bg-[#F8FAFB] border-b border-zinc-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Authentic Digital Boarding Pass & Scannable QR Code */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-md bg-white rounded-3xl border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
              {/* Pass Top Bar */}
              <div className="px-6 pt-6 pb-4 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0E2342] text-white flex items-center justify-center shadow-2xs">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                      PawValid Travel Pass
                    </div>
                    <div className="text-sm font-bold text-[#0E2342]">
                      Digital Border Clearance
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0FA958] bg-[#E8F8F0] border border-[#C6EED8] px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA958] animate-pulse" />
                  TRAVEL-READY
                </span>
              </div>

              {/* Route Strip */}
              <div className="px-6 py-4 bg-zinc-50/70 border-b border-zinc-100">
                <div className="flex items-center justify-between">
                  {/* Origin */}
                  <div>
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Origin</div>
                    <div className="text-base font-bold text-[#0E2342] flex items-center gap-1.5 mt-0.5">
                      <span>🇬🇧</span>
                      <span>LHR</span>
                    </div>
                    <div className="text-[11px] text-zinc-500 font-medium">London, UK</div>
                  </div>

                  {/* Flight/Transit Path Graphic */}
                  <div className="flex flex-col items-center px-2">
                    <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full mb-1">
                      Direct Transit
                    </span>
                    <div className="flex items-center gap-1.5 w-24">
                      <span className="h-px bg-zinc-300 flex-1" />
                      <svg className="w-3.5 h-3.5 text-[#0E2342] rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="h-px bg-zinc-300 flex-1" />
                    </div>
                    <span className="text-[9px] text-zinc-400 mt-0.5">EU Reg 576/2013</span>
                  </div>

                  {/* Destination */}
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Destination</div>
                    <div className="text-base font-bold text-[#0E2342] flex items-center justify-end gap-1.5 mt-0.5">
                      <span>FRA</span>
                      <span>🇩🇪</span>
                    </div>
                    <div className="text-[11px] text-zinc-500 font-medium">Frankfurt, DE</div>
                  </div>
                </div>
              </div>

              {/* Ticket Perforation Divider with Notches */}
              <div className="relative py-1">
                <div className="border-t border-dashed border-zinc-200" />
                {/* Left Ticket Notch */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F8FAFB] rounded-full border-r border-zinc-200/90" />
                {/* Right Ticket Notch */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F8FAFB] rounded-full border-l border-zinc-200/90" />
              </div>

              {/* Scannable Live QR Code Zone */}
              <div className="px-6 py-5 flex flex-col items-center justify-center">
                <div className="relative p-3 bg-white rounded-2xl border border-zinc-200/90 shadow-2xs">
                  {/* Viewfinder Target Corner Brackets */}
                  <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#0FA958] rounded-tl" />
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#0FA958] rounded-tr" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#0FA958] rounded-bl" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#0FA958] rounded-br" />

                  <QrCode
                    value={verificationUrl}
                    size={156}
                    darkColor="#0E2342"
                    alt="Scan Digital Travel Verification Pass with your smartphone camera"
                  />
                </div>

                <div className="text-center mt-3">
                  <div className="inline-flex items-center gap-1.5 bg-zinc-100 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-[#0E2342]">
                    <span>PASS ID:</span>
                    <span>PV-2026-UKDE-9842</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Point phone camera to verify statutory clearance</span>
                  </div>
                </div>
              </div>

              {/* Pet & Document Meta Grid */}
              <div className="px-6 py-3.5 bg-zinc-50/70 border-t border-zinc-100 grid grid-cols-2 gap-3 text-left">
                <div className="space-y-0.5">
                  <div className="text-[10px] uppercase font-bold text-zinc-400">Pet Traveler</div>
                  <div className="text-xs font-bold text-[#0E2342]">Bailey (Dog)</div>
                  <div className="text-[10px] text-zinc-500">Golden Retriever · 4 yrs</div>
                </div>
                <div className="space-y-0.5 text-right">
                  <div className="text-[10px] uppercase font-bold text-zinc-400">Microchip (ISO 11784)</div>
                  <div className="text-xs font-mono font-bold text-[#0E2342]">...2847192</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">15-Digit FDX-B Verified</div>
                </div>
              </div>

              {/* Interactive Pass Page Button */}
              <div className="p-4 border-t border-zinc-100 bg-white">
                <Link
                  href="/verify/PV-2026-UKDE-9842"
                  className="group flex items-center justify-between w-full bg-zinc-50 hover:bg-[#0E2342] text-[#0E2342] hover:text-white px-4 py-2.5 rounded-xl border border-zinc-200/80 hover:border-[#0E2342] text-xs font-semibold transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Open Live Verification Pass Page</span>
                  </span>
                  <span className="font-bold text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-1.5 bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Digital Travel Verification Pass</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0E2342] leading-[1.15]">
              Live travel verification — mobile-friendly readiness summary at your fingertips
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
              Keep your pet&apos;s complete travel documentation organized and accessible. Access a mobile-friendly page summarizing your pet&apos;s travel-readiness status, document checks, and route information for easy reference during the journey.
            </p>

            {/* Feature List */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0E2342]">
                    Fast Check-In Verification
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Gate agents scan the QR code to see verified microchip implantation dates, valid rabies booster windows, and carrier crate specifications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0E2342]">
                    DEFRA, EU &amp; USDA Route Ready
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Formatted according to EU Regulation 576/2013 and international pet transit protocols with cryptographic tamper verification.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0E2342]">
                    Offline &amp; Mobile Friendly
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Save your digital verification pass directly to your phone. Works seamlessly even in transit zones without Wi-Fi.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/verify/PV-2026-UKDE-9842"
                className="inline-flex items-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-all"
              >
                <span>View Live Travel Verification Pass →</span>
              </Link>
              <Link
                href="#scanner"
                className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-700 px-5 py-3 rounded-lg transition-all"
              >
                <span>Check Your Route Requirements</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
