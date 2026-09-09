'use client';

import React from 'react';
import Link from 'next/link';
import QrCode from '@/components/QrCode';
import type { DashboardTab } from './DashboardSidebar';

interface OverviewViewProps {
  trip: any;
  onNavigate: (tab: DashboardTab) => void;
  onDownloadDossier: () => void;
  isDownloadingDossier: boolean;
}

export default function OverviewView({
  trip,
  onNavigate,
  onDownloadDossier,
  isDownloadingDossier,
}: OverviewViewProps) {
  const stats = trip?.stats || {};
  const route = trip?.route || {};
  const petProfile = trip?.petProfile || {};
  const blockerSummary = stats?.blockerSummary || {
    criticalBlockersCount: 0,
    requiredActionsCount: 0,
    completedVerifiedCount: 0,
  };

  const overallStatus = stats?.overallStatus || 'NOT_READY';
  const statusHeadline = stats?.statusHeadline || 'Compliance Assessment in Progress';
  const earliestFlightDate = stats?.earliestFlightDate || 'Verified upon prerequisite clearance';

  // Calculate days until departure
  let daysUntilDeparture: number | null = null;
  if (route?.departureDate) {
    const depDate = new Date(route.departureDate);
    const now = new Date();
    const diffTime = depDate.getTime() - now.getTime();
    daysUntilDeparture = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const tier = trip?.tier || 'FREE';
  const isPaid = tier === 'CERTIFIED_PASS' || tier === 'CONCIERGE';

  // Deduplicate next steps
  const rawSteps: string[] = trip?.readinessReport?.nextSteps || [
    'Confirm pet microchip ISO 11784/11785 status.',
    'Verify primary rabies 21-day wait period is completed before travel.',
    'Visit veterinarian between 24h and 120h prior to flight for tapeworm treatment.',
    'Assemble all signed documents into waterproof travel folder.',
  ];
  const nextSteps = Array.from(new Set(rawSteps.map((s) => s.trim()))).filter(Boolean);

  const getStepCategory = (step: string) => {
    const lower = step.toLowerCase();
    if (lower.includes('health exam') || lower.includes('vet') || lower.includes('clinical')) {
      return { tag: 'Clinical Vet Step', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
    }
    if (lower.includes('airline') || lower.includes('flight') || lower.includes('notice')) {
      return { tag: 'Carrier / Airline', color: 'bg-blue-50 text-blue-800 border-blue-200' };
    }
    if (lower.includes('critical') || lower.includes('rabies') || lower.includes('titer')) {
      return { tag: 'Statutory Quarantine', color: 'bg-amber-50 text-amber-800 border-amber-200' };
    }
    return { tag: 'Documentation', color: 'bg-zinc-100 text-zinc-700 border-zinc-200' };
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      {/* ─── 1. EXECUTIVE TRAVEL ITINERARY HERO ─────────────────────── */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden">
        {/* Main Itinerary Header */}
        <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3.5">
            {/* Identity line */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#0E2342] text-white flex items-center justify-center shadow-xs">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="7" cy="8.5" r="2" />
                  <circle cx="17" cy="8.5" r="2" />
                  <circle cx="10" cy="5" r="1.8" />
                  <circle cx="14" cy="5" r="1.8" />
                  <path d="M12 10.5c-2.4 0-4.5 1.8-4.5 4.2 0 1.9 1.4 3.3 4.5 3.3s4.5-1.4 4.5-3.3c0-2.4-2.1-4.2-4.5-4.2z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight">
                    {trip?.petName}&apos;s Travel Itinerary
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200/60">
                    {petProfile?.breed || 'Companion Animal'}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  ISO Transponder:{' '}
                  <span className="font-mono font-bold text-zinc-800">
                    {petProfile?.microchipNumber || '985112003456789'}
                  </span>
                </p>
              </div>
            </div>

            {/* Flight Route Ticket Path */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-0.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-900 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#0FA958]" />
                <span>{trip?.origin}</span>
              </div>

              <div className="flex items-center gap-1 text-zinc-300">
                <span className="w-3 h-px bg-zinc-300" />
                <svg className="w-3.5 h-3.5 text-zinc-400 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span className="w-3 h-px bg-zinc-300" />
              </div>

              {route?.transitCountries && route.transitCountries.length > 0 && (
                <>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-semibold text-[11px]">
                    <span>Layover: {route.transitCountries.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-300">
                    <span className="w-3 h-px bg-zinc-300" />
                    <svg className="w-3.5 h-3.5 text-zinc-400 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span className="w-3 h-px bg-zinc-300" />
                  </div>
                </>
              )}

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4FBF7] border border-[#C6EED8] text-[#0E2342] font-semibold">
                <svg className="w-3.5 h-3.5 text-[#0FA958]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                <span>{trip?.destination}</span>
              </div>
            </div>
          </div>

          {/* Right Status & Target Departure */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0">
            {route?.departureDate && (
              <div className="text-left lg:text-right">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Target Departure
                </span>
                <div className="text-sm font-bold text-zinc-900 mt-0.5">
                  <span>{route.departureDate}</span>
                  {daysUntilDeparture !== null && (
                    <span className="ml-1.5 text-xs font-medium text-zinc-500">
                      ({daysUntilDeparture > 0 ? `${daysUntilDeparture} days away` : 'Departure week'})
                    </span>
                  )}
                </div>
              </div>
            )}

            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                overallStatus === 'NOT_READY'
                  ? 'bg-rose-50 text-rose-900 border-rose-200'
                  : overallStatus === 'ACTION_REQUIRED'
                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor:
                    overallStatus === 'NOT_READY'
                      ? '#e11d48'
                      : overallStatus === 'ACTION_REQUIRED'
                      ? '#d97706'
                      : '#059669',
                }}
              />
              <span>{statusHeadline}</span>
            </div>
          </div>
        </div>

        {/* Integrated Earliest Departure Ribbon */}
        <div className="bg-[#FAFBFB] border-t border-zinc-100 px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E8F8F0] text-[#0FA958] text-xs font-bold shrink-0">
              ✓
            </span>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xs font-semibold text-zinc-500">Earliest Safe Departure:</span>
              <span className="text-sm sm:text-base font-serif font-bold text-[#0E2342]">
                {earliestFlightDate}
              </span>
              <span className="text-[11px] text-zinc-400 hidden md:inline">
                · Mandatory vaccine latency and route waiting periods verified
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('timeline')}
            className="text-xs font-semibold text-[#0E2342] hover:text-[#0FA958] transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
          >
            View Timeline Milestones →
          </button>
        </div>
      </div>

      {/* ─── 2. HARMONIZED BOARDING PASS & DOCUMENT VAULT HUB ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card A: Digital Travel Verification Pass */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#0FA958] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0FA958]">
                  Digital Travel Pass
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  isPaid
                    ? 'text-emerald-800 bg-[#E8F8F0] border border-[#C6EED8]'
                    : 'text-amber-800 bg-amber-100 border border-amber-200'
                }`}
              >
                {isPaid ? 'Live Verification Pass' : 'Complete Plan (£19)'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <div className="space-y-1.5 flex-1">
                <h3 className="font-serif text-lg font-bold text-[#0E2342]">
                  Digital Travel Verification Pass
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Mobile-optimized pass summarizing {trip?.petName || 'your pet'}&apos;s verified travel
                  readiness, document audit, and route compliance for airport &amp; border reference.
                </p>
                <div className="pt-2 text-xs text-zinc-600">
                  <span>Pass ID: </span>
                  <span className="font-mono font-bold text-zinc-900">
                    PV-2026-{trip?.id?.slice(0, 8)?.toUpperCase() || 'UKDE-9842'}
                  </span>
                </div>
              </div>

              {/* Scannable Live QR */}
              <div
                onClick={() => onNavigate('passport')}
                className="shrink-0 p-2.5 bg-[#FAFBFB] rounded-2xl border border-zinc-200/80 shadow-2xs relative overflow-hidden cursor-pointer group"
                title={isPaid ? 'View Live Verification Pass' : 'Unlock Complete Plan'}
              >
                <div className={!isPaid ? 'filter blur-[2px] opacity-40 select-none' : ''}>
                  <QrCode
                    value={
                      typeof window !== 'undefined'
                        ? `${window.location.origin}/verify/PV-2026-${trip?.id?.slice(0, 8) || 'UKDE-9842'}`
                        : `https://pawvalid.online/verify/PV-2026-${trip?.id?.slice(0, 8) || 'UKDE-9842'}`
                    }
                    size={92}
                    darkColor="#0E2342"
                  />
                </div>
                {!isPaid && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 backdrop-blur-[1px]">
                    <svg className="w-4 h-4 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-[9px] font-bold text-amber-800 mt-0.5">£19 Plan</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-500 text-[11px]">
              {isPaid ? 'Ready for mobile wallet presentation' : 'Included in Complete Travel Plan'}
            </span>
            {isPaid ? (
              <Link
                href={`/verify/PV-2026-${trip?.id?.slice(0, 8) || 'UKDE-9842'}`}
                target="_blank"
                className="font-bold text-[#0E2342] hover:text-[#0FA958] transition-colors"
              >
                Open Live Pass ↗
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('passport')}
                className="font-bold text-[#0FA958] hover:underline cursor-pointer"
              >
                Unlock Travel Pass (£19) →
              </button>
            )}
          </div>
        </div>

        {/* Card B: Secure Digital Document Vault */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0FA958]">
                  Document Vault
                </span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200/60">
                {blockerSummary.completedVerifiedCount ?? 5} Verified Records
              </span>
            </div>

            <h3 className="font-serif text-lg font-bold text-[#0E2342] mb-1">
              Secure Digital Document Vault
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">
              Permanent vault containing all evaluated vaccination certificates, rabies titer reports, and
              accredited microchip registrations. Saved securely to reuse for future trips.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs">
                <span className="font-medium text-zinc-800">ISO 11784/11785 Microchip Cert</span>
                <span className="text-[11px] font-bold text-emerald-700">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs">
                <span className="font-medium text-zinc-800">Rabies Primary / Booster Record</span>
                <span className="text-[11px] font-bold text-emerald-700">✓ Valid</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs">
                <span className="font-medium text-zinc-800">Official Health Certificate Window</span>
                <span className="text-[11px] font-bold text-amber-700">Pending Vet Window</span>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-500 text-[11px]">Reusable for future trips</span>
            <button
              type="button"
              onClick={() => onNavigate('vault')}
              className="font-bold text-[#0E2342] hover:text-[#0FA958] transition-colors cursor-pointer"
            >
              Open Document Vault →
            </button>
          </div>
        </div>
      </div>

      {/* ─── 3. MODERN COMPLIANCE METRIC STRIP ─────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('checklist')}
          className="bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs hover:shadow-xs hover:border-zinc-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Critical Blockers
            </span>
            <span className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold">
              ✓
            </span>
          </div>
          <span className="font-serif text-3xl font-extrabold text-[#0E2342] block">
            {blockerSummary.criticalBlockersCount ?? 0}
          </span>
          <span className="text-xs text-zinc-500 mt-1 block group-hover:text-[#0FA958] transition-colors">
            {blockerSummary.criticalBlockersCount === 0
              ? 'All statutory prerequisites clear →'
              : 'Action required before departure →'}
          </span>
        </div>

        <div
          onClick={() => onNavigate('timeline')}
          className="bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs hover:shadow-xs hover:border-zinc-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Required Vet Actions
            </span>
            <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <span className="font-serif text-3xl font-extrabold text-[#0E2342] block">
            {blockerSummary.requiredActionsCount ?? 2}
          </span>
          <span className="text-xs text-zinc-500 mt-1 block group-hover:text-[#0FA958] transition-colors">
            View pre-flight clinical milestones →
          </span>
        </div>

        <div
          onClick={() => onNavigate('vault')}
          className="bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs hover:shadow-xs hover:border-zinc-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Verified Records
            </span>
            <span className="w-7 h-7 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </span>
          </div>
          <span className="font-serif text-3xl font-extrabold text-[#0E2342] block">
            {blockerSummary.completedVerifiedCount ?? 5}
          </span>
          <span className="text-xs text-zinc-500 mt-1 block group-hover:text-[#0FA958] transition-colors">
            Stored in secure document vault →
          </span>
        </div>
      </div>

      {/* ─── 4. DEDUPLICATED ACTION ROADMAP ────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#0E2342]">Your Pre-Travel Action Roadmap</h3>
            <p className="text-xs text-zinc-500">
              Mandatory tasks and clinical lead times required before international departure
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('vetsheet')}
            className="text-xs font-bold text-[#0FA958] hover:underline cursor-pointer self-start sm:self-auto"
          >
            Download vet instructions sheet →
          </button>
        </div>

        <div className="space-y-3">
          {nextSteps.map((step: string, idx: number) => {
            const category = getStepCategory(step);
            return (
              <div
                key={`step-${idx}`}
                className="p-4 rounded-2xl bg-[#FAFBFB] border border-zinc-200/70 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-zinc-300 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <span className="w-6 h-6 rounded-full bg-white border border-zinc-200 text-[#0E2342] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    {idx + 1}
                  </span>
                  <span className="text-zinc-800 font-medium leading-relaxed pt-0.5">{step}</span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shrink-0 self-start sm:self-auto ${category.color}`}
                >
                  {category.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
