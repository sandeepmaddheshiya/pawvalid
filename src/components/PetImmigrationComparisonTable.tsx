'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export interface CountryComparisonItem {
  id: string;
  name: string;
  slug: string;
  flag: string;
  code: string;
  region: string;
  authority: string;
  authorityShort: string;
  permitRequired: 'YES' | 'NO' | 'CONDITIONAL' | 'ADVANCE_NOTICE';
  permitName: string;
  permitShort: string;
  permitLeadTime: string;
  quarantineDays: string;
  quarantineStatus: 'ZERO' | 'STRICT' | 'CONDITIONAL';
  quarantineFacility: string;
  quarantineShort: string;
  timeline: string;
  timelineWeeks: string;
  titerRequired: 'MANDATORY' | 'CONDITIONAL' | 'EXEMPT';
  titerShort: string;
  titerDetails: string;
  endorsementRequired: string;
  entryAirports: string[];
  tapewormRequired: boolean;
  bannedBreedsCount: number;
  catRestrictions: string;
  keySummary: string;
}

export const COMPARISON_DATA: CountryComparisonItem[] = [
  {
    id: 'australia',
    name: 'Australia',
    slug: 'australia',
    flag: '🇦🇺',
    code: 'AU',
    region: 'Oceania (Rabies-Free)',
    authority: 'Department of Agriculture, Fisheries and Forestry (DAFF)',
    authorityShort: 'DAFF',
    permitRequired: 'YES',
    permitName: 'DAFF BICON Import Permit (12-Month Validity)',
    permitShort: 'DAFF BICON Permit',
    permitLeadTime: 'Apply 3–6 months prior',
    quarantineDays: '10 to 30 Days Mandatory',
    quarantineStatus: 'STRICT',
    quarantineFacility: 'Mickleham Post Entry Quarantine (PEQ), Melbourne',
    quarantineShort: 'Mickleham PEQ (MEL)',
    timeline: '6 to 7 Months',
    timelineWeeks: '24–28 wks prep',
    titerRequired: 'MANDATORY',
    titerShort: 'FAVN / RNATT (180d wait)',
    titerDetails: 'RNATT / FAVN titer (≥0.50 IU/mL) + 180-day waiting period prior to entry',
    endorsementRequired: 'DAFF Health Cert stamped by USDA APHIS / DEFRA / CFIA',
    entryAirports: ['Melbourne Tullamarine Airport (MEL only)'],
    tapewormRequired: false,
    bannedBreedsCount: 5,
    catRestrictions: 'Savannah and Bengal cats (F1–F4) strictly prohibited',
    keySummary: 'World’s strictest biosecurity protocol. 180-day titer wait, mandatory BICON permit, manifest cargo only, 10–30 days quarantine at Mickleham.',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    slug: 'singapore',
    flag: '🇸🇬',
    code: 'SG',
    region: 'Southeast Asia (Rabies-Free)',
    authority: 'Animal & Veterinary Service (AVS / NParks)',
    authorityShort: 'AVS / NParks',
    permitRequired: 'YES',
    permitName: 'AVS GoBusiness Electronic Import Licence',
    permitShort: 'AVS GoBusiness Licence',
    permitLeadTime: 'Apply within 30 days of arrival',
    quarantineDays: '0 to 30 Days (Tier Dependent)',
    quarantineStatus: 'CONDITIONAL',
    quarantineFacility: 'Animal Quarantine Centre (AQC) Sembawang / Changi CAPQ',
    quarantineShort: '0d (Cat A/B) or 10–30d AQC',
    timeline: '3 to 6 Months',
    timelineWeeks: '12–24 wks prep',
    titerRequired: 'CONDITIONAL',
    titerShort: 'Mandatory (Cat C/D)',
    titerDetails: 'Mandatory for Category C & D countries (US, Canada, EU); exempt for Cat A (UK, Australia, NZ)',
    endorsementRequired: 'AVS Health Certificate endorsed within 7 days of flight',
    entryAirports: ['Singapore Changi Airport (SIN - CAPQ Station)'],
    tapewormRequired: false,
    bannedBreedsCount: 8,
    catRestrictions: 'Bengal/Savannah F1-F4 restricted; HDB housing permits max 2 cats',
    keySummary: 'Four-tier categorization (A/B/C/D). Cat A/B qualify for 0-day quarantine. Cat C/D mandate 10–30 days at Sembawang AQC.',
  },
  {
    id: 'japan',
    name: 'Japan',
    slug: 'japan',
    flag: '🇯🇵',
    code: 'JP',
    region: 'East Asia (Rabies-Free)',
    authority: 'Ministry of Agriculture, Forestry and Fisheries (MAFF / AQS)',
    authorityShort: 'MAFF AQS',
    permitRequired: 'ADVANCE_NOTICE',
    permitName: 'MAFF Advance Import Notification Approval',
    permitShort: 'MAFF 40-Day Notice',
    permitLeadTime: 'Submit ≥40 days prior to landing',
    quarantineDays: '0 Days (Inspection < 12 hrs) or 180 Days',
    quarantineStatus: 'CONDITIONAL',
    quarantineFacility: 'MAFF Animal Quarantine Service (NRT, HND, KIX, NGO)',
    quarantineShort: '<12h Release (180d wait)',
    timeline: '7 Months',
    timelineWeeks: '28 wks prep',
    titerRequired: 'MANDATORY',
    titerShort: 'FAVN (≥0.50) + 180d',
    titerDetails: 'FAVN test (≥0.50 IU/mL) + mandatory 180-day waiting clock post-blood draw',
    endorsementRequired: 'MAFF Form A & Form C endorsed by national authority',
    entryAirports: ['Tokyo Narita (NRT)', 'Tokyo Haneda (HND)', 'Osaka Kansai (KIX)', 'Nagoya Chubu (NGO)'],
    tapewormRequired: false,
    bannedBreedsCount: 0,
    catRestrictions: 'Microchip before 1st rabies vaccine; core feline vaccines recommended',
    keySummary: 'Strict 180-day titer latency. 2 rabies vaccines post-microchip required. Fulfilling the 180-day clock grants 0-day quarantine.',
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    slug: 'united-kingdom',
    flag: '🇬🇧',
    code: 'GB',
    region: 'Western Europe (Controlled)',
    authority: 'Department for Environment, Food & Rural Affairs (DEFRA / APHA)',
    authorityShort: 'DEFRA / APHA',
    permitRequired: 'NO',
    permitName: 'None (DEFRA Great Britain Pet Health Certificate)',
    permitShort: 'No Permit (GB Health Cert)',
    permitLeadTime: 'Issued within 10 days of arrival',
    quarantineDays: '0 Days (Direct Release)',
    quarantineStatus: 'ZERO',
    quarantineFacility: 'Direct Release via Border Control Post (BCP / HARC Heathrow)',
    quarantineShort: '0 Days (Direct Release)',
    timeline: '21 to 30 Days',
    timelineWeeks: '3–4 wks prep',
    titerRequired: 'CONDITIONAL',
    titerShort: 'Exempt (Listed Origins)',
    titerDetails: 'Exempt from Part 1 & Part 2 listed countries (US, Canada, EU); mandatory for unlisted nations',
    endorsementRequired: 'GB Pet Health Certificate endorsed by USDA / CFIA / Official Vet',
    entryAirports: ['London Heathrow (LHR - HARC)', 'London Gatwick (LGW)', 'Manchester (MAN)'],
    tapewormRequired: true,
    bannedBreedsCount: 5,
    catRestrictions: 'Exempt from tapeworm; manifest cargo required on commercial airlines',
    keySummary: 'No import permit. 0-day quarantine. Mandatory tapeworm treatment 24–120 hrs prior for dogs. Manifest cargo required on commercial flights.',
  },
  {
    id: 'germany',
    name: 'European Union (EU)',
    slug: 'germany',
    flag: '🇪🇺',
    code: 'EU',
    region: 'European Union (Harmonized)',
    authority: 'European Commission (EU Regulation 576/2013)',
    authorityShort: 'EU Reg 576/2013',
    permitRequired: 'NO',
    permitName: 'None (EU Non-Commercial Health Certificate Annex IV)',
    permitShort: 'No Permit (Annex IV Cert)',
    permitLeadTime: 'Issued within 10 days of entry',
    quarantineDays: '0 Days (Direct Release)',
    quarantineStatus: 'ZERO',
    quarantineFacility: 'Direct customs entry at designated EU Border Inspection Posts (BIP)',
    quarantineShort: '0 Days (Direct Release)',
    timeline: '21 to 30 Days',
    timelineWeeks: '3–4 wks prep',
    titerRequired: 'CONDITIONAL',
    titerShort: 'Exempt (Listed Origins)',
    titerDetails: 'Exempt from Annex II listed countries (US, Canada, UK, Australia); mandatory 3-month wait for unlisted nations',
    endorsementRequired: 'EU Annex IV Certificate endorsed by official government vet (USDA VEHCS / CFIA)',
    entryAirports: ['Frankfurt (FRA)', 'Paris CDG (CDG)', 'Madrid (MAD)', 'Amsterdam (AMS)'],
    tapewormRequired: false,
    bannedBreedsCount: 4,
    catRestrictions: 'Standard ISO microchip + valid rabies; Ireland/Malta/Finland require tapeworm for dogs',
    keySummary: 'Harmonized 27-country EU standard. No permit. 0 quarantine from listed nations. Valid rabies vaccine (21-day wait) + ISO microchip.',
  },
  {
    id: 'canada',
    name: 'Canada',
    slug: 'canada',
    flag: '🇨🇦',
    code: 'CA',
    region: 'North America (Controlled)',
    authority: 'Canadian Food Inspection Agency (CFIA / CBSA)',
    authorityShort: 'CFIA / CBSA',
    permitRequired: 'NO',
    permitName: 'None (Rabies Vaccination Certificate / CFIA Certificate)',
    permitShort: 'No Permit (Rabies Cert)',
    permitLeadTime: 'Standard veterinary clinical sign-off',
    quarantineDays: '0 Days (Direct Release)',
    quarantineStatus: 'ZERO',
    quarantineFacility: 'Direct customs clearance at Canada Border Services Agency (CBSA) ports',
    quarantineShort: '0 Days (Direct Release)',
    timeline: '21 to 30 Days',
    timelineWeeks: '3–4 wks prep',
    titerRequired: 'EXEMPT',
    titerShort: 'Exempt (Not Required)',
    titerDetails: 'Rabies titer test NOT required for personal companion animals',
    endorsementRequired: 'Licensed veterinarian certificate (USDA endorsement optional for personal pets)',
    entryAirports: ['Toronto Pearson (YYZ)', 'Vancouver (YVR)', 'Montreal (YUL)', 'Calgary (YYC)'],
    tapewormRequired: false,
    bannedBreedsCount: 1,
    catRestrictions: 'Cats from rabies-free countries exempt from rabies vaccination; $30+tax CAD CBSA inspection fee',
    keySummary: 'One of the simplest pet immigration frameworks. Valid rabies cert, 0 quarantine, no permit for personal pets, flat CBSA border inspection fee.',
  },
  {
    id: 'united-states',
    name: 'United States',
    slug: 'united-states',
    flag: '🇺🇸',
    code: 'US',
    region: 'North America (Controlled)',
    authority: 'Centers for Disease Control and Prevention (CDC) & USDA APHIS',
    authorityShort: 'CDC / USDA',
    permitRequired: 'NO',
    permitName: 'CDC Dog Import Form (Mandatory Digital Receipt)',
    permitShort: 'CDC Dog Import Receipt',
    permitLeadTime: 'Submit online 2–10 days before travel',
    quarantineDays: '0 Days (Low-Risk) or Conditional',
    quarantineStatus: 'ZERO',
    quarantineFacility: 'CDC Port of Entry Animal Care Facility (JFK, MIA, LAX, ATL, ORD, IAD)',
    quarantineShort: '0 Days (Low-Risk Origins)',
    timeline: '21 to 30 Days',
    timelineWeeks: '3–4 wks prep',
    titerRequired: 'CONDITIONAL',
    titerShort: 'Exempt (Low-Risk Origins)',
    titerDetails: 'Exempt for dogs from rabies-free/low-risk countries; mandatory for foreign-vaccinated dogs from high-risk countries',
    endorsementRequired: 'CDC Certification of Foreign Rabies Vaccination & Microchip Form',
    entryAirports: ['New York (JFK)', 'Los Angeles (LAX)', 'Miami (MIA)', 'Atlanta (ATL)', 'Chicago (ORD)'],
    tapewormRequired: false,
    bannedBreedsCount: 0,
    catRestrictions: 'Cats exempt from CDC rabies requirements (subject to state-level rules)',
    keySummary: '2024–2026 CDC Dog Import Form mandatory for all dogs. Minimum age 6 months. ISO microchip required. 0 quarantine for low-risk origins.',
  },
  {
    id: 'united-arab-emirates',
    name: 'United Arab Emirates',
    slug: 'united-arab-emirates',
    flag: '🇦🇪',
    code: 'AE',
    region: 'Middle East (High Biosecurity)',
    authority: 'Ministry of Climate Change and Environment (MOCCAE)',
    authorityShort: 'MOCCAE',
    permitRequired: 'YES',
    permitName: 'MOCCAE Pet Import Permit (30-Day Validity)',
    permitShort: 'MOCCAE Import Permit',
    permitLeadTime: 'Apply 14–30 days prior',
    quarantineDays: '0 Days (Direct Release)',
    quarantineStatus: 'ZERO',
    quarantineFacility: 'Direct clearance via MOCCAE Port Veterinary Clinic (DXB, AUH)',
    quarantineShort: '0 Days (Direct Release)',
    timeline: '2 to 3 Months',
    timelineWeeks: '8–12 wks prep',
    titerRequired: 'MANDATORY',
    titerShort: 'FAVN Titer (≥0.50)',
    titerDetails: 'FAVN rabies titer test (≥0.50 IU/mL) mandatory for high-risk origins; 12-week wait',
    endorsementRequired: 'MOCCAE Official Health Certificate endorsed by USDA / DEFRA',
    entryAirports: ['Dubai International (DXB)', 'Abu Dhabi International (AUH)'],
    tapewormRequired: false,
    bannedBreedsCount: 12,
    catRestrictions: 'Tri-cat (FVRCP) vaccine mandatory; maximum 2 pets per resident per year',
    keySummary: 'MOCCAE advance permit required. Titer test mandatory from unlisted countries. Manifest cargo only. Extensive banned breed list.',
  },
  {
    id: 'ireland',
    name: 'Ireland',
    slug: 'ireland',
    flag: '🇮🇪',
    code: 'IE',
    region: 'Western Europe (Rabies-Free)',
    authority: 'Department of Agriculture, Food and the Marine (DAFM)',
    authorityShort: 'DAFM',
    permitRequired: 'NO',
    permitName: 'None (Advance DAFM Pre-Notification Booking)',
    permitShort: 'No Permit (DAFM Notice)',
    permitLeadTime: 'Notify DAFM ≥24 hrs prior',
    quarantineDays: '0 Days (Direct Release)',
    quarantineStatus: 'ZERO',
    quarantineFacility: 'Direct release at Dublin Airport (DUB) or Shannon (SNN)',
    quarantineShort: '0 Days (Direct Release)',
    timeline: '21 to 30 Days',
    timelineWeeks: '3–4 wks prep',
    titerRequired: 'CONDITIONAL',
    titerShort: 'Exempt (Listed Origins)',
    titerDetails: 'Exempt from EU and Part 1/2 listed countries; required for unlisted origins',
    endorsementRequired: 'EU Non-Commercial Health Certificate endorsed by official authority',
    entryAirports: ['Dublin Airport (DUB)', 'Shannon Airport (SNN)'],
    tapewormRequired: true,
    bannedBreedsCount: 0,
    catRestrictions: 'Cats exempt from tapeworm; mandatory DAFM advance booking at DUB',
    keySummary: 'EU harmonized rules plus mandatory Praziquantel tapeworm treatment 24–120 hours before arrival for dogs. 0-day quarantine.',
  },
  {
    id: 'mexico',
    name: 'Mexico',
    slug: 'mexico',
    flag: '🇲🇽',
    code: 'MX',
    region: 'North America / Latin America',
    authority: 'SENASICA / SADER',
    authorityShort: 'SENASICA',
    permitRequired: 'NO',
    permitName: 'None (OISA Health Inspection Certificate upon entry)',
    permitShort: 'No Permit (OISA Desk)',
    permitLeadTime: 'On arrival inspection',
    quarantineDays: '0 Days (Direct Release)',
    quarantineStatus: 'ZERO',
    quarantineFacility: 'SENASICA OISA desk at international airports',
    quarantineShort: '0 Days (Direct Release)',
    timeline: '15 to 21 Days',
    timelineWeeks: '2–3 wks prep',
    titerRequired: 'EXEMPT',
    titerShort: 'Exempt (Not Required)',
    titerDetails: 'Titer test not required for dogs and cats arriving from US, Canada, EU',
    endorsementRequired: 'Veterinary health certificate (or US/Canadian health cert)',
    entryAirports: ['Mexico City (MEX)', 'Cancún (CUN)', 'Guadalajara (GDL)', 'Monterrey (MTY)'],
    tapewormRequired: false,
    bannedBreedsCount: 0,
    catRestrictions: 'Internal & external parasite treatment within 6 months required',
    keySummary: 'Fast streamlined entry. Free SENASICA inspection on arrival. Valid rabies vaccination and parasite treatment required.',
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    slug: 'switzerland',
    flag: '🇨🇭',
    code: 'CH',
    region: 'Central Europe (Schengen)',
    authority: 'Federal Food Safety and Veterinary Office (FSVO)',
    authorityShort: 'FSVO',
    permitRequired: 'NO',
    permitName: 'None (Swiss/EU Health Certificate)',
    permitShort: 'No Permit (Swiss/EU Cert)',
    permitLeadTime: 'Issued within 10 days of travel',
    quarantineDays: '0 Days (Direct Release)',
    quarantineStatus: 'ZERO',
    quarantineFacility: 'Direct customs clearance at Zurich (ZRH) or Geneva (GVA)',
    quarantineShort: '0 Days (Direct Release)',
    timeline: '21 to 30 Days',
    timelineWeeks: '3–4 wks prep',
    titerRequired: 'CONDITIONAL',
    titerShort: 'Exempt (Listed Origins)',
    titerDetails: 'Exempt from EU and low-risk countries; mandatory titer for rabies-risk origins',
    endorsementRequired: 'FSVO-approved bilingual health certificate endorsed by state vet',
    entryAirports: ['Zurich Airport (ZRH)', 'Geneva Airport (GVA)', 'EuroAirport Basel (BSL)'],
    tapewormRequired: false,
    bannedBreedsCount: 0,
    catRestrictions: 'Strict prohibition against dogs/cats with cropped ears or docked tails',
    keySummary: 'FSVO European alignment. 0 quarantine from low-risk countries. Absolute ban on importing pets with cropped ears or docked tails.',
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    slug: 'vietnam',
    flag: '🇻🇳',
    code: 'VN',
    region: 'Southeast Asia',
    authority: 'Department of Animal Health (DAH / MARD)',
    authorityShort: 'DAH / MARD',
    permitRequired: 'NO',
    permitName: 'None (Government Health Certificate + Vaccination Book)',
    permitShort: 'No Permit (Health Cert)',
    permitLeadTime: 'Health cert issued within 7–10 days',
    quarantineDays: '0 Days (Direct Release)',
    quarantineStatus: 'ZERO',
    quarantineFacility: 'Airport Animal Quarantine Station (SGN, HAN, DAD)',
    quarantineShort: '0 Days (Direct Release)',
    timeline: '21 to 30 Days',
    timelineWeeks: '3–4 wks prep',
    titerRequired: 'EXEMPT',
    titerShort: 'Exempt (Not Required)',
    titerDetails: 'Rabies titer test not statutorily mandated for personal pets',
    endorsementRequired: 'Export health cert endorsed by national veterinary ministry (USDA/APHA/CFIA)',
    entryAirports: ['Ho Chi Minh City (SGN)', 'Hanoi (HAN)', 'Da Nang (DAD)'],
    tapewormRequired: false,
    bannedBreedsCount: 0,
    catRestrictions: 'Rabies vaccine within 30 days to 12 months; core vaccines recommended',
    keySummary: 'Zero quarantine for companion animals. Microchip, rabies vaccination, and officially endorsed veterinary health certificate required.',
  },
];

export default function PetImmigrationComparisonTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'STRICT' | 'SIMPLE' | 'PERMIT_ONLY' | 'NO_PERMIT'>('ALL');
  const [speciesFilter, setSpeciesFilter] = useState<'ALL' | 'DOG' | 'CAT'>('ALL');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return COMPARISON_DATA.filter((item) => {
      // Search matches
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.permitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.region.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter tabs
      let matchesFilter = true;
      if (activeFilter === 'STRICT') {
        matchesFilter =
          item.quarantineStatus === 'STRICT' ||
          item.quarantineStatus === 'CONDITIONAL' ||
          item.timeline.includes('Months') ||
          item.timeline.includes('Mo');
      } else if (activeFilter === 'SIMPLE') {
        matchesFilter = item.quarantineStatus === 'ZERO' && item.permitRequired === 'NO';
      } else if (activeFilter === 'PERMIT_ONLY') {
        matchesFilter = item.permitRequired === 'YES' || item.permitRequired === 'ADVANCE_NOTICE';
      } else if (activeFilter === 'NO_PERMIT') {
        matchesFilter = item.permitRequired === 'NO';
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const toggleRow = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {/* ─── SEARCH & FILTER CONTROLS ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-4 sm:p-5 shadow-2xs mb-6">
        <div className="flex flex-col md:flex-row gap-3.5 md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              id="country-comparison-search"
              type="text"
              placeholder="Search destination, authority or code (e.g. Australia, DAFF, Canada, UK, EU, Japan)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-16 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {searchTerm && (
              <button
                id="country-comparison-clear-search"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Species Selector */}
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
            <button
              id="filter-species-all"
              onClick={() => setSpeciesFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                speciesFilter === 'ALL'
                  ? 'bg-white text-zinc-900 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              🐾 All Pets
            </button>
            <button
              id="filter-species-dogs"
              onClick={() => setSpeciesFilter('DOG')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                speciesFilter === 'DOG'
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              🐕 Dogs
            </button>
            <button
              id="filter-species-cats"
              onClick={() => setSpeciesFilter('CAT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                speciesFilter === 'CAT'
                  ? 'bg-white text-indigo-800 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              🐈 Cats
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3.5 border-t border-zinc-100 mt-3.5 text-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mr-1 hidden sm:inline">
            Filters:
          </span>
          <button
            id="filter-category-all"
            onClick={() => setActiveFilter('ALL')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer text-xs ${
              activeFilter === 'ALL'
                ? 'bg-zinc-900 text-white font-semibold'
                : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80'
            }`}
          >
            All Destinations ({COMPARISON_DATA.length})
          </button>
          <button
            id="filter-category-strict"
            onClick={() => setActiveFilter('STRICT')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer text-xs ${
              activeFilter === 'STRICT'
                ? 'bg-amber-700 text-white font-semibold'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/80'
            }`}
          >
            Strict Rules (Quarantine / Permits)
          </button>
          <button
            id="filter-category-simple"
            onClick={() => setActiveFilter('SIMPLE')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer text-xs ${
              activeFilter === 'SIMPLE'
                ? 'bg-emerald-700 text-white font-semibold'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/80'
            }`}
          >
            Simpler Rules (0 Days Quarantine)
          </button>
          <button
            id="filter-category-permit"
            onClick={() => setActiveFilter('PERMIT_ONLY')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer text-xs ${
              activeFilter === 'PERMIT_ONLY'
                ? 'bg-blue-700 text-white font-semibold'
                : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200/80'
            }`}
          >
            Permit Required
          </button>
          <button
            id="filter-category-no-permit"
            onClick={() => setActiveFilter('NO_PERMIT')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer text-xs ${
              activeFilter === 'NO_PERMIT'
                ? 'bg-zinc-700 text-white font-semibold'
                : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border border-zinc-200/80'
            }`}
          >
            Health Cert Only
          </button>
        </div>
      </div>

      {/* ─── DESKTOP COMPARISON TABLE (FULL-WIDTH, PERFECT RATIOS) ────── */}
      <div className="hidden lg:block bg-white rounded-2xl border border-zinc-200/90 shadow-sm overflow-hidden mb-10">
        <table className="table-fixed w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0E2342] text-white text-[11px] uppercase tracking-wider font-semibold">
              <th className="w-[24%] py-3.5 px-4">Country &amp; Authority</th>
              <th className="w-[18%] py-3.5 px-3.5">Permit Needed?</th>
              <th className="w-[18%] py-3.5 px-3.5">Quarantine?</th>
              <th className="w-[14%] py-3.5 px-3.5">Typical Timeline</th>
              <th className="w-[13%] py-3.5 px-3.5">Rabies Titer</th>
              <th className="w-[13%] py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/70 text-xs">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500 text-sm">
                  No destinations match your search. Try resetting the filters.
                </td>
              </tr>
            ) : (
              filteredData.map((country) => {
                const isExpanded = expandedRow === country.id;
                return (
                  <React.Fragment key={country.id}>
                    <tr
                      className={`hover:bg-zinc-50/90 transition-colors cursor-pointer ${
                        isExpanded ? 'bg-zinc-50/95' : ''
                      }`}
                      onClick={() => toggleRow(country.id)}
                    >
                      {/* 1. Country & Authority */}
                      <td className="py-3.5 px-4 align-middle">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl shrink-0 select-none" role="img" aria-label={country.name}>
                            {country.flag}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif font-bold text-zinc-900 text-sm truncate">
                                {country.name}
                              </span>
                              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-zinc-100 text-zinc-600 shrink-0 font-medium">
                                {country.code}
                              </span>
                            </div>
                            <span className="text-[11px] text-zinc-500 block truncate">
                              {country.authorityShort} • {country.region}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Permit Needed? */}
                      <td className="py-3.5 px-3.5 align-middle">
                        {country.permitRequired === 'YES' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                            <span>Permit Required</span>
                          </span>
                        )}
                        {country.permitRequired === 'ADVANCE_NOTICE' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                            <span>40-Day Notice</span>
                          </span>
                        )}
                        {country.permitRequired === 'NO' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                            <span>No Permit</span>
                          </span>
                        )}
                        <span className="block text-[11px] text-zinc-500 mt-0.5 truncate font-normal">
                          {country.permitShort}
                        </span>
                      </td>

                      {/* 3. Quarantine? */}
                      <td className="py-3.5 px-3.5 align-middle">
                        {country.quarantineStatus === 'STRICT' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-900 border border-red-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                            <span>{country.quarantineDays.split(' ')[0]} {country.quarantineDays.split(' ')[1] || ''} Strict</span>
                          </span>
                        )}
                        {country.quarantineStatus === 'CONDITIONAL' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                            <span>Conditional</span>
                          </span>
                        )}
                        {country.quarantineStatus === 'ZERO' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                            <span>0 Days Direct</span>
                          </span>
                        )}
                        <span className="block text-[11px] text-zinc-500 mt-0.5 truncate font-normal">
                          {country.quarantineShort}
                        </span>
                      </td>

                      {/* 4. Typical Timeline */}
                      <td className="py-3.5 px-3.5 align-middle">
                        <strong className="text-zinc-900 font-semibold block text-xs truncate">
                          {country.timeline}
                        </strong>
                        <span className="text-[11px] text-zinc-500 block truncate">
                          {country.timelineWeeks}
                        </span>
                      </td>

                      {/* 5. Rabies Titer */}
                      <td className="py-3.5 px-3.5 align-middle">
                        {country.titerRequired === 'MANDATORY' && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-900">
                            Mandatory
                          </span>
                        )}
                        {country.titerRequired === 'CONDITIONAL' && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-900">
                            Conditional
                          </span>
                        )}
                        {country.titerRequired === 'EXEMPT' && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-900">
                            Exempt
                          </span>
                        )}
                        <span className="block text-[11px] text-zinc-500 mt-0.5 truncate">
                          {country.titerShort}
                        </span>
                      </td>

                      {/* 6. Action Buttons */}
                      <td className="py-3.5 px-4 align-middle text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            id={`toggle-details-desktop-${country.id}`}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRow(country.id);
                            }}
                            className={`px-2 py-1 rounded-lg border text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                              isExpanded
                                ? 'bg-zinc-200 border-zinc-300 text-zinc-900'
                                : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                            }`}
                          >
                            <span>{isExpanded ? 'Close' : 'Details'}</span>
                            <svg
                              className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <Link
                            href={`/en/countries/${country.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-1 rounded-lg bg-[#0E2342] hover:bg-[#16345E] text-white text-[11px] font-semibold transition-colors inline-flex items-center gap-0.5 shrink-0 shadow-2xs"
                          >
                            <span>Guide</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>

                    {/* ─── EXPANDABLE DETAIL DRAWER (DESKTOP) ──────────────── */}
                    {isExpanded && (
                      <tr className="bg-zinc-50/95 border-b border-zinc-200">
                        <td colSpan={6} className="p-5 sm:p-6">
                          <div className="space-y-4 text-left">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                                  {country.name} Official Statutory Profile
                                </span>
                                <h4 className="font-serif text-base font-bold text-zinc-900">
                                  {country.authority}
                                </h4>
                              </div>
                              <span className="text-xs bg-white px-3 py-1 rounded-full border border-zinc-200 text-zinc-700 font-medium">
                                {country.region}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                              {country.keySummary}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                              <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80">
                                <strong className="text-zinc-900 block mb-1">📋 Permit &amp; Endorsement</strong>
                                <p className="text-zinc-600 leading-relaxed mb-1.5">
                                  <strong>Permit:</strong> {country.permitName} ({country.permitLeadTime})
                                </p>
                                <p className="text-zinc-600 leading-relaxed">
                                  <strong>Health Cert:</strong> {country.endorsementRequired}
                                </p>
                              </div>

                              <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80">
                                <strong className="text-zinc-900 block mb-1">🔬 Titer &amp; Quarantine</strong>
                                <p className="text-zinc-600 leading-relaxed mb-1.5">
                                  <strong>Titer Protocol:</strong> {country.titerDetails}
                                </p>
                                <p className="text-zinc-600 leading-relaxed">
                                  <strong>Quarantine:</strong> {country.quarantineFacility}
                                </p>
                              </div>

                              <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80">
                                <strong className="text-zinc-900 block mb-1">⚠️ Species &amp; Ports</strong>
                                <p className="text-zinc-600 leading-relaxed mb-1">
                                  <strong>Dogs:</strong> {country.tapewormRequired ? 'Mandatory Praziquantel tapeworm (24–120h)' : 'Standard parasite protocol'}
                                </p>
                                <p className="text-zinc-600 leading-relaxed mb-1">
                                  <strong>Cats:</strong> {country.catRestrictions}
                                </p>
                                <p className="text-zinc-600 leading-relaxed">
                                  <strong>Ports:</strong> {country.entryAirports.join(', ')}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60">
                              <span className="text-[11px] text-zinc-500 italic">
                                Statutory reference: {country.authorityShort} biosecurity framework.
                              </span>
                              <div className="flex items-center gap-2">
                                <Link
                                  href="/en/checker"
                                  className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                                >
                                  Verify Documents with Scanner
                                </Link>
                                <Link
                                  href={`/en/countries/${country.slug}`}
                                  className="px-3.5 py-1.5 rounded-lg bg-[#0E2342] text-white hover:bg-[#16345E] text-xs font-semibold transition-colors"
                                >
                                  Full {country.name} Guide →
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ─── MOBILE & TABLET RESPONSIVE CARDS VIEW (< 1024px) ────────── */}
      <div className="lg:hidden space-y-3.5 mb-10">
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200/90 p-8 text-center text-zinc-500 text-sm">
            No destinations match your search or filter criteria.
          </div>
        ) : (
          filteredData.map((country) => {
            const isExpanded = expandedRow === country.id;
            return (
              <div
                key={country.id}
                className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden transition-all"
              >
                {/* Card Header */}
                <div
                  className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-zinc-50/80 transition-colors"
                  onClick={() => toggleRow(country.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-3xl shrink-0" role="img" aria-label={country.name}>
                      {country.flag}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif font-bold text-zinc-900 text-base truncate">
                          {country.name}
                        </h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600 font-medium">
                          {country.code}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 block truncate">
                        {country.authorityShort} • {country.region}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/en/countries/${country.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-lg bg-[#0E2342] text-white text-xs font-semibold inline-flex items-center gap-1 shadow-2xs"
                    >
                      <span>Guide</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Card Specs Grid */}
                <div className="grid grid-cols-2 gap-2 px-4 pb-3 text-xs bg-zinc-50/60 pt-2.5 border-t border-zinc-100">
                  <div className="bg-white p-2.5 rounded-xl border border-zinc-200/70">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">
                      Permit Needed?
                    </span>
                    <strong className="text-zinc-900 font-semibold block truncate">
                      {country.permitRequired === 'YES' && '⚠️ Mandatory Permit'}
                      {country.permitRequired === 'ADVANCE_NOTICE' && 'ℹ️ 40-Day Advance'}
                      {country.permitRequired === 'NO' && '✅ No Permit'}
                    </strong>
                    <span className="text-[11px] text-zinc-500 truncate block">
                      {country.permitShort}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-zinc-200/70">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">
                      Quarantine?
                    </span>
                    <strong className="text-zinc-900 font-semibold block truncate">
                      {country.quarantineStatus === 'STRICT' && `🔴 ${country.quarantineDays.split(' ')[0]} ${country.quarantineDays.split(' ')[1] || ''}`}
                      {country.quarantineStatus === 'CONDITIONAL' && '🟡 Conditional'}
                      {country.quarantineStatus === 'ZERO' && '🟢 0 Days Direct'}
                    </strong>
                    <span className="text-[11px] text-zinc-500 truncate block">
                      {country.quarantineShort}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-zinc-200/70">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">
                      Timeline
                    </span>
                    <strong className="text-zinc-900 font-semibold block truncate">
                      {country.timeline}
                    </strong>
                    <span className="text-[11px] text-zinc-500 truncate block">
                      {country.timelineWeeks}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-zinc-200/70">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">
                      Rabies Titer
                    </span>
                    <strong className="text-zinc-900 font-semibold block truncate">
                      {country.titerRequired === 'MANDATORY' && '🔴 Mandatory'}
                      {country.titerRequired === 'CONDITIONAL' && '🟡 Conditional'}
                      {country.titerRequired === 'EXEMPT' && '🟢 Exempt'}
                    </strong>
                    <span className="text-[11px] text-zinc-500 truncate block">
                      {country.titerShort}
                    </span>
                  </div>
                </div>

                {/* Quick Toggle Details Button */}
                <div className="px-4 py-2 bg-zinc-50/90 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <button
                    id={`toggle-details-mobile-${country.id}`}
                    onClick={() => toggleRow(country.id)}
                    className="text-zinc-600 hover:text-zinc-900 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Statutory Details' : 'View Full Statutory Rules'}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <span className="text-[11px] text-zinc-400">
                    {country.authorityShort}
                  </span>
                </div>

                {/* Expanded Details on Mobile */}
                {isExpanded && (
                  <div className="p-4 border-t border-zinc-200 bg-white space-y-3 text-xs text-left">
                    <p className="text-zinc-600 leading-relaxed">
                      {country.keySummary}
                    </p>
                    <div className="space-y-2 text-zinc-700">
                      <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/70">
                        <strong className="text-zinc-900 block mb-0.5">Permit &amp; Certificates:</strong>
                        <span>{country.permitName} ({country.permitLeadTime}). Health cert: {country.endorsementRequired}.</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/70">
                        <strong className="text-zinc-900 block mb-0.5">Titer &amp; Quarantine:</strong>
                        <span>{country.titerDetails}. Quarantine at {country.quarantineFacility}.</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/70">
                        <strong className="text-zinc-900 block mb-0.5">Species Specific:</strong>
                        <span>{country.tapewormRequired ? 'Dogs: Mandatory tapeworm (24–120h). ' : ''}Cats: {country.catRestrictions}.</span>
                      </div>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href="/en/checker"
                        className="text-emerald-700 hover:text-emerald-800 font-semibold underline text-xs"
                      >
                        Check Document Readiness →
                      </Link>
                      <Link
                        href={`/en/countries/${country.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-[#0E2342] text-white font-semibold text-xs"
                      >
                        Complete Guide →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ─── H3 SECTIONS: PERMIT, QUARANTINE, TIMELINE ──────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* H3: Permit needed? */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm mb-4 border border-amber-200/80">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2.5">
              Permit needed?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
              Whether your pet requires an Advance Government Import Permit depends strictly on the sovereign destination’s administrative framework:
            </p>
            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200/80 text-xs space-y-2 text-zinc-700">
              <div>
                <strong className="text-zinc-900 block">Mandatory Import Permits:</strong>
                <span>Australia (DAFF BICON), Singapore (AVS GoBusiness), UAE (MOCCAE), and Japan (MAFF 40-day advance notification approval).</span>
              </div>
              <div className="pt-2 border-t border-zinc-200/60">
                <strong className="text-zinc-900 block">No Separate Permit (Health Cert Only):</strong>
                <span>European Union (Annex IV Health Cert), Great Britain (DEFRA GB Certificate), Canada (Rabies Certificate), and USA (CDC Dog Import Form receipt).</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
            <em>Lead time warning: Permit applications in Australia and Singapore take up to 20–30 business days to process.</em>
          </div>
        </div>

        {/* H3: Quarantine? */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-800 flex items-center justify-center font-bold text-sm mb-4 border border-red-200/80">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2.5">
              Quarantine?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
              Post-arrival quarantine is governed by the biosecurity status of both the destination and origin countries:
            </p>
            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200/80 text-xs space-y-2 text-zinc-700">
              <div>
                <strong className="text-zinc-900 block">Mandatory Government Facility Quarantine:</strong>
                <span>Australia mandates 10 to 30 days at Mickleham Post Entry Quarantine (PEQ) in Melbourne. Singapore mandates 10–30 days for Category C/D origins at Sembawang.</span>
              </div>
              <div className="pt-2 border-t border-zinc-200/60">
                <strong className="text-zinc-900 block">Zero-Day Quarantine (Direct Release):</strong>
                <span>UK, EU, Canada, USA, and Switzerland grant direct release upon port veterinary inspection if all vaccines and certificates are compliant.</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
            <em>Japan Rule: Pets meeting the 180-day titer latency period undergo under 12 hours of clearance inspection, avoiding 180-day quarantine.</em>
          </div>
        </div>

        {/* H3: Typical timeline */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-200/80">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2.5">
              Typical timeline
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
              Planning timelines range from 21 days to over 7 months based on statutory rabies incubation rules:
            </p>
            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200/80 text-xs space-y-2 text-zinc-700">
              <div>
                <strong className="text-zinc-900 block">6 to 7 Months Lead Time:</strong>
                <span>Required for Australia, Japan, Singapore (Cat C/D), and New Zealand due to mandatory 180-day post-titer blood draw latency clocks.</span>
              </div>
              <div className="pt-2 border-t border-zinc-200/60">
                <strong className="text-zinc-900 block">21 to 30 Days Lead Time:</strong>
                <span>Sufficient for EU, UK, Canada, and USA when moving from rabies-controlled countries (satisfying the 21-day primary rabies vaccination window).</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
            <em>Critical timing: Microchip must be implanted before or on the exact same day as the qualifying rabies vaccine.</em>
          </div>
        </div>
      </div>
    </div>
  );
}
