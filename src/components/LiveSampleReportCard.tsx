import Link from 'next/link';

export default function LiveSampleReportCard() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 text-left max-w-lg w-full mx-auto">
      {/* Sample Result Tag & Route Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider">
          SAMPLE RESULT
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0E2342]">
          <span>🇬🇧 United Kingdom</span>
          <span className="text-zinc-400">➔</span>
          <span>🇩🇪 Germany</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold uppercase tracking-wide">
          ACTION REQUIRED
        </span>
      </div>

      {/* Earliest Safe Travel Date Callout Box */}
      <div className="bg-[#F1F5F9]/80 rounded-xl p-3.5 mb-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-[#0E2342] shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] text-zinc-500 font-medium">
            Earliest safe travel date
          </p>
          <p className="text-base sm:text-lg font-bold text-[#0E2342] leading-tight">
            18 Nov 2026
          </p>
        </div>
      </div>

      {/* Document & Requirement Status List */}
      <div>
        <h4 className="text-xs font-bold text-zinc-900 mb-2.5">
          Document &amp; Requirement Status
        </h4>

        <div className="space-y-2 text-xs">
          {/* Item 1: Microchip */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50/70 border border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </span>
              <span className="font-medium text-zinc-800">Microchip</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#0FA958]">
                Verified
              </span>
              <span className="text-zinc-300">⋮</span>
            </div>
          </div>

          {/* Item 2: Rabies vaccination */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50/70 border border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </span>
              <span className="font-medium text-zinc-800">Rabies vaccination</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#0FA958]">
                Verified
              </span>
              <span className="text-zinc-300">⋮</span>
            </div>
          </div>

          {/* Item 3: Titer test */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#FFFBEB] border border-amber-200/80">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                ⚠
              </span>
              <span className="font-medium text-amber-950">Titer test</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#D97706]">
                Action required
              </span>
              <span className="text-zinc-300">⋮</span>
            </div>
          </div>

          {/* Item 4: Health certificate */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50/70 border border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                ✕
              </span>
              <span className="font-medium text-zinc-800">Health certificate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-red-600">
                Not found
              </span>
              <span className="text-zinc-300">⋮</span>
            </div>
          </div>

          {/* Item 5: Export permit */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50/70 border border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-zinc-200 text-zinc-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                –
              </span>
              <span className="font-medium text-zinc-600">Export permit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-zinc-400">
                Not required
              </span>
              <span className="text-zinc-300">⋮</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Full Report Link */}
      <div className="mt-4 pt-3 border-t border-zinc-100">
        <Link
          href="#scanner"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E2342] hover:text-[#0FA958] transition-colors"
        >
          <span>View full report</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
