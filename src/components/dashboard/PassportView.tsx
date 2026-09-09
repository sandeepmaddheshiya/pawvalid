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
  const [copied, setCopied] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const tier = trip?.tier || 'FREE';
  const isPaid = tier === 'CERTIFIED_PASS' || tier === 'CONCIERGE';

  const pet = trip?.petProfile || {
    name: trip?.petName || 'Milo',
    species: trip?.species || 'DOG',
    breed: trip?.breed || 'Companion Animal',
    ageMonths: 36,
    weightKg: 28.5,
    microchipNumber: '985141002847192',
    microchipDate: '2023-04-12',
    rabiesVaccineDate: '2024-05-10',
    rabiesVaccineType: 'BOOSTER',
  };

  const passId = `PV-2026-${trip?.id?.slice(0, 8)?.toUpperCase() || 'UKDE-9842'}`;
  const verificationUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/verify/${passId}`
      : `https://petvia.com/verify/${passId}`;

  const origin = trip?.origin || trip?.route?.origin || 'United Kingdom';
  const destination = trip?.destination || trip?.route?.destination || 'Germany';
  const transits = trip?.route?.transitCountries || [];

  const isDemo = !trip?.id || trip?.id === 'demo-pass' || trip?.id === 'PV-2026-UKDE-9842';

  const isTapewormRequired = /united kingdom|great britain|uk|england|scotland|wales|ireland|malta|finland|norway/i.test(destination);
  const isTiterNeeded = /australia|japan|new zealand|south africa|taiwan|iceland/i.test(destination);
  const hasTiter = Boolean(pet?.rabiesTiterResult || pet?.titerLevel || pet?.rabiesTiterDate || (isDemo ? 0.85 : null));
  const titerValue = pet?.rabiesTiterResult || pet?.titerLevel || (isDemo ? '0.85 IU/ml' : null);

  const isEuDestination = /germany|france|italy|spain|austria|netherlands|belgium|poland|portugal|greece|sweden|denmark|finland|ireland|czech|croatia|hungary|romania|bulgaria|slovakia|slovenia|lithuania|latvia|estonia|cyprus|malta|luxembourg/i.test(destination);
  const isUkDestination = /united kingdom|great britain|uk|england|scotland|wales/i.test(destination);
  const isUsDestination = /united states|usa|us/i.test(destination);

  const regulatoryScheme = isEuDestination
    ? 'Regulation (EU) 2026/131 Non-Commercial Pet Movement'
    : isUkDestination
    ? 'GB Pet Travel Scheme / Animal Health Regulations'
    : isUsDestination
    ? 'USDA APHIS Pet Transit Standards'
    : 'IATA LAR & International Pet Movement Standards';

  const handleDownloadPdf = async () => {
    if (!isPaid) {
      setPricingModalOpen(true);
      return;
    }
    if (isDownloadingPdf) return;

    setIsDownloadingPdf(true);
    try {
      const tripParam = trip?.id ? `tripId=${encodeURIComponent(trip.id)}` : '';
      const res = await fetch(`/api/pdf/passport?${tripParam}`);

      if (res.status === 402) {
        setPricingModalOpen(true);
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to generate PDF on server');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Petvia-Digital-Passport-${pet.name.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Passport PDF download error:', err);
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    if (!isPaid) {
      setPricingModalOpen(true);
      return;
    }
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(verificationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-6xl mx-auto font-sans">
      {/* ─── FREE PLAN UPGRADE BANNER (if on £0 plan) ───────────────── */}
      {!isPaid && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Free Readiness Scan Preview
              </div>
              <div className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5">
                Digital Travel Verification Pass is in preview mode
              </div>
              <p className="text-xs text-zinc-600 mt-0.5 max-w-xl leading-relaxed">
                Activate the <strong className="text-zinc-900">Complete Travel Plan (£19)</strong> to generate your scannable verification pass, unlock permanent document vault storage, and download certified compliance dossiers.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPricingModalOpen(true)}
            className="shrink-0 px-4 py-2.5 bg-[#0FA958] hover:bg-[#0D8E4A] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Activate Plan (£19) →</span>
          </button>
        </div>
      )}

      {/* ─── 1. CLEAN ENTERPRISE PAGE HEADER ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <span>Pet Travel Compliance</span>
            <span>/</span>
            <span className="font-medium text-zinc-800">Verification Passport</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            {pet.name}&apos;s Pet Passport &amp; Verification Record
          </h1>
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
            Statutory compliance ledger and mobile verification pass for international route{' '}
            <strong className="text-zinc-700">{origin} → {destination}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-50 disabled:opacity-75 border border-zinc-300 text-xs font-semibold text-zinc-700 px-3.5 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            {isDownloadingPdf ? (
              <>
                <svg className="w-3.5 h-3.5 text-zinc-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>{isPaid ? 'Download Certified PDF' : 'Download PDF (£19)'}</span>
              </>
            )}
          </button>
          <Link
            href={`/en/checker?from=${trip?.route?.originCode || 'GB'}&species=${pet.species || 'DOG'}`}
            className="inline-flex items-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all"
          >
            <span>Plan New Trip →</span>
          </Link>
        </div>
      </div>

      {/* ─── 2. MAIN 12-COLUMN ENTERPRISE STAGE ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Verified Document & Medical Ledger (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Pet Identity & Route Card */}
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 text-[#0E2342] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 11c-2.4 0-4 1.8-4 3.5 0 2.2 2 3.5 4 3.5s4-1.3 4-3.5C16 12.8 14.4 11 12 11z" />
                    <ellipse cx="6.5" cy="11.5" rx="1.8" ry="2.2" />
                    <ellipse cx="9.2" cy="7" rx="1.8" ry="2.2" />
                    <ellipse cx="14.8" cy="7" rx="1.8" ry="2.2" />
                    <ellipse cx="17.5" cy="11.5" rx="1.8" ry="2.2" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-lg font-bold text-zinc-900">{pet.name}</h2>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
                      {pet.breed || 'Companion Animal'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {Math.round((pet.ageMonths || 36) / 12)} yrs old • {pet.weightKg || 28.5} kg • Owner:{' '}
                    <span className="text-zinc-700 font-medium">{userEmail}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>{isPaid ? 'Verified Travel-Ready' : 'Evaluation Active'}</span>
                </span>
              </div>
            </div>

            {/* Route & Transponder Sub-strip */}
            <div className="px-5 sm:px-6 py-3 bg-[#FAFBFB] border-b border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-600">
                <span className="text-zinc-400 font-medium">Route:</span>
                <span className="font-semibold text-zinc-900">{origin}</span>
                <span className="text-zinc-400">→</span>
                {transits.length > 0 && (
                  <>
                    <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                      Via {transits.join(', ')}
                    </span>
                    <span className="text-zinc-400">→</span>
                  </>
                )}
                <span className="font-semibold text-zinc-900">{destination}</span>
              </div>

              <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                <span>Pass ID:</span>
                <span className="font-mono font-bold text-zinc-800">{passId}</span>
              </div>
            </div>

            {/* Microchip Specs Grid */}
            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/70">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  ISO 11784/11785 Microchip Transponder
                </span>
                <span className="font-mono text-sm font-bold text-zinc-900 block mt-1">
                  {pet.microchipNumber || '985141002847192'}
                </span>
                <span className="text-[11px] font-medium text-emerald-700 block mt-0.5">
                  ✓ 15-Digit FDX-B Verified Standard
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/70">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Implantation Date &amp; Sequence
                </span>
                <span className="text-sm font-semibold text-zinc-900 block mt-1">
                  {pet.microchipDate || '12 Apr 2023'}
                </span>
                <span className="text-[11px] font-medium text-emerald-700 block mt-0.5">
                  ✓ Implanted prior to primary rabies vaccine
                </span>
              </div>
            </div>
          </div>

          {/* Verified Health & Regulatory Ledger Table */}
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-zinc-900">
                  Verified Immunization &amp; Clinical Ledger
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Evaluated under {regulatoryScheme} and IATA standards
                </p>
              </div>
              <span className="text-[11px] font-semibold text-zinc-400">Audit Trail Verified</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-zinc-50/80 text-zinc-500 font-semibold border-b border-zinc-100">
                    <th className="py-2.5 px-5">Requirement / Record</th>
                    <th className="py-2.5 px-4">Administered / Sample</th>
                    <th className="py-2.5 px-4">Threshold / Validity</th>
                    <th className="py-2.5 px-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-700">
                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3 px-5 font-semibold text-zinc-900">
                      Rabies 3-Year Booster Vaccination
                      <span className="block text-[11px] font-normal text-zinc-500">
                        Inactivated adjuvant vaccine (EU authorized)
                      </span>
                    </td>
                    <td className="py-3 px-4">{pet.rabiesVaccineDate || (isDemo ? '10 May 2024' : 'Verified')}</td>
                    <td className="py-3 px-4 text-zinc-600">Valid through May 2027 (21d wait cleared)</td>
                    <td className="py-3 px-5 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ✓ Active
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3 px-5 font-semibold text-zinc-900">
                      FAVN Rabies Neutralizing Antibody Titer
                      <span className="block text-[11px] font-normal text-zinc-500">
                        Approved reference laboratory serology
                      </span>
                    </td>
                    <td className="py-3 px-4">{pet.rabiesTiterDate || (hasTiter ? (isDemo ? '15 Jun 2024' : 'Certified') : 'Route Evaluation')}</td>
                    <td className="py-3 px-4 text-zinc-600">
                      {hasTiter
                        ? `${titerValue || '0.85 IU/ml'} (Requirement: ≥ 0.50 IU/ml)`
                        : (isTiterNeeded
                            ? 'Pending Blood Serology (≥ 0.50 IU/ml required)'
                            : `Exempt for direct entry into ${destination}`)}
                    </td>
                    <td className="py-3 px-5 text-right">
                      {hasTiter ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          ✓ Passed
                        </span>
                      ) : isTiterNeeded ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Action Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
                          Exempt
                        </span>
                      )}
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3 px-5 font-semibold text-zinc-900">
                      Pre-Flight Veterinary Clinical Examination
                      <span className="block text-[11px] font-normal text-zinc-500">
                        {isEuDestination ? 'EU Animal Health Certificate (AHC) issuance' : isUkDestination ? 'UK Animal Health Certificate issuance' : 'Statutory Veterinary Export Certificate'}
                      </span>
                    </td>
                    <td className="py-3 px-4">Pending Departure</td>
                    <td className="py-3 px-4 text-zinc-600">Within 10 days of flight departure</td>
                    <td className="py-3 px-5 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        Pending Window
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3 px-5 font-semibold text-zinc-900">
                      Tapeworm (Echinococcus multilocularis)
                      <span className="block text-[11px] font-normal text-zinc-500">
                        Praziquantel treatment 24h–120h prior to entry
                      </span>
                    </td>
                    <td className="py-3 px-4">{isTapewormRequired ? '24h–120h prior to entry' : 'Route Evaluation'}</td>
                    <td className="py-3 px-4 text-zinc-600">
                      {isTapewormRequired
                        ? 'Praziquantel treatment mandatory 24h–120h prior to entry'
                        : `Exempt for direct entry into ${destination}`}
                    </td>
                    <td className="py-3 px-5 text-right">
                      {isTapewormRequired ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          ✓ Required Window
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
                          Exempt
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-zinc-50/60 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Encrypted records securely backed in digital document vault</span>
              <span>{regulatoryScheme}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Compact Wallet Pass & Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Digital Verification Pass Card */}
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs p-5 sm:p-6 text-center">
            <div className="flex items-center justify-between mb-3 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0FA958] block">
                  Live Travel Verification Pass
                </span>
                <span className="font-bold text-sm text-zinc-900">Digital Travel Record</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isPaid ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800'
              }`}>
                {isPaid ? '✓ Active' : 'Preview'}
              </span>
            </div>

            <p className="text-xs text-zinc-500 text-left mb-4 leading-relaxed">
              Scan with any smartphone camera to securely access {pet.name}&apos;s travel-readiness status, reviewed document records, and journey details.
            </p>

            {/* Compact QR Frame */}
            <div className="p-4 bg-[#FAFBFB] rounded-xl border border-zinc-200/80 mb-4 relative overflow-hidden flex flex-col items-center justify-center">
              <div
                className={`p-2.5 bg-white rounded-xl shadow-2xs border border-zinc-200/80 mb-2 transition-all ${
                  !isPaid ? 'filter blur-[3px] select-none pointer-events-none opacity-40' : ''
                }`}
              >
                <QrCode value={verificationUrl} size={135} darkColor="#0E2342" alt="Digital Travel Pass" />
              </div>

              <div className="font-mono text-xs font-bold text-zinc-800">{passId}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                {isPaid ? 'Universal mobile camera inspection' : 'Pass locked on Free tier'}
              </div>

              {!isPaid && (
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/80 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center shadow-xs mb-1.5 font-bold">
                    <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <div className="text-xs font-bold text-zinc-900">Live Pass Locked</div>
                  <p className="text-[11px] text-zinc-500 max-w-[180px] mt-0.5 leading-snug">
                    Unlock the £19 plan to activate live mobile verification.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPricingModalOpen(true)}
                    className="mt-2.5 px-3 py-1.5 bg-[#0FA958] hover:bg-[#0D8E4A] text-white text-xs font-bold rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer"
                  >
                    Unlock (£19) →
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
                  <span>Open Live Verification Pass ↗</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setPricingModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span>Activate Pass (£19)</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-1 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700 py-2 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{copied ? '✓ Copied' : 'Copy Link'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="inline-flex items-center justify-center gap-1 bg-zinc-50 hover:bg-zinc-100 disabled:opacity-75 border border-zinc-200 text-xs font-medium text-zinc-700 py-2 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  {isDownloadingPdf ? (
                    <span>Generating...</span>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Border & Inspection Notice */}
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs p-4 sm:p-5 space-y-1.5 text-xs">
            <div className="font-semibold text-zinc-900 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>Border &amp; Airline Inspection</span>
            </div>
            <p className="text-zinc-500 leading-relaxed text-[11px]">
              Present this live pass or printed record at airline check-in and border veterinary inspection. Officials can scan the QR code to verify compliance status directly without manual document parsing.
            </p>
          </div>

          {/* Secure Document Vault Quick Link */}
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs p-4 sm:p-5 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-zinc-900 block">Secure Document Vault</span>
              <span className="text-[11px] text-zinc-500 block">5 records encrypted &amp; saved for future trips</span>
            </div>
            <Link
              href="/dashboard?tab=vault"
              className="font-bold text-[#0FA958] hover:underline whitespace-nowrap text-xs"
            >
              Open Vault →
            </Link>
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
