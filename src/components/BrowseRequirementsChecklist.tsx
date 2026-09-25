'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import FreshnessIndicator from './FreshnessIndicator';

export interface StatutoryChecklistRule {
  id: string;
  category: string;
  categoryLabel?: string;
  title: string;
  severity: 'BLOCKING' | 'NON_BLOCKING';
  applicableSpecies?: 'DOG' | 'CAT' | 'BOTH';
  rules: string[];
  protocol: string;
  sourceName: string;
  sourceUrl: string;
  lastVerifiedAt: string;
}

export interface BrowseRequirementsChecklistProps {
  routeSlug: string;
  origin: string;
  destination: string;
  originCode: string;
  destCode: string;
  authority: string;
  legalBasis: string;
  leadTime: string;
  titerRequired: string;
  quarantineDays: string;
  certificateType: string;
  requirements: StatutoryChecklistRule[];
  restrictedBreeds?: string[];
}

type CheckStatus = 'HAVE' | 'NEED';

export default function BrowseRequirementsChecklist({
  routeSlug,
  origin,
  destination,
  originCode,
  destCode,
  authority,
  legalBasis,
  leadTime,
  titerRequired,
  quarantineDays,
  certificateType,
  requirements,
  restrictedBreeds,
}: BrowseRequirementsChecklistProps) {
  const [species, setSpecies] = useState<'DOG' | 'CAT'>('DOG');
  const [checkedItems, setCheckedItems] = useState<Record<string, CheckStatus>>({});
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'BLOCKING'>('ALL');
  const [isClient, setIsClient] = useState(false);

  const storageKey = `pawvalid_browse_chk_${routeSlug}_${species}`;

  // Load persisted checklist state on client mount
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      } else {
        setCheckedItems({});
      }
    } catch {
      // Ignore localStorage errors in private browsing
    }
  }, [storageKey]);

  // Persist state when checkedItems change
  const handleToggle = (id: string, status: CheckStatus) => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      if (updated[id] === status) {
        delete updated[id]; // Toggle off if clicking the same status
      } else {
        updated[id] = status;
      }

      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // Ignore localStorage error
      }
      return updated;
    });
  };

  const handleReset = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignore
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Filter requirements depending on species
  const filteredRequirements = useMemo(() => {
    return requirements.filter((req) => {
      if (req.applicableSpecies === 'DOG' && species === 'CAT') {
        return false;
      }
      if (req.applicableSpecies === 'CAT' && species === 'DOG') {
        return false;
      }
      // Echinococcus tapeworm rule applies only to dogs
      if (species === 'CAT' && req.category === 'TAPEWORM_TREATMENT') {
        return false;
      }
      if (filterSeverity === 'BLOCKING' && req.severity !== 'BLOCKING') {
        return false;
      }
      return true;
    });
  }, [requirements, species, filterSeverity]);

  // Stats and readiness calculations
  const stats = useMemo(() => {
    const total = filteredRequirements.length;
    const mandatory = filteredRequirements.filter((r) => r.severity === 'BLOCKING');
    const totalMandatory = mandatory.length;

    let haveCount = 0;
    let needCount = 0;
    let haveMandatoryCount = 0;
    let needMandatoryCount = 0;

    const pendingActionItems: StatutoryChecklistRule[] = [];

    filteredRequirements.forEach((req) => {
      const status = checkedItems[req.id];
      if (status === 'HAVE') {
        haveCount++;
        if (req.severity === 'BLOCKING') haveMandatoryCount++;
      } else if (status === 'NEED') {
        needCount++;
        pendingActionItems.push(req);
        if (req.severity === 'BLOCKING') needMandatoryCount++;
      }
    });

    const answeredCount = haveCount + needCount;
    const score = totalMandatory > 0 ? Math.round((haveMandatoryCount / totalMandatory) * 100) : 0;
    const isComplete = answeredCount === total && total > 0;
    const allMandatorySatisfied = totalMandatory > 0 && haveMandatoryCount === totalMandatory;

    return {
      total,
      totalMandatory,
      haveCount,
      needCount,
      haveMandatoryCount,
      needMandatoryCount,
      answeredCount,
      score,
      isComplete,
      allMandatorySatisfied,
      pendingActionItems,
    };
  }, [filteredRequirements, checkedItems]);

  const checkerUrl = `/en/checker?origin=${originCode}&destination=${destCode}&petType=${species}`;

  return (
    <div className="w-full space-y-6">
      {/* ─── CONTROLS BAR: SPECIES + FILTER + UTILITIES ─── */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Species Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Pet Type:</span>
          <div className="inline-flex p-1 bg-zinc-100 rounded-xl border border-zinc-200/80">
            <button
              type="button"
              onClick={() => {
                setSpecies('DOG');
                setCheckedItems({});
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                species === 'DOG'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span>🐕</span>
              <span>Dog</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSpecies('CAT');
                setCheckedItems({});
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                species === 'CAT'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span>🐈</span>
              <span>Cat</span>
            </button>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          <div className="inline-flex p-1 bg-zinc-100 rounded-xl border border-zinc-200/80 text-xs">
            <button
              type="button"
              onClick={() => setFilterSeverity('ALL')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterSeverity === 'ALL'
                  ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All Rules ({requirements.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('BLOCKING')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterSeverity === 'BLOCKING'
                  ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Mandatory Only
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              title="Print or Save PDF"
            >
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print</span>
            </button>

            {isClient && stats.answeredCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── LIVE READINESS & PROGRESS DASHBOARD ─── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0E2342] to-slate-950 text-white rounded-2xl p-5 sm:p-7 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Interactive Self-Assessment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              {origin} → {destination} Compliance Readiness
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Mark whether you have completed each statutory requirement or still need it. We compute your readiness according to {legalBasis}.
            </p>
          </div>

          {/* Meter Badge */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-4 min-w-[220px]">
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={stats.score === 100 ? 'text-emerald-400' : stats.score > 50 ? 'text-amber-400' : 'text-blue-400'}
                  strokeDasharray={`${stats.score}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-bold text-sm text-white">{stats.score}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-300 tracking-wider block">
                Readiness Score
              </span>
              <span className="font-bold text-sm text-white">
                {stats.haveMandatoryCount} / {stats.totalMandatory} Mandatory
              </span>
              <span className="text-[11px] text-emerald-300 block mt-0.5">
                {stats.needCount > 0 ? `${stats.needCount} items pending` : 'Ready to verify'}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <strong>{stats.haveCount}</strong> Have It
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <strong>{stats.needCount}</strong> Need Action
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-500"></span>
              <strong>{stats.total - stats.answeredCount}</strong> Unchecked
            </span>
          </div>

          <Link
            href={checkerUrl}
            className="inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-xs"
          >
            <span>Run Free Document Validation</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* ─── DYNAMIC ACTION GUIDANCE BANNER ─── */}
      {stats.needCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-zinc-800 text-xs sm:text-sm shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0 font-bold">
              !
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="font-bold text-amber-950 text-sm sm:text-base">
                Action Items Identified ({stats.needCount} Pending)
              </h4>
              <p className="text-zinc-700 leading-relaxed text-xs">
                To meet the departure timeline for <strong>{destination}</strong>, prioritize getting these items in place with your accredited veterinarian:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {stats.pendingActionItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 bg-white/80 p-2 rounded-lg border border-amber-200 text-xs">
                    <span className="text-amber-600 font-bold">→</span>
                    <div>
                      <strong className="font-semibold text-zinc-900">{item.title}</strong>
                      <span className="block text-[11px] text-zinc-500">{item.rules[0]}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {stats.allMandatorySatisfied && stats.totalMandatory > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-zinc-800 text-xs sm:text-sm shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
              ✓
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="font-bold text-emerald-950 text-sm sm:text-base">
                All Mandatory Prerequisites Marked as Ready!
              </h4>
              <p className="text-emerald-900 text-xs leading-relaxed">
                You have confirmed all required statutory milestones. Next, upload your paperwork into the free validator to verify date calculations, microchip sequence matching, and veterinarian signatures.
              </p>
              <div className="pt-2">
                <Link
                  href={checkerUrl}
                  className="inline-flex items-center gap-1.5 bg-[#0E2342] text-white font-semibold px-4 py-2 rounded-xl text-xs hover:bg-[#16345E] transition-all"
                >
                  <span>Upload Paperwork to Validate</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── CHECKLIST ITEMS ─── */}
      <div className="space-y-4">
        {filteredRequirements.map((req, idx) => {
          const status = checkedItems[req.id];
          const isHave = status === 'HAVE';
          const isNeed = status === 'NEED';

          return (
            <div
              key={req.id || idx}
              className={`rounded-2xl border p-5 sm:p-6 transition-all text-left ${
                isHave
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-2xs'
                  : isNeed
                  ? 'bg-amber-50/40 border-amber-300 shadow-2xs'
                  : 'bg-white border-zinc-200/90 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 ${
                    isHave
                      ? 'bg-emerald-600 text-white'
                      : isNeed
                      ? 'bg-amber-500 text-white'
                      : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                  }`}>
                    {isHave ? '✓' : isNeed ? '!' : idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                        Requirement #{idx + 1} • {req.categoryLabel || req.category.replace(/_/g, ' ')}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${
                        req.severity === 'BLOCKING'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                      }`}>
                        {req.severity === 'BLOCKING' ? 'Mandatory Prerequisite' : 'Advisory Rule'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 mt-0.5">
                      {req.title || req.category.replace(/_/g, ' ')}
                    </h3>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(req.id, 'HAVE')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isHave
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-zinc-200 text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span>✓</span>
                    <span>I Have This</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggle(req.id, 'NEED')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isNeed
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white border border-zinc-200 text-zinc-700 hover:border-amber-300 hover:bg-amber-50/50'
                    }`}
                  >
                    <span>○</span>
                    <span>I Need This</span>
                  </button>
                </div>
              </div>

              {/* Rules List */}
              <div className="mb-4 pl-0 sm:pl-10 space-y-1.5">
                {req.rules.map((r, ri) => (
                  <div key={ri} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E2342] mt-2 shrink-0"></span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              {/* Protocol Constraint Warning Box */}
              <div className="ml-0 sm:ml-10 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 mb-4 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <p className="leading-relaxed">
                  <strong className="font-semibold text-zinc-900">Sequence Protocol: </strong>
                  {req.protocol}
                </p>
              </div>

              {/* Authority Citation & Source */}
              <div className="ml-0 sm:ml-10 pt-3 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-2 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-zinc-700">Source:</span>
                  <span>{req.sourceName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FreshnessIndicator lastVerifiedAt={req.lastVerifiedAt} compact />
                  <a
                    href={req.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-zinc-900 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>Official Portal</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Breed Restriction alert if present and species is DOG */}
      {species === 'DOG' && restrictedBreeds && restrictedBreeds.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <strong className="font-bold block text-sm text-amber-950 mb-1">
              Breed Import Restrictions in {destination}
            </strong>
            <p className="text-zinc-700 leading-relaxed mb-2">
              The following dog breeds or crossbreeds have import prohibitions under statutory regulations:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {restrictedBreeds.map((breed, bi) => (
                <span key={bi} className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-medium text-[11px] border border-amber-300/60">
                  {breed}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
