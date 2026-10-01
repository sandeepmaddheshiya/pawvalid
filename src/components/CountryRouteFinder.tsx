'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface OriginOption {
  code: string;
  name: string;
  flag: string;
  corridorSlug?: string;
  categoryNote?: string;
  titerRequired?: string;
  quarantineDays?: string;
  leadTime?: string;
}

const COMMON_ORIGINS: OriginOption[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    corridorSlug: 'usa-to-singapore',
    categoryNote: 'Category C (Rabies Controlled)',
    titerRequired: 'Mandatory RNATT (≥ 0.50 IU/mL)',
    quarantineDays: '10–30 Days (CAPQ)',
    leadTime: '3–6 Months',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    corridorSlug: 'uk-to-singapore',
    categoryNote: 'Category A (Rabies-Free)',
    titerRequired: 'Exempt (No Titer Test)',
    quarantineDays: '0 Days (Direct Release)',
    leadTime: '1 Month',
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    corridorSlug: 'australia-to-singapore',
    categoryNote: 'Category A (Rabies-Free)',
    titerRequired: 'Exempt (No Titer Test)',
    quarantineDays: '0 Days (Direct Release)',
    leadTime: '1 Month',
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    corridorSlug: 'usa-to-singapore',
    categoryNote: 'Category C (Rabies Controlled)',
    titerRequired: 'Mandatory RNATT (≥ 0.50 IU/mL)',
    quarantineDays: '10–30 Days (CAPQ)',
    leadTime: '3–6 Months',
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    corridorSlug: 'india-to-singapore',
    categoryNote: 'Category D (High Rabies Risk)',
    titerRequired: 'Mandatory RNATT (≥ 0.50 IU/mL)',
    quarantineDays: '30 Days Mandatory',
    leadTime: '6 Months',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    categoryNote: 'Category D (Non-Listed)',
    titerRequired: 'Mandatory RNATT (≥ 0.50 IU/mL)',
    quarantineDays: '30 Days Mandatory',
    leadTime: '4–6 Months',
  },
  {
    code: 'DE',
    name: 'Germany / EU',
    flag: '🇩🇪',
    categoryNote: 'Category C (EU Member)',
    titerRequired: 'Mandatory RNATT (≥ 0.50 IU/mL)',
    quarantineDays: '10–30 Days',
    leadTime: '3–4 Months',
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    categoryNote: 'Category B (Rabies-Free Island)',
    titerRequired: 'Exempt / Vaccine Only',
    quarantineDays: '0 Days (Direct Release)',
    leadTime: '1–2 Months',
  },
];

interface CountryRouteFinderProps {
  destName: string;
  destCode: string;
  destFlag: string;
  inboundCorridors?: Array<{
    originName: string;
    originFlag: string;
    corridorSlug: string;
    leadTime: string;
  }>;
}

export default function CountryRouteFinder({
  destName,
  destCode,
  destFlag,
  inboundCorridors = [],
}: CountryRouteFinderProps) {
  const [selectedOriginCode, setSelectedOriginCode] = useState<string>('US');
  const [petType, setPetType] = useState<'DOG' | 'CAT'>('DOG');

  const selectedOrigin =
    COMMON_ORIGINS.find((o) => o.code === selectedOriginCode) || COMMON_ORIGINS[0];

  // Check if a dedicated corridor guide exists
  const matchedCorridor = inboundCorridors.find(
    (c) => c.originName.toLowerCase().includes(selectedOrigin.name.toLowerCase().split(' ')[0])
  );

  const routeGuideHref = matchedCorridor
    ? `/en/pet-travel/${matchedCorridor.corridorSlug}`
    : `/en/checker?origin=${selectedOrigin.code}&destination=${destCode}&petType=${petType}`;

  return (
    <div className="bg-white rounded-xl border border-zinc-200/90 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
            Instant Route Lookup
          </span>
          <h3 className="text-sm font-bold text-zinc-900">
            Check Rules from Your Origin
          </h3>
        </div>
        <span className="text-xs font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
          → {destFlag} {destCode}
        </span>
      </div>

      {/* Form Controls */}
      <div className="space-y-3">
        {/* Origin Selector Dropdown */}
        <div>
          <label htmlFor="origin-country-select" className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Departing From:
          </label>
          <div className="relative">
            <select
              id="origin-country-select"
              value={selectedOriginCode}
              onChange={(e) => setSelectedOriginCode(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-medium rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white cursor-pointer pr-8"
            >
              {COMMON_ORIGINS.map((origin) => (
                <option key={origin.code} value={origin.code}>
                  {origin.flag} {origin.name}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Pet Species Selector */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Traveling With:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPetType('DOG')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                petType === 'DOG'
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                  : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              <span>🐕</span>
              <span>Dog</span>
            </button>
            <button
              type="button"
              onClick={() => setPetType('CAT')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                petType === 'CAT'
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                  : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              <span>🐈</span>
              <span>Cat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Statutory Summary Box */}
      <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-zinc-900">
            {selectedOrigin.flag} {selectedOrigin.name} → {destFlag} {destName}
          </span>
          {selectedOrigin.categoryNote && (
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {selectedOrigin.categoryNote.split('(')[0].trim()}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-200/70 text-[11px]">
          <div>
            <span className="text-zinc-400 block font-medium">Rabies Titer:</span>
            <span className="font-semibold text-zinc-800">
              {selectedOrigin.titerRequired || 'Standard Protocol'}
            </span>
          </div>
          <div>
            <span className="text-zinc-400 block font-medium">Quarantine:</span>
            <span className="font-semibold text-zinc-800">
              {selectedOrigin.quarantineDays || '0 Days'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href={routeGuideHref}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-2xs hover:shadow transition-all text-center cursor-pointer"
      >
        <span>
          {matchedCorridor ? `View ${selectedOrigin.name} → ${destName} Guide` : `Check ${selectedOrigin.name} Compliance`}
        </span>
        <span>→</span>
      </Link>
    </div>
  );
}
