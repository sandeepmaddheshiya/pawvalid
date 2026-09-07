'use client';

import React, { useState } from 'react';

interface VetSheetViewProps {
  trip: any;
}

export default function VetSheetView({ trip }: VetSheetViewProps) {
  const [copied, setCopied] = useState(false);

  const petName = trip?.petName || 'Pet';
  const destination = trip?.destination || 'Destination Country';
  const microchip = trip?.petProfile?.microchipNumber || 'Verified 15-digit Microchip';

  const vetInstructionsText = `
PETVIA VETERINARY COMPLIANCE CLINIC CHEAT-SHEET
For Patient: ${petName} | Destination: ${destination}
Microchip: ${microchip} (ISO 11784/11785)
Regulatory Standard: Regulation (EU) 2026/131 & International Animal Movement Protocol

CRITICAL MANDATES FOR ATTENDING VETERINARIAN:
1. MICROCHIP SCANNING:
   Scan and verify the 15-digit microchip BEFORE administering any booster or clinical examination.
   Record the exact microchip reading date and time.

2. TAPEWORM TREATMENT (Echinococcus multilocularis):
   - Administer strictly between 24 hours and 120 hours prior to scheduled entry into ${destination}.
   - Approved active ingredient: Praziquantel (or equivalent approved active substance).
   - Enter manufacturer, product name, date, and hour in Section V of the official veterinary certificate.

3. CLINICAL HEALTH INSPECTION:
   - Perform physical examination within 48 hours to 10 days of travel (as required by route).
   - Verify animal shows no signs of infectious disease and is fit to travel via air transport under IATA LAR standards.

4. ENDORSEMENT / OFFICIAL STAMPING:
   - Sign only in blue ink with legible official clinic stamp and veterinary license registration number.
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(vetInstructionsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
            Clinic Guidance &amp; Error Prevention
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-black text-zinc-900 mt-1">
            Instructions for Your Attending Veterinarian
          </h2>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
            Local veterinarians make frequent administrative mistakes that lead to airline boarding refusal. Provide this exact checklist to your clinic.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs transition-all cursor-pointer"
          >
            {copied ? '✓ Copied to Clipboard' : '📋 Copy Instructions'}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            🖨️ Print Clinic Sheet
          </button>
        </div>
      </div>

      {/* Printable Clinic Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
        <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Official Veterinary Guidance
            </span>
            <h3 className="font-display font-black text-lg text-zinc-900">
              Patient: {petName} ({trip?.species || 'Canine'})
            </h3>
          </div>
          <div className="text-right text-xs font-mono text-zinc-500">
            Microchip: <strong className="text-zinc-900">{microchip}</strong>
          </div>
        </div>

        {/* 3 Step Cards for the Vet */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
            <div className="font-bold text-amber-950 text-xs flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[11px] flex items-center justify-center font-bold">1</span>
              <span>Microchip Scanning Sequence (Mandatory)</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed pl-7">
              Scan the pet&apos;s 15-digit ISO 11784/11785 microchip <strong>prior to</strong> any rabies vaccination or clinical inspection. European law dictates that any vaccination administered before microchip implantation is legally void for import.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
            <div className="font-bold text-emerald-950 text-xs flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 text-[11px] flex items-center justify-center font-bold">2</span>
              <span>Tapeworm Treatment Window (Echinococcus multilocularis)</span>
            </div>
            <p className="text-xs text-emerald-950/90 leading-relaxed pl-7">
              Administer an approved product containing <strong>Praziquantel</strong> strictly between <strong>24 hours and 120 hours</strong> before scheduled arrival in {destination}. Record date, exact time, product trade name, and manufacturer in the designated certificate box.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
            <div className="font-bold text-zinc-900 text-xs flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-800 text-[11px] flex items-center justify-center font-bold">3</span>
              <span>Official Stamping &amp; Ink Requirements</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed pl-7">
              Sign all documents in <strong>blue ink</strong> to distinguish original from photocopies. Affix practice stamp with clearly legible veterinary license registration number and clinic address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
