'use client';

import React, { useState } from 'react';

interface VetSheetViewProps {
  trip: any;
}

export default function VetSheetView({ trip }: VetSheetViewProps) {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const tripId = trip?.id ? `tripId=${encodeURIComponent(trip.id)}&` : '';
      const query = `${tripId}petName=${encodeURIComponent(petName)}&destination=${encodeURIComponent(destination)}&microchip=${encodeURIComponent(microchip)}`;
      const res = await fetch(`/api/pdf/vet-sheet?${query}`);

      if (!res.ok) {
        throw new Error('Failed to generate PDF on server');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Petvia-Vet-Clinic-Sheet-${petName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download error:', err);
      // Graceful fallback to browser print if server generation encounters an issue
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
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
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                <span>Copy Instructions</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0E2342] hover:bg-[#16345E] disabled:opacity-75 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
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
                <span>Download Clinic Sheet (.pdf)</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            title="Print directly"
            className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.656h10.5z" />
            </svg>
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
