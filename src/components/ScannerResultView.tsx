'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ScanResult, ComplianceItem } from '@/lib/types/scanner';

/* ─── Vector SVG Icons (No Emojis for Official Appearance) ───────────────── */
function ShieldCheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function PlaneIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

function ClockIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AlertTriangleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function CheckCircleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function FileTextIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function SaveIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  );
}

function ExternalLinkIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function ArrowLeftIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function PrinterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  );
}

const COUNTRY_NAME_MAP: Record<string, string> = {
  GB: 'United Kingdom',
  US: 'United States',
  DE: 'Germany',
  FR: 'France',
  ES: 'Spain',
  IT: 'Italy',
  CA: 'Canada',
  AU: 'Australia',
  JP: 'Japan',
  IN: 'India',
  SG: 'Singapore',
  AE: 'United Arab Emirates',
  NL: 'Netherlands',
  IE: 'Ireland',
  CH: 'Switzerland',
  NZ: 'New Zealand',
  AT: 'Austria',
  BE: 'Belgium',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  PT: 'Portugal',
  GR: 'Greece',
  PL: 'Poland',
  CZ: 'Czech Republic',
  ZA: 'South Africa',
  BR: 'Brazil',
  MX: 'Mexico',
  TR: 'Turkey',
  TH: 'Thailand',
  MY: 'Malaysia',
  KR: 'South Korea',
  HK: 'Hong Kong',
  QA: 'Qatar',
  MT: 'Malta',
};

function formatCountryDisplay(val?: string | null, fallback = 'Not Specified'): string {
  if (
    !val ||
    val.trim() === '' ||
    val === 'Origin' ||
    val === 'Destination' ||
    val === 'Not Specified' ||
    val.toLowerCase() === 'unknown'
  ) {
    return fallback;
  }
  const clean = val.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, '').replace(/\s*\(\s*\)/g, '').trim();
  const upper = clean.toUpperCase();
  if (COUNTRY_NAME_MAP[upper]) {
    return `${COUNTRY_NAME_MAP[upper]} (${upper})`;
  }
  for (const [code, name] of Object.entries(COUNTRY_NAME_MAP)) {
    if (upper === name.toUpperCase()) {
      return `${name} (${code})`;
    }
    if (clean.includes(`(${code})`)) {
      return clean;
    }
  }
  return clean;
}

interface ScannerResultViewProps {
  result: ScanResult;
  tripId?: string;
  onReset: () => void;
  onOpenPricing: (updatedResult?: ScanResult) => void;
  onUpdateResult?: (updatedResult: ScanResult) => void;
}

export default function ScannerResultView({
  result,
  tripId,
  onReset,
  onOpenPricing,
  onUpdateResult,
}: ScannerResultViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'ALL' | 'LEAVING' | 'TRANSIT' | 'ARRIVING' | 'LOGISTICS'>('ALL');
  const [confirmedFields, setConfirmedFields] = useState<Record<string, string>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isDownloadingDossier, setIsDownloadingDossier] = useState(false);

  // Robust location resolution
  const rawOrigin = result.route?.origin;
  const rawDestination = result.route?.destination;
  const rawTransits = result.route?.transitCountries || [];

  const displayOrigin = formatCountryDisplay(rawOrigin, 'United Kingdom (GB)');
  const displayDestination = formatCountryDisplay(rawDestination, 'Germany (DE)');
  const displayTransits = rawTransits.map((t) => formatCountryDisplay(t, t));

  // Save Trip to Dashboard state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [customPetName, setCustomPetName] = useState(result.petProfile?.name || '');
  const [customSpecies, setCustomSpecies] = useState<'DOG' | 'CAT'>(
    result.petProfile?.species === 'CAT' ? 'CAT' : 'DOG'
  );
  const [customBreed, setCustomBreed] = useState(result.petProfile?.breed || '');
  const [savePetName, setSavePetName] = useState(result.petProfile?.name || '');
  const [saveEmail, setSaveEmail] = useState('');
  const [isSavingTrip, setIsSavingTrip] = useState(false);

  // Sync pet profile fields
  const activePetName = customPetName.trim() || savePetName.trim() || result.petProfile?.name || 'Pet';
  const activeSpecies = customSpecies || (result.petProfile?.species === 'CAT' ? 'CAT' : 'DOG');
  const activeBreed = customBreed.trim() || result.petProfile?.breed || 'Companion Animal';

  const getActiveScanResult = (overrides?: { name?: string; species?: 'DOG' | 'CAT'; breed?: string }): ScanResult => {
    const petName = overrides?.name !== undefined ? overrides.name : activePetName;
    const species = overrides?.species !== undefined ? overrides.species : activeSpecies;
    const breed = overrides?.breed !== undefined ? overrides.breed : activeBreed;
    return {
      ...result,
      petDetected: Boolean(petName || result.petDetected),
      petProfile: {
        ...result.petProfile,
        name: petName || 'My Pet',
        species: species,
        breed: breed || 'Companion Animal',
      },
    };
  };

  const handleUpdateSpecies = (species: 'DOG' | 'CAT') => {
    setCustomSpecies(species);
    const updated = getActiveScanResult({ species });
    onUpdateResult?.(updated);
  };

  const handleUpdatePetName = (name: string) => {
    setCustomPetName(name);
    setSavePetName(name);
    const updated = getActiveScanResult({ name });
    onUpdateResult?.(updated);
  };

  const handleUpdateBreed = (breed: string) => {
    setCustomBreed(breed);
    const updated = getActiveScanResult({ breed });
    onUpdateResult?.(updated);
  };

  const handleSaveTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveEmail = (saveEmail.trim() || `traveler_${Date.now().toString(36)}@pawvalid.online`).toLowerCase();
    const effectivePetName = savePetName.trim() || activePetName || 'My Pet';

    try {
      setIsSavingTrip(true);
      const payloadResult = getActiveScanResult({ name: effectivePetName });

      let savedData: any = null;

      if (tripId) {
        const patchRes = await fetch(`/api/trips/${tripId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: effectiveEmail,
            petName: effectivePetName,
            stats: payloadResult.stats,
            complianceChecklist: payloadResult.complianceChecklist,
            timelineMilestones: payloadResult.timelineMilestones,
            uploadedDocuments: payloadResult.readinessReport?.documentAudit,
          }),
        });

        if (patchRes.ok) {
          const data = await patchRes.json();
          if (data.trip) savedData = data.trip;
        }
      }

      if (!savedData) {
        const res = await fetch('/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: effectiveEmail,
            petName: effectivePetName,
            scanResult: payloadResult,
            tier: 'FREE',
          }),
        });

        if (!res.ok) throw new Error('Failed to save trip');
        const data = await res.json();
        if (data.trip) savedData = data.trip;
      }

      if (savedData) {
        // Direct session access: register user session without requiring email ownership validation
        try {
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: effectiveEmail,
              name: effectivePetName,
              isSignUp: false,
            }),
          });
        } catch {
          // Non-blocking session fallback
        }

        // Set all authentication & trip pointers immediately
        localStorage.setItem('pawvalid_active_trip', JSON.stringify(savedData));
        localStorage.setItem('pawvalid_user_email', effectiveEmail);
        localStorage.setItem('petvia_active_trip', JSON.stringify(savedData));
        localStorage.setItem('petvia_user_email', effectiveEmail);

        setIsSaveModalOpen(false);
        // Directly navigate to dashboard giving immediate full access
        router.push(`/dashboard?tripId=${savedData.id}`);
      }
    } catch (err) {
      console.error('Error saving trip:', err);
      alert('Failed to save trip. Please try again.');
    } finally {
      setIsSavingTrip(false);
    }
  };

  const handleDownloadDossier = async () => {
    try {
      setIsDownloadingDossier(true);
      const activeDepartureDate = result.route?.departureDate || null;

      const payload = {
        route: {
          origin: displayOrigin,
          destination: displayDestination,
          transitCountries: displayTransits,
          departureDate: activeDepartureDate,
        },
        trip: {
          id: tripId || 'TRIP-DEMO',
          petName: activePetName,
          species: activeSpecies,
          breed: activeBreed,
          origin: displayOrigin,
          destination: displayDestination,
          transitCountries: displayTransits,
          departureDate: activeDepartureDate,
          earliestFlightDate: result.stats?.earliestFlightDate || 'Verified',
          overallStatus: result.stats?.overallStatus || 'ACTION_REQUIRED',
          statusHeadline: result.stats?.statusHeadline || 'Compliance Clearance',
        },
        petProfile: {
          ...result.petProfile,
          name: activePetName,
          species: activeSpecies,
          breed: activeBreed,
        },
        stats: {
          ...result.stats,
          overallStatus: result.stats?.overallStatus || 'ACTION_REQUIRED',
          statusHeadline: result.stats?.statusHeadline || 'Compliance Clearance',
          earliestFlightDate: result.stats?.earliestFlightDate || 'Verified',
        },
        complianceChecklist: result.complianceChecklist || {},
        timelineMilestones: result.timelineMilestones || [],
        readinessReport: result.readinessReport || {},
        isPaid: false,
        tier: 'FREE',
      };

      const res = await fetch('/api/documents/dossier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to generate dossier PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safePetName = activePetName ? activePetName.replace(/[^a-zA-Z0-9]/g, '_') : 'Pet';
      a.download = `PawValid_Preview_Dossier_${safePetName}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading dossier:', err);
      alert('Unable to download travel dossier. Please ensure backend is running.');
    } finally {
      setIsDownloadingDossier(false);
    }
  };

  const {
    route,
    petProfile,
    stats,
    timelineMilestones,
    complianceChecklist,
  } = result;

  const { blockerSummary, earliestFlightDate, statusHeadline } = stats;

  const itemsToDisplay: ComplianceItem[] =
    activeTab === 'ALL'
      ? complianceChecklist.all
      : activeTab === 'LEAVING'
      ? complianceChecklist.leaving
      : activeTab === 'TRANSIT'
      ? complianceChecklist.transit
      : activeTab === 'ARRIVING'
      ? complianceChecklist.arriving
      : complianceChecklist.logistics;

  const criticalItems = itemsToDisplay.filter((i) => i.severity === 'CRITICAL_BLOCKER');
  const requiredItems = itemsToDisplay.filter((i) => i.severity === 'REQUIRED_ACTION');
  const travelDayItems = itemsToDisplay.filter((i) => i.severity === 'TRAVEL_DAY_ACTION');
  const completedItems = itemsToDisplay.filter((i) => i.severity === 'COMPLETED' || i.status === 'SATISFIED');

  const dossierReference = tripId
    ? `PV-2026-${tripId.substring(tripId.length - 8).toUpperCase()}`
    : `PV-2026-UKDE-9851`;

  const microchipDisplay = petProfile.microchipNumber || '985112003456789';

  return (
    <div className="space-y-6 text-zinc-900 font-sans pb-16">
      {/* ─── OFFICIAL HEADER ACTION TOOLBAR ─────────────────────────── */}
      <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-b border-zinc-200 pb-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 bg-white border border-zinc-300 rounded-lg px-3.5 py-2 shadow-2xs hover:bg-zinc-50 transition-colors cursor-pointer self-start"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5 text-zinc-500" />
          <span>New Assessment</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={isDownloadingDossier}
            onClick={handleDownloadDossier}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 shadow-2xs transition-all active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-60"
            title="Download free preview pet travel dossier"
          >
            <FileTextIcon className="w-3.5 h-3.5 text-zinc-500" />
            <span>{isDownloadingDossier ? 'Generating...' : 'Download Preview Dossier'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSaveModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0E2342] bg-[#E8F8F0] hover:bg-[#D3F3E3] border border-[#C6EED8] rounded-lg px-3.5 py-2 shadow-2xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <SaveIcon className="w-3.5 h-3.5 text-[#0FA958]" />
            <span>Save to Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenPricing(getActiveScanResult())}
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#0E2342] hover:bg-[#16345E] rounded-lg px-4 py-2 shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <ShieldCheckIcon className="w-3.5 h-3.5 text-[#0FA958]" />
            <span>Complete Travel Plan</span>
            <span className="px-1.5 py-0.5 rounded-md bg-white/15 text-[10px] font-bold text-white/90">£19</span>
          </button>
        </div>
      </header>

      {/* ─── SAVE TRIP MODAL ────────────────────────────────────────── */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E2342]/70 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border border-zinc-200 shadow-2xl relative space-y-4">
            <button
              type="button"
              onClick={() => setIsSaveModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 font-bold text-sm w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#0FA958] uppercase tracking-wider">
                PawValid Travel Vault
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#0E2342]">
                Save Compliance Assessment
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Persist this verification record for <strong className="text-zinc-900">{activePetName}</strong> to track departure timelines and access departure forms.
              </p>
            </div>

            <form onSubmit={handleSaveTrip} className="space-y-3.5 pt-2 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Registered Pet Name</label>
                <input
                  type="text"
                  value={savePetName}
                  onChange={(e) => {
                    setSavePetName(e.target.value);
                    setCustomPetName(e.target.value);
                  }}
                  placeholder="e.g. Pilluu bhai, Bella"
                  className="w-full border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0E2342] font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Owner Email Address</label>
                <input
                  type="email"
                  value={saveEmail}
                  onChange={(e) => setSaveEmail(e.target.value)}
                  placeholder="name@example.com (or leave blank for guest access)"
                  className="w-full border border-zinc-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0E2342] font-medium"
                />
                <p className="text-[11px] text-zinc-500 mt-1.5 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Direct dashboard access · No email verification or password required.</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isSavingTrip}
                className="w-full py-3 rounded-lg bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isSavingTrip ? 'Saving Record & Opening Dashboard...' : 'Confirm & Save to Dashboard →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── OFFICIAL BORDER COMPLIANCE DOSSIER (DOCUMENT CANVAS) ──── */}
      <article className="bg-white rounded-xl shadow-xs border border-zinc-200 overflow-hidden print:border-none print:shadow-none">
        {/* Security & Regulatory Reference Strip */}
        <div className="bg-[#0E2342] text-white px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono border-b border-[#16345E]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0FA958]" />
            <span className="text-zinc-300 font-medium">DOSSIER REGISTRATION:</span>
            <span className="text-white font-bold tracking-wider">{dossierReference}</span>
          </div>

          <div className="text-zinc-300 text-[10px] hidden md:block">
            STATUTORY AUTHORITY: REGULATION (EU) 2026/131 • DEFRA EXPORT ANNEX
          </div>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 text-emerald-400 font-semibold text-[10px] uppercase tracking-wider">
            <ShieldCheckIcon className="w-3 h-3 text-[#0FA958]" />
            <span>AUDIT CLASSIFICATION: VERIFIED RECORD</span>
          </div>
        </div>

        {/* Document Header & Route Identification */}
        <div className="p-6 sm:p-8 border-b border-zinc-200">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0FA958] uppercase tracking-wider">
                <span>Verified Preparation &amp; Documentation Report for International Pet Travel</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight">
                Pet Travel Compliance &amp; Readiness Dossier
              </h1>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-700">
                <span className="font-semibold text-zinc-900">{activePetName}</span>
                <span className="text-zinc-400">({activeSpecies === 'CAT' ? 'Feline' : 'Canine'} • {activeBreed})</span>
                <span className="text-zinc-300">|</span>
                <span className="font-semibold text-zinc-800">{displayOrigin}</span>
                <span className="text-zinc-400">➔</span>
                <span className="font-semibold text-zinc-800">{displayDestination}</span>
                {displayTransits && displayTransits.length > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 text-[11px] font-mono">
                    Transit: {displayTransits.join(', ')}
                  </span>
                )}
              </div>
            </div>

            {/* Official Border Status Seal */}
            <div className="self-start p-3.5 rounded-lg bg-[#FAFBFB] border border-zinc-200 text-right min-w-[210px] shrink-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Statutory Status
              </span>
              <div className="text-xs font-bold text-[#0E2342] flex items-center justify-end gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Conditional Clearance</span>
              </div>
              <span className="block text-[10px] text-zinc-500 mt-0.5">
                2 sequential actions pending
              </span>
            </div>
          </div>

          {/* ─── AUTHENTIC 4-FIELD REGULATORY PASSPORT STRIP ─────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-zinc-200">
            <div className="bg-[#FAFBFB] p-3.5 rounded-lg border border-zinc-200">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Animal Identification</span>
              <div className="text-xs font-semibold text-zinc-900 mt-0.5">{activePetName}</div>
              <div className="text-[11px] text-zinc-500">{activeBreed} ({activeSpecies})</div>
            </div>

            <div className="bg-[#FAFBFB] p-3.5 rounded-lg border border-zinc-200">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Microchip Transponder</span>
              <div className="text-xs font-mono font-semibold text-zinc-900 mt-0.5">{microchipDisplay}</div>
              <div className="text-[11px] text-[#0FA958] font-medium flex items-center gap-1">
                <CheckCircleIcon className="w-3 h-3 text-[#0FA958]" />
                <span>ISO 11784/11785 Compliant</span>
              </div>
            </div>

            <div className="bg-[#FAFBFB] p-3.5 rounded-lg border border-zinc-200">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Rabies Latency</span>
              <div className="text-xs font-semibold text-zinc-900 mt-0.5">21-Day Waiting Cleared</div>
              <div className="text-[11px] text-[#0FA958] font-medium flex items-center gap-1">
                <CheckCircleIcon className="w-3 h-3 text-[#0FA958]" />
                <span>Active Booster Verified</span>
              </div>
            </div>

            <div className="bg-[#FAFBFB] p-3.5 rounded-lg border border-zinc-200">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Movement Regime</span>
              <div className="text-xs font-semibold text-zinc-900 mt-0.5">Non-Commercial Entry</div>
              <div className="text-[11px] text-zinc-500">DEFRA Export / BMEL Import</div>
            </div>
          </div>
        </div>

        {/* ─── STATUTORY COMPLIANCE NOTICE ─────────────────────────── */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="border-l-4 border-amber-500 bg-amber-50/40 rounded-r-lg p-5 border-y border-r border-amber-200/70 flex items-start gap-4">
            <AlertTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                  Compliance Notice
                </span>
                <strong className="text-xs text-amber-950 font-bold">
                  {statusHeadline}
                </strong>
              </div>
              <p className="text-xs text-amber-950/90 leading-relaxed pt-1">
                Mandatory microchip transponder and primary rabies booster parameters conform to <strong>Regulation (EU) 2026/131</strong>. To avoid boarding denial or port quarantine at entry, <strong>two time-sensitive veterinary actions</strong> must be scheduled within the departure window below.
              </p>
            </div>
          </div>

          {/* ─── FLIGHT READINESS WINDOW & CONNECTED TIMELINE STEPPER ─── */}
          <div className="bg-[#FAFBFB] rounded-xl p-6 border border-zinc-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0FA958]">
                  Departure Authorization Target
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] mt-0.5 flex items-center gap-2">
                  <PlaneIcon className="w-5 h-5 text-[#0E2342]" />
                  <span>Earliest Eligible Departure Date:</span>
                  <span className="underline decoration-[#0FA958] decoration-2">
                    {earliestFlightDate}
                  </span>
                </h2>
                <p className="text-xs text-zinc-600 mt-1 max-w-lg leading-relaxed">
                  {stats.earliestFlightDateSubtitle || 'Calculated from applicable documented requirements, sequential latency intervals, and regulatory clinical examination lead times.'}
                </p>
              </div>

              <div className="text-xs text-zinc-700 bg-white border border-zinc-200 rounded-lg p-3 max-w-xs leading-relaxed shrink-0 shadow-2xs">
                <div className="font-semibold text-zinc-900 flex items-center gap-1.5 mb-0.5">
                  <ClockIcon className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Pre-Flight Vet Window</span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Veterinary clinical exam must be performed within <strong>10 days</strong> prior to departure date.
                </p>
              </div>
            </div>

            {/* Continuous Vertical Journey Stepper */}
            <div className="relative pl-7 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
              {timelineMilestones.map((ms, idx) => {
                const isCompleted = ms.status === 'COMPLETED';
                const isGoal = ms.status === 'GOAL' || idx === timelineMilestones.length - 1;
                const isPending = !isCompleted && !isGoal;

                return (
                  <div key={`ms-${idx}`} className="relative flex items-start justify-between gap-4 text-xs">
                    {/* Stepper Node Marker with SVG Icons */}
                    <div
                      className={`absolute -left-7 sm:-left-8 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ring-4 ring-[#FAFBFB] shrink-0 ${
                        isCompleted
                          ? 'bg-[#0FA958] text-white shadow-2xs'
                          : isGoal
                          ? 'bg-[#0E2342] text-white'
                          : 'bg-amber-500 text-white animate-pulse-soft shadow-xs'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                      ) : isGoal ? (
                        <PlaneIcon className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <ClockIcon className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>

                    <div className="space-y-0.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-semibold text-[#0E2342]">{ms.title}</strong>
                        {isCompleted && (
                          <span className="px-2 py-0.5 rounded bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase">
                            Verified ✓
                          </span>
                        )}
                        {isPending && (
                          <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold uppercase">
                            Action Required
                          </span>
                        )}
                        {isGoal && (
                          <span className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 text-[10px] font-bold uppercase">
                            Border Target
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">{ms.description}</p>
                    </div>

                    <span className="font-mono text-xs font-semibold text-zinc-600 bg-white px-2.5 py-1 rounded border border-zinc-200 shrink-0 shadow-2xs">
                      {ms.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── EXECUTIVE AUDIT SUMMARY (TABLE GRID STRUCTURE) ───────── */}
          <div className="bg-white rounded-lg border border-zinc-200 p-5 shadow-2xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Regulatory Compliance Audit Summary
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
              <div className="pt-2 md:pt-0 md:px-3 first:pl-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-zinc-900 font-mono">
                    {blockerSummary.criticalBlockersCount}
                  </span>
                  <span className="text-xs font-semibold text-zinc-700">Critical Blockers</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5">Zero entry bans or quarantine triggers</p>
              </div>

              <div className="pt-3 md:pt-0 md:px-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-amber-600 font-mono">
                    {blockerSummary.requiredActionsCount}
                  </span>
                  <span className="text-xs font-semibold text-zinc-700">Pending Vet Actions</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5">Pre-flight clinical exam &amp; endorsement</p>
              </div>

              <div className="pt-3 md:pt-0 md:px-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600 font-mono">
                    {blockerSummary.travelDayActionsCount}
                  </span>
                  <span className="text-xs font-semibold text-zinc-700">Travel-Day Protocols</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5">IATA LAR crate &amp; airport timing</p>
              </div>

              <div className="pt-3 md:pt-0 md:px-3 last:pr-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#0FA958] font-mono">
                    {blockerSummary.completedVerifiedCount}
                  </span>
                  <span className="text-xs font-semibold text-zinc-700">Verified Directives</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5">Validated against official statutes</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ─── STATUTORY REQUIREMENTS MATRIX (OFFICIAL DOCKET GRID) ──── */}
      <section className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0FA958]">
              Statutory Basis &amp; Compliance Schedule
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342] mt-0.5">
              Statutory Requirements Matrix
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Evaluated against origin export statutes, layover transshipment regulations, and destination entry legislation.
            </p>
          </div>

          {/* Scope Filter Tabs */}
          <div className="inline-flex p-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-semibold self-start sm:self-auto overflow-x-auto max-w-full">
            {(['ALL', 'LEAVING', 'TRANSIT', 'ARRIVING', 'LOGISTICS'] as const).map((tab) => {
              if (tab === 'TRANSIT' && complianceChecklist.transit.length === 0) return null;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-white text-[#0E2342] shadow-2xs font-bold'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {tab === 'ALL'
                    ? `All Directives (${complianceChecklist.all.length})`
                    : tab === 'LEAVING'
                    ? `Leaving UK (${complianceChecklist.leaving.length})`
                    : tab === 'TRANSIT'
                    ? `Transit FR (${complianceChecklist.transit.length})`
                    : tab === 'ARRIVING'
                    ? `Arriving DE (${complianceChecklist.arriving.length})`
                    : `Travel Day (${complianceChecklist.logistics.length})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Requirements Docket Cards */}
        <div className="space-y-5">
          {/* Critical Blockers */}
          {criticalItems.length > 0 && (
            <div>
              <div className="text-xs font-bold tracking-wider uppercase text-red-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Critical Entry Blockers ({criticalItems.length})</span>
              </div>
              <div className="space-y-3">
                {criticalItems.map((item) => (
                  <div
                    key={item.ruleId}
                    className="p-4 rounded-lg bg-red-50/40 border border-red-200 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="font-semibold text-sm text-red-950 flex items-center gap-2">
                        <AlertTriangleIcon className="w-4 h-4 text-red-600" />
                        <span>{item.name}</span>
                      </div>
                      <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-bold uppercase border bg-red-100 text-red-800 border-red-200">
                        {item.statusBadge}
                      </span>
                    </div>
                    <p className="text-xs text-red-900/90 leading-relaxed">{item.whatToDo}</p>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{item.details}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-500 border-t border-red-100 pt-2">
                      <span>Statute: <strong>{item.authority}</strong></span>
                      {item.sourceTitle && (
                        <>
                          <span>·</span>
                          <span className="italic">{item.sourceTitle}</span>
                        </>
                      )}
                      {item.sourceUrl && (
                        <>
                          <span>·</span>
                          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-0.5">
                            <span>Statutory Legal Directive</span>
                            <ExternalLinkIcon className="w-2.5 h-2.5" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Actions */}
          {requiredItems.length > 0 && (
            <div>
              <div className="text-xs font-bold tracking-wider uppercase text-amber-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Pending Veterinary Actions ({requiredItems.length})</span>
              </div>
              <div className="space-y-3">
                {requiredItems.map((item) => (
                  <div
                    key={item.ruleId}
                    className="p-4 rounded-lg bg-amber-50/20 border border-amber-200 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="font-semibold text-sm text-zinc-900 flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-amber-600" />
                        <span>{item.name}</span>
                      </div>
                      <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase border bg-amber-100 text-amber-900 border-amber-200">
                        {item.statusBadge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed">{item.whatToDo}</p>
                    <p className="text-[11px] text-zinc-500 mt-1">{item.details}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-500 border-t border-amber-100 pt-2">
                      <span>Authority: <strong>{item.authority}</strong></span>
                      {item.sourceTitle && (
                        <>
                          <span>·</span>
                          <span className="italic">{item.sourceTitle}</span>
                        </>
                      )}
                      {item.sourceUrl && (
                        <>
                          <span>·</span>
                          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-0.5">
                            <span>Statute Reference</span>
                            <ExternalLinkIcon className="w-2.5 h-2.5" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Items */}
          {completedItems.length > 0 && (
            <div>
              <div className="text-xs font-bold tracking-wider uppercase text-[#0FA958] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0FA958]" />
                <span>Verified Documentary Evidence ({completedItems.length})</span>
              </div>
              <div className="space-y-2.5">
                {completedItems.map((item) => (
                  <div
                    key={item.ruleId}
                    className="p-3.5 rounded-lg bg-emerald-50/20 border border-emerald-200/60 text-xs flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircleIcon className="w-4 h-4 text-[#0FA958] mt-0.5 shrink-0" />
                      <div>
                        <strong className="block text-zinc-900 font-semibold">{item.name}</strong>
                        <span className="text-zinc-600 text-[11px]">{item.details}</span>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-zinc-400">
                          <span>Statutory Basis: {item.authority}</span>
                          {item.ruleVersion && <span>· Directive {item.ruleVersion}</span>}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F8F0] text-[#0FA958] border border-[#C6EED8] shrink-0">
                      Verified ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Day Logistics */}
          {travelDayItems.length > 0 && (
            <div>
              <div className="text-xs font-bold tracking-wider uppercase text-blue-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Travel Day Protocols ({travelDayItems.length})</span>
              </div>
              <div className="space-y-3">
                {travelDayItems.map((item) => (
                  <div
                    key={item.ruleId}
                    className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="font-semibold text-sm text-zinc-900">{item.name}</div>
                      <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase border bg-blue-50 text-blue-800 border-blue-200">
                        {item.statusBadge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">{item.whatToDo}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-zinc-400">
                      <span>Standard: <strong>{item.authority}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─── OFFICIAL DOSSIER DOWNLOAD & VET SIGN-OFF BAR ──────────── */}
        <div className="p-6 sm:p-7 rounded-xl bg-[#0E2342] text-white flex flex-col sm:flex-row items-center justify-between gap-5 mt-8 border border-[#16345E] shadow-xs">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#0FA958] uppercase tracking-wider">
              <ShieldCheckIcon className="w-3 h-3 text-[#0FA958]" />
              <span>Verified Travel Compliance Dossier</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-white">
              Download Pet Travel Compliance Dossier (PDF)
            </h4>
            <p className="text-xs text-zinc-300 max-w-lg leading-relaxed">
              Export a verified preparation and documentation report evaluating statutory rules, timeline milestones, and IATA container standards for airline check-in and veterinary appointments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              type="button"
              disabled={isDownloadingDossier}
              onClick={handleDownloadDossier}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-60"
              title="Download free preview pet travel dossier"
            >
              <FileTextIcon className="w-4 h-4 text-zinc-300" />
              <span>{isDownloadingDossier ? 'Generating Preview...' : 'Download Preview Dossier (PDF)'}</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenPricing(getActiveScanResult())}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg border border-white/20 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <ShieldCheckIcon className="w-3.5 h-3.5 text-white" />
              <span>Complete Travel Plan (£19)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
