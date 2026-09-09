'use client';

import { useState } from 'react';

interface MilestoneStep {
  id: string;
  stepNumber: string;
  title: string;
  timing: string;
  status: 'mandatory' | 'waiting' | 'verification' | 'departure';
  description: string;
  criticalRule: string;
  commonMistake: string;
}

const HIGH_RISK_STEPS: MilestoneStep[] = [
  {
    id: 'chip',
    stepNumber: '01',
    title: 'ISO 11784/11785 Microchip',
    timing: 'Day 0',
    status: 'mandatory',
    description: '15-digit non-encrypted transponder implanted by a licensed veterinarian.',
    criticalRule: 'Must be implanted strictly BEFORE or on the same day as the rabies vaccination. Any vaccine given before microchipping is legally invalid.',
    commonMistake: 'Having a 10-digit or 9-digit microchip that cannot be read by standard European scanners without an adapter.',
  },
  {
    id: 'rabies',
    stepNumber: '02',
    title: 'Rabies Vaccination',
    timing: 'Day 0 (Post-Chip)',
    status: 'mandatory',
    description: 'Authorized inactivated or recombinant rabies vaccine administered by a recognized veterinarian.',
    criticalRule: 'The vaccine manufacturer, serial batch number, and expiration date must be recorded on the official certificate.',
    commonMistake: 'Letting an existing 3-year booster lapse by even 1 single day, turning it legally into a primary vaccination.',
  },
  {
    id: 'wait-21',
    stepNumber: '03',
    title: '21-Day Primary Antibody Wait',
    timing: 'Days 1 – 21',
    status: 'waiting',
    description: 'Mandatory waiting period for the pet\'s immune system to mount protective antibodies.',
    criticalRule: 'Blood cannot be drawn for antibody titration before day 21 or the test will be rejected as premature.',
    commonMistake: 'Drawing blood on day 18 to save time — EU reference labs will flag the collection date on the certificate.',
  },
  {
    id: 'titer',
    stepNumber: '04',
    title: 'FAVN / RNATT Titer Blood Draw',
    timing: 'Day 21+',
    status: 'mandatory',
    description: 'Serum sample sent to an EU-approved laboratory (minimum 0.50 IU/mL antibody level).',
    criticalRule: 'The testing laboratory must be on the official EU / UK designated laboratory list.',
    commonMistake: 'Using a non-authorized local private laboratory whose results are not recognized by border control.',
  },
  {
    id: 'wait-90',
    stepNumber: '05',
    title: 'Mandatory 90-Day EU Wait',
    timing: 'Days 21 – 111 (3 Full Months)',
    status: 'waiting',
    description: 'Mandatory 3 calendar months countdown starting strictly from the blood sampling date.',
    criticalRule: 'This cannot be expedited, waived, or bypassed by any authority or veterinarian.',
    commonMistake: 'Counting 90 days from when the lab result returns rather than from the exact blood draw date.',
  },
  {
    id: 'health-cert',
    stepNumber: '06',
    title: 'Government Endorsed Certificate',
    timing: 'Within 10 Days of Travel',
    status: 'verification',
    description: 'Official EU Non-Commercial Health Certificate signed by vet and endorsed by national ministry.',
    criticalRule: 'Valid for entering the EU for only 10 days from the date of official state veterinary endorsement.',
    commonMistake: 'Getting the endorsement 14 days before travel, causing border confiscation upon landing.',
  },
  {
    id: 'departure',
    stepNumber: '07',
    title: 'Approved Safe Departure',
    timing: 'Day 112+ (e.g. Nov 18)',
    status: 'departure',
    description: 'All 5 compliance pillars verified. Zero quarantine, zero border hold, smooth entry.',
    criticalRule: 'Must enter through a designated European Border Control Post (BCP) with prior airline pet booking.',
    commonMistake: 'Booking transit through a non-approved third country without holding transit documents.',
  },
];

const STANDARD_STEPS: MilestoneStep[] = [
  {
    id: 'chip-std',
    stepNumber: '01',
    title: 'ISO 11784/11785 Microchip',
    timing: 'Day 0',
    status: 'mandatory',
    description: '15-digit standard chip scanned and confirmed before vaccination.',
    criticalRule: 'Must precede rabies vaccination record.',
    commonMistake: 'Assuming airline staff have universal chip scanners for non-ISO chips.',
  },
  {
    id: 'rabies-std',
    stepNumber: '02',
    title: 'Rabies Immunization',
    timing: 'Day 0',
    status: 'mandatory',
    description: 'Primary or valid booster vaccine administered with complete batch details.',
    criticalRule: 'For a primary vaccination, minimum 21 days must elapse before departure.',
    commonMistake: 'Traveling on day 20 post-vaccination.',
  },
  {
    id: 'wait-21-std',
    stepNumber: '03',
    title: '21-Day Immunity Period',
    timing: 'Days 1 – 21',
    status: 'waiting',
    description: 'No blood titer needed for listed countries (e.g. US, Canada, Australia to EU).',
    criticalRule: 'Valid for movement starting on day 22.',
    commonMistake: 'Booking flights on day 21 itself.',
  },
  {
    id: 'tapeworm',
    stepNumber: '04',
    title: 'Tapeworm Treatment (if UK/IRL/NOR/FIN/MLT)',
    timing: '24 – 120 Hours Before Arrival',
    status: 'verification',
    description: 'Praziquantel treatment administered by a vet within an exact time window.',
    criticalRule: 'Administered not less than 24 hours and not more than 120 hours before scheduled arrival.',
    commonMistake: 'Giving treatment 6 days before arrival or failing to record the exact hour in the passport.',
  },
  {
    id: 'health-cert-std',
    stepNumber: '05',
    title: 'Official Health Certificate',
    timing: 'Within 10 Days of Departure',
    status: 'verification',
    description: 'Official bilingual health certificate endorsed by USDA APHIS or national ministry.',
    criticalRule: 'Requires physical wet signature or digital certificate with verification QR.',
    commonMistake: 'Booking USDA endorsement too late without factoring return courier shipping time.',
  },
  {
    id: 'departure-std',
    stepNumber: '06',
    title: 'Boarding & Clearance',
    timing: 'Day 22+',
    status: 'departure',
    description: 'Walk through customs with green lane entry clearance.',
    criticalRule: 'All paperwork presented at check-in counter and destination baggage claim.',
    commonMistake: 'Packing original documents inside checked cargo luggage instead of hand carry.',
  },
];

export default function TimelineMilestones() {
  const [routeType, setRouteType] = useState<'high-risk' | 'standard'>('high-risk');
  const [activeStepId, setActiveStepId] = useState<string>('wait-90');

  const steps = routeType === 'high-risk' ? HIGH_RISK_STEPS : STANDARD_STEPS;
  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  return (
    <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-6 sm:p-10">
      {/* Header with high-stakes fact */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-100">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            TIMELINE CALCULATOR
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
            Know when your pet can <span className="text-emerald-600">realistically travel</span>.
          </h3>
          <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
            <strong className="text-zinc-900 font-semibold">73% of pet travel delays and denied boardings</strong> stem from miscalculated waiting periods. PawValid calculates your earliest legal departure date down to the exact day.
          </p>
        </div>

        {/* Route Selector Toggle */}
        <div className="inline-flex p-1 bg-zinc-100 rounded-xl self-start lg:self-auto border border-zinc-200/80 shrink-0">
          <button
            type="button"
            onClick={() => {
              setRouteType('high-risk');
              setActiveStepId('wait-90');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              routeType === 'high-risk'
                ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/60'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            India 🇮🇳 → Germany 🇩🇪 <span className="text-[10px] text-amber-600 font-semibold">(Titer + 90d wait)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRouteType('standard');
              setActiveStepId('wait-21-std');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              routeType === 'standard'
                ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/60'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            USA 🇺🇸 → Germany 🇩🇪 <span className="text-[10px] text-emerald-700 font-semibold">(Listed country)</span>
          </button>
        </div>
      </div>

      {/* Horizontal Milestone Stepper */}
      <div className="pt-8 pb-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center min-w-[720px] justify-between relative">
          {/* Connector Track */}
          <div className="absolute top-5 left-6 right-6 h-0.5 bg-zinc-200 -z-0" />

          {steps.map((step) => {
            const isSelected = activeStep.id === step.id;
            let badgeBg = 'bg-white border-zinc-300 text-zinc-700';
            let dotColor = 'bg-zinc-400';

            if (step.status === 'departure') {
              badgeBg = isSelected
                ? 'bg-emerald-600 border-emerald-600 text-white ring-4 ring-emerald-100 shadow-md'
                : 'bg-emerald-50 border-emerald-300 text-emerald-800';
              dotColor = 'bg-emerald-500';
            } else if (step.status === 'waiting') {
              badgeBg = isSelected
                ? 'bg-amber-500 border-amber-500 text-white ring-4 ring-amber-100 shadow-md'
                : 'bg-amber-50 border-amber-300 text-amber-900';
              dotColor = 'bg-amber-500';
            } else if (isSelected) {
              badgeBg = 'bg-zinc-900 border-zinc-900 text-white ring-4 ring-zinc-100 shadow-md';
              dotColor = 'bg-zinc-900';
            }

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepId(step.id)}
                className="flex flex-col items-center group relative z-10 focus:outline-none transition-all"
                style={{ width: `${100 / steps.length}%` }}
              >
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-display font-black text-xs transition-all ${badgeBg}`}
                >
                  {step.status === 'departure' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : step.status === 'waiting' ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    step.stepNumber
                  )}
                </div>

                {/* Step Title */}
                <span className="mt-2.5 text-xs font-bold text-zinc-900 text-center line-clamp-1 max-w-[100px] group-hover:text-emerald-600 transition-colors">
                  {step.title}
                </span>
                <span className="text-[11px] font-semibold text-zinc-500 mt-0.5">
                  {step.timing}
                </span>

                {/* Selected arrow indicator */}
                {isSelected && (
                  <div className="w-2 h-2 bg-zinc-900 rotate-45 mt-2 rounded-xs animate-bounce" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Milestone Deep Dive Card */}
      <div className="bg-[#F8FAFC] border border-zinc-200/90 rounded-2xl p-6 sm:p-7 mt-4 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200/80">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-black tracking-wide uppercase bg-white border border-zinc-200 text-zinc-800">
              Milestone {activeStep.stepNumber}
            </span>
            <h4 className="font-display font-bold text-lg text-zinc-900">
              {activeStep.title}
            </h4>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full self-start sm:self-auto">
            Mandatory Window: {activeStep.timing}
          </span>
        </div>

        <p className="text-sm text-zinc-700 mt-4 leading-relaxed">
          {activeStep.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Critical Regulatory Law */}
          <div className="bg-white rounded-xl border border-emerald-200/90 p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5 text-emerald-800 text-xs font-bold">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Regulatory Law &amp; PawValid Check</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {activeStep.criticalRule}
            </p>
          </div>

          {/* Common Airport Trap */}
          <div className="bg-white rounded-xl border border-amber-200/90 p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5 text-amber-800 text-xs font-bold">
              <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Common Grounding Trap Caught</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {activeStep.commonMistake}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
