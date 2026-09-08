'use client';

import React, { useState } from 'react';
import PricingModal from './PricingModal';

export default function PricingSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('Complete Travel Plan');

  const handleOpenPlan = (tier: string) => {
    setSelectedTier(tier);
    setModalOpen(true);
  };

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-white border-t border-zinc-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider mb-3">
            SIMPLE, TRANSPARENT PRICING
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E2342] tracking-tight">
            Choose the right plan for your journey
          </h2>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto text-left">
          {/* ─── CARD 1: READINESS SCAN (£0) ────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-all">
            <div>
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 text-xs">
                  👤
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Readiness Scan
                  </h3>
                  <p className="text-[11px] text-zinc-400 italic">
                    &ldquo;Do I have a problem?&rdquo;
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="my-5 pb-4 border-b border-zinc-100">
                <span className="font-sans text-3xl sm:text-4xl font-black text-[#0E2342]">
                  £0
                </span>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Quick check • No commitment
                </p>
              </div>

              {/* Feature Bullets */}
              <div className="space-y-2.5 text-xs text-zinc-600 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Route requirements</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Basic document scan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Major blockers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Basic readiness status</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => handleOpenPlan('Readiness Scan')}
              className="w-full py-2.5 rounded-lg border border-zinc-300 hover:border-zinc-400 text-zinc-800 font-semibold text-xs transition-all active:scale-98 cursor-pointer text-center"
            >
              Get started →
            </button>
          </div>

          {/* ─── CARD 2: COMPLETE TRAVEL PLAN (£19) [MOST POPULAR] ───────── */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#0FA958] shadow-md flex flex-col justify-between relative">
            {/* Most Popular Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0FA958] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
              MOST POPULAR
            </div>

            <div>
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-2 pt-1">
                <div className="w-8 h-8 rounded-full bg-[#E8F8F0] flex items-center justify-center text-[#0FA958] text-xs">
                  📋
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Complete Travel Plan
                  </h3>
                  <p className="text-[11px] text-zinc-400 italic">
                    &ldquo;What exactly do I need to do?&rdquo;
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="my-5 pb-4 border-b border-zinc-100">
                <span className="font-sans text-3xl sm:text-4xl font-black text-[#0E2342]">
                  £19
                </span>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Full analysis • Detailed guidance
                </p>
              </div>

              {/* Feature Bullets */}
              <div className="space-y-2.5 text-xs text-zinc-700 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span className="font-semibold text-zinc-900">Pet Visa QR Code for Customs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span className="font-semibold text-zinc-900">Digital Pet Passport Vault (Trip Reuse)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Full document analysis &amp; audit</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Timeline &amp; earliest travel date</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Printable travel dossier (PDF)</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => handleOpenPlan('Complete Travel Plan')}
              className="w-full py-2.5 rounded-lg bg-[#0FA958] hover:bg-[#0D934C] text-white font-semibold text-xs shadow-xs transition-all active:scale-98 cursor-pointer text-center"
            >
              Get started →
            </button>
          </div>

          {/* ─── CARD 3: EXPERT DOCUMENT REVIEW (£59) ────────────────────── */}
          <div className="bg-[#0D2040] text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
            <div>
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                  🛡️
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    Expert Document Review
                  </h3>
                  <p className="text-[11px] text-zinc-300 italic">
                    &ldquo;I don&apos;t want to figure this out myself.&rdquo;
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="my-5 pb-4 border-b border-white/10">
                <span className="font-sans text-3xl sm:text-4xl font-black text-white">
                  £59
                </span>
                <p className="text-[11px] text-zinc-300 mt-0.5">
                  Human review • Peace of mind
                </p>
              </div>

              {/* Feature Bullets */}
              <div className="space-y-2.5 text-xs text-zinc-200 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span className="font-semibold text-white">Everything in Complete Travel Plan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span className="font-semibold text-white">Pet Visa QR with Vet Specialist Seal</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span>Human veterinary audit &amp; sign-off</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span>Complex/conflicting documents check</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span>Personalized recommendations &amp; WhatsApp</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => handleOpenPlan('Expert Document Review')}
              className="w-full py-2.5 rounded-lg bg-[#183664] hover:bg-[#1E437C] text-white border border-white/20 font-semibold text-xs shadow-xs transition-all active:scale-98 cursor-pointer text-center"
            >
              Get started →
            </button>
          </div>
        </div>
      </div>

      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTier={selectedTier}
      />
    </section>
  );
}
