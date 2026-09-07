'use client';

import React, { useState } from 'react';

interface CrateViewProps {
  trip: any;
}

export default function CrateView({ trip }: CrateViewProps) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [lengthA, setLengthA] = useState<number>(55);
  const [heightB, setHeightB] = useState<number>(25);
  const [widthC, setWidthC] = useState<number>(18);
  const [heightD, setHeightD] = useState<number>(50);

  // IATA Formula:
  // Crate Length = A + 0.5 * B
  // Crate Width = C * 2
  // Crate Height = D
  const crateLength = Math.round(lengthA + 0.5 * heightB);
  const crateWidth = Math.round(widthC * 2);
  const crateHeight = Math.round(heightD);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
          IATA Live Animals Regulations (LAR)
        </span>
        <h2 className="font-display text-xl sm:text-2xl font-black text-zinc-900 mt-1">
          Airline Crate &amp; Carrier Sizing Calculator
        </h2>
        <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
          Airlines strictly enforce IATA Container Requirement 82 (CR-82) and will deny boarding at cargo or gate desks if the animal cannot stand and turn around naturally.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Input Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="font-bold text-sm text-zinc-900">
              1. Enter {trip?.petName}&apos;s Measurements
            </h3>
            <div className="inline-flex p-1 rounded-xl bg-zinc-100 text-xs font-bold">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  unit === 'cm' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500'
                }`}
              >
                CM
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  unit === 'in' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500'
                }`}
              >
                Inches
              </button>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-700 font-bold mb-1">
                A. Length: Nose to root of tail ({unit})
              </label>
              <input
                type="number"
                value={lengthA}
                onChange={(e) => setLengthA(Number(e.target.value) || 0)}
                className="w-full border border-zinc-300 rounded-xl px-3 py-2 font-mono text-sm focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-zinc-700 font-bold mb-1">
                B. Floor to elbow joint ({unit})
              </label>
              <input
                type="number"
                value={heightB}
                onChange={(e) => setHeightB(Number(e.target.value) || 0)}
                className="w-full border border-zinc-300 rounded-xl px-3 py-2 font-mono text-sm focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-zinc-700 font-bold mb-1">
                C. Shoulder width across widest point ({unit})
              </label>
              <input
                type="number"
                value={widthC}
                onChange={(e) => setWidthC(Number(e.target.value) || 0)}
                className="w-full border border-zinc-300 rounded-xl px-3 py-2 font-mono text-sm focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-zinc-700 font-bold mb-1">
                D. Standing height: Floor to top of head / ear tips ({unit})
              </label>
              <input
                type="number"
                value={heightD}
                onChange={(e) => setHeightD(Number(e.target.value) || 0)}
                className="w-full border border-zinc-300 rounded-xl px-3 py-2 font-mono text-sm focus:outline-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Output Card */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div>
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
              IATA Compliant Dimensions
            </span>
            <h3 className="font-display text-xl font-black text-white mt-1">
              Minimum Required Crate Size
            </h3>
            <p className="text-xs text-emerald-200/80 mt-1">
              Calculated using the official IATA formula (Length: A + ½B, Width: C × 2, Height: D).
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-[10px] text-emerald-300 font-bold uppercase block">Length</span>
              <span className="font-mono font-black text-2xl text-white mt-0.5 block">
                {crateLength} <span className="text-xs font-normal text-emerald-300">{unit}</span>
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-[10px] text-emerald-300 font-bold uppercase block">Width</span>
              <span className="font-mono font-black text-2xl text-white mt-0.5 block">
                {crateWidth} <span className="text-xs font-normal text-emerald-300">{unit}</span>
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-[10px] text-emerald-300 font-bold uppercase block">Height</span>
              <span className="font-mono font-black text-2xl text-white mt-0.5 block">
                {crateHeight} <span className="text-xs font-normal text-emerald-300">{unit}</span>
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-emerald-100/90 pt-2 border-t border-white/15">
            <div className="flex items-start gap-2">
              <span>✓</span>
              <span>Must have 4-sided ventilation with minimum 16% total surface area opening.</span>
            </div>
            <div className="flex items-start gap-2">
              <span>✓</span>
              <span>Water container must be attached inside the crate with outside-filling funnel.</span>
            </div>
            <div className="flex items-start gap-2">
              <span>✓</span>
              <span>Fluorescent green/red &apos;LIVE ANIMAL&apos; labels must be affixed on at least two sides.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
