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
  const statusHeadline = stats?.statusHeadline || 'Compliance Assessment';
  const earliestFlightDate = stats?.earliestFlightDate || 'Verified upon prerequisite clearance';

  // Calculate days until departure
  let daysUntilDeparture: number | null = null;
  if (route?.departureDate) {
    const depDate = new Date(route.departureDate);
    const now = new Date();
    const diffTime = depDate.getTime() - now.getTime();
    daysUntilDeparture = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const getStatusColor = () => {
    if (overallStatus === 'NOT_READY') return 'bg-red-50 text-red-950 border-red-200';
    if (overallStatus === 'ACTION_REQUIRED') return 'bg-amber-50 text-amber-950 border-amber-200';
    return 'bg-emerald-50 text-emerald-950 border-emerald-200';
  };

  const getStatusBadge = () => {
    if (overallStatus === 'NOT_READY') return '🔴 NOT READY FOR FLIGHT';
    if (overallStatus === 'ACTION_REQUIRED') return '🟡 ACTION REQUIRED';
    return '🟢 READY TO FLY';
  };

  const tier = trip?.tier || 'FREE';
  const isPaid = tier === 'CERTIFIED_PASS' || tier === 'CONCIERGE';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ─── 1. HERO JOURNEY BANNER ─────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{trip?.species === 'CAT' ? '🐱' : '🐶'}</span>
              <span className="font-display font-black text-xl sm:text-2xl text-zinc-900">
                {trip?.petName}&apos;s International Journey
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-700">
                {petProfile?.breed || 'Verified Pet'}
              </span>
            </div>

            {/* Route */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-700 font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-900">{trip?.origin}</span>
              <span>✈️</span>
              {route?.transitCountries && route.transitCountries.length > 0 && (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs">
                    Via {route.transitCountries.join(', ')}
                  </span>
                  <span>✈️</span>
                </>
              )}
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                {trip?.destination}
              </span>
            </div>
          </div>

          {/* Departure Countdown */}
          {daysUntilDeparture !== null && (
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-center shrink-0 min-w-[170px]">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Target Departure
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-zinc-900 block mt-0.5">
                {daysUntilDeparture > 0 ? `${daysUntilDeparture} Days` : 'Departure Week'}
              </span>
              <span className="text-[11px] text-zinc-500 font-medium">
                {route?.departureDate}
              </span>
            </div>
          )}
        </div>

        {/* Status Callout */}
        <div className={`mt-6 p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 ${getStatusColor()}`}>
          <span className="text-2xl mt-0.5">
            {overallStatus === 'NOT_READY' ? '🔴' : overallStatus === 'ACTION_REQUIRED' ? '🟡' : '🟢'}
          </span>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider">{getStatusBadge()}</span>
            </div>
            <h3 className="font-display font-black text-base sm:text-lg leading-snug">
              {statusHeadline}
            </h3>
            <p className="text-xs opacity-90 leading-relaxed">
              Assessed under European Commission Regulation (EU) 2026/131, USDA APHIS non-commercial protocol, and IATA Live Animals standards.
            </p>
          </div>
        </div>

        {/* ─── HERO TIMELINE DATE BOX ───────────────────────────────── */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-white border border-emerald-200/80 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-100 text-emerald-800 tracking-wider uppercase">
                Verified Departure Window
              </span>
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-xs font-semibold text-zinc-500">Earliest Eligible Flight Date:</span>
              <span className="font-display text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
                {earliestFlightDate}
              </span>
            </div>
            <p className="text-xs text-zinc-600 max-w-xl leading-relaxed">
              {stats?.earliestFlightDateSubtitle || 'Calculated from required microchip sequence, 21-day rabies antibody latency, and applicable documented destination requirements.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              disabled={isDownloadingDossier}
              onClick={onDownloadDossier}
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              <span>{isDownloadingDossier ? '⏳' : '📄'}</span>
              <span>{isDownloadingDossier ? 'Generating...' : 'Download Dossier (PDF)'}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('timeline')}
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View Timeline →</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 2. DIGITAL PET PASSPORT & PET VISA QR QUICK TILES ─────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Digital Pet Passport Tile */}
        <div
          onClick={() => onNavigate('passport')}
          className="bg-gradient-to-br from-[#0E2342] to-[#16345E] text-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪪</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0FA958]">
                  Digital Pet Passport
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isPaid ? 'text-emerald-300 bg-white/10' : 'text-amber-300 bg-amber-400/20'
              }`}>
                {isPaid ? 'Verified Pass' : 'Preview Mode'}
              </span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">
              {trip?.petName || 'Milo'}&apos;s Reusable Travel Profile
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Scan your pet&apos;s documents once, save their profile to your document vault, and reuse it for future trips without starting from scratch.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-3 text-xs">
            <span className="text-zinc-300">
              Chip: <span className="font-mono text-white font-bold">{petProfile?.microchipNumber || '985141002847192'}</span>
            </span>
            <span className="font-bold text-[#0FA958] group-hover:text-white transition-colors">
              Open Passport Vault →
            </span>
          </div>
        </div>

        {/* Digital Travel Verification Pass Tile */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all flex items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-base">📱</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0FA958]">
                  Digital Travel Pass
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isPaid
                  ? 'text-emerald-800 bg-[#E8F8F0] border border-[#C6EED8]'
                  : 'text-amber-800 bg-amber-100 border border-amber-200'
              }`}>
                {isPaid ? '✓ Travel-Readiness Verified' : '🔒 £19 Complete Plan'}
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0E2342]">
              Digital Travel Verification Pass
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Mobile-friendly pass summarizing your pet&apos;s travel-readiness status and document compliance.
            </p>
            <div className="pt-2">
              {isPaid ? (
                <Link
                  href={`/verify/PV-2026-${trip?.id?.slice(0, 8) || 'UKDE-9842'}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0E2342] hover:text-[#0FA958] transition-colors"
                >
                  <span>View Verification Pass ↗</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('passport')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0FA958] hover:underline cursor-pointer"
                >
                  <span>Unlock Travel Plan (£19) →</span>
                </button>
              )}
            </div>
          </div>

          <div
            onClick={() => onNavigate('passport')}
            className="shrink-0 p-2 bg-zinc-50 rounded-xl border border-zinc-200/80 shadow-2xs relative overflow-hidden cursor-pointer group"
            title={isPaid ? 'View Pass' : 'Unlock Official Pass'}
          >
            <div className={!isPaid ? 'filter blur-[2px] opacity-40 select-none' : ''}>
              <QrCode
                value={typeof window !== 'undefined' ? `${window.location.origin}/verify/PV-2026-${trip?.id?.slice(0, 8) || 'UKDE-9842'}` : `https://petvia.com/verify/PV-2026-${trip?.id?.slice(0, 8) || 'UKDE-9842'}`}
                size={96}
                darkColor="#0E2342"
              />
            </div>
            {!isPaid && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[1px]">
                <span className="text-base">🔒</span>
                <span className="text-[9px] font-bold text-amber-800 mt-0.5">£19 Plan</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── 3. STATS & QUICK NAVIGATION TILES ─────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('checklist')}
          className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Critical Blockers</span>
            <span className="text-lg">🛑</span>
          </div>
          <span className="font-display font-black text-3xl text-zinc-900 block">
            {blockerSummary.criticalBlockersCount ?? 0}
          </span>
          <span className="text-xs text-zinc-500 mt-1 block group-hover:text-emerald-700 font-medium">
            View compliance checklist →
          </span>
        </div>

        <div
          onClick={() => onNavigate('timeline')}
          className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Required Vet Steps</span>
            <span className="text-lg">⏳</span>
          </div>
          <span className="font-display font-black text-3xl text-zinc-900 block">
            {blockerSummary.requiredActionsCount ?? (trip?.timelineMilestones?.filter((m: any) => m.status !== 'COMPLETED')?.length ?? 2)}
          </span>
          <span className="text-xs text-zinc-500 mt-1 block group-hover:text-emerald-700 font-medium">
            View pre-flight milestones →
          </span>
        </div>

        <div
          onClick={() => onNavigate('vault')}
          className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Verified Records</span>
            <span className="text-lg">📁</span>
          </div>
          <span className="font-display font-black text-3xl text-zinc-900 block">
            {blockerSummary.completedVerifiedCount ?? (trip?.uploadedDocuments?.length || 2)}
          </span>
          <span className="text-xs text-zinc-500 mt-1 block group-hover:text-emerald-700 font-medium">
            Open document vault →
          </span>
        </div>
      </div>

      {/* ─── 3. QUICK ACTION ROADMAP ──────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-black text-zinc-900">Your Action Roadmap</h3>
            <p className="text-xs text-zinc-500">Step-by-step instructions sorted by mandatory lead time</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('vetsheet')}
            className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
          >
            Instructions for your vet →
          </button>
        </div>

        <div className="space-y-3">
          {(trip?.readinessReport?.nextSteps || [
            'Confirm pet microchip ISO 11784/11785 status.',
            'Verify primary rabies 21-day wait period is completed before travel.',
            'Visit veterinarian between 24h and 120h prior to flight for tapeworm treatment.',
            'Assemble all signed documents into waterproof travel folder.'
          ]).map((step: string, idx: number) => (
            <div key={`step-${idx}`} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-zinc-800 font-medium leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
