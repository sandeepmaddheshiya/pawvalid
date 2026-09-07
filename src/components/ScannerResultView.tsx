'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ScanResult, ComplianceItem } from '@/lib/types/scanner';

interface ScannerResultViewProps {
  result: ScanResult;
  onReset: () => void;
  onOpenPricing: () => void;
}

export default function ScannerResultView({
  result,
  onReset,
  onOpenPricing,
}: ScannerResultViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'ALL' | 'LEAVING' | 'TRANSIT' | 'ARRIVING' | 'LOGISTICS'>('ALL');
  const [confirmedFields, setConfirmedFields] = useState<Record<string, string>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isDownloadingDossier, setIsDownloadingDossier] = useState(false);

  // Save Trip to Dashboard state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [savePetName, setSavePetName] = useState(result.petProfile?.name || '');
  const [saveEmail, setSaveEmail] = useState('');
  const [isSavingTrip, setIsSavingTrip] = useState(false);

  const handleSaveTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveEmail) return;

    try {
      setIsSavingTrip(true);
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: saveEmail,
          petName: savePetName || result.petProfile?.name || 'My Pet',
          scanResult: result,
          tier: 'FREE',
        }),
      });

      if (!res.ok) throw new Error('Failed to save trip');
      const data = await res.json();
      if (data.trip) {
        localStorage.setItem('petvia_active_trip', JSON.stringify(data.trip));
        router.push(`/dashboard?tripId=${data.trip.id}`);
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
      const payload = {
        route: result.route,
        petProfile: result.petProfile,
        stats: result.stats,
        timelineMilestones: result.timelineMilestones,
        complianceChecklist: result.complianceChecklist,
        readinessReport: result.readinessReport,
      };

      const res = await fetch('/api/documents/dossier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to generate dossier PDF');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safePetName = result.petProfile?.name ? result.petProfile.name.replace(/[^a-zA-Z0-9]/g, '_') : 'Pet';
      a.download = `Petvia_Travel_Dossier_${safePetName}.pdf`;
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

  const handleConfirm = (key: string, val: string) => {
    setConfirmedFields((prev) => ({ ...prev, [key]: val }));
    if (editingKey === key) setEditingKey(null);
  };

  const handleStartEdit = (key: string, currentVal: string) => {
    setEditingKey(key);
    setEditValue(currentVal || '');
  };

  const handleSaveEdit = (key: string) => {
    if (editValue.trim()) {
      setConfirmedFields((prev) => ({ ...prev, [key]: editValue.trim() }));
      setEditingKey(null);
    }
  };

  const getFieldLabel = (key: string) => {
    switch (key) {
      case 'rabiesVaccinationDate': return 'Rabies Vaccination Date';
      case 'microchipNumber': return 'Microchip Transponder Number';
      case 'microchipDate': return 'Microchip Implantation Date';
      case 'dhppVaccinationDate': return 'Core Combined Vaccine (DHPP) Date';
      case 'rabiesTiterDate': return 'Rabies Titer Blood Draw Date';
      case 'rabiesTiterLevel': return 'Rabies Titer Level (IU/mL)';
      case 'petName': return 'Pet Name';
      case 'species': return 'Pet Species';
      default: return key;
    }
  };

  const {
    route,
    petProfile,
    petDetected,
    stats,
    timelineMilestones,
    complianceChecklist,
    readinessReport,
    factsWithConfidence,
  } = result;

  const { blockerSummary, earliestFlightDate, statusHeadline, overallStatus } = stats;

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

  // Filter items by severity
  const criticalItems = itemsToDisplay.filter((i) => i.severity === 'CRITICAL_BLOCKER');
  const requiredItems = itemsToDisplay.filter((i) => i.severity === 'REQUIRED_ACTION');
  const travelDayItems = itemsToDisplay.filter((i) => i.severity === 'TRAVEL_DAY_ACTION');
  const completedItems = itemsToDisplay.filter((i) => i.severity === 'COMPLETED' || i.status === 'SATISFIED');

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'CRITICAL_BLOCKER':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'REQUIRED_ACTION':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'TRAVEL_DAY_ACTION':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'COMPLETED':
      case 'SATISFIED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  const getOverallStatusStyle = () => {
    if (overallStatus === 'NOT_READY') {
      return 'bg-red-50 border-red-300 text-red-900';
    }
    if (overallStatus === 'ACTION_REQUIRED') {
      return 'bg-amber-50 border-amber-300 text-amber-950';
    }
    return 'bg-emerald-50 border-emerald-300 text-emerald-950';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-up">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white border border-zinc-200 rounded-xl px-3.5 py-2 shadow-2xs hover:bg-zinc-50 transition-all cursor-pointer"
        >
          <span>←</span>
          <span>Scan Another Document or Route</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSaveModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl px-4 py-2 shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>💾</span>
            <span>Save Trip to Dashboard</span>
          </button>
          <button
            type="button"
            onClick={onOpenPricing}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 shadow-2xs hover:bg-emerald-100 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>📄</span>
            <span>Dossier Options</span>
          </button>
        </div>
      </div>

      {/* ─── SAVE TRIP TO DASHBOARD MODAL ───────────────────────────── */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-zinc-200 shadow-2xl relative space-y-4">
            <button
              type="button"
              onClick={() => setIsSaveModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 font-bold text-sm w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <div className="text-3xl">🐾</div>
              <h3 className="font-display font-black text-xl text-zinc-900">
                Save Milo&apos;s Trip to Dashboard
              </h3>
              <p className="text-xs text-zinc-500">
                Track departure countdowns, access your document vault, and hand instructions to your vet.
              </p>
            </div>

            <form onSubmit={handleSaveTrip} className="space-y-3.5 pt-2 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Pet&apos;s Name</label>
                <input
                  type="text"
                  value={savePetName}
                  onChange={(e) => setSavePetName(e.target.value)}
                  placeholder="e.g. Milo"
                  className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-xs focus:outline-emerald-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Your Email Address</label>
                <input
                  type="email"
                  required
                  value={saveEmail}
                  onChange={(e) => setSaveEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-xs focus:outline-emerald-600 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSavingTrip}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isSavingTrip ? 'Saving to Dashboard...' : 'Save Trip & Open Dashboard →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── 1. HERO EARLIEST FLIGHT TIMELINE & OVERALL STATUS BANNER ──── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-zinc-200/80">
        <div className="text-xs font-bold tracking-wider uppercase text-zinc-400 mb-1">
          Border Compliance &amp; Journey Timeline
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-zinc-900">
            {petProfile.name ? `${petProfile.name} (${petProfile.species})` : (petDetected ? `${petProfile.species}` : 'Pet Identity Unconfirmed')}
            <span className="text-zinc-400 font-normal mx-2">·</span>
            <span className="text-zinc-800">{route.origin} → {route.destination}</span>
          </h2>
          {route.transitCountries && route.transitCountries.length > 0 && (
            <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Via {route.transitCountries.join(', ')}
            </div>
          )}
        </div>

        {/* Overall Status Callout */}
        <div className={`p-4 sm:p-5 rounded-2xl border mb-6 flex items-start gap-3.5 ${getOverallStatusStyle()}`}>
          <span className="text-2xl mt-0.5">
            {overallStatus === 'NOT_READY' ? '🔴' : overallStatus === 'ACTION_REQUIRED' ? '🟡' : '🟢'}
          </span>
          <div className="space-y-1">
            <h3 className="font-display font-black text-base sm:text-lg leading-snug">
              {statusHeadline}
            </h3>
            <p className="text-xs opacity-90 leading-relaxed">
              Requirements evaluated according to <strong>Regulation (EU) 2026/131</strong>, USDA APHIS, and international transport mandates.
            </p>
          </div>
        </div>

        {/* ─── HUMAN-REVIEW ESCAPE HATCH ──────── */}
        {stats.needsHumanReview && (
          <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border-2 border-red-300 text-red-950 mb-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-200/80 text-red-900 font-black text-[11px] uppercase tracking-wider">
                  <span>🔴 UNRESOLVED DOCUMENT DISCREPANCY</span>
                </div>
                <h4 className="font-display font-black text-base sm:text-lg text-red-950">
                  Needs Human Review Before Travel
                </h4>
                <p className="text-xs text-red-900/90 max-w-xl leading-relaxed">
                  We found conflicting evidence across your documents that cannot safely be verified automatically.
                  To avoid boarding denial, verify the correct dates yourself below or request an accredited pet travel specialist review.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('conflict-resolver-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-4 py-2.5 bg-white hover:bg-zinc-50 border border-red-300 text-red-900 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                >
                  Resolve Yourself
                </button>
                <button
                  type="button"
                  onClick={onOpenPricing}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer text-center whitespace-nowrap"
                >
                  Request Expert Review — £59
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── THE HERO FEATURE: EARLIEST ESTIMATED TRAVEL TIMELINE ──────── */}
        <div className="bg-[#FAFBFB] rounded-2xl p-5 sm:p-6 border border-zinc-200 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200/70 pb-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {stats.earliestFlightDateTitle || 'Earliest estimated travel date'}
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-black text-zinc-900 mt-0.5 flex items-center gap-2">
                <span>✈️ Earliest Estimated Travel Date:</span>
                <span className="text-emerald-700 underline decoration-emerald-300 decoration-2">
                  {earliestFlightDate}
                </span>
              </h4>
              <p className="text-xs text-zinc-600 mt-1 max-w-lg leading-relaxed">
                {stats.earliestFlightDateSubtitle || 'Based on the documents provided, route requirements, known waiting periods, and currently verified rules.'}
              </p>
            </div>
            <div className="text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-3 max-w-xs sm:text-right leading-relaxed shrink-0">
              {stats.disclaimer || '⚠️ Airline approval and government processing times may affect your actual travel date.'}
            </div>
          </div>

          {/* Interactive Milestone Step Chain */}
          <div className="space-y-3">
            {timelineMilestones.map((ms, idx) => (
              <div
                key={`ms-${idx}`}
                className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                  ms.status === 'COMPLETED'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : ms.status === 'GOAL'
                    ? 'bg-amber-50 border-amber-300 text-zinc-900 font-bold'
                    : 'bg-white border-zinc-200 text-zinc-800'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-xs mt-0.5">
                    {ms.status === 'COMPLETED' ? '✓' : ms.status === 'GOAL' ? '🏁' : '○'}
                  </span>
                  <div>
                    <strong className="block text-zinc-900">{ms.title}</strong>
                    <span className="text-zinc-600 font-normal">{ms.description}</span>
                  </div>
                </div>
                <span className="font-mono text-[11px] font-semibold text-zinc-500 shrink-0">
                  {ms.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── INLINE CONFIRMATION / CONFLICT RESOLUTION WIDGET ──────── */}
        {factsWithConfidence && (
          <div id="conflict-resolver-section" className="space-y-3 mb-6">
            {/* Confirmed badges */}
            {Object.entries(confirmedFields).map(([k, v]) => (
              <div key={`confirmed-${k}`} className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                <span>✓ <strong>{getFieldLabel(k)}</strong> confirmed as <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-200 ml-1">{v}</span></span>
                <button
                  type="button"
                  onClick={() => {
                    const next = { ...confirmedFields };
                    delete next[k];
                    setConfirmedFields(next);
                  }}
                  className="text-zinc-400 hover:text-zinc-700 text-xs font-bold cursor-pointer"
                >
                  Edit
                </button>
              </div>
            ))}

            {/* Conflicting / uncertain items */}
            {Object.entries(factsWithConfidence)
              .filter(([k, f]) => !confirmedFields[k] && (f.status === 'CONFLICTING' || f.status === 'NEEDS_CONFIRMATION' || f.needsConfirmation))
              .map(([k, f]) => {
                const isConflicting = f.status === 'CONFLICTING' && f.conflictingValues && f.conflictingValues.length > 1;

                if (isConflicting) {
                  return (
                    <div key={`conflict-${k}`} className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs">
                      <div className="flex items-center gap-2 text-red-900 font-bold text-sm mb-1">
                        <span>⚠️</span> Conflicting {getFieldLabel(k)} Detected
                      </div>
                      <p className="text-red-800 mb-3">
                        We found different values in your documents. Which one is correct for this travel?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {f.conflictingValues!.map((cv, cIdx) => (
                          <button
                            key={`cval-${cIdx}`}
                            type="button"
                            onClick={() => handleConfirm(k, String(cv.value))}
                            className="p-3 rounded-xl bg-white border border-red-200 hover:border-red-400 text-left transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <div>
                              <strong className="block text-zinc-900 font-bold text-xs">{cv.value}</strong>
                              <span className="text-[11px] text-zinc-500">{cv.sourceDocument}</span>
                            </div>
                            <span className="text-xs font-bold text-red-700 group-hover:underline">Select →</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={`uncertain-${k}`} className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs">
                    <div className="flex items-center gap-2 text-amber-950 font-bold text-sm mb-2">
                      <span>⚠️</span> We found something uncertain
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-amber-200/70 shadow-2xs">
                      <div>
                        <strong className="block text-zinc-900 font-bold text-xs">{getFieldLabel(k)}</strong>
                        <div className="text-zinc-600 mt-0.5">
                          Detected: <span className="font-semibold text-zinc-900">{f.value || 'Not clear'}</span>
                          {' · '}
                          Confidence: <span className="font-semibold text-amber-700">Low ({Math.round(f.confidence * 100)}%)</span>
                          {' · '}
                          <span className="text-zinc-500">{f.sourceDocument}</span>
                        </div>
                      </div>

                      {editingKey === k ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="text-xs border border-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-emerald-600 font-mono"
                            placeholder="Enter value"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(k)}
                            className="px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingKey(null)}
                            className="px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-800 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 shrink-0">
                          {f.value && (
                            <button
                              type="button"
                              onClick={() => handleConfirm(k, String(f.value))}
                              className="px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-2xs cursor-pointer"
                            >
                              Confirm
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleStartEdit(k, String(f.value || ''))}
                            className="px-3 py-1.5 text-xs font-bold bg-zinc-100 text-zinc-700 hover:bg-zinc-200 rounded-lg transition-colors border border-zinc-200 cursor-pointer"
                          >
                            Correct
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* ─── 4 CATEGORICAL BLOCKER COUNTER PILLS ──────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-red-50/80 rounded-2xl p-4 border border-red-200 text-center">
            <div className="text-2xl font-black text-red-700">
              {blockerSummary.criticalBlockersCount}
            </div>
            <div className="text-[11px] font-bold text-red-900 mt-0.5">Critical Blockers</div>
            <p className="text-[10px] text-red-600/80 mt-0.5">Must resolve to travel</p>
          </div>

          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-center">
            <div className="text-2xl font-black text-amber-700">
              {blockerSummary.requiredActionsCount}
            </div>
            <div className="text-[11px] font-bold text-amber-900 mt-0.5">Required Actions</div>
            <p className="text-[10px] text-amber-600/80 mt-0.5">Pending appointments</p>
          </div>

          <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200 text-center">
            <div className="text-2xl font-black text-blue-700">
              {blockerSummary.travelDayActionsCount}
            </div>
            <div className="text-[11px] font-bold text-blue-900 mt-0.5">Travel-Day Tasks</div>
            <p className="text-[10px] text-blue-600/80 mt-0.5">Crate &amp; airport timing</p>
          </div>

          <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 text-center">
            <div className="text-2xl font-black text-emerald-700">
              {blockerSummary.completedVerifiedCount}
            </div>
            <div className="text-[11px] font-bold text-emerald-900 mt-0.5">Verified in Docs</div>
            <p className="text-[10px] text-emerald-600/80 mt-0.5">Evidence verified</p>
          </div>
        </div>
      </div>

      {/* ─── 2. COMPLIANCE CHECKLIST WITH TRANSIT SUPPORT ────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-zinc-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5 mb-6">
          <div>
            <h3 className="font-display text-xl font-black text-zinc-900">
              Official Requirements Matrix
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Governed by origin export laws, transit layover permits, and destination entry legislation
            </p>
          </div>

          {/* Scope Filter Tabs: All | Leaving | Transit | Arriving | Logistics */}
          <div className="inline-flex p-1 rounded-xl bg-zinc-100 border border-zinc-200/70 text-xs font-semibold self-start sm:self-auto overflow-x-auto max-w-full">
            {(['ALL', 'LEAVING', 'TRANSIT', 'ARRIVING', 'LOGISTICS'] as const).map((tab) => {
              if (tab === 'TRANSIT' && complianceChecklist.transit.length === 0) return null;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-white text-zinc-900 shadow-2xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {tab === 'ALL'
                    ? 'All'
                    : tab === 'LEAVING'
                    ? 'Leaving (Export)'
                    : tab === 'TRANSIT'
                    ? 'Transit / Layover'
                    : tab === 'ARRIVING'
                    ? 'Arriving (Import)'
                    : 'Travel Day'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Groups */}
        <div className="space-y-6">
          {/* Critical Blockers First */}
          {criticalItems.length > 0 && (
            <div>
              <div className="text-xs font-black tracking-wider uppercase text-red-600 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Critical Blockers ({criticalItems.length})</span>
              </div>
              <div className="space-y-3">
                {criticalItems.map((item) => (
                  <div
                    key={item.ruleId}
                    className="p-4 rounded-2xl bg-red-50/50 border border-red-200 hover:border-red-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="font-bold text-sm text-red-950 flex items-center gap-2">
                        <span>🔴</span>
                        <span>{item.name}</span>
                      </div>
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold border bg-red-100 text-red-800 border-red-200">
                        {item.statusBadge}
                      </span>
                    </div>
                    <p className="text-xs text-red-900/90 leading-relaxed">{item.whatToDo}</p>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{item.details}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-500 border-t border-red-100 pt-2">
                      <span>Source: <strong>{item.authority}</strong></span>
                      {item.sourceTitle && (
                        <>
                          <span>·</span>
                          <span className="italic">{item.sourceTitle}</span>
                        </>
                      )}
                      {item.ruleVersion && (
                        <>
                          <span>·</span>
                          <span className="font-mono font-semibold text-zinc-700">Rule {item.ruleVersion}</span>
                        </>
                      )}
                      {item.verifiedAt && (
                        <>
                          <span>·</span>
                          <span>Verified: {item.verifiedAt}</span>
                        </>
                      )}
                      {item.sourceUrl && (
                        <>
                          <span>·</span>
                          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">
                            Official citation ↗
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
              <div className="text-xs font-black tracking-wider uppercase text-amber-600 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Required Actions ({requiredItems.length})</span>
              </div>
              <div className="space-y-3">
                {requiredItems.map((item) => (
                  <div
                    key={item.ruleId}
                    className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 hover:border-amber-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="font-bold text-sm text-zinc-900 flex items-center gap-2">
                        <span>🟡</span>
                        <span>{item.name}</span>
                      </div>
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold border bg-amber-100 text-amber-900 border-amber-200">
                        {item.statusBadge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed">{item.whatToDo}</p>
                    <p className="text-[11px] text-zinc-500 mt-1">{item.details}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-500 border-t border-amber-100 pt-2">
                      <span>Source: <strong>{item.authority}</strong></span>
                      {item.sourceTitle && (
                        <>
                          <span>·</span>
                          <span className="italic">{item.sourceTitle}</span>
                        </>
                      )}
                      {item.ruleVersion && (
                        <>
                          <span>·</span>
                          <span className="font-mono font-semibold text-zinc-700">Rule {item.ruleVersion}</span>
                        </>
                      )}
                      {item.verifiedAt && (
                        <>
                          <span>·</span>
                          <span>Verified: {item.verifiedAt}</span>
                        </>
                      )}
                      {item.sourceUrl && (
                        <>
                          <span>·</span>
                          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">
                            Official citation ↗
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
              <div className="text-xs font-black tracking-wider uppercase text-emerald-600 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Verified in Paperwork ({completedItems.length})</span>
              </div>
              <div className="space-y-2.5">
                {completedItems.map((item) => (
                  <div
                    key={item.ruleId}
                    className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/80 text-xs flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                      <div>
                        <strong className="block text-emerald-950 font-bold">{item.name}</strong>
                        <span className="text-zinc-600">{item.details}</span>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-zinc-400">
                          <span>Source: {item.authority}</span>
                          {item.ruleVersion && <span>· Rule {item.ruleVersion}</span>}
                          {item.verifiedAt && <span>· Verified {item.verifiedAt}</span>}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Day Logistics */}
          {travelDayItems.length > 0 && (
            <div>
              <div className="text-xs font-black tracking-wider uppercase text-blue-600 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Travel Day Logistics ({travelDayItems.length})</span>
              </div>
              <div className="space-y-3">
                {travelDayItems.map((item) => (
                  <div
                    key={item.ruleId}
                    className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="font-bold text-sm text-zinc-900">{item.name}</div>
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border bg-blue-50 text-blue-800 border-blue-200">
                        {item.statusBadge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">{item.whatToDo}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-zinc-400">
                      <span>Standard: <strong>{item.authority}</strong></span>
                      {item.ruleVersion && <span>· {item.ruleVersion}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── 3. CONFIDENCE & EVIDENCE AUDIT CARD ──────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-zinc-200/80 space-y-6">
        <div>
          <h3 className="font-display text-xl font-black text-zinc-900 mb-1">
            Extracted Evidence &amp; Audit Log
          </h3>
          <p className="text-xs text-zinc-500">
            Transparent breakdown of what our engine read from each uploaded page
          </p>
        </div>

        {/* Low Confidence Warning Notice if applicable */}
        {factsWithConfidence &&
          Object.values(factsWithConfidence).some((f) => f.needsConfirmation) && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <span className="text-lg">⚠️</span>
              <div>
                <strong>Low Confidence In Some Dates:</strong> Certain stamps or dates in your uploaded documents could not be verified with 100% certainty. Please review the details below before relying on them for official travel.
              </div>
            </div>
          )}

        {/* Document Parsing Log */}
        <div className="space-y-2.5">
          {readinessReport.documentAudit.map((doc, idx) => (
            <div
              key={`audit-${idx}`}
              className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs flex items-start gap-2.5"
            >
              <span className="text-base">📑</span>
              <div>
                <span className="font-bold text-zinc-900">{doc.filename}</span>
                <span className="text-zinc-600 font-medium ml-1.5">— {doc.summary}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Roadmap */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-sm text-zinc-900">Your Chronological Next Steps</h4>
          <ol className="space-y-2.5 text-xs text-zinc-700">
            {readinessReport.nextSteps.map((step, idx) => (
              <li key={`step-${idx}`} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Official Travel Dossier CTA Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1">
              <span>★</span>
              <span>Official-Source Compliance Dossier</span>
            </div>
            <h4 className="font-display text-lg font-bold">
              Official Animal Health &amp; Travel Dossier (PDF)
            </h4>
            <p className="text-xs text-zinc-300 mt-1 max-w-md">
              Download your complete dated travel dossier with direct statute links to USDA, DAFF, and EU Regulation 2026/131, or order a 1-on-1 specialist document review.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              type="button"
              disabled={isDownloadingDossier}
              onClick={handleDownloadDossier}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-60"
            >
              <span>{isDownloadingDossier ? '⏳ Generating PDF...' : '📄 Download Official Dossier (PDF)'}</span>
            </button>
            <button
              type="button"
              onClick={onOpenPricing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-zinc-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>💳 Pricing &amp; Support Options</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
