'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CertificateRouteDetail {
  id: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  certificateName: string;
  certificateType: 'EU_PASSPORT' | 'AHC' | 'EXPORT_CERT';
  certificateTypeLabel: string;
  issuingAuthority: string;
  endorsementRequired: boolean;
  endorsementBody: string;
  validityWindow: string;
  tapewormRequired: boolean;
  titerRequired: boolean;
  estimatedCost: string;
  keyRequirements: string[];
  warningNote?: string;
  officialFormRef: string;
}

const CERTIFICATE_ROUTES: Record<string, CertificateRouteDetail> = {
  'uk-to-eu': {
    id: 'uk-to-eu',
    origin: 'United Kingdom (Great Britain)',
    originCode: 'GB',
    destination: 'European Union (EU / Schengen)',
    destinationCode: 'EU',
    certificateName: 'Animal Health Certificate (AHC)',
    certificateType: 'AHC',
    certificateTypeLabel: 'Animal Health Certificate (AHC)',
    issuingAuthority: 'UK Official Veterinarian (OV) with OCQ(V) CA qualification',
    endorsementRequired: false,
    endorsementBody: 'None (OV official practice stamp provides statutory legal authority post-Brexit)',
    validityWindow: 'Issued within 10 days of EU entry; valid for 4 months of intra-EU travel or until rabies expires',
    tapewormRequired: false,
    titerRequired: false,
    estimatedCost: '£110 – £250 per pet (+ £30–£50 per additional pet)',
    keyRequirements: [
      'ISO 11784/11785 15-digit microchip implanted before or on same day as rabies vaccination',
      'Valid primary rabies vaccination (administered at least 21 days prior to travel)',
      'Dual-language certificate (English + language of the first EU port of entry)',
      'Must be signed strictly within 10 days of entering the EU border inspection post',
      'Valid for 4 months of continuous travel within EU member states and return to Great Britain',
    ],
    warningNote: 'UK-issued EU pet passports are permanently invalid for travel from Great Britain to the EU post-Brexit. You must obtain an AHC for every trip unless your pet holds an EU passport issued physically within an EU member state.',
    officialFormRef: 'Regulation (EU) 2020/692 / Model Non-Commercial Animal Health Certificate',
  },
  'us-to-eu': {
    id: 'us-to-eu',
    origin: 'United States',
    originCode: 'US',
    destination: 'European Union (EU / Schengen)',
    destinationCode: 'EU',
    certificateName: 'EU Non-Commercial Health Certificate (USDA APHIS Form)',
    certificateType: 'EXPORT_CERT',
    certificateTypeLabel: 'Government Export Health Certificate',
    issuingAuthority: 'USDA-Accredited Category II Licensed Veterinarian',
    endorsementRequired: true,
    endorsementBody: 'USDA APHIS Veterinary Services (via VEHCS digital endorsement or physical wet stamp)',
    validityWindow: 'Issued within 10 days of departure; valid for 4 months of intra-EU travel once stamped at EU port',
    tapewormRequired: false,
    titerRequired: false,
    estimatedCost: '$250 – $450 USD (Clinical exam $150–$250 + USDA endorsement fee $38–$150 + courier)',
    keyRequirements: [
      'ISO 11784/11785 15-digit microchip implanted prior to rabies vaccination',
      'Rabies vaccination administered at least 21 days before entry into the EU',
      'Completed EU Model Health Certificate in English and official language of first EU port of entry',
      'Official USDA APHIS electronic endorsement stamp generated through VEHCS',
      'Tapeworm treatment strictly 24–120 hours before arrival if entering Ireland, Northern Ireland, Finland, or Malta',
    ],
    warningNote: 'USDA VEHCS electronic submissions must allow sufficient processing time. While electronic certificates are accepted across EU member states, ensure your first port of entry accepts digital VEHCS PDFs.',
    officialFormRef: 'Commission Implementing Regulation (EU) 2021/403 (Annex II, Part 1)',
  },
  'us-to-uk': {
    id: 'us-to-uk',
    origin: 'United States',
    originCode: 'US',
    destination: 'United Kingdom (Great Britain)',
    destinationCode: 'GB',
    certificateName: 'Great Britain Pet Health Certificate (GB Form)',
    certificateType: 'EXPORT_CERT',
    certificateTypeLabel: 'Government Export Health Certificate',
    issuingAuthority: 'USDA-Accredited Category II Licensed Veterinarian',
    endorsementRequired: true,
    endorsementBody: 'USDA APHIS Veterinary Services (VEHCS)',
    validityWindow: 'Issued within 10 days of arrival in Great Britain; valid for 4 months of travel within GB',
    tapewormRequired: true,
    titerRequired: false,
    estimatedCost: '$250 – $450 USD (Clinical exam + USDA APHIS endorsement + Praziquantel administration)',
    keyRequirements: [
      'ISO 11784/11785 microchip & compliant rabies vaccination (≥21 days old)',
      'Official GB Model Pet Health Certificate endorsed by USDA APHIS',
      'Mandatory Tapeworm Treatment (Praziquantel) administered by vet strictly 24 to 120 hours before landing in the UK',
      'Arrival strictly via approved DEFRA air routes as manifest cargo (or authorized pet taxi from France via Eurotunnel/ferry)',
    ],
    warningNote: 'Commercial airlines cannot fly pets into the UK in-cabin or as excess baggage. Dogs and cats must arrive as manifested air cargo under IATA Live Animals Regulations, or enter via approved sea/train corridors from Europe.',
    officialFormRef: 'UK DEFRA Great Britain Model Health Certificate (GBHC450 / Non-Commercial)',
  },
  'ca-to-eu': {
    id: 'ca-to-eu',
    origin: 'Canada',
    originCode: 'CA',
    destination: 'European Union (EU / Schengen)',
    destinationCode: 'EU',
    certificateName: 'EU Non-Commercial Health Certificate (CFIA Endorsed)',
    certificateType: 'EXPORT_CERT',
    certificateTypeLabel: 'Government Export Health Certificate',
    issuingAuthority: 'Licensed Canadian Veterinarian',
    endorsementRequired: true,
    endorsementBody: 'Canadian Food Inspection Agency (CFIA) District Veterinary Office',
    validityWindow: 'Issued within 10 days of travel; valid for 4 months within EU after port endorsement',
    tapewormRequired: false,
    titerRequired: false,
    estimatedCost: '$200 – $380 CAD (Clinic exam + CFIA endorsement fee of ~$20 CAD + courier)',
    keyRequirements: [
      'ISO 11784/11785 microchip & rabies vaccination administered on or after microchipping',
      'Completed official bilingual EU certificate for the country of first arrival',
      'Physical wet-ink endorsement stamp and signature from an official CFIA District Veterinarian',
      'Clinical health examination performed within 10 days of departure',
    ],
    warningNote: 'CFIA requires pet owners to book an appointment with their local district office or send documents via tracked express courier. Ensure at least 5 business days for endorsement processing.',
    officialFormRef: 'CFIA Export Certificate / EU Non-Commercial Movement Regulation 576/2013',
  },
  'eu-to-eu': {
    id: 'eu-to-eu',
    origin: 'European Union Member State',
    originCode: 'EU',
    destination: 'European Union (Intra-EU / Schengen)',
    destinationCode: 'EU',
    certificateName: 'EU Pet Passport (Standard Blue Passport)',
    certificateType: 'EU_PASSPORT',
    certificateTypeLabel: 'EU Pet Passport',
    issuingAuthority: 'Authorized European Union Private Practicing Veterinarian',
    endorsementRequired: false,
    endorsementBody: 'None (Self-contained legal document recognized across all 27 EU member states)',
    validityWindow: 'Lifelong validity (as long as rabies boosters are administered without any lapse)',
    tapewormRequired: false,
    titerRequired: false,
    estimatedCost: '€25 – €70 (one-time passport issuance fee + rabies vaccine)',
    keyRequirements: [
      'Standard blue EU Pet Passport with official country code and alphanumeric serial number',
      'ISO 11784/11785 15-digit microchip recorded with exact date of implantation',
      'Valid rabies vaccination recorded with batch number, manufacturer, and validity expiration date',
      'Tapeworm treatment (Praziquantel) entered in Section VII strictly 24–120h prior if travelling to Ireland, Finland, or Malta',
    ],
    warningNote: 'Only an EU-licensed veterinarian located physically within an EU member state can issue or update an EU Pet Passport. Non-EU veterinarians cannot stamp or update EU passports.',
    officialFormRef: 'Regulation (EU) No 576/2013 Annex III (Model Pet Passport)',
  },
  'us-to-au': {
    id: 'us-to-au',
    origin: 'United States',
    originCode: 'US',
    destination: 'Australia',
    destinationCode: 'AU',
    certificateName: 'DAFF Veterinary Health Certificate & BICON Import Permit',
    certificateType: 'EXPORT_CERT',
    certificateTypeLabel: 'Government Export Health Certificate',
    issuingAuthority: 'USDA-Accredited Category II Veterinarian & USDA Official Veterinarian',
    endorsementRequired: true,
    endorsementBody: 'USDA APHIS Veterinary Services (Mandatory physical wet stamp & digital seal)',
    validityWindow: 'Health cert issued within 5 days of travel; import permit valid for 12 months',
    tapewormRequired: true,
    titerRequired: true,
    estimatedCost: '$2,500 – $4,500 USD (Includes $2,000+ AUD PEQ quarantine fee, titer test, permits, and multi-stage vet treatments)',
    keyRequirements: [
      'DAFF BICON Import Permit secured at least 3–5 months before travel',
      'FAVN Rabies Titer Blood Test (≥0.50 IU/mL) + 180-day waiting period prior to arrival',
      'Mandatory pre-export tests: Brucella canis, Ehrlichia canis, Leishmania infantum, Leptospirosis',
      'External and internal parasite treatments strictly timed across two separate clinical dates',
      'Mandatory 10 to 30 days post-entry quarantine at Mickleham PEQ in Melbourne',
      'Transport strictly as manifest cargo landing at Melbourne (MEL) Airport',
    ],
    warningNote: 'Australia has zero tolerance for timing discrepancies. If the RNATT titer test or parasite treatment window is off by even a single day, the pet will be rejected or subjected to extended 30-day quarantine at extreme owner expense.',
    officialFormRef: 'Australian Biosecurity Act 2015 / DAFF Non-Commercial Companion Animal Export Certificate',
  },
  'eu-to-uk': {
    id: 'eu-to-uk',
    origin: 'European Union',
    originCode: 'EU',
    destination: 'United Kingdom (Great Britain)',
    destinationCode: 'GB',
    certificateName: 'EU Pet Passport (Accepted for Entry into Great Britain)',
    certificateType: 'EU_PASSPORT',
    certificateTypeLabel: 'EU Pet Passport',
    issuingAuthority: 'Authorized EU Veterinarian',
    endorsementRequired: false,
    endorsementBody: 'None (GB border controls recognize valid EU Pet Passports directly)',
    validityWindow: 'Lifelong validity with up-to-date rabies boosters',
    tapewormRequired: true,
    titerRequired: false,
    estimatedCost: '€30 – €80 (Vet consultation + Praziquantel administration)',
    keyRequirements: [
      'Valid EU Pet Passport issued in an EU member state or Northern Ireland',
      'ISO 11784/11785 microchip scanned before rabies vaccine administration',
      'Rabies vaccination current and within official validity window',
      'For dogs: Tapeworm treatment (Praziquantel) administered by an EU vet strictly 24 to 120 hours before arriving in the UK and stamped in Section VII',
    ],
    warningNote: 'Do not miss the tapeworm window. Dogs arriving in the UK with a tapeworm treatment given less than 24 hours or more than 120 hours prior to arrival will be refused entry or placed into quarantine.',
    officialFormRef: 'DEFRA Great Britain Non-Commercial Animal Entry Controls / EU Regulation 576/2013 Recognition',
  },
  'us-to-jp': {
    id: 'us-to-jp',
    origin: 'United States',
    originCode: 'US',
    destination: 'Japan',
    destinationCode: 'JP',
    certificateName: 'MAFF Export Health Certificate (Forms A & C)',
    certificateType: 'EXPORT_CERT',
    certificateTypeLabel: 'Government Export Health Certificate',
    issuingAuthority: 'USDA-Accredited Category II Veterinarian',
    endorsementRequired: true,
    endorsementBody: 'USDA APHIS Veterinary Services (VEHCS)',
    validityWindow: 'Health exam strictly within 10 days (or 48 hours for clinical sign-off) of departure',
    tapewormRequired: false,
    titerRequired: true,
    estimatedCost: '$500 – $900 USD (Two rabies vaccines + FAVN titer test + USDA endorsement)',
    keyRequirements: [
      'Advance Notification submitted to Japan MAFF Animal Quarantine Service (AQS) at least 40 days prior to landing',
      'Two lifetime rabies vaccines (inactivated/recombinant) given after microchip implantation',
      'FAVN Rabies Titer Test (≥0.50 IU/mL) processed at a MAFF-designated laboratory',
      '180-day waiting period from the blood draw date before travel (to qualify for 12-hour quarantine exemption)',
      'MAFF Form A and Form C completed by USDA vet and endorsed by USDA APHIS',
    ],
    warningNote: 'If the 180-day titer wait is incomplete upon arrival, the pet will be quarantined at the AQS airport quarantine facility for the remaining balance of the 180 days at the owner’s expense.',
    officialFormRef: 'Japan MAFF Rabies Prevention Act / Forms A & C Export Certificate',
  },
};

export default function PetCertificateSelector() {
  const [selectedRouteKey, setSelectedRouteKey] = useState<string>('uk-to-eu');
  const [filterSpecies, setFilterSpecies] = useState<'DOG' | 'CAT'>('DOG');

  const activeRoute = CERTIFICATE_ROUTES[selectedRouteKey] || CERTIFICATE_ROUTES['uk-to-eu'];

  const routeOptions = [
    { key: 'uk-to-eu', origin: 'United Kingdom', dest: 'European Union', desc: 'Post-Brexit AHC Requirement' },
    { key: 'us-to-eu', origin: 'United States', dest: 'European Union', desc: 'USDA APHIS EU Health Certificate' },
    { key: 'us-to-uk', origin: 'United States', dest: 'United Kingdom', desc: 'GB Pet Health Cert + Tapeworm' },
    { key: 'ca-to-eu', origin: 'Canada', dest: 'European Union', desc: 'CFIA Endorsed EU Certificate' },
    { key: 'eu-to-eu', origin: 'EU Member State', dest: 'EU (Intra-Schengen)', desc: 'Standard Blue EU Pet Passport' },
    { key: 'eu-to-uk', origin: 'European Union', dest: 'United Kingdom', desc: 'EU Passport Entry + Tapeworm' },
    { key: 'us-to-au', origin: 'United States', dest: 'Australia', desc: 'Strict DAFF Export Cert + 180d Titer' },
    { key: 'us-to-jp', origin: 'United States', dest: 'Japan', desc: 'MAFF 40-Day Notice + Forms A & C' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs overflow-hidden text-zinc-900">
      {/* Selector Header Bar */}
      <div className="bg-[#0E2342] p-5 sm:p-7 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-400/30 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Statutory Travel Certificate Matcher</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
              Which Pet Travel Certificate Do You Need?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Select your travel corridor and pet species to cross-reference mandatory certificate classifications, official signing credentials, sovereign endorsement requirements, and statutory validity deadlines.
            </p>
          </div>

          {/* Species Toggle */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/15 self-start sm:self-center shrink-0">
            <button
              onClick={() => setFilterSpecies('DOG')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterSpecies === 'DOG'
                  ? 'bg-white text-[#0E2342] shadow-xs'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Canine (Dog)
            </button>
            <button
              onClick={() => setFilterSpecies('CAT')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterSpecies === 'CAT'
                  ? 'bg-white text-[#0E2342] shadow-xs'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Feline (Cat)
            </button>
          </div>
        </div>
      </div>

      {/* Corridor Selection Pills */}
      <div className="p-4 sm:p-6 bg-[#F8FAFB] border-b border-zinc-200/80">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
          Select International Travel Route:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {routeOptions.map((opt) => {
            const isSelected = selectedRouteKey === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setSelectedRouteKey(opt.key)}
                className={`text-left p-3.5 rounded-xl border transition-all text-xs ${
                  isSelected
                    ? 'bg-white border-[#0E2342] ring-2 ring-[#0E2342]/10 shadow-xs'
                    : 'bg-white border-zinc-200/80 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-zinc-900 text-sm leading-snug">
                  <span>{opt.origin}</span>
                  <span className="text-zinc-400 font-normal">→</span>
                  <span>{opt.dest}</span>
                </div>
                <span className="text-[11px] text-zinc-500 block mt-1">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Certificate Result Card */}
      <div className="p-5 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2.5 py-0.5 rounded-md">
                {activeRoute.originCode} → {activeRoute.destinationCode} Corridor
              </span>
              <span className="text-xs text-zinc-500">
                {activeRoute.origin} to {activeRoute.destination}
              </span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342]">
              {activeRoute.certificateName}
            </h4>
            <span className="inline-block mt-1 text-xs text-zinc-500">
              Statutory Basis: <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-[11px] text-zinc-700 font-mono">{activeRoute.officialFormRef}</code>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                activeRoute.certificateType === 'EU_PASSPORT'
                  ? 'bg-blue-50 text-blue-800 border-blue-200/80'
                  : activeRoute.certificateType === 'AHC'
                  ? 'bg-amber-50 text-amber-800 border-amber-200/80'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
              }`}
            >
              Class: {activeRoute.certificateTypeLabel}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                activeRoute.endorsementRequired
                  ? 'bg-purple-50 text-purple-800 border-purple-200/80'
                  : 'bg-zinc-100 text-zinc-700 border-zinc-200/80'
              }`}
            >
              Govt Endorsement: {activeRoute.endorsementRequired ? 'Mandatory' : 'Not Required'}
            </span>
          </div>
        </div>

        {/* 4 Core Parameter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
          <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
              Signing Authority
            </span>
            <p className="text-xs font-semibold text-zinc-900 leading-snug">
              {activeRoute.issuingAuthority}
            </p>
          </div>

          <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
              Competent Ministry
            </span>
            <p className="text-xs font-semibold text-zinc-900 leading-snug">
              {activeRoute.endorsementBody}
            </p>
          </div>

          <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
              Validity Window
            </span>
            <p className="text-xs font-semibold text-zinc-900 leading-snug">
              {activeRoute.validityWindow}
            </p>
          </div>

          <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
              Estimated Document Cost
            </span>
            <p className="text-xs font-bold text-zinc-900 leading-snug">
              {activeRoute.estimatedCost}
            </p>
          </div>
        </div>

        {/* Warning Callout If Present */}
        {activeRoute.warningNote && (
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 mb-6 flex items-start gap-3 text-xs text-amber-950">
            <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold shrink-0 mt-0.5">
              !
            </div>
            <div>
              <strong className="font-bold block text-amber-900 mb-0.5">Statutory Compliance Note:</strong>
              <p className="leading-relaxed">{activeRoute.warningNote}</p>
            </div>
          </div>
        )}

        {/* Key Statutory Requirements Checklist */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
              Mandatory Veterinary &amp; Clinical Checklist
            </h5>
            <div className="flex items-center gap-2">
              {filterSpecies === 'DOG' && activeRoute.tapewormRequired && (
                <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold border border-red-200/80">
                  + Tapeworm Treatment (24–120h)
                </span>
              )}
              {activeRoute.titerRequired && (
                <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold border border-purple-200/80">
                  + FAVN Titer Blood Test (180d)
                </span>
              )}
            </div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {activeRoute.keyRequirements.map((req, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-zinc-700 bg-[#F8FAFB] p-3.5 rounded-xl border border-zinc-200/80"
              >
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Card CTA */}
        <div className="bg-[#0E2342] rounded-xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider block mb-1">
              Pre-Departure Verification
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
              Verify your certificate dates, microchip sequence, and official stamps against destination biosecurity statutes before travel.
            </p>
          </div>
          <Link
            href="/en/checker"
            className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-xs transition-all text-center w-full sm:w-auto"
          >
            Start Document Check →
          </Link>
        </div>
      </div>
    </div>
  );
}
