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
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 hover:border-zinc-300 text-xs font-semibold text-zinc-700 px-3.5 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <span>🖨️</span>
              <span>Print Official Pass</span>
            </button>
            {passData?.isPaid === false ? (
              <span className="inline-flex items-center gap-1 bg-amber-100 border border-amber-200 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                PROVISIONAL (UNPAID)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[11px] font-bold px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0FA958] animate-pulse" />
                LIVE VERIFIED
              </span>
            )}
          </div>
        </div>

        {/* Official Customs & Airline Verification Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-zinc-200/90 overflow-hidden print:border-none print:shadow-none">
          {/* Header Banner */}
          <div className="bg-[#0E2342] text-white p-6 sm:p-7 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6 text-8xl font-serif">
              🛂
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                  🐾
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold tracking-tight">
                    Petvia Pet Visa &amp; Customs Travel Pass
                  </h1>
                  <p className="text-[11px] text-zinc-300">
                    Official Digital Travel Clearance &amp; Port-of-Entry Verification
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

            {/* Clearance Banner */}
            {passData?.isPaid === false ? (
              <div className="bg-amber-500/20 border border-amber-400/40 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950 font-bold text-base shrink-0 shadow-sm">
                    🔒
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      PROVISIONAL PASS · ACTIVATION REQUIRED
                    </div>
                    <div className="text-[11px] text-amber-200 leading-tight">
                      This customs pass requires an active Complete Travel Plan (£19) for an official border clearance seal.
                    </div>
                  </div>
                </div>
                <Link
                  href="/#pricing"
                  className="shrink-0 px-3.5 py-1.5 bg-[#0FA958] hover:bg-[#0D934C] text-white text-xs font-bold rounded-lg shadow-xs transition-all active:scale-98 text-center print:hidden"
                >
                  Activate Pass (£19) →
                </Link>
              </div>
            ) : (
              <div className="bg-[#0FA958]/20 border border-[#0FA958]/40 rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0FA958] flex items-center justify-center text-white text-base shrink-0 shadow-sm">
                  ✓
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    CLEARED FOR BOARDING &amp; BORDER ENTRY
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
                  🇬🇧 United Kingdom
                </div>
                <div className="text-[11px] text-zinc-500">London (LHR)</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Destination
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0E2342] mt-0.5">
                  🇩🇪 Germany
                </div>
                <div className="text-[11px] text-zinc-500">Frankfurt (FRA)</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Regulation Scheme
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0E2342] mt-0.5">
                  EU Reg 576/2013
                </div>
                <div className="text-[11px] text-zinc-500">Non-Commercial Pet</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Inspection Status
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0FA958] mt-0.5">
                  ✓ Pre-Approved
                </div>
                <div className="text-[11px] text-zinc-500">Tamper-Verified</div>
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
                  <div className="text-xs font-bold text-[#0E2342]">Bailey</div>
                  <div className="text-[10px] text-zinc-500">Dog • Golden Retriever</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">ISO Microchip #</div>
                  <div className="text-xs font-bold font-mono text-[#0E2342]">
                    985141002847192
                  </div>
                  <div className="text-[10px] text-[#0FA958] font-medium">✓ ISO 11784/11785 Confirmed</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">Implant Date</div>
                  <div className="text-xs font-bold text-[#0E2342]">12 Apr 2023</div>
                  <div className="text-[10px] text-[#0FA958] font-medium">✓ Prior to Rabies Vaccine</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">Owner / Handler</div>
                  <div className="text-xs font-bold text-[#0E2342]">Sarah Miller</div>
                  <div className="text-[10px] text-zinc-500">Accompanying Traveler</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">Age &amp; Weight</div>
                  <div className="text-xs font-bold text-[#0E2342]">3 Years • 28.5 kg</div>
                  <div className="text-[10px] text-zinc-500">Neutered Male</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200/80">
                  <div className="text-[10px] text-zinc-400 uppercase">Digital Passport Vault</div>
                  <div className="text-xs font-bold text-[#0E2342]">4 Documents Linked</div>
                  <div className="text-[10px] text-[#0FA958] font-medium">✓ Cryptographically Sealed</div>
                </div>
              </div>
            </div>

            {/* Official Compliance Audit Table */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Border Inspection Checklist (EU / DEFRA Standards)
              </h2>
              <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden">
                {/* Microchip */}
                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-[#0E2342]">
                      15-Digit ISO 11784/11785 Microchip
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Implanted &amp; scanned before rabies immunization. Valid for EU/DEFRA scanners.
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
                      Rabies Booster Vaccination
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Nobivac Rabies (3-year). Administered 10 May 2024. Expiry 10 May 2027.
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0FA958] bg-[#E8F8F0] px-2.5 py-1 rounded-md">
                    <span>✓</span> Valid (21d+ Met)
                  </span>
                </div>

                {/* Titer */}
                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-[#0E2342]">
                      FAVN Rabies Neutralizing Antibody Titer
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Certified Level: 0.85 IU/ml (EU &amp; WHO requirement ≥ 0.50 IU/ml).
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0FA958] bg-[#E8F8F0] px-2.5 py-1 rounded-md">
                    <span>✓</span> 0.85 IU/ml
                  </span>
                </div>

                {/* Tapeworm */}
                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-[#0E2342]">
                      Echinococcus Multilocularis (Tapeworm Treatment)
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Praziquantel administered within the mandatory 24h–120h pre-entry window.
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
                      Official Veterinary Health Certificate / EU Animal Health Form
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Signed by official state-certified veterinary officer. Stamp validated.
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
              <span className="font-semibold text-[#0E2342]">Notice for Port &amp; Customs Officials:</span>{' '}
              This Petvia Travel Pass has been evaluated against bilateral live-animal transit protocols. The identity of pet <span className="font-mono font-semibold text-zinc-800">985141002847192</span> matches original laboratory and veterinary certificates archived in the Petvia digital document vault.
            </div>
          </div>

          {/* Footer */}
          <div className="bg-zinc-50 border-t border-zinc-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
            <div>
              Issued by <span className="font-bold text-[#0E2342]">Petvia Compliance Engine v1.2</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-[#0E2342] font-semibold hover:underline">
                Open Dashboard
              </Link>
              <span>•</span>
              <a href="mailto:customs-support@petvia.com" className="text-[#0E2342] font-semibold hover:underline">
                24/7 Port Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
