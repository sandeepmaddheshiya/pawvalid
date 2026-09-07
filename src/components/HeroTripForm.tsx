'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ORIGINS = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
];

const DESTINATIONS = [
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
];

export default function HeroTripForm() {
  const router = useRouter();
  const [fromCountry, setFromCountry] = useState('US');
  const [toCountry, setToCountry] = useState('DE');
  const [petType, setPetType] = useState<'DOG' | 'CAT' | 'OTHER'>('DOG');
  const [travelDate, setTravelDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (fromCountry) params.set('from', fromCountry);
    if (toCountry) params.set('to', toCountry);
    if (petType) params.set('species', petType);
    if (travelDate) params.set('date', travelDate);

    router.push(`/en/checker?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200/90 p-5 sm:p-6 w-full max-w-[490px] text-left">
      {/* Header with Title & Badge */}
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="font-bold text-zinc-900 text-sm sm:text-[15px] tracking-tight">
          Where are you traveling with your pet?
        </h3>
        <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] shrink-0">
          It only takes 2 minutes
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* From & To in row */}
        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              From
            </label>
            <div className="relative">
              <select
                value={fromCountry}
                onChange={(e) => setFromCountry(e.target.value)}
                className="w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs sm:text-[13px] font-medium text-zinc-800 focus:border-emerald-500 focus:outline-none pr-7 truncate shadow-2xs"
              >
                {ORIGINS.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-zinc-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-5 text-zinc-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              To
            </label>
            <div className="relative">
              <select
                value={toCountry}
                onChange={(e) => setToCountry(e.target.value)}
                className="w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs sm:text-[13px] font-medium text-zinc-800 focus:border-emerald-500 focus:outline-none pr-7 truncate shadow-2xs"
              >
                {DESTINATIONS.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-zinc-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Pet Type Selection */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Pet Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPetType('DOG')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs sm:text-[13px] font-medium transition-all ${
                petType === 'DOG'
                  ? 'border-[#14B8A6] bg-[#F0FDFA] text-[#0F766E] font-semibold shadow-2xs'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <span className="text-sm">🐶</span> Dog
            </button>

            <button
              type="button"
              onClick={() => setPetType('CAT')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs sm:text-[13px] font-medium transition-all ${
                petType === 'CAT'
                  ? 'border-[#14B8A6] bg-[#F0FDFA] text-[#0F766E] font-semibold shadow-2xs'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <span className="text-sm">🐱</span> Cat
            </button>

            <button
              type="button"
              onClick={() => setPetType('OTHER')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs sm:text-[13px] font-medium transition-all ${
                petType === 'OTHER'
                  ? 'border-[#14B8A6] bg-[#F0FDFA] text-[#0F766E] font-semibold shadow-2xs'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <span className="text-sm">🐾</span> Other
            </button>
          </div>
        </div>

        {/* Travel Date */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Travel Date (Optional)
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Select date"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs sm:text-[13px] font-medium text-zinc-800 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none pr-9 shadow-2xs"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#0B132B] hover:bg-[#16274a] text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow text-xs sm:text-sm"
        >
          <span>Get My Compliance Report</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Trust Underneath */}
        <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
          <span>Trusted by 12,500+ pet parents</span>
          <span className="text-amber-400 font-bold">★★★★★</span>
          <span className="font-semibold text-zinc-700">4.9/5</span>
        </div>
      </form>
    </div>
  );
}
