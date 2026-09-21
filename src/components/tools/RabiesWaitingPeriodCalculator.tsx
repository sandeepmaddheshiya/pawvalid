'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function RabiesWaitingPeriodCalculator() {
  const [vaccineDate, setVaccineDate] = useState<string>('');
  const [vaccineType, setVaccineType] = useState<'PRIMARY' | 'BOOSTER'>('PRIMARY');
  const [validityYears, setValidityYears] = useState<number>(1);
  const [flightDate, setFlightDate] = useState<string>('');

  const calculateResults = () => {
    if (!vaccineDate) return null;

    const vDate = new Date(vaccineDate + 'T00:00:00Z');
    if (isNaN(vDate.getTime())) return null;

    // Day 0 is vaccination date. Day 22 is earliest travel date (21 full days must elapse).
    const earliestTravelDate = new Date(vDate);
    earliestTravelDate.setDate(earliestTravelDate.getDate() + 21);

    const expiryDate = new Date(vDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + validityYears);

    let flightComparison: {
      status: 'READY' | 'TOO_EARLY' | 'EXPIRED' | 'UNSPECIFIED';
      message: string;
      daysRemaining?: number;
    } = { status: 'UNSPECIFIED', message: 'Enter planned flight date to verify compliance.' };

    if (flightDate) {
      const fDate = new Date(flightDate + 'T00:00:00Z');
      if (!isNaN(fDate.getTime())) {
        if (fDate > expiryDate) {
          flightComparison = {
            status: 'EXPIRED',
            message: `Vaccine expires on ${expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} before your flight! A booster is required.`,
          };
        } else if (vaccineType === 'PRIMARY' && fDate < earliestTravelDate) {
          const diffMs = earliestTravelDate.getTime() - fDate.getTime();
          const daysOff = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
          flightComparison = {
            status: 'TOO_EARLY',
            daysRemaining: daysOff,
            message: `Your flight is ${daysOff} day${daysOff === 1 ? '' : 's'} before the mandatory 21-day latency period completes! Entry will be refused at airport customs.`,
          };
        } else {
          flightComparison = {
            status: 'READY',
            message: 'Your rabies vaccination is legally active and compliant for this travel date!',
          };
        }
      }
    }

    return {
      vDate,
      earliestTravelDate,
      expiryDate,
      flightComparison,
    };
  };

  const results = calculateResults();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-[#0E2342] mb-2">Rabies 21-Day Latency Calculator</h3>
        <p className="text-xs sm:text-sm text-zinc-600 mb-6">
          Enter your pet&apos;s vaccination details below to instantly calculate the legally mandated 21-day waiting window under EU Regulation 576/2013 and UK DEFRA biosecurity law.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Vaccination Administration Date
            </label>
            <input
              type="date"
              value={vaccineDate}
              onChange={(e) => setVaccineDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Vaccination Type
            </label>
            <select
              value={vaccineType}
              onChange={(e) => setVaccineType(e.target.value as 'PRIMARY' | 'BOOSTER')}
              className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
            >
              <option value="PRIMARY">Primary Vaccine (1st shot or lapsed booster)</option>
              <option value="BOOSTER">Booster Shot (Given before previous expired)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Manufacturer Validity Duration
            </label>
            <select
              value={validityYears}
              onChange={(e) => setValidityYears(Number(e.target.value))}
              className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
            >
              <option value={1}>1-Year Vaccine (Annual)</option>
              <option value={3}>3-Year Vaccine (Standard Canine)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Planned Flight / Travel Date (Optional)
            </label>
            <input
              type="date"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {results ? (
          <div className="mt-8 pt-6 border-t border-zinc-100 animate-fade-in space-y-6">
            {/* Main Result Card */}
            <div
              className={`p-5 rounded-2xl border ${
                results.flightComparison.status === 'TOO_EARLY' || results.flightComparison.status === 'EXPIRED'
                  ? 'bg-red-50/60 border-red-200 text-red-900'
                  : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">
                  {results.flightComparison.status === 'TOO_EARLY' || results.flightComparison.status === 'EXPIRED'
                    ? '⚠️'
                    : '✅'}
                </span>
                <div>
                  <h4 className="font-bold text-base">
                    {results.flightComparison.status === 'TOO_EARLY'
                      ? 'Action Required: Flight Is Too Early'
                      : results.flightComparison.status === 'EXPIRED'
                      ? 'Action Required: Vaccine Expired'
                      : 'Statutory 21-Day Period Calculated'}
                  </h4>
                  <p className="text-xs sm:text-sm mt-0.5">{results.flightComparison.message}</p>
                </div>
              </div>
            </div>

            {/* Timeline Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-[11px] font-semibold uppercase text-zinc-500 tracking-wider">Day 0 (Injection)</div>
                <div className="text-sm font-bold text-zinc-900 mt-1">
                  {results.vDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">Vaccine administered</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-[11px] font-semibold uppercase text-[#0FA958] tracking-wider">
                  {vaccineType === 'PRIMARY' ? 'Day 22 (Earliest Travel)' : 'Immediate Travel'}
                </div>
                <div className="text-sm font-bold text-[#0E2342] mt-1">
                  {vaccineType === 'PRIMARY'
                    ? results.earliestTravelDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : 'No 21-Day Latency (Booster)'}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  {vaccineType === 'PRIMARY' ? 'Mandatory 21 full days complete' : 'Continuity of immunity maintained'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-[11px] font-semibold uppercase text-zinc-500 tracking-wider">Expiration Date</div>
                <div className="text-sm font-bold text-zinc-900 mt-1">
                  {results.expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">{validityYears}-year statutory validity</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3 text-xs text-blue-900">
              <span className="text-base">ℹ️</span>
              <p>
                <strong>Statutory Precaution:</strong> The microchip must have been implanted strictly before or on the exact same date as the rabies vaccine. If the microchip was scanned after vaccination, border authorities will deem the rabies shot invalid.
              </p>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/en/checker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                Run Full Multi-Country Compliance Check →
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 p-6 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 text-center text-zinc-500 text-xs sm:text-sm">
            Select your pet&apos;s vaccination date above to generate the statutory countdown schedule.
          </div>
        )}
      </div>
    </div>
  );
}
