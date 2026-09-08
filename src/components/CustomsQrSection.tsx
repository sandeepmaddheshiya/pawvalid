'use client';

import React from 'react';
import Link from 'next/link';
import QrCode from '@/components/QrCode';

export default function CustomsQrSection() {
  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/verify/PV-2026-UKDE-9842`
    : 'https://petvia.com/verify/PV-2026-UKDE-9842';

  return (
    <section id="customs-qr" className="py-16 sm:py-20 bg-[#F8FAFB] border-b border-zinc-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Interactive Digital Travel Pass & Live QR Code */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-zinc-200/80 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0E2342] text-white flex items-center justify-center text-lg">
                    🛂
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                      TRAVEL VERIFICATION PASS
                    </div>
                    <div className="text-sm font-bold text-[#0E2342]">
                      Digital Travel Pass
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0FA958] bg-[#E8F8F0] border border-[#C6EED8] px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA958] animate-pulse" />
                  TRAVEL-READY
                </span>
              </div>

              {/* Route Summary */}
              <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-100 mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-semibold">Origin</div>
                  <div className="text-xs font-bold text-[#0E2342]">🇬🇧 London (LHR)</div>
                </div>
                <div className="text-zinc-400 text-sm font-bold">➔</div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-semibold">Destination</div>
                  <div className="text-xs font-bold text-[#0E2342]">🇩🇪 Frankfurt (FRA)</div>
                </div>
              </div>

              {/* Center: Live Scannable QR Code */}
              <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60 mb-4">
                <div className="p-2 bg-white rounded-xl shadow-xs border border-zinc-200/80 mb-2">
                  <QrCode
                    value={verificationUrl}
                    size={160}
                    darkColor="#0E2342"
                    alt="Scan Digital Travel Verification Pass with your smartphone camera"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-[#0E2342]">
                    Scan with any phone camera
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                    PASS ID: PV-2026-UKDE-9842
                  </div>
                </div>
              </div>

              {/* Pet Details Footer */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-zinc-100">
                <div>
                  <span className="text-zinc-400">Pet Traveler: </span>
                  <span className="font-semibold text-zinc-800">Bailey (Dog)</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-400">Microchip: </span>
                  <span className="font-mono font-semibold text-zinc-800">...2847192</span>
                </div>
              </div>

              {/* Test Scan Link */}
              <div className="mt-4 pt-3 border-t border-zinc-100 text-center">
                <Link
                  href="/verify/PV-2026-UKDE-9842"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E2342] hover:text-[#0FA958] transition-colors"
                >
                  <span>Open Live Verification Pass Page ↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-1.5 bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <span>📱</span>
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
