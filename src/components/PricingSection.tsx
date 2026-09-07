'use client';

import React, { useState } from 'react';
import PricingModal from './PricingModal';

export default function PricingSection() {
  const [selectedCurrency, setSelectedCurrency] = useState<'GBP' | 'USD' | 'INR'>('GBP');
  const [modalOpen, setModalOpen] = useState(false);

  const prices = {
    GBP: { free: '£0', pass: '£19', concierge: '£59' },
    USD: { free: '$0', pass: '$24', concierge: '$79' },
    INR: { free: '₹0', pass: '₹1,499', concierge: '₹4,999' },
  }[selectedCurrency];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#FAFCFB] border-t border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Currency Switcher */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex p-1 rounded-xl bg-white border border-zinc-200 shadow-2xs text-xs font-bold">
            {(['GBP', 'USD', 'INR'] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setSelectedCurrency(curr)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedCurrency === curr ? 'bg-amber-400 text-zinc-950 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {curr === 'GBP' ? '£ GBP' : curr === 'USD' ? '$ USD' : '₹ INR'}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            Transparent Pricing for Worry-Free Pet Travel
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600">
            Choose the level of compliance verification and expert support that matches your journey.
          </p>
        </div>

        {/* 3 Pricing Cards matching Petvia Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* ─── TIER 1: FREE READINESS SCAN ────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm flex flex-col justify-between relative hover:border-zinc-300 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-xl font-black text-zinc-900">Readiness Scan</h3>
                <span className="inline-flex px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold">
                  Free Forever
                </span>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl sm:text-5xl font-black text-zinc-900">
                  {prices.free}
                </span>
                <p className="text-xs text-zinc-400 mt-1">No credit card required</p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer mb-6"
              >
                Start Free Scan
              </button>

              <div className="space-y-3.5 text-xs text-zinc-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">AI Document Extraction</strong>
                    <span className="text-zinc-500">Instant scan of microchips, rabies dates, and core vaccines</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">High-Level Route Readiness</strong>
                    <span className="text-zinc-500">Timeline readiness status (≤1 day, ~2 weeks, ~1 month, ~3 months)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Missing Requirements Overview</strong>
                    <span className="text-zinc-500">Identifies missing documents and short-lead items</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── TIER 2: CERTIFIED TRIP PASS ─────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-md flex flex-col justify-between relative ring-2 ring-emerald-100 hover:shadow-lg transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-xl font-black text-zinc-900">Certified Trip Pass</h3>
                <span className="inline-flex px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                  Most Popular
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl font-black text-zinc-900">
                    {prices.pass}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">One-time payment per trip</p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer mb-6"
              >
                Get Certified Trip Pass
              </button>

              <div className="space-y-3.5 text-xs text-zinc-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Full Dual-Sided Compliance Report</strong>
                    <span className="text-zinc-500">Leaving (export) and Arriving (import) rules evaluated</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Verified Official Legal Citations</strong>
                    <span className="text-zinc-500">Direct source links to USDA, DAFF, DEFRA, and EU legislation</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Chronological Action Countdown</strong>
                    <span className="text-zinc-500">Prioritized checklist sorted by regulatory lead time</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Printable Travel Dossier (PDF)</strong>
                    <span className="text-zinc-500">Dated compliance snapshot for airlines &amp; border officials</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Carrier &amp; Crate Sizing Guide</strong>
                    <span className="text-zinc-500">IATA Live Animal Regulations requirements for your breed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── TIER 3: PRIORITY CONCIERGE ──────────────────────────────── */}
          <div className="bg-[#18181B] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative border border-zinc-800 hover:border-amber-400/40 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-xl font-black text-white">Priority Concierge</h3>
                <span className="inline-flex px-2.5 py-1 rounded-md bg-amber-400 text-zinc-950 text-[11px] font-extrabold">
                  Expert Review
                </span>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl sm:text-5xl font-black text-amber-400">
                  {prices.concierge}
                </span>
                <p className="text-xs text-zinc-400 mt-1">One-time payment • Dedicated support</p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-105 text-zinc-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer mb-6"
              >
                Get Priority Concierge
              </button>

              <div className="space-y-3.5 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-amber-400/30">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-amber-300 font-bold">1-on-1 Pre-Flight Document Review</strong>
                    <span className="text-zinc-300">Human specialist double-checks all stamps &amp; paperwork</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-white">Everything in Certified Trip Pass</strong>
                    <span className="text-zinc-400">PDF report, source links, and countdown plan</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-white">Real-Time Travel Day Support</strong>
                    <span className="text-zinc-400">Direct assistance if customs or airlines have questions</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-white">Official Government Form Fill Templates</strong>
                    <span className="text-zinc-400">Sample filled certificates and declaration templates</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-white">Guaranteed 24-Hour Review Turnaround</strong>
                    <span className="text-zinc-400">Fast-tracked for urgent departures</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PricingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} currency={selectedCurrency} />
    </section>
  );
}
