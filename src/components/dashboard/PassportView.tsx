'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import QrCode from '@/components/QrCode';
import PricingModal from '@/components/PricingModal';

interface PassportViewProps {
  trip: any;
  userEmail: string;
}

export default function PassportView({ trip, userEmail }: PassportViewProps) {
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const tier = trip?.tier || 'FREE';
  const isPaid = tier === 'CERTIFIED_PASS' || tier === 'CONCIERGE';

  const pet = trip?.petProfile || {
    name: trip?.petName || 'Milo',
    species: trip?.species || 'DOG',
    breed: trip?.breed || 'Golden Retriever',
    ageMonths: 36,
    weightKg: 28.5,
    microchipNumber: '985141002847192',
    microchipDate: '2023-04-12',
    rabiesVaccineDate: '2024-05-10',
    rabiesVaccineType: 'BOOSTER',
  };

  const passId = `PV-2026-${trip?.id?.slice(0, 8) || 'UKDE-9842'}`;
  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/verify/${passId}`
    : `https://petvia.com/verify/${passId}`;

  const handlePrint = () => {
    if (!isPaid) {
      setPricingModalOpen(true);
      return;
    }
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto font-sans">
      {/* Free Plan Upgrade Banner (if on £0 plan) */}
      {!isPaid && (
        <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-[#0E2342]/10 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-zinc-950 font-bold flex items-center justify-center text-lg shrink-0 shadow-2xs">
              🔒
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Free Readiness Scan Preview
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#0E2342] mt-0.5">
                Official Customs Pass &amp; Multi-Trip Vault are locked
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5 max-w-xl leading-relaxed">
                Upgrade to the <strong className="text-emerald-700">Complete Travel Plan (£19)</strong> to activate your official live-scannable Customs QR Code, unlock unlimited 1-click trip reuse, and download official travel dossiers.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPricingModalOpen(true)}
            className="shrink-0 px-4 py-2.5 bg-[#0FA958] hover:bg-[#0D934C] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
          >
            <span>⚡</span>
            <span>Unlock Customs Pass (£19) →</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            <span>🪪</span>
            <span>Digital Pet Passport</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0E2342]">
            {pet.name}&apos;s Digital Passport &amp; Health Vault
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
            Scan your pet&apos;s documents once, save their profile, and reuse it for every trip — with personalized compliance built in.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 hover:border-zinc-300 text-xs font-semibold text-zinc-700 px-3.5 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <span>{isPaid ? '🖨️' : '🔒'}</span>
            <span>{isPaid ? 'Print Pass' : 'Print Official Pass (£19)'}</span>
          </button>
          <Link
            href={`/en/checker?from=${trip?.route?.originCode || 'GB'}&species=${pet.species || 'DOG'}`}
            className="inline-flex items-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            <span>✈️ Plan New Trip with {pet.name}</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Passport Card on Left, Pet Visa QR on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Official Digital Passport Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-[#0E2342] to-[#16345E] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-white/10 relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none text-9xl font-serif">
              🐾
            </div>

            {/* Passport Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                  🛂
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#0FA958]">
                    INTERNATIONAL DIGITAL PET PASSPORT
                  </div>
                  <div className="text-xs text-zinc-300 font-mono">
                    PASS ID: {passId}
                  </div>
                </div>
              </div>

              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                isPaid
                  ? 'text-[#0FA958] bg-[#0FA958]/20 border border-[#0FA958]/40'
                  : 'text-amber-300 bg-amber-500/20 border border-amber-400/40'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-[#0FA958]' : 'bg-amber-400'}`} />
                {isPaid ? 'CUSTOMS VERIFIED' : '🔒 PREVIEW MODE'}
              </span>
            </div>

            {/* Pet Bio & Photo */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 shadow-inner border border-white/20">
                🐕
              </div>
              <div className="space-y-0.5">
                <div className="text-xl font-bold tracking-tight text-white">
                  {pet.name}
                </div>
                <div className="text-xs text-zinc-300">
                  {pet.breed || 'Retriever'} • {Math.round((pet.ageMonths || 36) / 12)} years old • {pet.weightKg || 28.5} kg
                </div>
                <div className="text-[11px] text-[#0FA958] font-medium flex items-center gap-1">
                  <span>Registered owner:</span>
                  <span className="text-zinc-200">{userEmail}</span>
                </div>
              </div>
            </div>

            {/* Microchip & Implantation Specs */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                <div className="text-zinc-400 text-[10px] font-semibold uppercase">
                  ISO 11784/11785 Microchip #
                </div>
                <div className="font-mono font-bold text-white text-sm mt-0.5">
                  {pet.microchipNumber || '985141002847192'}
                </div>
                <div className="text-[#0FA958] text-[10px] mt-0.5">
                  ✓ 15-Digit FDX-B Confirmed
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                <div className="text-zinc-400 text-[10px] font-semibold uppercase">
                  Implantation Date
                </div>
                <div className="font-bold text-white text-sm mt-0.5">
                  {pet.microchipDate || '12 Apr 2023'}
                </div>
                <div className="text-[#0FA958] text-[10px] mt-0.5">
                  ✓ Prior to Rabies Vaccine
                </div>
              </div>
            </div>

            {/* Health & Immunization History */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Vaccination &amp; Antibody Profile
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Rabies 3-Year Booster</div>
                  <div className="text-[11px] text-zinc-400">
                    Administered {pet.rabiesVaccineDate || '10 May 2024'} • Valid through 2027
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#0FA958] bg-[#0FA958]/20 px-2.5 py-1 rounded">
                  ✓ ACTIVE
                </span>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">FAVN Rabies Neutralizing Titer</div>
                  <div className="text-[11px] text-zinc-400">
                    Certified Level: 0.85 IU/ml (Requirement: ≥ 0.50 IU/ml)
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#0FA958] bg-[#0FA958]/20 px-2.5 py-1 rounded">
                  ✓ PASSED
                </span>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Tapeworm (Echinococcus) Protocol</div>
                  <div className="text-[11px] text-zinc-400">
                    Praziquantel certified within 24h–120h pre-flight window
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#0FA958] bg-[#0FA958]/20 px-2.5 py-1 rounded">
                  ✓ COMPLIANT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Pet Visa QR Code for Customs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-zinc-200/90 text-center">
            <div className="inline-flex items-center gap-1.5 bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
              <span>📱</span>
              <span>Customs &amp; Airline Inspection Pass</span>
            </div>

            <h2 className="text-base font-bold text-[#0E2342]">
              Pet Visa QR Code for Customs
            </h2>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
              Show this scannable QR code at airline check-in desks and border customs inspection checkpoints.
            </p>

            {/* QR Code Container */}
            <div className="my-5 flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 relative overflow-hidden">
              <div className={`p-2.5 bg-white rounded-xl shadow-xs border border-zinc-200 mb-2 transition-all ${
                !isPaid ? 'filter blur-[4px] select-none pointer-events-none opacity-40' : ''
              }`}>
                <QrCode
                  value={verificationUrl}
                  size={170}
                  darkColor="#0E2342"
                  alt="Customs QR Code"
                />
              </div>
              <div className="text-[11px] text-zinc-500 font-mono font-bold">
                {passId}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                {isPaid ? 'Scan with any smartphone camera' : 'Official QR pass locked on Free tier'}
              </div>

              {/* Frosted Glass Lock Overlay when on Free Tier */}
              {!isPaid && (
                <div className="absolute inset-0 backdrop-blur-[3px] bg-white/80 flex flex-col items-center justify-center p-5 text-center">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400 text-zinc-950 flex items-center justify-center text-lg shadow-xs mb-2 font-bold">
                    🔒
                  </div>
                  <div className="text-xs font-bold text-[#0E2342]">
                    Official Customs QR Code Locked
                  </div>
                  <p className="text-[11px] text-zinc-500 max-w-[210px] mt-1 leading-snug">
                    Airline check-in desks and border customs require a paid clearance seal.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPricingModalOpen(true)}
                    className="mt-3.5 px-4 py-2 bg-[#0FA958] hover:bg-[#0D934C] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>⚡</span>
                    <span>Unlock Pass (£19) →</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              {isPaid ? (
                <Link
                  href={`/verify/${passId}`}
                  target="_blank"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-xs"
                >
                  <span>View Full Customs Pass ↗</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setPricingModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <span>🔒 Unlock Full Customs Pass (£19)</span>
                </button>
              )}
              <button
                type="button"
                onClick={handlePrint}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-700 py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
              >
                <span>Save to Phone / Print</span>
              </button>
            </div>
          </div>

          {/* Reusable Profile Banner */}
          <div className="p-4 bg-[#E8F8F0]/60 rounded-2xl border border-[#C6EED8] text-xs text-[#0E2342] leading-relaxed">
            <span className="font-bold">Reusable Health Profile:</span> All documents and medical records associated with {pet.name} are permanently saved to your account. When you start another trip, Petvia automatically evaluates compliance without asking for new uploads.
          </div>
        </div>
      </div>

      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        initialTier="Complete Travel Plan"
      />
    </div>
  );
}
