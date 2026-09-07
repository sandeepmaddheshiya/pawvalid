import Link from 'next/link';

export default function LiveSampleReportCard() {
  return (
    <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-md p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-zinc-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Live Compliance Audit Sample
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-semibold text-zinc-400">
              Verified Against EU 2026/131
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-zinc-900 font-display flex items-center gap-2">
              India 🇮🇳 <span className="text-zinc-400 text-lg">→</span> Germany 🇩🇪
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-zinc-100 text-zinc-700">
              Dog • Max (Golden Retriever)
            </span>
          </div>
        </div>

        {/* Status Callout */}
        <div className="flex flex-col items-start sm:items-end">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 font-bold text-xs shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>ACTION REQUIRED: 1 Blocker</span>
          </div>
          <span className="text-[11px] text-zinc-500 mt-1">
            Earliest Departure: <strong className="text-zinc-900 font-bold">Nov 18, 2026</strong>
          </span>
        </div>
      </div>

      {/* 5 Evidence Checkpoints */}
      <div className="space-y-3 mb-6">
        {/* Item 1 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-zinc-900">
                1. ISO 11784/11785 Microchip Standard
              </h5>
              <p className="text-[11px] text-zinc-500">
                15-digit transponder #985141004128911
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
            Verified: Implanted before rabies immunization
          </span>
        </div>

        {/* Item 2 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-zinc-900">
                2. Rabies Primary &amp; Booster Vaccination
              </h5>
              <p className="text-[11px] text-zinc-500">
                Nobivac Rabies (Inactivated) • Batch #B49201A
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
            Valid until 14 Jan 2027
          </span>
        </div>

        {/* Item 3 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-zinc-900">
                3. Rabies Antibody Titre Test (FAVN/RNATT)
              </h5>
              <p className="text-[11px] text-zinc-500">
                EU-Approved Reference Lab • Result: 1.42 IU/mL (Required: ≥0.50 IU/mL)
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
            Passing Titre (Effective protection)
          </span>
        </div>

        {/* Item 4 - The Blocker */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/70 border border-amber-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-amber-950">
                4. Mandatory 90-Day EU Waiting Window
              </h5>
              <p className="text-[11px] text-amber-800">
                Blood sample collected 20 August 2026. 90 full calendar days required.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-900 bg-amber-100/80 border border-amber-300 px-2.5 py-1 rounded-md self-start sm:self-auto">
            Departure permitted from 18 Nov 2026
          </span>
        </div>

        {/* Item 5 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-zinc-900">
                5. Official Health Certificate &amp; Vet Endorsement
              </h5>
              <p className="text-[11px] text-zinc-500">
                EU Regulation 576/2013 Annex IV Form signed by State Vet
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-zinc-600 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-md self-start sm:self-auto">
            10-day pre-flight validity window
          </span>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-zinc-500">
          This sample report detected a 90-day waiting window before non-refundable flight tickets were purchased.
        </p>
        <Link
          href="#hero-form"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs transition-colors shrink-0 shadow-2xs"
        >
          <span>Audit Your Pet&apos;s Route</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
