'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ORIGINS = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
];

const DESTINATIONS = [
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
];

export default function HeroTripForm() {
  const router = useRouter();
  const [fromCountry, setFromCountry] = useState('IN');
  const [toCountry, setToCountry] = useState('DE');
  const [petType, setPetType] = useState<'DOG' | 'CAT'>('DOG');
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
    <div id="hero-form" className="bg-white rounded-3xl shadow-2xl border border-zinc-200/90 p-6 sm:p-7 w-full max-w-[500px] text-left relative z-10 transition-all hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.12)]">
      {/* Product Header */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-100">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full inline-block mb-1">
            Interactive Compliance Engine
          </span>
          <h3 className="font-display font-black text-zinc-900 text-base sm:text-lg leading-tight">
            Where are you travelling with your pet?
          </h3>
        </div>
        <div className="hidden sm:flex flex-col items-end shrink-0">
          <span className="text-[11px] font-bold text-zinc-400">Route Check</span>
          <span className="text-[10px] text-emerald-600 font-semibold">● 100% Free</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* From & To in row */}
        <div className="grid grid-cols-[1fr,auto,1fr] gap-2.5 items-center">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
              From
            </label>
            <div className="relative">
              <select
                value={fromCountry}
                onChange={(e) => setFromCountry(e.target.value)}
                className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50/60 hover:bg-white focus:bg-white px-3 py-2.5 text-xs sm:text-sm font-semibold text-zinc-900 focus:border-emerald-600 focus:outline-none pr-8 truncate shadow-2xs transition-colors cursor-pointer"
              >
                {ORIGINS.map((c) => (
                  <option key={`orig-${c.code}`} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-zinc-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-6 text-zinc-400">
            <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500">
              →
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
              To
            </label>
            <div className="relative">
              <select
                value={toCountry}
                onChange={(e) => setToCountry(e.target.value)}
                className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50/60 hover:bg-white focus:bg-white px-3 py-2.5 text-xs sm:text-sm font-semibold text-zinc-900 focus:border-emerald-600 focus:outline-none pr-8 truncate shadow-2xs transition-colors cursor-pointer"
              >
                {DESTINATIONS.map((c) => (
                  <option key={`dest-${c.code}`} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-zinc-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Pet Type Selection */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
            Pet Type
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setPetType('DOG')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                petType === 'DOG'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-2xs ring-1 ring-emerald-500'
                  : 'border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:bg-zinc-100/70'
              }`}
            >
              <span className="text-base">🐕</span> Dog
            </button>

            <button
              type="button"
              onClick={() => setPetType('CAT')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                petType === 'CAT'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-2xs ring-1 ring-emerald-500'
                  : 'border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:bg-zinc-100/70'
              }`}
            >
              <span className="text-base">🐈</span> Cat
            </button>
          </div>
        </div>

        {/* Departure Date */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
            Departure Date (Optional)
          </label>
          <div className="relative">
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 hover:bg-white focus:bg-white px-3 py-2.5 text-xs sm:text-sm font-semibold text-zinc-900 focus:border-emerald-600 focus:outline-none shadow-2xs transition-colors"
            />
          </div>
          <p className="text-[10px] text-zinc-400 mt-1">
            Helps calculate required 21-day rabies and 90-day titer latency windows
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-zinc-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg text-xs sm:text-sm active:scale-98 cursor-pointer mt-2"
        >
          <span>Check My Requirements →</span>
        </button>

        {/* Security & Privacy Underneath */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-medium">
          <span>🔒</span>
          <span>Your documents stay private · Deterministic legal rules engine</span>
        </div>
      </form>
    </div>
  );
}
