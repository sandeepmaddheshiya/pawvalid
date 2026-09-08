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

  const comparisonFeatures = [
    { name: 'Document extraction & scan', free: true, plan19: true, plan59: true },
    { name: 'Route & destination analysis', free: true, plan19: true, plan59: true },
    { name: 'Readiness & blocker detection', free: true, plan19: true, plan59: true },
    { name: 'Travel dossier (PDF)', free: 'Preliminary', plan19: 'Comprehensive', plan59: 'Comprehensive' },
    { name: 'Interactive checklist', free: true, plan19: true, plan59: true },
    { name: 'Digital QR travel pass', free: false, plan19: true, plan59: true },
    { name: 'Secure document vault (Trip reuse)', free: false, plan19: true, plan59: true },
    { name: 'Automated deadline reminders', free: false, plan19: true, plan59: true },
    { name: 'Printable pet travel card', free: false, plan19: true, plan59: true },
    { name: 'Human document review', free: false, plan19: false, plan59: true },
    { name: 'Expert-reviewed seal', free: false, plan19: false, plan59: true },
    { name: 'Priority turnaround', free: false, plan19: false, plan59: '24 hours' },
    { name: 'Priority WhatsApp support', free: false, plan19: false, plan59: true },
    { name: 'Complex-route review', free: false, plan19: false, plan59: true },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white border-t border-zinc-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider mb-3">
            SIMPLE, TRANSPARENT PRICING
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E2342] tracking-tight">
            Choose the right plan for your journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
            We organize, check, and explain your pet&apos;s travel requirements — so you know whether your pet&apos;s travel documents have potential compliance issues before departure.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto text-left">
          {/* ─── CARD 1: READINESS SCAN (£0) ────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-all">
            <div>
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Readiness Scan
                  </h3>
                  <p className="text-[11px] text-zinc-400 italic">
                    &ldquo;What&apos;s wrong?&rdquo;
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="my-5 pb-4 border-b border-zinc-100">
                <span className="font-sans text-3xl sm:text-4xl font-black text-[#0E2342]">
                  £0
                </span>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Find out what&apos;s missing
                </p>
              </div>

              {/* Feature Bullets (Clean & Punchy) */}
              <div className="space-y-2.5 text-xs text-zinc-600 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Document scanning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Route analysis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Readiness check</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Preliminary dossier</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Regulatory checklist</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => handleOpenPlan('Readiness Scan')}
              className="w-full py-2.5 rounded-xl border border-zinc-300 hover:border-zinc-400 text-zinc-800 font-semibold text-xs transition-all active:scale-98 cursor-pointer text-center"
            >
              Check My Pet — Free →
            </button>
          </div>

          {/* ─── CARD 2: COMPLETE TRAVEL PLAN (£19) [MOST POPULAR] ───────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0FA958] shadow-2xl md:-translate-y-2 md:scale-[1.03] z-10 flex flex-col justify-between relative ring-4 ring-[#0FA958]/15">
            {/* Most Popular Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0FA958] text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>MOST POPULAR</span>
            </div>

            <div>
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-2 pt-1">
                <div className="w-9 h-9 rounded-xl bg-[#E8F8F0] flex items-center justify-center text-[#0FA958]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Complete Travel Plan
                  </h3>
                  <p className="text-[11px] text-zinc-400 italic">
                    &ldquo;What do I need to do?&rdquo;
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="my-5 pb-4 border-b border-zinc-100">
                <span className="font-sans text-3xl sm:text-4xl font-black text-[#0E2342]">
                  £19
                </span>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Everything you need to prepare your pet&apos;s journey
                </p>
              </div>

              {/* Feature Bullets (Clean & Punchy) */}
              <div className="space-y-2.5 text-xs text-zinc-700 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span className="font-medium text-zinc-500">Everything in Readiness Scan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span className="font-semibold text-zinc-900">Complete route checklist</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span className="font-semibold text-zinc-900">Travel timeline</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span className="font-semibold text-zinc-900">Digital QR travel pass</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span className="font-semibold text-zinc-900">Document vault (Trip reuse)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Automated reminders</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Printable travel card</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0FA958] font-bold text-xs">✓</span>
                  <span>Comprehensive travel dossier</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => handleOpenPlan('Complete Travel Plan')}
              className="w-full py-3 rounded-xl bg-[#0FA958] hover:bg-[#0D934C] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer text-center"
            >
              Get Complete Plan — £19 →
            </button>
          </div>

          {/* ─── CARD 3: PRIORITY EXPERT REVIEW (£59) ─────────────────────── */}
          <div className="bg-[#0D2040] text-white rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between border border-white/10">
            <div>
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    Priority Expert Review
                  </h3>
                  <p className="text-[11px] text-zinc-300 italic">
                    &ldquo;Please have a human check it for me.&rdquo;
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="my-5 pb-4 border-b border-white/10">
                <span className="font-sans text-3xl sm:text-4xl font-black text-white">
                  £59
                </span>
                <p className="text-[11px] text-zinc-300 mt-0.5">
                  Have a human specialist check your paperwork
                </p>
              </div>

              {/* Feature Bullets (Clean & Punchy) */}
              <div className="space-y-2.5 text-xs text-zinc-200 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span className="font-medium text-zinc-400">Everything in £19</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span className="font-semibold text-white">Human document review</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span className="font-semibold text-white">Expert-reviewed seal</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span>24-hour priority review</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span>WhatsApp support</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold text-xs">✓</span>
                  <span>Complex-route review</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => handleOpenPlan('Priority Expert Review')}
              className="w-full py-2.5 rounded-xl bg-[#183664] hover:bg-[#1E437C] text-white border border-white/20 font-bold text-xs shadow-xs transition-all active:scale-98 cursor-pointer text-center"
            >
              Get Priority Review — £59 →
            </button>
          </div>
        </div>

        {/* ─── SIMPLIFIED 14-FEATURE COMPARISON MATRIX ─────────────────── */}
        <div className="mt-16 sm:mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342]">
              Compare Plan Features
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Clear, transparent comparison across all three tiers
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-zinc-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/80">
                  <th className="py-3.5 px-4 sm:px-6 font-bold text-zinc-700">Feature</th>
                  <th className="py-3.5 px-3 text-center font-bold text-zinc-700">
                    £0 Readiness Scan
                  </th>
                  <th className="py-3.5 px-3 text-center font-bold text-[#0FA958] bg-[#E8F8F0]/50">
                    £19 Complete Plan ⭐
                  </th>
                  <th className="py-3.5 px-3 text-center font-bold text-[#0E2342]">
                    £59 Priority Review
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {comparisonFeatures.map((row, idx) => (
                  <tr
                    key={row.name}
                    className={idx % 2 === 1 ? 'bg-zinc-50/40 hover:bg-zinc-50' : 'hover:bg-zinc-50'}
                  >
                    <td className="py-3 px-4 sm:px-6 font-medium text-zinc-800">
                      {row.name}
                    </td>
                    <td className="py-3 px-3 text-center text-zinc-500">
                      {typeof row.free === 'string' ? (
                        <span className="text-zinc-600 font-medium text-[11px]">{row.free}</span>
                      ) : row.free ? (
                        <span className="text-[#0FA958] font-bold text-sm">✓</span>
                      ) : (
                        <span className="text-zinc-300 font-bold">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center text-zinc-700 bg-[#E8F8F0]/30 font-semibold">
                      {typeof row.plan19 === 'string' ? (
                        <span className="text-[#0FA958] font-bold text-[11px]">{row.plan19}</span>
                      ) : row.plan19 ? (
                        <span className="text-[#0FA958] font-bold text-sm">✓</span>
                      ) : (
                        <span className="text-zinc-300 font-bold">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center text-zinc-700 font-semibold">
                      {typeof row.plan59 === 'string' && row.plan59 !== 'Comprehensive' ? (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[11px]">
                          {row.plan59}
                        </span>
                      ) : typeof row.plan59 === 'string' ? (
                        <span className="text-zinc-800 font-bold text-[11px]">{row.plan59}</span>
                      ) : row.plan59 ? (
                        <span className="text-[#0FA958] font-bold text-sm">✓</span>
                      ) : (
                        <span className="text-zinc-300 font-bold">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
