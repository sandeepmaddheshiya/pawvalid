'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DigitalPetPassportSection() {
  const [activeTab, setActiveTab] = useState<'id' | 'vaccines' | 'vault'>('id');

  return (
    <section id="pet-passport" className="py-16 sm:py-20 bg-white border-b border-zinc-200/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Feature Description & 4 Pillars */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <svg className="w-3.5 h-3.5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.169.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.337 0z" />
              </svg>
              <span>Digital Pet Passport</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0E2342] leading-[1.15]">
              Scan your pet&apos;s documents once, save their profile, and reuse it for every trip
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
              With personalized compliance built in — your pet&apos;s microchip number, rabies immunization dates, and titer titers are securely stored and automatically checked against any destination in seconds.
            </p>

            {/* 4 Feature Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* 1. Scan once */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 hover:border-zinc-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-base mb-2.5 border border-emerald-200/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#0E2342] mb-1">
                  Scan Once, Travel Forever
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Upload vaccination cards and lab records once. Never re-upload the same document.
                </p>
              </div>

              {/* 2. Reusable across routes */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 hover:border-zinc-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-base mb-2.5 border border-blue-200/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#0E2342] mb-1">
                  Multi-Route Reusability
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Planning UK ➔ Germany today and Japan next year? Instant recalculation in 1 click.
                </p>
              </div>

              {/* 3. Built-in compliance */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 hover:border-zinc-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-base mb-2.5 border border-amber-200/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#0E2342] mb-1">
                  Personalized Compliance
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Auto-evaluates microchip standard (ISO 11784), rabies latency, and titer titers.
                </p>
              </div>

              {/* 4. Document Vault */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 hover:border-zinc-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-base mb-2.5 border border-purple-200/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#0E2342] mb-1">
                  Universal Health Vault
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Keep EU pet passports, USDA 7001 forms, and vet sign-offs in one encrypted pass.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/dashboard?tab=vault"
                className="inline-flex items-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-all"
              >
                <span>Open Digital Pet Passport Vault →</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Digital Passport Card (Clean Light Enterprise Aesthetic) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-zinc-200/90 text-left space-y-5 relative">
              {/* Passport Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800 shrink-0">
                    <svg className="w-4 h-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.169.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.337 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                      OFFICIAL DIGITAL PET PASSPORT
                    </div>
                    <div className="text-xs font-mono font-bold text-zinc-900">
                      DOC ID: PV-GB-984201
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  ACTIVE PROFILE
                </span>
              </div>

              {/* Passport Navigation Tabs - Clean Segmented Control */}
              <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('id')}
                  className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === 'id'
                      ? 'bg-white text-zinc-900 shadow-2xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Identity &amp; Chip
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('vaccines')}
                  className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === 'vaccines'
                      ? 'bg-white text-zinc-900 shadow-2xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Vaccines &amp; Titer
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('vault')}
                  className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === 'vault'
                      ? 'bg-white text-zinc-900 shadow-2xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Document Vault
                </button>
              </div>

              {/* Tab 1: Identity & Microchip */}
              {activeTab === 'id' && (
                <div className="space-y-3.5">
                  {/* Photo & Name */}
                  <div className="flex items-center gap-3.5 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200/70">
                    <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                      <svg className="w-7 h-7 text-amber-700" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="7" cy="8.5" r="2" />
                        <circle cx="17" cy="8.5" r="2" />
                        <circle cx="10" cy="5" r="1.8" />
                        <circle cx="14" cy="5" r="1.8" />
                        <path d="M12 10.5c-2.4 0-4.5 1.8-4.5 4.2 0 1.9 1.4 3.3 4.5 3.3s4.5-1.4 4.5-3.3c0-2.4-2.1-4.2-4.5-4.2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-bold text-zinc-900 tracking-tight">Bailey</div>
                      <div className="text-xs text-zinc-500">Golden Retriever • 3 yrs • 28.5 kg</div>
                      <div className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1.5">
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 border border-blue-200">UK</span>
                        <span>Resident of United Kingdom · ISO 11784</span>
                      </div>
                    </div>
                  </div>

                  {/* Microchip Specs */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200/70 space-y-0.5">
                      <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider block">
                        ISO Microchip #
                      </span>
                      <div className="font-mono font-bold text-zinc-900 text-xs">
                        985141002847192
                      </div>
                      <span className="text-emerald-700 text-[10px] font-medium block">
                        ✓ 15-digit FDX-B Standard
                      </span>
                    </div>

                    <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200/70 space-y-0.5">
                      <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider block">
                        Implantation Date
                      </span>
                      <div className="font-bold text-zinc-900 text-xs">
                        12 Apr 2023
                      </div>
                      <span className="text-emerald-700 text-[10px] font-medium block">
                        ✓ Prior to Vaccination
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Vaccines & Titer */}
              {activeTab === 'vaccines' && (
                <div className="space-y-3">
                  <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900">Rabies 3-Year Booster</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        ✓ ACTIVE
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-600 flex justify-between">
                      <span>Given: 10 May 2024</span>
                      <span>Expires: 10 May 2027</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono">
                      Manufacturer: Nobivac Rabies (Lot #4812B)
                    </div>
                  </div>

                  <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900">FAVN Rabies Titer Lab Test</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        ✓ 0.85 IU/ml
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-600 flex justify-between">
                      <span>Threshold: ≥ 0.50 IU/ml (Passed)</span>
                      <span>Lab: APHA Weybridge</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono">
                      Certified Blood Serum Neutralization
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Document Vault */}
              {activeTab === 'vault' && (
                <div className="space-y-2.5">
                  <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-semibold text-zinc-800 truncate">EU_Pet_Passport_Scan.pdf</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      Verified ✓
                    </span>
                  </div>

                  <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-semibold text-zinc-800 truncate">Rabies_Titer_Certificate.pdf</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      Verified ✓
                    </span>
                  </div>

                  <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-semibold text-zinc-800 truncate">Microchip_Registration.pdf</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      Verified ✓
                    </span>
                  </div>
                </div>
              )}

              {/* Reuse for new trip banner */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-500">Ready for next journey?</span>
                <Link
                  href="/en/checker?from=GB&to=DE&species=DOG"
                  className="font-bold text-[#0FA958] hover:text-[#0D8E4A] transition-colors"
                >
                  Plan New Trip with Bailey →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
