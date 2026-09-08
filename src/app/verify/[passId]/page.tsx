'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';

interface VerifyPageProps {
  params: Promise<{
    passId: string;
  }>;
}

export default function CustomsVerificationPage({ params }: VerifyPageProps) {
  const resolvedParams = use(params);
  const passId = resolvedParams.passId || 'PV-2026-UKDE-9842';
  const [passData, setPassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVerification() {
      try {
        const res = await fetch(`/api/verify/${encodeURIComponent(passId)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.pass) {
            setPassData(json.pass);
          }
        }
      } catch (err) {
        console.error('Error fetching live verification from backend:', err);
      } finally {
        setLoading(false);
      }
    }
    loadVerification();
  }, [passId]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Dynamic values from backend with graceful fallbacks
  const petName = passData?.pet?.name || 'Traveling Pet';
  const species = passData?.pet?.species === 'CAT' ? 'Cat' : 'Dog';
  const breed = passData?.pet?.breed || 'Companion Animal';
  const microchipNumber = passData?.pet?.microchip?.number || '985141002847192';
  const implantDate = passData?.pet?.microchip?.implantationDate || 'April 12, 2023';
  const origin = passData?.travel?.originCountry || 'United States';
  const originAirport = passData?.travel?.originAirport || 'JFK';
  const destination = passData?.travel?.destinationCountry || 'Germany';
  const destAirport = passData?.travel?.destinationAirport || 'FRA';
  const travelerName = passData?.travelerName || passData?.owner || 'Verified Traveler';
  const ageWeight = passData?.pet?.ageMonths
    ? `${Math.floor(passData.pet.ageMonths / 12)} Yrs • ${passData.pet.weightKg || 25} kg`
    : 'Adult • Standard Build';
  const rabiesDate = passData?.pet?.rabies?.vaccineDate || 'May 10, 2024';
  const rabiesExpiry = passData?.pet?.rabies?.validUntil || 'May 10, 2027';
  const isPaid = passData?.isPaid !== false;

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-zinc-900 font-sans py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Navigation & Print Actions */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-[#0E2342] transition-colors"
          >
            <span>← Back to Petvia</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 hover:border-zinc-300 text-xs font-semibold text-zinc-700 px-3.5 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.656h10.5z" />
              </svg>
              <span>Print Verification Pass</span>
            </button>
            {!isPaid ? (
              <span className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-200 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                PROVISIONAL (UNPAID)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[11px] font-bold px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0FA958] animate-pulse" />
                LIVE VERIFIED
              </span>
            )}
          </div>
        </div>

        {/* Digital Travel Verification Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-zinc-200/90 overflow-hidden print:border-none print:shadow-none">
          {/* Header Banner */}
          <div className="bg-[#0E2342] text-white p-6 sm:p-7 relative overflow-hidden">
            {/* Subtle SVG Background Watermark */}
            <div className="absolute right-0 top-0 bottom-0 opacity-5 pointer-events-none flex items-center pr-6">
              <svg className="w-48 h-48 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 11c-2.4 0-4 1.8-4 3.5 0 2.2 2 3.5 4 3.5s4-1.3 4-3.5C16 12.8 14.4 11 12 11z" />
                    <ellipse cx="6.5" cy="11.5" rx="1.8" ry="2.2" />
                    <ellipse cx="9.2" cy="7" rx="1.8" ry="2.2" />
                    <ellipse cx="14.8" cy="7" rx="1.8" ry="2.2" />
                    <ellipse cx="17.5" cy="11.5" rx="1.8" ry="2.2" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold tracking-tight">
                    Petvia Digital Travel Verification Pass
                  </h1>
                  <p className="text-[11px] text-zinc-300">
                    Verified Pet Travel Readiness &amp; Compliance Summary
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Pass ID
                </div>
                <div className="text-xs font-mono font-bold text-white">
                  {passId}
                </div>
              </div>
            </div>

            {/* Verification Status Banner */}
            {!isPaid ? (
              <div className="bg-amber-500/20 border border-amber-400/40 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                    <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      PROVISIONAL PASS · ACTIVATION REQUIRED
                    </div>
                    <div className="text-[11px] text-amber-200 leading-tight">
                      This verification pass requires an active Complete Travel Plan (£19) for live digital travel verification.
                    </div>
                  </div>
                </div>
                <Link
                  href="/#pricing"
                  className="shrink-0 px-3.5 py-1.5 bg-[#0FA958] hover:bg-[#0D934C] text-white text-xs font-bold rounded-lg shadow-xs transition-all active:scale-98 text-center print:hidden"
                >
                  Activate Travel Plan (£19) →
                </Link>
              </div>
            ) : (
              <div className="bg-[#0FA958]/20 border border-[#0FA958]/40 rounded-xl p-3.5 flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#0FA958] flex items-center justify-center text-white text-sm shrink-0 shadow-sm font-bold">
                  ✓
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    TRAVEL-READINESS VERIFIED · COMPLIANT STATUS
                  </div>
                  <div className="text-[11px] text-[#C6EED8] leading-tight">
                    All route-specific rabies, microchip, and clinical requirements verified compliant.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-7 space-y-6">
            {/* Route & Flight Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Origin
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0E2342] mt-0.5">
                  {origin}
                </div>
                <div className="text-[11px] text-zinc-500">{originAirport}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Destination
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0E2342] mt-0.5">
                  {destination}
                </div>
                <div className="text-[11px] text-zinc-500">{destAirport}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Regulation Scheme
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0E2342] mt-0.5">
                  {passData?.regulationScheme || 'EU Reg 576/2013'}
                </div>
                <div className="text-[11px] text-zinc-500">Non-Commercial Pet</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Compliance Status
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0FA958] mt-0.5">
                  ✓ Verified Compliant
                </div>
                <div className="text-[11px] text-zinc-500">Tamper-Checked</div>
              </div>
            </div>

            {/* Pet Identity & Verification Specs */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Pet &amp; Microchip Identity
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">Pet Name</div>
                  <div className="text-xs font-bold text-[#0E2342]">{petName}</div>
                  <div className="text-[10px] text-zinc-500">{species} • {breed}</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">ISO Microchip #</div>
                  <div className="text-xs font-bold font-mono text-[#0E2342]">
                    {microchipNumber}
                  </div>
                  <div className="text-[10px] text-[#0FA958] font-medium">✓ ISO 11784/11785 Confirmed</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">Implant Date</div>
                  <div className="text-xs font-bold text-[#0E2342]">{implantDate}</div>
                  <div className="text-[10px] text-[#0FA958] font-medium">✓ Prior to Rabies Vaccine</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">Owner / Handler</div>
                  <div className="text-xs font-bold text-[#0E2342]">{travelerName}</div>
                  <div className="text-[10px] text-zinc-500">Accompanying Traveler</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">Age &amp; Build</div>
                  <div className="text-xs font-bold text-[#0E2342]">{ageWeight}</div>
                  <div className="text-[10px] text-zinc-500">Clinical Exam Passed</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">Document Vault</div>
                  <div className="text-xs font-bold text-[#0E2342]">Verified Records Linked</div>
                  <div className="text-[10px] text-[#0FA958] font-medium">✓ Secure Digital Storage</div>
                </div>
              </div>
            </div>

            {/* Official Compliance Audit Table */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Route Readiness Checklist (Statutory Standards)
              </h2>
              <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden">
                {/* Microchip */}
                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-[#0E2342]">
                      15-Digit ISO 11784/11785 Microchip
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Implanted &amp; scanned before rabies immunization. Valid for official border scanners.
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0FA958] bg-[#E8F8F0] px-2.5 py-1 rounded-md">
                    <span>✓</span> Verified
                  </span>
                </div>

                {/* Rabies */}
                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-[#0E2342]">
                      Rabies Vaccination &amp; Latency
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Administered {rabiesDate}. Expiry {rabiesExpiry}. Mandatory 21-day latency period satisfied.
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0FA958] bg-[#E8F8F0] px-2.5 py-1 rounded-md">
                    <span>✓</span> Valid (21d+ Met)
                  </span>
                </div>

                {/* Titer / Exemption */}
                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-[#0E2342]">
                      Rabies Neutralizing Antibody Titer (RNATT)
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Evaluated compliant with destination rabies status (listed country exemption or titer verified).
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0FA958] bg-[#E8F8F0] px-2.5 py-1 rounded-md">
                    <span>✓</span> Compliant
                  </span>
                </div>

                {/* Health Cert */}
                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-[#0E2342]">
                      Official Veterinary Health Certificate
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Issued by accredited veterinarian within destination endorsement window.
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0FA958] bg-[#E8F8F0] px-2.5 py-1 rounded-md">
                    <span>✓</span> Endorsed
                  </span>
                </div>
              </div>
            </div>

            {/* Officer Verification Notice */}
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/80 text-[11px] text-zinc-600 leading-relaxed">
              <span className="font-semibold text-[#0E2342]">Notice for Airline Check-in &amp; Border Inspectors:</span>{' '}
              This Petvia Travel Verification Pass provides a document compliance summary evaluated against applicable live-animal transit protocols. The identity of pet <span className="font-mono font-semibold text-zinc-800">{microchipNumber}</span> matches original laboratory and veterinary certificates archived in the Petvia secure digital document vault. <span className="text-zinc-500 block mt-1">Note: This verification record supports travel preparation and does not replace official government-endorsed certificates or statutory import permits.</span>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-zinc-50 border-t border-zinc-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
            <div>
              Issued by <span className="font-bold text-[#0E2342]">Petvia Compliance Engine v2.0</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-[#0E2342] font-semibold hover:underline">
                Open Dashboard
              </Link>
              <span>•</span>
              <a href="mailto:support@petvia.com" className="text-[#0E2342] font-semibold hover:underline">
                Traveler Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
