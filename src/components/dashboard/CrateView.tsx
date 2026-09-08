'use client';

import React, { useState } from 'react';

interface CrateViewProps {
  trip: any;
}

export default function CrateView({ trip }: CrateViewProps) {
  const petName = trip?.petName || trip?.petProfile?.name || 'Your Pet';
  const species = (trip?.species || trip?.petProfile?.species || 'DOG').toUpperCase();
  const breed = trip?.breed || trip?.petProfile?.breed || (species === 'CAT' ? 'Domestic Shorthair' : 'Companion Animal');
  const origin = trip?.origin || trip?.route?.origin || 'United Kingdom';
  const destination = trip?.destination || trip?.route?.destination || 'Germany';
  const microchip = trip?.petProfile?.microchipNumber || '985141002847192';
  const ownerEmail = trip?.userEmail || 'traveler@example.com';

  const [activeTab, setActiveTab] = useState<'cargo' | 'cabin' | 'policies' | 'placard'>('cargo');
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  // Measurements (internally stored in cm)
  const [lengthA, setLengthA] = useState<number>(55);
  const [heightB, setHeightB] = useState<number>(22);
  const [widthC, setWidthC] = useState<number>(18);
  const [heightD, setHeightD] = useState<number>(48);

  // Placard custom fields
  const [flightNumber, setFlightNumber] = useState<string>('LH 921');
  const [contactPhone, setContactPhone] = useState<string>('+44 7700 900077');
  const [emergencyPhone, setEmergencyPhone] = useState<string>('+49 151 2345678');
  const [feedingInstructions, setFeedingInstructions] = useState<string>(
    'Feed dry kibble only. Provide fresh water at every transit station. Do not open door without animal handler present.'
  );

  // Quick Breed Presets (cm)
  const applyPreset = (preset: 'cat' | 'medium' | 'large' | 'giant') => {
    if (preset === 'cat') {
      setLengthA(40);
      setHeightB(14);
      setWidthC(14);
      setHeightD(30);
    } else if (preset === 'medium') {
      setLengthA(55);
      setHeightB(22);
      setWidthC(18);
      setHeightD(48);
    } else if (preset === 'large') {
      setLengthA(76);
      setHeightB(30);
      setWidthC(24);
      setHeightD(66);
    } else if (preset === 'giant') {
      setLengthA(94);
      setHeightB(40);
      setWidthC(32);
      setHeightD(84);
    }
  };

  // IATA LAR Formula (Container Requirement 82):
  // Length = A + 0.5 * B
  // Width = C * 2
  // Height = D + 5cm (Clearance above head/ears)
  const crateLengthCm = Math.round(lengthA + 0.5 * heightB);
  const crateWidthCm = Math.round(widthC * 2);
  const crateHeightCm = Math.round(heightD + 5);

  const displayLength = unit === 'cm' ? crateLengthCm : Math.round(crateLengthCm / 2.54);
  const displayWidth = unit === 'cm' ? crateWidthCm : Math.round(crateWidthCm / 2.54);
  const displayHeight = unit === 'cm' ? crateHeightCm : Math.round(crateHeightCm / 2.54);

  // Commercial standard crate matching (Sky Kennel / Vari Kennel standard series)
  const getCommercialCrateMatch = (lenInches: number) => {
    if (lenInches <= 21) {
      return {
        series: 'Series 100 / Small',
        dimensionsCm: '53 × 40 × 38 cm',
        dimensionsIn: '21"L × 16"W × 15"H',
        typicalPets: 'Cats, Toy Poodles, Chihuahuas, Pomeranians (up to 7 kg / 15 lbs)',
        offShelf: true,
      };
    }
    if (lenInches <= 28) {
      return {
        series: 'Series 200 / Medium',
        dimensionsCm: '71 × 52 × 55 cm',
        dimensionsIn: '28"L × 20.5"W × 21.5"H',
        typicalPets: 'Beagles, French Bulldogs, Jack Russells, Corgis (up to 14 kg / 30 lbs)',
        offShelf: true,
      };
    }
    if (lenInches <= 33) {
      return {
        series: 'Series 300 / Intermediate',
        dimensionsCm: '81 × 57 × 61 cm',
        dimensionsIn: '32"L × 22.5"W × 24"H',
        typicalPets: 'Border Collies, Cocker Spaniels, Standard Schnauzers (up to 23 kg / 50 lbs)',
        offShelf: true,
      };
    }
    if (lenInches <= 38) {
      return {
        series: 'Series 400 / Large',
        dimensionsCm: '91 × 64 × 69 cm',
        dimensionsIn: '36"L × 25"W × 27"H',
        typicalPets: 'Labradors, Golden Retrievers, Boxers, Dalmatians (up to 32 kg / 70 lbs)',
        offShelf: true,
      };
    }
    if (lenInches <= 42) {
      return {
        series: 'Series 500 / X-Large',
        dimensionsCm: '102 × 69 × 76 cm',
        dimensionsIn: '40"L × 27"W × 30"H',
        typicalPets: 'German Shepherds, Rottweilers, Huskies, Collies (up to 41 kg / 90 lbs)',
        offShelf: true,
      };
    }
    return {
      series: 'Series 700 / Giant (CR-82 Wooden Crate Recommended)',
      dimensionsCm: '122 × 81 × 89 cm',
      dimensionsIn: '48"L × 32"W × 35"H',
      typicalPets: 'Great Danes, Mastiffs, Saint Bernards, Irish Wolfhounds (over 41 kg / 90+ lbs)',
      offShelf: false,
    };
  };

  const lenInches = Math.round(crateLengthCm / 2.54);
  const commercialMatch = getCommercialCrateMatch(lenInches);

  const handlePrintPlacard = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6 text-left max-w-6xl mx-auto font-sans animate-fade-in">
      {/* ─── 1. PAGE HEADER & METADATA BAR ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <span>Pet Travel Compliance</span>
            <span>/</span>
            <span className="font-medium text-zinc-800">Airline Logistics &amp; Crate Standards</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Airline Crate &amp; Carrier Guide
          </h1>
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
            IATA Live Animals Regulations (LAR) Container Requirement 82 sizing, gate acceptance checklists, and route rules for{' '}
            <strong className="text-zinc-700">{petName}</strong> ({breed}) · <strong className="text-zinc-700">{origin} → {destination}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('placard')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-300 text-xs font-semibold text-zinc-700 shadow-2xs transition-colors cursor-pointer"
          >
            <span>🏷️</span>
            <span>Print Crate Placard</span>
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>IATA LAR CR-82 Verified</span>
          </span>
        </div>
      </div>

      {/* ─── 2. NAVIGATION TABS ────────────────────────────────────── */}
      <div className="flex items-center gap-1 border-b border-zinc-200 pb-px text-xs font-semibold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('cargo')}
          className={`pb-3 px-3.5 transition-colors border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'cargo'
              ? 'border-[#0FA958] text-zinc-900 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span>Cargo &amp; Hold Crate (CR-82)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cabin')}
          className={`pb-3 px-3.5 transition-colors border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'cabin'
              ? 'border-[#0FA958] text-zinc-900 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>In-Cabin Carrier (PETC)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('policies')}
          className={`pb-3 px-3.5 transition-colors border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'policies'
              ? 'border-[#0FA958] text-zinc-900 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Airline Route Policies</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('placard')}
          className={`pb-3 px-3.5 transition-colors border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'placard'
              ? 'border-[#0FA958] text-zinc-900 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>Printable Crate Placard</span>
        </button>
      </div>

      {/* ─── TAB 1: CARGO CRATE SIZING & HARDWARE ────────────────────── */}
      {activeTab === 'cargo' && (
        <div className="space-y-6">
          {/* Preset Chips & Unit Bar */}
          <div className="bg-white rounded-2xl border border-zinc-200/80 p-4 sm:p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-zinc-700 mr-1">Quick Breed Profiles:</span>
              <button
                type="button"
                onClick={() => applyPreset('cat')}
                className="px-3 py-1.5 rounded-xl text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🐱</span>
                <span>Cat / Toy (under 6 kg)</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('medium')}
                className="px-3 py-1.5 rounded-xl text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🐶</span>
                <span>Medium Dog (Beagle, Corgi)</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('large')}
                className="px-3 py-1.5 rounded-xl text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🦮</span>
                <span>Large Dog (Labrador, Golden)</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('giant')}
                className="px-3 py-1.5 rounded-xl text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🐕‍🦺</span>
                <span>Giant Dog (German Shepherd)</span>
              </button>
            </div>

            <div className="inline-flex p-1 rounded-xl bg-zinc-100 text-xs font-semibold self-start lg:self-auto border border-zinc-200/60">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  unit === 'cm'
                    ? 'bg-white text-zinc-900 shadow-2xs font-bold'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Metric (cm)
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  unit === 'in'
                    ? 'bg-white text-zinc-900 shadow-2xs font-bold'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Imperial (inches)
              </button>
            </div>
          </div>

          {/* Calculator Inputs and Sizing Output */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Input Form + Precision Architectural Blueprint (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Measurement Form Card */}
              <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-zinc-900">
                      Step 1: Physical Measurements ({unit})
                    </h2>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      IATA Standard LAR-82
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Airlines strictly mandate that {petName} must be able to stand erect without touching the top, turn around 360°, and lie down in a natural Sphinx posture with legs stretched.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Field A */}
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-[#0E2342] text-white flex items-center justify-center text-[10px]">A</span>
                        <span>Length</span>
                      </label>
                      <span className="text-[10px] text-zinc-400">Nose to tail root</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="10"
                        max="160"
                        value={unit === 'cm' ? lengthA : Math.round(lengthA / 2.54)}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setLengthA(unit === 'cm' ? val : Math.round(val * 2.54));
                        }}
                        className="w-full border border-zinc-300 rounded-lg px-3 py-2 font-mono text-sm font-semibold text-zinc-900 focus:outline-emerald-600 bg-white shadow-2xs"
                      />
                      <span className="text-xs font-semibold text-zinc-500 w-6">{unit}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">Do not include tail length.</p>
                  </div>

                  {/* Field B */}
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-emerald-700 text-white flex items-center justify-center text-[10px]">B</span>
                        <span>Elbow Height</span>
                      </label>
                      <span className="text-[10px] text-zinc-400">Floor to elbow joint</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="5"
                        max="80"
                        value={unit === 'cm' ? heightB : Math.round(heightB / 2.54)}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setHeightB(unit === 'cm' ? val : Math.round(val * 2.54));
                        }}
                        className="w-full border border-zinc-300 rounded-lg px-3 py-2 font-mono text-sm font-semibold text-zinc-900 focus:outline-emerald-600 bg-white shadow-2xs"
                      />
                      <span className="text-xs font-semibold text-zinc-500 w-6">{unit}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">Determines ½B length margin.</p>
                  </div>

                  {/* Field C */}
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-blue-700 text-white flex items-center justify-center text-[10px]">C</span>
                        <span>Shoulder Width</span>
                      </label>
                      <span className="text-[10px] text-zinc-400">Widest across back</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="8"
                        max="80"
                        value={unit === 'cm' ? widthC : Math.round(widthC / 2.54)}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setWidthC(unit === 'cm' ? val : Math.round(val * 2.54));
                        }}
                        className="w-full border border-zinc-300 rounded-lg px-3 py-2 font-mono text-sm font-semibold text-zinc-900 focus:outline-emerald-600 bg-white shadow-2xs"
                      />
                      <span className="text-xs font-semibold text-zinc-500 w-6">{unit}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">Crate Width = C × 2.</p>
                  </div>

                  {/* Field D */}
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[10px]">D</span>
                        <span>Standing Height</span>
                      </label>
                      <span className="text-[10px] text-amber-700 font-semibold">To tip of ears</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="10"
                        max="140"
                        value={unit === 'cm' ? heightD : Math.round(heightD / 2.54)}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setHeightD(unit === 'cm' ? val : Math.round(val * 2.54));
                        }}
                        className="w-full border border-zinc-300 rounded-lg px-3 py-2 font-mono text-sm font-semibold text-zinc-900 focus:outline-emerald-600 bg-white shadow-2xs"
                      />
                      <span className="text-xs font-semibold text-zinc-500 w-6">{unit}</span>
                    </div>
                    <p className="text-[10px] text-amber-800">Measure to erect ear tips.</p>
                  </div>
                </div>
              </div>

              {/* Precision Architectural Blueprint Schematic (Clean Light Architectural Canvas) */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0E2342]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                      Official IATA CR-82 Technical Schematic
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Live Spatial Clearance
                  </span>
                </div>

                {/* SVG Blueprint Canvas - Clean Light Architectural Drafting Table */}
                <div className="relative w-full bg-[#F8FAFC] rounded-xl border border-zinc-200/90 p-3 overflow-hidden">
                  <svg className="w-full h-52 sm:h-56" viewBox="0 0 460 210" fill="none">
                    <defs>
                      {/* Subtle Technical Architectural Drafting Grid */}
                      <pattern id="lightGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
                      </pattern>
                      {/* Dimension Arrow Markers */}
                      <marker id="arrowDark" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill="#0E2342" />
                      </marker>
                      <marker id="arrowDarkStart" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                        <path d="M6,0 L0,3 L6,6 Z" fill="#0E2342" />
                      </marker>
                      <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill="#0FA958" />
                      </marker>
                      <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill="#D97706" />
                      </marker>
                      <marker id="arrowAmberStart" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                        <path d="M6,0 L0,3 L6,6 Z" fill="#D97706" />
                      </marker>
                    </defs>

                    {/* Grid Background */}
                    <rect width="460" height="210" fill="url(#lightGrid)" />

                    {/* Crate Outer Wireframe Architectural Blueprint */}
                    <rect
                      x="40"
                      y="25"
                      width="350"
                      height="155"
                      rx="12"
                      fill="#FFFFFF"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Crate Door Grate & Hardware */}
                    <rect x="365" y="35" width="20" height="135" rx="3" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="375" y1="35" x2="375" y2="170" stroke="#94A3B8" strokeWidth="1.5" />
                    {/* Metal Fastener Bolts */}
                    <circle cx="50" cy="102" r="3" fill="#64748B" />
                    <circle cx="150" cy="102" r="3" fill="#64748B" />
                    <circle cx="260" cy="102" r="3" fill="#64748B" />
                    <circle cx="350" cy="102" r="3" fill="#64748B" />
                    <line x1="40" y1="102" x2="385" y2="102" stroke="#E2E8F0" strokeWidth="1" />

                    {/* Floor Baseline */}
                    <line x1="20" y1="180" x2="420" y2="180" stroke="#64748B" strokeWidth="2" />

                    {/* Standing Pet Silhouette (Natural Anatomical Proportions) */}
                    <g transform="translate(65, 45)">
                      <path
                        d="M 60 120 
                           L 75 120 
                           L 82 85 
                           C 90 85, 120 90, 155 90 
                           L 165 120 
                           L 185 120 
                           L 175 75 
                           C 195 70, 205 60, 215 50 
                           C 222 42, 230 40, 240 38 
                           C 248 38, 252 32, 248 24 
                           C 242 15, 232 20, 225 28 
                           C 220 28, 215 25, 205 32 
                           C 185 45, 170 48, 140 48 
                           C 115 48, 90 45, 75 55 
                           C 68 62, 60 70, 50 78 
                           C 35 72, 25 55, 30 45 
                           C 35 38, 42 42, 45 50 
                           C 48 65, 55 75, 58 85 
                           Z"
                        fill="#E2E8F0"
                        stroke="#64748B"
                        strokeWidth="1.5"
                      />
                      {/* Foreleg definition */}
                      <path d="M 185 120 L 195 120 L 205 78 L 190 75 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
                      {/* Hindleg definition */}
                      <path d="M 45 120 L 58 120 L 68 85 L 55 85 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
                    </g>

                    {/* Dimension A: Length (Nose to root of tail) */}
                    <line
                      x1="125"
                      y1="55"
                      x2="310"
                      y2="55"
                      stroke="#0E2342"
                      strokeWidth="2"
                      markerStart="url(#arrowDarkStart)"
                      markerEnd="url(#arrowDark)"
                    />
                    <rect x="188" y="44" width="64" height="18" rx="4" fill="#FFFFFF" stroke="#0E2342" strokeWidth="1.5" />
                    <text x="220" y="57" fill="#0E2342" fontSize="10" fontWeight="bold" textAnchor="middle">
                      A: {unit === 'cm' ? lengthA : Math.round(lengthA / 2.54)}{unit}
                    </text>

                    {/* Dimension B: Floor to Elbow */}
                    <line
                      x1="260"
                      y1="135"
                      x2="260"
                      y2="178"
                      stroke="#0FA958"
                      strokeWidth="2"
                      markerEnd="url(#arrowGreen)"
                    />
                    <rect x="268" y="148" width="50" height="16" rx="3" fill="#FFFFFF" stroke="#0FA958" strokeWidth="1.5" />
                    <text x="293" y="160" fill="#047857" fontSize="9" fontWeight="bold" textAnchor="middle">
                      B: {unit === 'cm' ? heightB : Math.round(heightB / 2.54)}{unit}
                    </text>

                    {/* Dimension D: Standing Height (Floor to head / ears) */}
                    <line
                      x1="410"
                      y1="70"
                      x2="410"
                      y2="178"
                      stroke="#D97706"
                      strokeWidth="2"
                      markerStart="url(#arrowAmberStart)"
                      markerEnd="url(#arrowAmber)"
                    />
                    <rect x="382" y="112" width="56" height="18" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
                    <text x="410" y="125" fill="#B45309" fontSize="10" fontWeight="bold" textAnchor="middle">
                      D: {unit === 'cm' ? heightD : Math.round(heightD / 2.54)}{unit}
                    </text>

                    {/* Headroom Clearance Visual Line (+5cm minimum) */}
                    <line x1="40" y1="40" x2="390" y2="40" stroke="#0FA958" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="290" y="27" width="95" height="16" rx="3" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
                    <text x="337" y="39" fill="#065F46" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                      +5cm IATA Headroom
                    </text>
                  </svg>
                </div>

                {/* Spatial Clearance Status Strip - Clean Light Cards */}
                <div className="grid grid-cols-3 gap-3 text-center pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <span className="text-zinc-500 block text-[10px] font-medium">Headroom Margin</span>
                    <span className="font-bold text-emerald-700 mt-0.5 block">✓ +5 cm Clearance</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <span className="text-zinc-500 block text-[10px] font-medium">Turnaround 360°</span>
                    <span className="font-bold text-emerald-700 mt-0.5 block">✓ Width = 2 × C</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <span className="text-zinc-500 block text-[10px] font-medium">Sphinx Extension</span>
                    <span className="font-bold text-emerald-700 mt-0.5 block">✓ A + ½B Buffer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Minimum Required Crate Dimensions & Mandatory Hardware (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Executive Sizing Output Card - Clean Enterprise White Card */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-zinc-200/80 space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      Official IATA LAR CR-82 Standard
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5">
                      Minimum Required Crate Size
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Boarding Clearance Verified
                  </span>
                </div>

                {/* 3 Metric Cards - Clean Light Backgrounds */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">
                      Length (A+½B)
                    </span>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
                      {displayLength}
                      <span className="text-xs font-normal text-zinc-500 ml-1">{unit}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 block mt-1">Interior clearance</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">
                      Width (C×2)
                    </span>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
                      {displayWidth}
                      <span className="text-xs font-normal text-zinc-500 ml-1">{unit}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 block mt-1">360° turn radius</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">
                      Height (D+5cm)
                    </span>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
                      {displayHeight}
                      <span className="text-xs font-normal text-zinc-500 ml-1">{unit}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 block mt-1">Headroom clear</span>
                  </div>
                </div>

                {/* Commercial Crate Market Match - Clean Emerald/Zinc Inset */}
                <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <span>📦</span>
                      <span>Commercial Crate Size Match:</span>
                    </span>
                    <span className="text-[10px] font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                      Standard Commercial Fit
                    </span>
                  </div>
                  <div className="text-base font-bold text-zinc-900">
                    {commercialMatch.series}
                  </div>
                  <div className="text-xs text-zinc-700">
                    Exterior specs: <strong className="text-zinc-900 font-mono">{commercialMatch.dimensionsIn}</strong> ({commercialMatch.dimensionsCm})
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Fit for: {commercialMatch.typicalPets}
                  </div>
                  {commercialMatch.offShelf ? (
                    <div className="text-[11px] text-emerald-700 font-semibold pt-1 flex items-center gap-1">
                      <span>✓</span>
                      <span>Readily available in standard plastic airline kennels (Petmate Sky Kennel / Vari Kennel).</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-amber-800 font-semibold pt-1 flex items-center gap-1">
                      <span>⚠️</span>
                      <span>Giant breeds generally require a reinforced wooden CR-82 crate built to custom dimensions.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mandatory Cargo Desk Acceptance Checklist - Clean White Card */}
              <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">
                      Mandatory Airline Gate Acceptance Checklist
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Cargo staff will reject crates failing any of these items at check-in.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md shrink-0">
                    Strictly Inspected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-zinc-900">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0 font-mono">1</span>
                      <span>Metal Hardware Only</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed pl-7">
                      Top and bottom halves must be secured with <strong>metal bolts and wingnuts</strong>. Airlines reject plastic twist clips and dial snaps.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-zinc-900">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0 font-mono">2</span>
                      <span>4-Sided Ventilation</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed pl-7">
                      International flights require metal wire ventilation grilles on <strong>all 4 sides</strong> (minimum 16% total surface area opening).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-zinc-900">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0 font-mono">3</span>
                      <span>Dual External Bowls</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed pl-7">
                      Two separate dishes (water and food) must attach to the door inside, refillable from the outside without opening the crate door.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-zinc-900">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0 font-mono">4</span>
                      <span>LIVE ANIMAL Labels</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed pl-7">
                      Official green/red <strong>&quot;LIVE ANIMALS&quot;</strong> stickers (min 25mm text) and &quot;This Side Up&quot; arrows (↑↑) on at least 2 sides.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: IN-CABIN CARRIER GUIDELINES (PETC) ───────────────── */}
      {activeTab === 'cabin' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  Pet In Cabin (PETC) Standards
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 mt-0.5">
                  Soft-Sided Airline Under-Seat Carrier Regulations
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/80 self-start sm:self-auto">
                Under-Seat Stowage Required
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed max-w-4xl">
              If {petName} weighs under 8.0 kg (17.6 lbs) including the weight of the carrier, European airlines (such as Lufthansa, Air France, KLM, Swiss, and Iberia) permit in-cabin travel. The pet must remain fully enclosed inside the carrier under the seat directly in front of you during taxi, takeoff, flight, and landing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                  Maximum Exterior Dimensions
                </span>
                <div className="text-lg font-bold text-zinc-900 font-mono">
                  45 × 30 × 25 cm
                </div>
                <div className="text-xs text-zinc-500 font-mono">
                  (18 × 12 × 10 inches)
                </div>
                <p className="text-[11px] text-zinc-500 pt-1 leading-relaxed">
                  Must be soft-sided to flex slightly under the specific aircraft seat frame geometry.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                  Maximum Combined Weight
                </span>
                <div className="text-lg font-bold text-zinc-900 font-mono">
                  8.0 kg (17.6 lbs)
                </div>
                <div className="text-xs text-zinc-500">
                  Pet + Carrier Combined Weight
                </div>
                <p className="text-[11px] text-zinc-500 pt-1 leading-relaxed">
                  Weighed precisely on calibrated scales at airport check-in. Pets exceeding 8.0 kg are re-booked to cargo hold.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                  Ventilation &amp; Base Lining
                </span>
                <div className="text-lg font-bold text-zinc-900">
                  Leak-Proof Bottom
                </div>
                <div className="text-xs text-zinc-500">
                  3-Sided Breathable Mesh
                </div>
                <p className="text-[11px] text-zinc-500 pt-1 leading-relaxed">
                  Must feature claw-resistant reinforced mesh, lockable zippers, and an absorbent pee-pad liner.
                </p>
              </div>
            </div>

            {/* Special Route Legal Warning */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <strong className="block font-bold text-amber-900">
                ⚠️ Critical Statutory Warning for United Kingdom Border Routes:
              </strong>
              <p className="text-amber-900 leading-relaxed">
                Under UK Animal Health &amp; Border Law (DEFRA), <strong>pets are not permitted to enter Great Britain in the passenger cabin</strong> on commercial scheduled aircraft (except recognized assistance dogs). Pets entering the UK must fly as <em>manifested cargo</em> via an approved pet handling facility (e.g. Heathrow Animal Reception Centre - HARC). Flights <em>departing</em> the UK to mainland European airports may permit in-cabin travel depending on the European operating carrier.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: AIRLINE SPECIFIC POLICIES & SNUB-NOSED RULES ───────── */}
      {activeTab === 'policies' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Major Carrier Pet Logistics Comparison Matrix
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                Airlines restrict the maximum number of live animals permitted per flight (often only 2 in-cabin and 4 in cargo). You must book pet space immediately after booking your flight ticket.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-50 text-zinc-600 uppercase text-[10px] font-semibold border-y border-zinc-200">
                  <tr>
                    <th className="py-3 px-3.5">Airline</th>
                    <th className="py-3 px-3.5">Cabin (PETC)</th>
                    <th className="py-3 px-3.5">Cargo Hold (AVIH)</th>
                    <th className="py-3 px-3.5">Advance Booking</th>
                    <th className="py-3 px-3.5">Snub-Nosed Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-700">
                  <tr className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3.5 px-3.5 font-bold text-zinc-900">Lufthansa</td>
                    <td className="py-3.5 px-3.5 text-emerald-700 font-medium">✓ Max 8 kg (55×40×23cm)</td>
                    <td className="py-3.5 px-3.5">✓ Up to Series 700</td>
                    <td className="py-3.5 px-3.5">Min 72h prior</td>
                    <td className="py-3.5 px-3.5 text-amber-700 font-medium">Extra crate space +10cm</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3.5 px-3.5 font-bold text-zinc-900">Air France / KLM</td>
                    <td className="py-3.5 px-3.5 text-emerald-700 font-medium">✓ Max 8 kg (46×28×24cm)</td>
                    <td className="py-3.5 px-3.5">✓ Up to 75 kg (pet+crate)</td>
                    <td className="py-3.5 px-3.5">Min 48h prior</td>
                    <td className="py-3.5 px-3.5 text-red-600 font-medium">Hold embargo for specific breeds</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3.5 px-3.5 font-bold text-zinc-900">British Airways</td>
                    <td className="py-3.5 px-3.5 text-zinc-400">Assistance dogs only</td>
                    <td className="py-3.5 px-3.5">✓ Via IAG Cargo desk</td>
                    <td className="py-3.5 px-3.5">Min 14 days booking</td>
                    <td className="py-3.5 px-3.5 text-red-600 font-medium">Strict temperature limits</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3.5 px-3.5 font-bold text-zinc-900">Swiss International</td>
                    <td className="py-3.5 px-3.5 text-emerald-700 font-medium">✓ Max 8 kg (118cm total)</td>
                    <td className="py-3.5 px-3.5">✓ Up to Series 700</td>
                    <td className="py-3.5 px-3.5">Min 72h prior</td>
                    <td className="py-3.5 px-3.5 text-amber-700 font-medium">Seasonal embargo &gt;27°C</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3.5 px-3.5 font-bold text-zinc-900">Emirates</td>
                    <td className="py-3.5 px-3.5 text-zinc-400">Falcons &amp; Guide dogs only</td>
                    <td className="py-3.5 px-3.5">✓ Via Emirates SkyCargo</td>
                    <td className="py-3.5 px-3.5">Min 7 days prior</td>
                    <td className="py-3.5 px-3.5 text-zinc-600">Special climate-controlled hold</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Brachycephalic / Snub-Nosed Advisory Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <span>⚠️</span>
                <span>Brachycephalic (Snub-Nosed) Breed Flight Precautions</span>
              </div>
              <p className="leading-relaxed text-amber-900">
                Breeds with shortened airways (French Bulldogs, English Bulldogs, Pugs, Boston Terriers, Boxers, Shih Tzus, and Persian cats) are anatomically susceptible to severe respiratory distress, heat exhaustion, and hypoxia under flight stress.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px] text-amber-950">
                <div className="p-2.5 rounded-lg bg-amber-100/70 border border-amber-200 font-medium">
                  <strong>1. Crate Upsizing Mandate:</strong> Most carriers require a crate <strong>one size larger</strong> than normal with 4-sided metal mesh ventilation.
                </div>
                <div className="p-2.5 rounded-lg bg-amber-100/70 border border-amber-200 font-medium">
                  <strong>2. Tarmac Temperature Embargo:</strong> Flights are denied if airport tarmac temperatures exceed 27°C (80°F) at origin, transit, or destination.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: PRINTABLE CRATE PLACARD & EMERGENCY TAG ──────────── */}
      {activeTab === 'placard' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  IATA LAR Official Check-In Placard
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 mt-0.5">
                  Live Animal Cargo Exterior Placard
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Print and laminate this official placard. Affix it to the top or side of {petName}&apos;s travel crate inside a transparent document pouch.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePrintPlacard}
                className="shrink-0 px-4 py-2.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
              >
                <span>🖨️</span>
                <span>Print Placard (A4 / Letter)</span>
              </button>
            </div>

            {/* Editable Placard Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-zinc-700 block mb-1">Flight Number</label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 font-mono text-xs font-semibold text-zinc-900 bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-zinc-700 block mb-1">Owner Mobile (Origin)</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 font-mono text-xs font-semibold text-zinc-900 bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-zinc-700 block mb-1">Emergency Phone (Dest)</label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 font-mono text-xs font-semibold text-zinc-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-zinc-700 text-xs block mb-1">
                Special Feeding, Watering &amp; Veterinary Instructions
              </label>
              <textarea
                rows={2}
                value={feedingInstructions}
                onChange={(e) => setFeedingInstructions(e.target.value)}
                className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-xs text-zinc-900 bg-white leading-relaxed"
              />
            </div>

            {/* Printable Document Sheet Preview */}
            <div className="border-2 border-dashed border-zinc-300 rounded-2xl p-6 sm:p-8 bg-[#FAFBFB] space-y-6 print:border-solid print:p-0 print:m-0">
              {/* Green / Red Live Animal Caution Header */}
              <div className="bg-[#15803D] text-white p-4 rounded-xl flex items-center justify-between text-center print:bg-[#15803D]">
                <div className="text-xl sm:text-2xl font-black tracking-widest uppercase">
                  ↑↑ LIVE ANIMALS ↑↑
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wider uppercase opacity-90 hidden sm:block">
                  ANIMAUX VIVANTS · IATA LAR CR-82
                </div>
                <div className="text-xl sm:text-2xl font-black tracking-widest uppercase">
                  ↑↑ THIS SIDE UP ↑↑
                </div>
              </div>

              {/* Identity & Flight Specs Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-zinc-200 pb-5">
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Pet Name</span>
                  <span className="font-serif text-lg font-bold text-zinc-900 block mt-0.5">{petName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Species / Breed</span>
                  <span className="font-semibold text-zinc-800 block mt-0.5">{species} · {breed}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">ISO Microchip</span>
                  <span className="font-mono font-bold text-zinc-900 block mt-0.5">{microchip}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Flight Route</span>
                  <span className="font-bold text-zinc-900 block mt-0.5">{origin} → {destination}</span>
                </div>
              </div>

              {/* Emergency Contacts & Handler Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border-b border-zinc-200 pb-5">
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Shipper / Owner</span>
                  <span className="font-semibold text-zinc-800 block mt-0.5">{ownerEmail}</span>
                  <span className="font-mono text-zinc-600 block mt-0.5">{contactPhone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Destination Consignee</span>
                  <span className="font-semibold text-zinc-800 block mt-0.5">Contact at {destination}</span>
                  <span className="font-mono text-zinc-600 block mt-0.5">{emergencyPhone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Flight Designation</span>
                  <span className="font-mono font-bold text-emerald-800 block mt-0.5">{flightNumber}</span>
                  <span className="text-[11px] text-zinc-500 block">Air Waybill (AWB) Attached</span>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                  Ground Crew &amp; Cargo Handler Directives:
                </span>
                <p className="text-zinc-700 bg-white p-3 rounded-lg border border-zinc-200/80 leading-relaxed">
                  {feedingInstructions}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2">
                <span>Petvia Digital Travel Compliance Framework · Reference: PV-2026-IATA-CR82</span>
                <span className="font-mono">Do not stack cargo on top of this container</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
