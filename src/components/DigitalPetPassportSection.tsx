'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DigitalPetPassportSection() {
  const [activeTab, setActiveTab] = useState<'id' | 'vaccines' | 'vault'>('id');

  return (
    <section id="pet-passport" className="py-16 sm:py-20 bg-white border-b border-zinc-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Feature Description & 4 Pillars */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <span>🪪</span>
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
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-base mb-2">
                  ⚡
                </div>
                <h3 className="text-xs font-bold text-[#0E2342] mb-1">
                  Scan Once, Travel Forever
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Upload vaccination cards and lab records once. Never re-upload the same document.
                </p>
              </div>

              {/* 2. Reusable across routes */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-base mb-2">
                  🔄
                </div>
                <h3 className="text-xs font-bold text-[#0E2342] mb-1">
                  Multi-Route Reusability
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Planning UK ➔ Germany today and Japan next year? Instant recalculation in 1 click.
                </p>
              </div>

              {/* 3. Built-in compliance */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-base mb-2">
                  🎯
                </div>
                <h3 className="text-xs font-bold text-[#0E2342] mb-1">
                  Personalized Compliance
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Auto-evaluates microchip standard (ISO 11784), rabies latency, and titer titers.
                </p>
              </div>

              {/* 4. Document Vault */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-base mb-2">
                  📁
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
                className="inline-flex items-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-all"
              >
                <span>Open Digital Pet Passport Vault →</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Digital Passport Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-gradient-to-br from-[#0E2342] to-[#16345E] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/10 relative overflow-hidden">
              {/* Background watermark badge */}
              <div className="absolute right-4 top-4 opacity-5 pointer-events-none text-9xl font-serif">
                🐾
              </div>

              {/* Passport Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-base">
                    🛂
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#0FA958]">
                      OFFICIAL DIGITAL PET PASSPORT
                    </div>
                    <div className="text-xs text-zinc-300 font-mono">
                      DOC ID: PP-GB-984201
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0FA958] bg-[#0FA958]/20 border border-[#0FA958]/40 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA958]" />
                  ACTIVE PROFILE
                </span>
              </div>

              {/* Passport Navigation Tabs */}
              <div className="flex items-center gap-2 mb-5 bg-white/5 p-1 rounded-xl border border-white/10 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('id')}
                  className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === 'id'
                      ? 'bg-white text-[#0E2342] shadow-xs'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  Identity &amp; Microchip
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('vaccines')}
                  className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === 'vaccines'
                      ? 'bg-white text-[#0E2342] shadow-xs'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  Vaccines &amp; Titer
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('vault')}
                  className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === 'vault'
                      ? 'bg-white text-[#0E2342] shadow-xs'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  Document Vault
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'id' && (
                <div className="space-y-4">
                  {/* Photo & Name */}
                  <div className="flex items-center gap-4 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                    <div className="w-16 h-16 rounded-xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-inner border border-white/20">
                      🐕
                    </div>
                    <div>
                      <div className="text-lg font-bold tracking-tight">Bailey</div>
                      <div className="text-xs text-zinc-300">Golden Retriever • 3 yrs • 28.5 kg</div>
                      <div className="text-[11px] text-[#0FA958] font-medium mt-0.5">
                        🇬🇧 Resident of United Kingdom
                      </div>
                    </div>
                  </div>

                  {/* Microchip Specs */}
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="text-zinc-400 text-[10px]">ISO MICROCHIP #</div>
                      <div className="font-mono font-bold text-white text-xs mt-0.5">
                        985141002847192
                      </div>
                      <div className="text-[#0FA958] text-[10px] mt-0.5">✓ 15-digit FDX-B Standard</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="text-zinc-400 text-[10px]">IMPLANTATION DATE</div>
                      <div className="font-bold text-white text-xs mt-0.5">
                        12 Apr 2023
                      </div>
                      <div className="text-[#0FA958] text-[10px] mt-0.5">✓ Vet Cert Verified</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vaccines' && (
                <div className="space-y-3">
                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white">Rabies 3-Year Booster</div>
                      <span className="text-[10px] font-bold text-[#0FA958] bg-[#0FA958]/20 px-2 py-0.5 rounded">
                        ✓ ACTIVE
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-300 flex justify-between">
                      <span>Given: 10 May 2024</span>
                      <span>Expires: 10 May 2027</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white">FAVN Rabies Titer Lab Test</div>
                      <span className="text-[10px] font-bold text-[#0FA958] bg-[#0FA958]/20 px-2 py-0.5 rounded">
                        ✓ 0.85 IU/ml
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-300 flex justify-between">
                      <span>Threshold: ≥ 0.50 IU/ml</span>
                      <span>Lab: APHA Weybridge</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vault' && (
                <div className="space-y-2.5">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span>📄</span>
                      <span className="font-medium text-white">EU_Pet_Passport_Scan.pdf</span>
                    </div>
                    <span className="text-[10px] text-[#0FA958]">Verified ✓</span>
                  </div>

                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span>📄</span>
                      <span className="font-medium text-white">Rabies_Titer_Certificate.pdf</span>
                    </div>
                    <span className="text-[10px] text-[#0FA958]">Verified ✓</span>
                  </div>

                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span>📄</span>
                      <span className="font-medium text-white">Microchip_Registration.pdf</span>
                    </div>
                    <span className="text-[10px] text-[#0FA958]">Verified ✓</span>
                  </div>
                </div>
              )}

              {/* Reuse for new trip banner */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-[11px] text-zinc-300">
                  Ready for next trip check?
                </div>
                <Link
                  href="/en/checker?from=GB&to=DE&species=DOG"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0FA958] hover:text-white transition-colors"
                >
                  <span>Plan New Trip with Bailey →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
