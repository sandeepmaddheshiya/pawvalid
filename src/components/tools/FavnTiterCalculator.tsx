'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DestinationTiterSpec {
  name: string;
  waitDays: number;
  thresholdIu: number;
  quarantineImpact: string;
  notes: string;
}

const DESTINATION_SPECS: Record<string, DestinationTiterSpec> = {
  EU_UNLISTED: {
    name: 'European Union (from Unlisted Countries e.g., India, Turkey, Egypt)',
    waitDays: 90,
    thresholdIu: 0.5,
    quarantineImpact: '0 Days Quarantine (Direct Release upon BIP customs inspection)',
    notes: 'EU Regulation 576/2013 mandates 3 calendar months (90 days) waiting period from blood draw date.',
  },
  AUSTRALIA: {
    name: 'Australia (Group 3 Countries e.g., USA, UK, Singapore)',
    waitDays: 180,
    thresholdIu: 0.5,
    quarantineImpact: '10 to 30 Days Quarantine at Mickleham Post-Entry Quarantine Facility',
    notes: '180 days post-blood draw required before flight to qualify for minimum 10-day quarantine stay.',
  },
  JAPAN: {
    name: 'Japan (Designated / Non-Designated Regions)',
    waitDays: 180,
    thresholdIu: 0.5,
    quarantineImpact: '0 Days Quarantine (Direct Release at Narita/Haneda if 180 days met)',
    notes: 'If arriving before 180 days have elapsed, the pet is quarantined in MAFF facility for the remaining days.',
  },
  NEW_ZEALAND: {
    name: 'New Zealand (Category 3 Countries)',
    waitDays: 90,
    thresholdIu: 0.5,
    quarantineImpact: '10 Days Mandatory Post-Entry Quarantine at private facility',
    notes: 'RNATT test must be completed at least 3 months and not more than 24 months before travel.',
  },
  HAWAII: {
    name: 'Hawaii (5-Day or Less / Direct Airport Release)',
    waitDays: 30,
    thresholdIu: 0.5,
    quarantineImpact: '0 Days (Direct Airport Release at Honolulu HNL)',
    notes: 'Must wait at least 30 days post-blood draw before arrival in Hawaii for immediate release.',
  },
  UAE: {
    name: 'United Arab Emirates (Dubai & Abu Dhabi)',
    waitDays: 84,
    thresholdIu: 0.5,
    quarantineImpact: '0 Days Quarantine (Manifest Cargo release at DXB/AUH)',
    notes: 'MOCCAE requires RNATT test drawn at least 12 weeks (84 days) prior to travel.',
  },
};

export function FavnTiterCalculator() {
  const [bloodDrawDate, setBloodDrawDate] = useState<string>('');
  const [destination, setDestination] = useState<string>('AUSTRALIA');
  const [titerResult, setTiterResult] = useState<string>('0.85');
  const [flightDate, setFlightDate] = useState<string>('');

  const calculateResults = () => {
    if (!bloodDrawDate) return null;

    const bDate = new Date(bloodDrawDate + 'T00:00:00Z');
    if (isNaN(bDate.getTime())) return null;

    const spec = DESTINATION_SPECS[destination];
    if (!spec) return null;

    const earliestTravelDate = new Date(bDate);
    earliestTravelDate.setDate(earliestTravelDate.getDate() + spec.waitDays);

    const numericTiter = parseFloat(titerResult);
    const isPassingTiter = !isNaN(numericTiter) && numericTiter >= spec.thresholdIu;

    let flightAssessment: {
      status: 'READY' | 'TOO_EARLY' | 'FAILED_TITER' | 'UNSPECIFIED';
      message: string;
      daysRemaining?: number;
    } = { status: 'UNSPECIFIED', message: 'Enter flight date to evaluate readiness.' };

    if (!isPassingTiter) {
      flightAssessment = {
        status: 'FAILED_TITER',
        message: `Antibody level (${numericTiter} IU/mL) is below the statutory threshold of 0.50 IU/mL! You must administer a booster and redraw blood after 21–30 days.`,
      };
    } else if (flightDate) {
      const fDate = new Date(flightDate + 'T00:00:00Z');
      if (!isNaN(fDate.getTime())) {
        if (fDate < earliestTravelDate) {
          const diffMs = earliestTravelDate.getTime() - fDate.getTime();
          const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
          flightAssessment = {
            status: 'TOO_EARLY',
            daysRemaining,
            message: `Flight date is ${daysRemaining} day${daysRemaining === 1 ? '' : 's'} before the mandatory ${spec.waitDays}-day waiting period completes!`,
          };
        } else {
          flightAssessment = {
            status: 'READY',
            message: `Flight date satisfies the full ${spec.waitDays}-day post-draw latency clock with passing antibody titers!`,
          };
        }
      }
    }

    return {
      bDate,
      spec,
      earliestTravelDate,
      isPassingTiter,
      numericTiter,
      flightAssessment,
    };
  };

  const results = calculateResults();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-[#0E2342] mb-2">FAVN Titer Waiting Period Calculator</h3>
        <p className="text-xs sm:text-sm text-zinc-600 mb-6">
          Calculate mandatory post-blood draw waiting periods for EU (90 days), Japan (180 days), Australia (180 days), and Hawaii (30 days).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Blood Draw Date
            </label>
            <input
              type="date"
              value={bloodDrawDate}
              onChange={(e) => setBloodDrawDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Destination Country / Territory
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
            >
              {Object.entries(DESTINATION_SPECS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.name} ({item.waitDays} Days)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Laboratory Result (IU/mL)
            </label>
            <input
              type="number"
              step="0.01"
              value={titerResult}
              onChange={(e) => setTiterResult(e.target.value)}
              placeholder="0.50"
              className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
            />
            <div className="text-[11px] text-zinc-500 mt-1">Standard passing threshold: ≥ 0.50 IU/mL</div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Planned Flight Date (Optional)
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
            {/* Status Card */}
            <div
              className={`p-5 rounded-2xl border ${
                results.flightAssessment.status === 'FAILED_TITER' || results.flightAssessment.status === 'TOO_EARLY'
                  ? 'bg-red-50/60 border-red-200 text-red-900'
                  : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {results.flightAssessment.status === 'FAILED_TITER' || results.flightAssessment.status === 'TOO_EARLY'
                    ? '⚠️'
                    : '✅'}
                </span>
                <div>
                  <h4 className="font-bold text-base">
                    {results.flightAssessment.status === 'FAILED_TITER'
                      ? 'Statutory Antibody Threshold Failed'
                      : results.flightAssessment.status === 'TOO_EARLY'
                      ? 'Flight Is Too Early (Clock Not Finished)'
                      : `Compliant ${results.spec.waitDays}-Day Titer Latency`}
                  </h4>
                  <p className="text-xs sm:text-sm mt-0.5">{results.flightAssessment.message}</p>
                </div>
              </div>
            </div>

            {/* Timeline Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-[11px] font-semibold uppercase text-zinc-500 tracking-wider">Blood Draw Date</div>
                <div className="text-sm font-bold text-zinc-900 mt-1">
                  {results.bDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">Day 0 of waiting clock</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-[11px] font-semibold uppercase text-[#0FA958] tracking-wider">
                  Earliest Flight Eligibility
                </div>
                <div className="text-sm font-bold text-[#0E2342] mt-1">
                  {results.earliestTravelDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">{results.spec.waitDays} days completed</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="text-[11px] font-semibold uppercase text-zinc-500 tracking-wider">Quarantine Impact</div>
                <div className="text-xs font-bold text-zinc-900 mt-1">{results.spec.quarantineImpact}</div>
                <div className="text-[11px] text-zinc-500 mt-1">{results.spec.notes}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
              <span className="text-base">⚠️</span>
              <div>
                <strong>Laboratory Turnaround Warning:</strong> Reference laboratories (such as Kansas State KSU, Auburn, or APHA) typically require <strong>3 to 5 weeks</strong> to process the FAVN titer assay and report results. Factor this testing turnaround into your departure timeline.
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/en/checker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                Launch Multi-Route Compliance Assessment →
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 p-6 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 text-center text-zinc-500 text-xs sm:text-sm">
            Select your pet&apos;s blood draw date and destination above to calculate the waiting timeline.
          </div>
        )}
      </div>
    </div>
  );
}
