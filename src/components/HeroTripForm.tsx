'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ORIGINS = [
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
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
  const [fromCountry, setFromCountry] = useState('GB');
  const [toCountry, setToCountry] = useState('DE');
  const [petType, setPetType] = useState<'DOG' | 'CAT'>('DOG');
  const [travelDate, setTravelDate] = useState('');
  const [dateInputType, setDateInputType] = useState<'text' | 'date'>('text');

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
    <div
      id="hero-form"
      className="bg-white rounded-2xl shadow-[0_14px_40px_-8px_rgba(14,35,66,0.14)] border border-zinc-100 p-4.5 sm:p-5 w-full max-w-[335px] sm:max-w-[350px] text-left relative z-10 transition-all"
    >
      <h3 className="font-bold text-[#0E2342] text-[13px] sm:text-[14px] mb-3 leading-snug">
        Where are you travelling with your pet?
      </h3>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* From & To in row */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-medium text-zinc-500 mb-1">
              From:
            </label>
            <div className="relative">
              <select
                value={fromCountry}
                onChange={(e) => setFromCountry(e.target.value)}
                className="w-full appearance-none rounded-lg border border-zinc-200/90 bg-white px-2 py-1.5 text-xs font-semibold text-zinc-800 hover:border-zinc-300 focus:border-[#0E2342] focus:outline-none pr-5 truncate transition-colors cursor-pointer"
              >
                {ORIGINS.map((c) => (
                  <option key={`orig-${c.code}`} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 text-zinc-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-medium text-zinc-500 mb-1">
              To:
            </label>
            <div className="relative">
              <select
                value={toCountry}
                onChange={(e) => setToCountry(e.target.value)}
                className="w-full appearance-none rounded-lg border border-zinc-200/90 bg-white px-2 py-1.5 text-xs font-semibold text-zinc-800 hover:border-zinc-300 focus:border-[#0E2342] focus:outline-none pr-5 truncate transition-colors cursor-pointer"
              >
                {DESTINATIONS.map((c) => (
                  <option key={`dest-${c.code}`} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 text-zinc-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Pet type dropdown */}
        <div>
          <label className="block text-[10px] font-medium text-zinc-500 mb-1">
            Pet type
          </label>
          <div className="relative">
            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value as 'DOG' | 'CAT')}
              className="w-full appearance-none rounded-lg border border-zinc-200/90 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-800 hover:border-zinc-300 focus:border-[#0E2342] focus:outline-none pr-6 transition-colors cursor-pointer"
            >
              <option value="DOG">🐕 Dog</option>
              <option value="CAT">🐈 Cat</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-zinc-400">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Departure date (optional) */}
        <div>
          <label className="block text-[10px] font-medium text-zinc-500 mb-1">
            Departure date (optional)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-zinc-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type={dateInputType}
              placeholder="DD / MM / YYYY"
              value={travelDate}
              onFocus={() => setDateInputType('date')}
              onBlur={() => {
                if (!travelDate) setDateInputType('text');
              }}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full rounded-lg border border-zinc-200/90 bg-white pl-8 pr-2.5 py-1.5 text-xs font-semibold text-zinc-800 placeholder:text-zinc-400 placeholder:font-normal hover:border-zinc-300 focus:border-[#0E2342] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-sm hover:shadow text-xs active:scale-[0.99] cursor-pointer mt-2"
        >
          <span>Check My Requirements →</span>
        </button>
      </form>
    </div>
  );
}
