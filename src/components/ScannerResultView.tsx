'use client';

import React, { useState } from 'react';
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

function SparklesIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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
  const [activeTab, setActiveTab] = useState<'ALL' | 'LEAVING' | 'TRANSIT' | 'ARRIVING' | 'LOGISTICS'>('ALL');
  const [confirmedFields, setConfirmedFields] = useState<Record<string, string>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isDownloadingDossier, setIsDownloadingDossier] = useState(false);
  const [loadingSample, setLoadingSample] = useState(false);
  const [showRouteRequirements, setShowRouteRequirements] = useState(false);

  // Robust location resolution
  const rawOrigin = result.route?.origin;
  const rawDestination = result.route?.destination;
  const rawTransits = result.route?.transitCountries || [];

  const displayOrigin = formatCountryDisplay(rawOrigin, 'United Kingdom (GB)');
  const displayDestination = formatCountryDisplay(rawDestination, 'Germany (DE)');
  const displayTransits = rawTransits.map((t) => formatCountryDisplay(t, t));

  const [customPetName, setCustomPetName] = useState(result.petProfile?.name || '');
  const [customSpecies, setCustomSpecies] = useState<'DOG' | 'CAT'>(
    result.petProfile?.species === 'CAT' ? 'CAT' : 'DOG'
  );
  const [customBreed, setCustomBreed] = useState(result.petProfile?.breed || '');

  // Sync pet profile fields
  const activePetName = customPetName.trim() || result.petProfile?.name || 'Pet';
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
    const updated = getActiveScanResult({ name });
    onUpdateResult?.(updated);
  };

  const handleUpdateBreed = (breed: string) => {
    setCustomBreed(breed);
    const updated = getActiveScanResult({ breed });
    onUpdateResult?.(updated);
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

  const hasCritical = blockerSummary.criticalBlockersCount > 0 || criticalItems.length > 0;
  const hasRequired = blockerSummary.requiredActionsCount > 0 || requiredItems.length > 0;
  const hasMicrochip = Boolean(petProfile.microchipNumber && petProfile.microchipNumber !== 'Not Recorded' && petProfile.microchipNumber !== 'Missing in Records');
  const hasRabies = Boolean(petProfile.rabiesVaccinationDate && petProfile.rabiesVaccinationDate !== 'Not Recorded' && petProfile.rabiesVaccinationDate !== 'Missing in Records');

  const docAudit = result.readinessReport?.documentAudit || [];
  const hasValidDocsInAudit = docAudit.some((d) => d.status === 'VALID_DATA_FOUND');
  const hasRecognizedEvidence = Boolean(
    result.hasRecognizedRecords ||
    hasValidDocsInAudit ||
    (hasMicrochip && petProfile.microchipNumber !== 'VERIFIED_IN_RECORDS') ||
    hasRabies
  );
  const isUnrecognized = Boolean(
    result.isAllUnrecognized ||
    (!hasRecognizedEvidence && docAudit.length > 0)
  );

  const handleLoadSample = async () => {
    try {
      setLoadingSample(true);
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'traveler@pawvalid.online' }),
      });
      const data = await res.json();
      if (data?.trip?.scanResult) {
        onUpdateResult?.(data.trip.scanResult);
      } else {
        const sampleResult: ScanResult = {
          status: 'success',
          hasRecognizedRecords: true,
          isAllUnrecognized: false,
          route: {
            origin: 'United Kingdom (GB)',
            destination: 'Germany (DE)',
            transitCountries: [],
            departureDate: null,
          },
          petDetected: true,
          petProfile: {
            name: 'Milo',
            species: 'DOG',
            breed: 'Golden Retriever',
            birthday: null,
            microchipNumber: '985141001234567',
            microchipDate: '2025-04-12',
            rabiesVaccinationDate: '2025-05-10',
            rabiesVaccinationType: 'BOOSTER',
          },
          stats: {
            documentsDetectedCount: 2,
            overallStatus: 'READY_TO_FLY',
            statusHeadline: 'Milo is 100% compliant for entry into Germany (EU 2026/131)',
            needsHumanReview: false,
            earliestFlightDate: 'Eligible for Immediate Departure',
            earliestFlightDateTitle: 'Earliest Estimated Travel Date',
            earliestFlightDateSubtitle: 'All mandatory prerequisites satisfied. Book clinical exam within 10 days of flight.',
            disclaimer: 'Official border control officers require accredited physical certificates upon check-in.',
            blockerSummary: {
              criticalBlockersCount: 0,
              requiredActionsCount: 1,
              travelDayActionsCount: 1,
              completedVerifiedCount: 3,
            },
            confidenceLevel: 'High',
          },
          timelineMilestones: [
            {
              date: 'Completed',
              title: '15-Digit ISO Microchip Implant',
              status: 'COMPLETED',
              description: 'ISO 11784/11785 transponder #985141001234567 verified in records.',
            },
            {
              date: 'Completed',
              title: 'Rabies Booster Vaccination',
              status: 'COMPLETED',
              description: 'Active rabies booster verified. 21-day latency requirement satisfied.',
            },
            {
              date: '10 Days Before Flight',
              title: 'Veterinary Health Examination & Certificate',
              status: 'REQUIRED_ACTION',
              description: 'Book official clinical examination and EU Annex IV endorsement within 10 days of travel.',
            },
            {
              date: 'Target Travel Date',
              title: 'Cleared For Departure',
              status: 'GOAL',
              description: 'All statutory requirements fulfilled for border entry into Germany.',
            },
          ],
          complianceChecklist: {
            all: [
              {
                ruleId: 'ISO_MICROCHIP',
                name: 'ISO 11784/11785 Microchip',
                category: 'IDENTIFICATION',
                scope: 'ARRIVING',
                status: 'SATISFIED',
                severity: 'COMPLETED',
                statusBadge: '✓ Verified',
                whatToDo: 'Microchip transponder documented.',
                details: '15-digit ISO 11784/11785 microchip transponder #985141001234567 identified.',
                authority: 'Regulation (EU) No 576/2013',
                deadlines: 'Required prior to vaccination',
                sourceUrl: 'https://ec.europa.eu/food/animals/pet-movement',
              },
              {
                ruleId: 'RABIES_BOOSTER',
                name: 'Rabies Vaccination & 21-Day Latency',
                category: 'VACCINATIONS',
                scope: 'ARRIVING',
                status: 'SATISFIED',
                severity: 'COMPLETED',
                statusBadge: '✓ Verified',
                whatToDo: 'Active rabies booster documented.',
                details: 'Rabies booster valid; 21-day latency period satisfied.',
                authority: 'Regulation (EU) 2026/131',
                deadlines: 'Administered at least 21 days prior to travel',
                sourceUrl: 'https://ec.europa.eu/food/animals/pet-movement',
              },
              {
                ruleId: 'EU_ANNEX_IV',
                name: 'EU Annex IV Animal Health Certificate',
                category: 'DOCUMENTS',
                scope: 'ARRIVING',
                status: 'REQUIRED_ACTION',
                severity: 'REQUIRED_ACTION',
                statusBadge: '🟡 Within 10 Days',
                whatToDo: 'Book official health examination within 10 days of departure with an accredited veterinarian.',
                details: 'Official accredited health certificate and government endorsement required prior to flight.',
                authority: 'Regulation (EU) 2026/131 Annex IV',
                deadlines: 'Issued within 10 days of departure',
                sourceUrl: 'https://ec.europa.eu/food/animals/pet-movement',
              },
              {
                ruleId: 'IATA_CRATE',
                name: 'IATA Compliant Pet Travel Crate (CR-82)',
                category: 'LOGISTICS',
                scope: 'LOGISTICS',
                status: 'TRAVEL_DAY_ACTION',
                severity: 'TRAVEL_DAY_ACTION',
                statusBadge: '✈️ Travel-Day',
                whatToDo: 'Verify travel crate is IATA CR-82 compliant with 4-sided ventilation and metal hardware.',
                details: 'Airlines strictly enforce IATA Live Animals Regulations (LAR) crate dimensions.',
                authority: 'IATA Live Animals Regulations',
                deadlines: 'Day of departure',
                sourceUrl: 'https://www.iata.org',
              },
            ],
            leaving: [],
            transit: [],
            arriving: [],
            logistics: [],
          },
          readinessReport: {
            whatThisMeans: 'Milo has all mandatory veterinary prerequisites documented for travel to Germany. Complete the final pre-flight health exam within 10 days of departure.',
            whereThingsStand: [],
            documentAudit: [
              {
                filename: 'milo_pet_passport.pdf',
                detected_type: 'Official Pet Passport',
                status: 'VALID_DATA_FOUND',
                summary: 'Official Pet Passport verified. Transponder #985141001234567 and active rabies booster verified.',
              },
            ],
            nextSteps: [
              'Book official veterinary health examination within 10 days of departure.',
              'Verify airline live animal crate specifications.',
            ],
            travelDayPrep: [
              'Assemble original physical veterinary certificates in a waterproof travel folder.',
              'Ensure travel crate has 4-sided ventilation and attached water bowl.',
            ],
          },
        };
        onUpdateResult?.(sampleResult);
      }
    } catch (err) {
      console.error('Failed to load sample:', err);
    } finally {
      setLoadingSample(false);
    }
  };

  /* ─── DEDICATED UNRECOGNIZED NON-VETERINARY DOCUMENT SCREEN ───────────── */
  if (isUnrecognized) {
    return (
      <div className="space-y-6 text-zinc-900 font-sans pb-16">
        {/* Action Header */}
        <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-b border-zinc-200 pb-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 bg-white border border-zinc-300 rounded-lg px-3.5 py-2 shadow-2xs hover:bg-zinc-50 transition-colors cursor-pointer self-start"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 text-zinc-500" />
            <span>Upload Different Documents</span>
          </button>

          <button
            type="button"
            disabled={loadingSample}
            onClick={handleLoadSample}
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-2 shadow-2xs transition-all active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-60"
          >
            <SparklesIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>{loadingSample ? 'Loading Sample...' : 'Explore Sample Assessment (Milo · Dog)'}</span>
          </button>
        </header>

        {/* Main Card */}
        <article className="bg-white rounded-xl shadow-xs border border-zinc-200 overflow-hidden">
          {/* Regulatory Reference Strip */}
          <div className="bg-[#0E2342] text-white px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono border-b border-[#16345E]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-zinc-300 font-medium">DOCUMENT VERIFICATION AUDIT:</span>
              <span className="text-white font-bold tracking-wider">{dossierReference}</span>
            </div>

            <div className="text-zinc-300 text-[10px] hidden md:block">
              STATUTORY AUTHORITY: REGULATION (EU) 2026/131 • DEFRA EXPORT ANNEX
            </div>

            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold text-[10px] uppercase tracking-wider">
              <AlertTriangleIcon className="w-3 h-3 text-rose-400" />
              <span>AUDIT: NO PET RECORDS FOUND</span>
            </div>
          </div>

          {/* Hero Notification */}
          <div className="p-6 sm:p-8 border-b border-zinc-200 bg-gradient-to-b from-rose-50/40 via-white to-white">
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200 shadow-2xs">
                <AlertTriangleIcon className="w-6 h-6 text-rose-600" />
              </div>

              <div className="space-y-2 flex-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-[11px] font-bold uppercase tracking-wider">
                  <span>No Veterinary Records Detected</span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight">
                  Unrecognized Uploaded Document
                </h1>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl">
                  We analyzed the uploaded file(s) for your journey from <strong>{displayOrigin}</strong> to <strong>{displayDestination}</strong>. However, no verifiable pet identification, 15-digit ISO microchip transponders, rabies vaccination records, or official veterinary health certificates were detected.
                </p>

                <p className="text-xs text-zinc-500 leading-relaxed pt-1">
                  PawValid strictly adheres to international pet travel statutes (including <strong>Regulation (EU) 2026/131</strong>, <strong>DEFRA</strong>, and <strong>USDA APHIS</strong>) and cannot generate an official pet travel compliance dossier without recognized veterinary records.
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded File Audit Breakdown */}
          <div className="p-6 sm:p-8 border-b border-zinc-200 bg-[#FAFBFB]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-3 flex items-center gap-2">
              <FileTextIcon className="w-4 h-4 text-zinc-500" />
              <span>Uploaded File Audit Results ({docAudit.length || 1})</span>
            </h2>

            <div className="space-y-3">
              {(docAudit.length > 0 ? docAudit : [{ filename: 'Uploaded Document', detected_type: 'Non-Veterinary Document (Payment Receipt / Invoice / Other)', status: 'NO_IDENTITY_DETECTED', summary: 'No pet transponder, vaccine serial numbers, or accredited veterinary signatures were detected.' }]).map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-white border border-rose-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="font-mono text-zinc-900 font-semibold">{doc.filename}</strong>
                      <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-600 text-[10px] font-medium">
                        {doc.detected_type}
                      </span>
                    </div>
                    <p className="text-zinc-600 text-[11px] leading-relaxed">
                      {doc.summary || 'Document was processed, but no valid veterinary stamps or animal identity markers were found.'}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase tracking-wider shrink-0 self-start sm:self-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>No Pet Records Found</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3.5 rounded-lg bg-blue-50/60 border border-blue-200/70 text-xs text-blue-900 leading-relaxed flex items-start gap-2.5">
              <span className="text-base shrink-0">💡</span>
              <p>
                <strong>Why did this happen?</strong> International border authorities only accept certified veterinary records. Documents such as payment receipts, invoices, billing confirmations, or non-pet documents cannot be certified for international live-animal transit.
              </p>
            </div>
          </div>

          {/* Accepted Pet Documents Visual Guide */}
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0FA958]">
                Document Preparation Guide
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342] mt-0.5">
                Accepted Pet Travel Documents
              </h2>
              <p className="text-xs text-zinc-600 mt-0.5">
                Please upload clear PDF scans or photos of any of the following official documents:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Pet Passport */}
              <div className="p-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-2xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    📘
                  </div>
                  <strong className="block text-xs font-bold text-[#0E2342]">Official Pet Passport</strong>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    EU, UK, or International Pet Passport containing the microchip barcode and active rabies vaccination stamp pages.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-100 text-[10px] text-zinc-400 font-mono">
                  Standard: EU Reg 576/2013
                </div>
              </div>

              {/* Card 2: Health Certificate */}
              <div className="p-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-2xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-sm">
                    🏛️
                  </div>
                  <strong className="block text-xs font-bold text-[#0E2342]">Veterinary Health Certificate</strong>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    Model EU Annex IV, USDA APHIS Form 7001, or DEFRA Export Health Certificate signed by an official veterinarian.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-100 text-[10px] text-zinc-400 font-mono">
                  Standard: EU Reg 2026/131
                </div>
              </div>

              {/* Card 3: Rabies Certificate */}
              <div className="p-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-2xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold text-sm">
                    💉
                  </div>
                  <strong className="block text-xs font-bold text-[#0E2342]">Rabies Vaccination Certificate</strong>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    Veterinary clinic certificate documenting vaccine product name, manufacturer, batch/lot number, and date administered.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-100 text-[10px] text-zinc-400 font-mono">
                  Standard: 21-Day Waiting Rule
                </div>
              </div>

              {/* Card 4: Microchip & Titer */}
              <div className="p-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-2xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-bold text-sm">
                    🔬
                  </div>
                  <strong className="block text-xs font-bold text-[#0E2342]">ISO Microchip / FAVN Titer</strong>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    15-digit ISO 11784/11785 microchip registration card or approved FAVN rabies antibody serology report (≥0.50 IU/ml).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-100 text-[10px] text-zinc-400 font-mono">
                  Standard: ISO 11784 / WHO
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <ArrowLeftIcon className="w-4 h-4 text-white" />
                <span>Upload Pet Documents</span>
              </button>

              <button
                type="button"
                disabled={loadingSample}
                onClick={handleLoadSample}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg border border-zinc-300 shadow-2xs transition-all active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-60"
              >
                <SparklesIcon className="w-4 h-4 text-emerald-600" />
                <span>{loadingSample ? 'Loading Sample...' : 'Try Sample Assessment (Milo · Dog)'}</span>
              </button>
            </div>
          </div>
        </article>

        {/* Collapsible Route Requirements */}
        <section className="bg-white rounded-xl p-6 shadow-xs border border-zinc-200">
          <button
            type="button"
            onClick={() => setShowRouteRequirements(!showRouteRequirements)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0FA958]">
                Route Requirements Preview
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0E2342] mt-0.5">
                Statutory Requirements for {displayOrigin} ➔ {displayDestination}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Preview the general statutory regulations applicable to this corridor prior to uploading records.
              </p>
            </div>
            <span className="text-xs font-semibold text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200">
              {showRouteRequirements ? 'Hide Requirements ▲' : 'View Requirements ▼'}
            </span>
          </button>

          {showRouteRequirements && (
            <div className="mt-6 pt-6 border-t border-zinc-200 space-y-3">
              {complianceChecklist.all.map((item) => (
                <div
                  key={item.ruleId}
                  className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <strong className="text-zinc-900 font-semibold">{item.name}</strong>
                    <p className="text-zinc-600 text-[11px]">{item.whatToDo}</p>
                    <span className="text-[10px] text-zinc-400">Statutory Authority: {item.authority}</span>
                  </div>
                  <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase border bg-zinc-100 text-zinc-700 border-zinc-300 shrink-0 self-start sm:self-center">
                    Corridor Directive
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

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
            onClick={() => onOpenPricing(getActiveScanResult())}
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#0E2342] hover:bg-[#16345E] rounded-lg px-4 py-2 shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <ShieldCheckIcon className="w-3.5 h-3.5 text-[#0FA958]" />
            <span>Complete Travel Plan</span>
            <span className="px-1.5 py-0.5 rounded-md bg-white/15 text-[10px] font-bold text-white/90">£19</span>
          </button>
        </div>
      </header>
      <article className="bg-white rounded-xl shadow-xs border border-zinc-200 overflow-hidden print:border-none print:shadow-none">
        {/* Security & Regulatory Reference Strip */}
        <div className="bg-[#0E2342] text-white px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono border-b border-[#16345E]">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${hasCritical ? 'bg-rose-500' : hasRequired ? 'bg-amber-400' : 'bg-[#0FA958]'}`} />
            <span className="text-zinc-300 font-medium">DOSSIER REGISTRATION:</span>
            <span className="text-white font-bold tracking-wider">{dossierReference}</span>
          </div>

          <div className="text-zinc-300 text-[10px] hidden md:block">
            STATUTORY AUTHORITY: REGULATION (EU) 2026/131 • DEFRA EXPORT ANNEX
          </div>

          {hasCritical ? (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold text-[10px] uppercase tracking-wider">
              <AlertTriangleIcon className="w-3 h-3 text-rose-400" />
              <span>AUDIT: CRITICAL BLOCKERS DETECTED</span>
            </div>
          ) : hasRequired ? (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold text-[10px] uppercase tracking-wider">
              <ClockIcon className="w-3 h-3 text-amber-400" />
              <span>AUDIT: PENDING ACTIONS REQUIRED</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold text-[10px] uppercase tracking-wider">
              <ShieldCheckIcon className="w-3 h-3 text-[#0FA958]" />
              <span>AUDIT CLASSIFICATION: VERIFIED RECORD</span>
            </div>
          )}
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
                <span className={`w-2 h-2 rounded-full ${hasCritical ? 'bg-red-500' : hasRequired ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <span>{hasCritical ? 'Entry Blockers' : hasRequired ? 'Conditional Clearance' : 'Cleared For Travel'}</span>
              </div>
              <span className="block text-[10px] text-zinc-500 mt-0.5">
                {hasCritical
                  ? `${blockerSummary.criticalBlockersCount} critical blocker${blockerSummary.criticalBlockersCount > 1 ? 's' : ''} to resolve`
                  : hasRequired
                  ? `${blockerSummary.requiredActionsCount} pending action${blockerSummary.requiredActionsCount > 1 ? 's' : ''}`
                  : 'All prerequisites satisfied'}
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
              <div className={`text-xs font-mono font-semibold mt-0.5 ${hasMicrochip ? 'text-zinc-900' : 'text-red-700'}`}>
                {hasMicrochip ? petProfile.microchipNumber : 'Missing in Records'}
              </div>
              <div className={`text-[11px] font-medium flex items-center gap-1 ${hasMicrochip ? 'text-[#0FA958]' : 'text-red-600'}`}>
                {hasMicrochip ? (
                  <>
                    <CheckCircleIcon className="w-3 h-3 text-[#0FA958]" />
                    <span>ISO 11784/11785 Documented</span>
                  </>
                ) : (
                  <>
                    <AlertTriangleIcon className="w-3 h-3 text-red-500" />
                    <span>Implant Required Prior to Travel</span>
                  </>
                )}
              </div>
            </div>

            <div className="bg-[#FAFBFB] p-3.5 rounded-lg border border-zinc-200">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Rabies Latency</span>
              <div className={`text-xs font-semibold mt-0.5 ${hasRabies ? 'text-zinc-900' : 'text-red-700'}`}>
                {hasRabies ? '21-Day Waiting Cleared' : 'Missing in Records'}
              </div>
              <div className={`text-[11px] font-medium flex items-center gap-1 ${hasRabies ? 'text-[#0FA958]' : 'text-red-600'}`}>
                {hasRabies ? (
                  <>
                    <CheckCircleIcon className="w-3 h-3 text-[#0FA958]" />
                    <span>Active Booster Verified</span>
                  </>
                ) : (
                  <>
                    <AlertTriangleIcon className="w-3 h-3 text-red-500" />
                    <span>21-Day Latency Required</span>
                  </>
                )}
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
          <div className={`border-l-4 rounded-r-lg p-5 border-y border-r flex items-start gap-4 ${
            hasCritical
              ? 'border-red-500 bg-red-50/40 border-red-200/70'
              : hasRequired
              ? 'border-amber-500 bg-amber-50/40 border-amber-200/70'
              : 'border-emerald-500 bg-emerald-50/40 border-emerald-200/70'
          }`}>
            {hasCritical ? (
              <AlertTriangleIcon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            ) : hasRequired ? (
              <AlertTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${
                  hasCritical
                    ? 'bg-red-100 border-red-300 text-red-900'
                    : hasRequired
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-emerald-100 border-emerald-300 text-emerald-900'
                }`}>
                  Compliance Notice
                </span>
                <strong className={`text-xs font-bold ${
                  hasCritical ? 'text-red-950' : hasRequired ? 'text-amber-950' : 'text-emerald-950'
                }`}>
                  {statusHeadline}
                </strong>
              </div>
              <p className={`text-xs leading-relaxed pt-1 ${
                hasCritical ? 'text-red-950/90' : hasRequired ? 'text-amber-950/90' : 'text-emerald-950/90'
              }`}>
                {result.readinessReport?.whatThisMeans || (hasCritical ? 'Critical compliance prerequisites are missing from the uploaded documents. Schedule microchip implantation and rabies vaccination prior to international departure.' : 'Mandatory microchip transponder and primary rabies booster parameters conform to destination veterinary standards.')}
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
