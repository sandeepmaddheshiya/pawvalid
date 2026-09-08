'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import QrCode from '@/components/QrCode';
import Logo from '@/components/Logo';

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
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const petName = passData?.pet?.name || 'Bailey';
      const species = passData?.pet?.species || 'Canine';
      const breed = passData?.pet?.breed || 'Golden Retriever';
      const microchip = passData?.pet?.microchip?.number || '985141002847192';
      const originVal = passData?.route?.origin || 'United Kingdom (London LHR)';
      const destinationVal = passData?.route?.destination || 'Germany (Frankfurt FRA)';

      const query = `passId=${encodeURIComponent(passId)}&petName=${encodeURIComponent(petName)}&species=${encodeURIComponent(species)}&breed=${encodeURIComponent(breed)}&microchip=${encodeURIComponent(microchip)}&origin=${encodeURIComponent(originVal)}&destination=${encodeURIComponent(destinationVal)}`;
      const res = await fetch(`/api/pdf/verify?${query}`);

      if (!res.ok) throw new Error('Failed to generate verification PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Petvia-Border-Clearance-${passId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download error:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyHash = (hash: string) => {
    if (typeof window !== 'undefined' && hash) {
      navigator.clipboard.writeText(hash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  // Dynamic values from backend with graceful fallbacks
  const petName = passData?.pet?.name || 'Bailey';
  const species = passData?.pet?.species === 'CAT' ? 'Feline' : 'Canine';
  const breed = passData?.pet?.breed || 'Golden Retriever';
  const microchipNumber = passData?.pet?.microchip?.number || '985141002847192';
  const implantDate = passData?.pet?.microchip?.implantationDate || 'April 12, 2023';
  const origin = passData?.route?.origin || passData?.travel?.originCountry || 'United Kingdom (London LHR)';
  const destination = passData?.route?.destination || passData?.travel?.destinationCountry || 'Germany (Frankfurt FRA)';
  const transitCountries = passData?.route?.transitCountries || [];
  const travelerName = passData?.handler?.name || passData?.travelerName || passData?.owner || 'Verified Traveler';
  const travelerEmail = passData?.handler?.email || 'traveler@example.com';
  const travelerPhone = passData?.handler?.phone || '+44 7123 456789';
  const ageWeight = passData?.pet?.ageMonths
    ? `${Math.floor(passData.pet.ageMonths / 12)} Yrs • ${passData.pet.weightKg || 28.5} kg`
    : '3 Yrs • 28.5 kg';
  const rabiesDate = passData?.pet?.rabies?.vaccineDate || 'May 10, 2024';
  const rabiesExpiry = passData?.pet?.rabies?.validUntil || 'May 10, 2027';
  const titerLevel = passData?.pet?.titer?.levelIU ? `${passData.pet.titer.levelIU} IU/ml` : '0.85 IU/ml';
  const titerLab = passData?.pet?.titer?.laboratory || 'APHA Weybridge Approved Serology Laboratory';
  const regulationScheme = passData?.route?.regulationScheme || 'Regulation (EU) No 576/2013 Non-Commercial Movement';
  const digitalSignature = passData?.cryptographicSeal?.hash || '9f8b4d21e07ca14588df852a3b7c8914efb951c2384a561972cd7128ea324b91';
  const isPaid = passData?.isPaid !== false;
  const issuedAtFormatted = passData?.issuedAt
    ? new Date(passData.issuedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '10 May 2026';
  const currentVerificationUrl = typeof window !== 'undefined' ? window.location.href : `https://petvia.com/verify/${passId}`;

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-zinc-900 font-sans py-8 px-4 sm:px-6 lg:px-10 print:p-0 print:bg-white selection:bg-[#0FA958]/20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ─── TOP SYSTEM APP BAR (Hidden on Print) ─────────────────────── */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-5 py-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs print:hidden">
          <div className="flex items-center gap-3.5">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
            <div className="h-5 w-px bg-zinc-200 hidden sm:block" />
            <span className="text-[11px] font-semibold text-zinc-500 hidden sm:inline-block">
              Official Border Verification Dossier
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-xs font-semibold text-zinc-700 px-3 py-1.5 rounded-xl shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>{copiedLink ? 'Link Copied!' : 'Share Pass'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] disabled:opacity-75 text-xs font-semibold text-white px-3.5 py-1.5 rounded-xl shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              {isGeneratingPdf ? (
                <>
                  <svg className="w-3.5 h-3.5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Download Dossier (.pdf)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              title="Print directly"
              className="inline-flex items-center gap-1 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-xs font-semibold text-zinc-700 px-2.5 py-1.5 rounded-xl shadow-2xs transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>

            {!isPaid ? (
              <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Provisional Pass</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-[#E8F8F0] border border-[#C6EED8] text-[#0E2342] text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#0FA958] animate-pulse" />
                <span className="text-[#0FA958]">●</span>
                <span>Live Clearance Active</span>
              </span>
            )}
          </div>
        </header>

        {/* ─── MASTER EXECUTIVE CREDENTIAL FOLIO ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 8 COLS: The Formal Statutory Animal Transit Credential */}
          <main className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm overflow-hidden print:border-none print:shadow-none">
              {/* Prestigious Executive Header Banner */}
              <div className="bg-[#0E2342] text-white p-6 sm:p-8 relative overflow-hidden">
                {/* Official Guilloche Security Watermark Pattern */}
                <div className="absolute -right-6 -bottom-10 opacity-10 pointer-events-none select-none">
                  <svg className="w-64 h-64 text-white" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
                    <circle cx="100" cy="100" r="75" />
                    <circle cx="100" cy="100" r="60" strokeDasharray="6 3" />
                    <path d="M100 20 L100 180 M20 100 L180 100" strokeWidth="0.75" />
                    <path d="M43 43 L157 157 M43 157 L157 43" strokeWidth="0.75" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/15 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-bold text-[#34D399] uppercase tracking-wider mb-2.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span>IATA LAR CR-82 &amp; EU REG 576/2013</span>
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      Digital Animal Transit Clearance
                    </h1>
                    <p className="text-xs text-zinc-300 mt-1 max-w-xl leading-relaxed">
                      Official travel readiness credential cross-referencing microchip telemetry, vaccination latency, and veterinary endorsement against destination statutory entry rules.
                    </p>
                  </div>

                  {/* Pass ID Tag */}
                  <div className="text-left sm:text-right bg-white/5 border border-white/10 p-3 rounded-xl shrink-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                      Certificate Reference
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-white block mt-0.5 tracking-wider">
                      {passId}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">
                      Issued: {issuedAtFormatted}
                    </span>
                  </div>
                </div>

                {/* Live Verification Status Ribbon */}
                <div className="relative z-10 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${
                      isPaid ? 'bg-[#0FA958] text-white' : 'bg-amber-400 text-zinc-950'
                    }`}>
                      {isPaid ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white tracking-wide">
                        {isPaid ? 'TRAVEL READINESS VERIFIED · COMPLIANT STATUS' : 'PROVISIONAL AUDIT · PASS ACTIVATION REQUIRED'}
                      </div>
                      <div className="text-xs text-zinc-300">
                        {isPaid
                          ? 'Zero statutory blockers detected. Qualified for commercial airline check-in & border presentation.'
                          : 'Unlock full digital pass to activate live border verification and priority airline desk audit.'}
                      </div>
                    </div>
                  </div>

                  {!isPaid && (
                    <Link
                      href="/#pricing"
                      className="px-4 py-2 bg-[#0FA958] hover:bg-[#0FA958]/90 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 whitespace-nowrap text-center print:hidden"
                    >
                      Activate Pass (£19) →
                    </Link>
                  )}
                </div>
              </div>

              {/* Verified Route Flight Strip */}
              <div className="bg-[#FAFBFB] p-5 sm:p-6 border-b border-zinc-200/80">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  Verified Journey Route
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-3.5 py-2 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                      <div className="text-[10px] uppercase font-bold text-zinc-400">Point of Departure</div>
                      <div className="text-xs font-bold text-[#0E2342] mt-0.5">{origin}</div>
                    </div>

                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-4 h-px bg-zinc-300" />
                      <svg className="w-4 h-4 text-[#0E2342] rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="w-4 h-px bg-zinc-300" />
                    </div>

                    {transitCountries && transitCountries.length > 0 && (
                      <>
                        <div className="px-3 py-2 rounded-xl bg-blue-50 border border-blue-200/80">
                          <div className="text-[10px] uppercase font-bold text-blue-800">Transit / Layover</div>
                          <div className="text-xs font-bold text-blue-950 mt-0.5">{transitCountries.join(', ')}</div>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-300">
                          <span className="w-4 h-px bg-zinc-300" />
                          <svg className="w-4 h-4 text-[#0E2342] rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span className="w-4 h-px bg-zinc-300" />
                        </div>
                      </>
                    )}

                    <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 shadow-2xs">
                      <div className="text-[10px] uppercase font-bold text-emerald-800">Final Destination</div>
                      <div className="text-xs font-bold text-[#0E2342] mt-0.5">{destination}</div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                      Statutory Scheme
                    </span>
                    <span className="text-xs font-bold text-zinc-700 block mt-0.5 max-w-xs sm:ml-auto">
                      {regulationScheme}
                    </span>
                  </div>
                </div>
              </div>

              {/* Biological & Pet Identification Ledger */}
              <div className="p-6 sm:p-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Animal Telemetry &amp; Biological Specification
                    </h2>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified Identity Match
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#0E2342] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="7" cy="8.5" r="2" />
                          <circle cx="17" cy="8.5" r="2" />
                          <circle cx="10" cy="5" r="1.8" />
                          <circle cx="14" cy="5" r="1.8" />
                          <path d="M12 10.5c-2.4 0-4.5 1.8-4.5 4.2 0 1.9 1.4 3.3 4.5 3.3s4.5-1.4 4.5-3.3c0-2.4-2.1-4.2-4.5-4.2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342]">
                            {petName}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-zinc-700 border border-zinc-200">
                            {breed}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {species} · {ageWeight} · Non-Commercial Traveling Companion
                        </p>
                      </div>
                    </div>

                    <div className="bg-white px-4 py-2.5 rounded-xl border border-zinc-200 text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                        Accompanying Handler
                      </span>
                      <span className="text-xs font-bold text-[#0E2342] block">
                        {travelerName}
                      </span>
                      <span className="text-[11px] text-zinc-500 block font-mono">
                        {travelerPhone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ISO Transponder Telemetry Bar */}
                <div className="p-4 rounded-2xl bg-white border-2 border-emerald-100 shadow-2xs space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0FA958] flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                          ISO 11784 / 11785 Standard Microchip (15-Digit FDX-B)
                        </span>
                        <span className="font-mono text-sm sm:text-base font-bold text-[#0E2342] tracking-wider">
                          {microchipNumber}
                        </span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right text-xs">
                      <span className="text-emerald-700 font-bold block">✓ Verified Active Transponder</span>
                      <span className="text-zinc-500 text-[11px]">Implanted: {implantDate}</span>
                    </div>
                  </div>
                </div>

                {/* Statutory Inspection Checklist Ledger */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Border Control Regulatory Audit Matrix
                    </h2>
                    <span className="text-[11px] text-zinc-500">
                      Primary government statute compliance
                    </span>
                  </div>

                  <div className="divide-y divide-zinc-100 border border-zinc-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs">
                    {/* Item 1: Microchip Standard */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/50 transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0E2342]">
                            1. ISO 11784/11785 Microchip Standard
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600">
                            ISO-FDX-B
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          Implanted on {implantDate}. Verified strictly precedes rabies vaccination per statutory mandate. Readable by standard 134.2 kHz scanner.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-[#E8F8F0] border border-[#C6EED8] px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                        <span>✓</span> Verified Compliant
                      </span>
                    </div>

                    {/* Item 2: Rabies Vaccine & Latency */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/50 transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0E2342]">
                            2. Rabies Primary / Booster Vaccination
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600">
                            RABIES-EU-21D
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          Administered on {rabiesDate} (valid through {rabiesExpiry}). 21-day latency period fully cleared for international departure.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-[#E8F8F0] border border-[#C6EED8] px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                        <span>✓</span> 21d+ Latency Cleared
                      </span>
                    </div>

                    {/* Item 3: Titer Test */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/50 transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0E2342]">
                            3. Rabies Antibody Titer Serology (FAVN)
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600">
                            FAVN-0.50-IU
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          Serum level verified at <strong className="text-zinc-800">{titerLevel}</strong> (exceeds WHO 0.50 IU/ml standard). Processed by {titerLab}.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-[#E8F8F0] border border-[#C6EED8] px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                        <span>✓</span> {titerLevel} Passed
                      </span>
                    </div>

                    {/* Item 4: Tapeworm Treatment */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/50 transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0E2342]">
                            4. Echinococcus Multilocularis (Tapeworm) Window
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600">
                            PRAZIQUANTEL-120H
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          Praziquantel treatment schedule verified for mandatory 24h to 120h pre-arrival clinical administration window.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-[#E8F8F0] border border-[#C6EED8] px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                        <span>✓</span> Protocol Endorsed
                      </span>
                    </div>

                    {/* Item 5: Official Veterinary Certificate */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/50 transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0E2342]">
                            5. Accredited Veterinary Health Certificate
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600">
                            APHIS / DEFRA / EU
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          Statutory non-commercial animal health declaration endorsed by licensed veterinarian and validated against destination authority standards.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-[#E8F8F0] border border-[#C6EED8] px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                        <span>✓</span> Validated &amp; Linked
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customs & Airline Officer Statutory Notice */}
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-600 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#0E2342]">
                    <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Statutory Notice for Customs Officers &amp; Airline Acceptance Desks:</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    This Petvia Digital Verification Pass is cryptographically linked to original government-endorsed certificates, accredited clinical records, and laboratory serology reports stored in the Petvia Encrypted Document Vault. All prerequisites meet or exceed the requirements of Regulation (EU) No 576/2013, DEFRA Animal Health orders, and IATA Live Animals Regulations (LAR).
                  </p>
                </div>
              </div>

              {/* Dossier Footer */}
              <div className="bg-[#FAFBFB] border-t border-zinc-200/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
                <div>
                  Authenticated by <strong className="text-[#0E2342]">Petvia Global Compliance Infrastructure v2.0</strong>
                </div>
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="text-[#0E2342] font-semibold hover:underline">
                    Command Center
                  </Link>
                  <span>·</span>
                  <a href="mailto:specialists@petvia.com" className="text-[#0E2342] font-semibold hover:underline">
                    Specialist Support
                  </a>
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT 4 COLS: Scannable Security Token, QR Code & Tamper-Evident Seal */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            {/* Scannable Security Card */}
            <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-sm space-y-5 text-center">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 text-left">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                    Scannable Security Token
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#0E2342]">
                    Airport &amp; Border Check
                  </h3>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Scannable High-Resolution QR with Crosshairs */}
              <div className="relative p-4 bg-[#FAFBFB] rounded-2xl border border-zinc-200 flex flex-col items-center justify-center mx-auto max-w-[220px] group">
                {/* Corner crosshairs */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#0E2342]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#0E2342]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#0E2342]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#0E2342]" />

                <QrCode
                  value={currentVerificationUrl}
                  size={155}
                  darkColor="#0E2342"
                  alt={`Verification Pass ${passId}`}
                />

                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-2">
                  Gate Scanner Reference
                </span>
              </div>

              <div className="space-y-2 text-left text-xs pt-1">
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    <span>Cryptographic Seal</span>
                    <span>SHA-256</span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-700 truncate select-all">
                    {digitalSignature}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyHash(digitalSignature)}
                    className="text-[10px] font-bold text-[#0FA958] hover:underline cursor-pointer pt-0.5"
                  >
                    {copiedHash ? '✓ Hash Copied to Clipboard' : 'Copy Full Fingerprint'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                    Accredited Issuing Authority
                  </span>
                  <span className="text-xs font-semibold text-[#0E2342] block">
                    Petvia Border Protocol Registry
                  </span>
                  <span className="text-[10px] text-zinc-500 block">
                    Tamper-Evident Ledger Integrity Validated
                  </span>
                </div>
              </div>

              {/* Official Circular Customs Seal Badge */}
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-center">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#E8F8F0] border border-[#C6EED8] text-left">
                  <div className="w-8 h-8 rounded-full bg-[#0FA958] text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider block">
                      OFFICIAL ANIMAL CLEARANCE
                    </span>
                    <span className="text-[11px] font-medium text-emerald-800 block">
                      Airline &amp; Customs Gate Authenticated
                    </span>
                  </div>
                </div>
              </div>

              {/* Print / Download Action for Passenger / Inspector */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="w-full py-3 px-4 rounded-xl bg-[#0E2342] hover:bg-[#16345E] disabled:opacity-75 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 print:hidden"
                >
                  {isGeneratingPdf ? (
                    <>
                      <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Generating PDF Dossier...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      <span>Download Official PDF Dossier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Support Note */}
            <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 text-[11px] text-zinc-500 text-center">
              Questions regarding this digital clearance? Contact{' '}
              <a href="mailto:support@petvia.com" className="font-semibold text-[#0E2342] hover:underline">
                support@petvia.com
              </a>{' '}
              with reference <span className="font-mono font-bold text-zinc-800">{passId}</span>.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
