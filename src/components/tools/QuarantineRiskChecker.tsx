'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface RiskResult {
  tier: 'ZERO_QUARANTINE' | 'STANDARD_QUARANTINE' | 'HIGH_RISK_QUARANTINE' | 'ENTRY_PROHIBITED';
  title: string;
  badge: string;
  quarantineDays: string;
  description: string;
  facility: string;
  actionItems: string[];
}

export function QuarantineRiskChecker() {
  const [origin, setOrigin] = useState<string>('US');
  const [destination, setDestination] = useState<string>('AU');
  const [titerStatus, setTiterStatus] = useState<string>('PASSED_180');
  const [transitCountry, setTransitCountry] = useState<string>('NONE');
  const [isRestrictedBreed, setIsRestrictedBreed] = useState<boolean>(false);

  const evaluateRisk = (): RiskResult => {
    // 1. Breed ban check
    if (isRestrictedBreed) {
      return {
        tier: 'ENTRY_PROHIBITED',
        title: 'Statutory Entry Refusal & Seizure Risk',
        badge: 'Critical Blocker',
        quarantineDays: 'Entry Denied / Immediate Return Cargo',
        facility: 'Border Inspection Detention',
        description:
          'Banned breeds (including American Pit Bull Terriers, Japanese Tosa, Dogo Argentino, Fila Brasileiro, and XL Bully crosses) face immediate refusal of entry or statutory seizure under national dangerous dog legislation in the UK, Germany, Australia, Singapore, and New Zealand.',
        actionItems: [
          'Verify if your destination allows temporary transit or has mandatory breed genetic testing exemptions.',
          'Reroute travel to a destination without federal breed bans (e.g. United States or France with specific behavioral certifications).',
          'Consult official government breed identification manuals prior to purchasing airline tickets.',
        ],
      };
    }

    // 2. Trans-Tasman (Australia <-> NZ)
    if ((origin === 'AU' && destination === 'NZ') || (origin === 'NZ' && destination === 'AU')) {
      return {
        tier: 'ZERO_QUARANTINE',
        title: '0 Days Quarantine (Trans-Tasman Bilateral Release)',
        badge: 'Direct Release',
        quarantineDays: '0 Days (Zero Quarantine)',
        facility: 'Direct Airport Release at Customs',
        description:
          'Under the Trans-Tasman biosecurity agreement, companion animals traveling directly between Australia and New Zealand are exempt from post-entry quarantine and rabies titer tests.',
        actionItems: [
          'Obtain official DAFF or NZ MPI export veterinary health certificate within 5 days of departure.',
          'Verify continuous residency in Australia or New Zealand for at least 90 days prior to travel.',
        ],
      };
    }

    // 3. Australia Destination
    if (destination === 'AU') {
      if (titerStatus === 'PASSED_180') {
        return {
          tier: 'STANDARD_QUARANTINE',
          title: '10 Days Mandatory Post-Entry Quarantine (Mickleham PEQ)',
          badge: '10-Day Quarantine',
          quarantineDays: '10 Days Statutory Facility Stay',
          facility: 'Mickleham Post-Entry Quarantine (PEQ) Facility, Victoria',
          description:
            'Australia strictly enforces a minimum 10-day quarantine stay at the government Mickleham PEQ facility for all pets arriving from Group 3 countries with a compliant 180-day RNATT rabies titer clock.',
          actionItems: [
            'Book Mickleham PEQ facility reservation at least 3 to 6 months in advance (spaces are strictly capped).',
            'Ensure DAFF Import Permit is granted and linked to the Mickleham quarantine booking.',
            'Pet must arrive strictly as manifest cargo into Melbourne Airport (MEL).',
          ],
        };
      } else {
        return {
          tier: 'HIGH_RISK_QUARANTINE',
          title: '30+ Days Quarantine or Entry Refusal',
          badge: 'High Biosecurity Risk',
          quarantineDays: '30 Days Quarantine (or Flight Denial)',
          facility: 'Mickleham Isolation Unit',
          description:
            'Without a verified 180-day post-blood draw titer clock, pets arriving in Australia face an extended 30-day quarantine at owner expense or immediate return cargo.',
          actionItems: [
            'Delay travel until the full 180-day waiting period from the RNATT blood draw has elapsed.',
            'Ensure the testing laboratory reports the RNATT report directly to Australian DAFF.',
          ],
        };
      }
    }

    // 4. New Zealand Destination
    if (destination === 'NZ') {
      return {
        tier: 'STANDARD_QUARANTINE',
        title: '10 Days Mandatory Post-Entry Quarantine (MPI Facility)',
        badge: '10-Day Quarantine',
        quarantineDays: '10 Days Statutory Quarantine',
        facility: 'MPI Approved Private Quarantine Facility (Auckland / Christchurch)',
        description:
          'New Zealand Ministry for Primary Industries (MPI) mandates a 10-day quarantine stay for all pets arriving from Category 3 countries (e.g. USA, UK, Canada).',
        actionItems: [
          'Reserve private quarantine facility (e.g., Pethaven or Shado-Lans) before lodging MPI permit.',
          'Obtain MPI Veterinary Import Certificate endorsed by origin government authority.',
        ],
      };
    }

    // 5. Singapore Destination
    if (destination === 'SG') {
      if (['GB', 'AU', 'NZ', 'IE'].includes(origin)) {
        return {
          tier: 'ZERO_QUARANTINE',
          title: '0 Days Quarantine (Category A Rabies-Free Origin)',
          badge: 'Direct Release',
          quarantineDays: '0 Days Quarantine',
          facility: 'Direct Release at Changi CAPQ Station',
          description:
            'Pets originating from Category A rabies-free countries (UK, Australia, New Zealand, Ireland) qualify for immediate release upon Changi Airport CAPQ veterinary inspection.',
          actionItems: [
            'Apply for Singapore AVS Import License at least 30 days prior to travel.',
            'Book Changi Animal & Plant Quarantine Station (CAPQ) arrival inspection appointment.',
          ],
        };
      } else {
        return {
          tier: 'HIGH_RISK_QUARANTINE',
          title: '30 Days Mandatory Sembawang Quarantine',
          badge: '30-Day Quarantine',
          quarantineDays: '30 Days Quarantine',
          facility: 'Sembawang Animal Quarantine Station (SAQS)',
          description:
            'Pets arriving from Category C or D countries (USA, India, etc.) must complete a mandatory 30-day quarantine stay at Sembawang Animal Quarantine Station.',
          actionItems: [
            'Reserve quarantine space via Singapore AVS QMS portal at least 3 to 6 months ahead.',
            'Ensure all core vaccinations (DHPP, Rabies) and FAVN titers are logged in the AVS permit.',
          ],
        };
      }
    }

    // 6. Direct Entry to Europe, UK, USA, Canada, UAE (Zero Quarantine standard)
    return {
      tier: 'ZERO_QUARANTINE',
      title: '0 Days Quarantine (Direct Customs Release)',
      badge: 'Zero Quarantine',
      quarantineDays: '0 Days Quarantine',
      facility: 'Airport Customs / Border Inspection Post Release',
      description:
        'Your route qualifies for direct release upon presentation of official government-endorsed veterinary certificates, ISO microchip verification, and compliant parasite treatments.',
      actionItems: [
        'Ensure official health certificate (USDA VEHCS / EU Annex IV / UK AHC) is issued within 10 days of travel.',
        'Complete tapeworm treatment with Praziquantel 24–120 hours prior to arrival (if entering UK/Ireland).',
        'Submit advance arrival notification to airport border veterinary station.',
      ],
    };
  };

  const risk = evaluateRisk();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-[#0E2342] mb-2">Pet Travel Quarantine Risk Diagnostic</h3>
        <p className="text-xs sm:text-sm text-zinc-600 mb-6">
          Evaluate your journey&apos;s parameters to determine whether your pet qualifies for direct airport release (0 days) or requires booking government post-entry quarantine (PEQ).
        </p>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Origin Country
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
              >
                <option value="US">United States 🇺🇸</option>
                <option value="GB">United Kingdom 🇬🇧</option>
                <option value="AU">Australia 🇦🇺</option>
                <option value="CA">Canada 🇨🇦</option>
                <option value="DE">Germany 🇩🇪</option>
                <option value="FR">France 🇫🇷</option>
                <option value="IN">India 🇮🇳</option>
                <option value="NZ">New Zealand 🇳🇿</option>
                <option value="SG">Singapore 🇸🇬</option>
                <option value="JP">Japan 🇯🇵</option>
                <option value="AE">United Arab Emirates 🇦🇪</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Destination Country
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
              >
                <option value="AU">Australia 🇦🇺 (Strict Biosecurity)</option>
                <option value="NZ">New Zealand 🇳🇿 (MPI Biosecurity)</option>
                <option value="GB">United Kingdom 🇬🇧 (DEFRA Non-Commercial)</option>
                <option value="DE">Germany 🇩🇪 (EU Entry Post)</option>
                <option value="FR">France 🇫🇷 (EU Entry Post)</option>
                <option value="US">United States 🇺🇸 (CDC Regulations)</option>
                <option value="CA">Canada 🇨🇦 (CFIA Biosecurity)</option>
                <option value="SG">Singapore 🇸🇬 (AVS Quarantine)</option>
                <option value="JP">Japan 🇯🇵 (MAFF Quarantine)</option>
                <option value="AE">United Arab Emirates 🇦🇪 (MOCCAE)</option>
                <option value="IN">India 🇮🇳 (AQCS Entry)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Rabies Titer (RNATT / FAVN) Status
              </label>
              <select
                value={titerStatus}
                onChange={(e) => setTiterStatus(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
              >
                <option value="PASSED_180">Passed (≥0.5 IU/mL) & 180+ Days Elapsed</option>
                <option value="PASSED_90">Passed (≥0.5 IU/mL) & 90+ Days Elapsed</option>
                <option value="PASSED_RECENT">Passed (≥0.5 IU/mL) Recently (&lt;90 Days)</option>
                <option value="NOT_DONE">Not Completed / Not Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Transit / Layover Hub
              </label>
              <select
                value={transitCountry}
                onChange={(e) => setTransitCountry(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0FA958] focus:border-transparent transition-all"
              >
                <option value="NONE">Direct Flight (No Layover)</option>
                <option value="EU">European Union Hub (Frankfurt / Paris / Amsterdam)</option>
                <option value="SG">Singapore Changi Airport (AVS Transshipment)</option>
                <option value="ME">Middle East Hub (Dubai / Doha / Abu Dhabi)</option>
                <option value="HIGH_RISK">High-Risk Rabies Country (e.g. Turkey / Egypt)</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-zinc-900">Restricted Breed Classification</div>
              <div className="text-[11px] text-zinc-500">
                Pit Bull, Staffordshire Bull Terrier, Dogo Argentino, Fila Brasileiro, Tosa, XL Bully
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isRestrictedBreed}
                onChange={(e) => setIsRestrictedBreed(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>

        {/* Evaluation Output */}
        <div className="mt-8 pt-6 border-t border-zinc-100 space-y-6">
          <div
            className={`p-5 rounded-2xl border ${
              risk.tier === 'ENTRY_PROHIBITED'
                ? 'bg-red-50/70 border-red-200 text-red-950'
                : risk.tier === 'HIGH_RISK_QUARANTINE'
                ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                : risk.tier === 'STANDARD_QUARANTINE'
                ? 'bg-blue-50/70 border-blue-200 text-blue-950'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">
                {risk.tier === 'ENTRY_PROHIBITED'
                  ? '🛑'
                  : risk.tier === 'HIGH_RISK_QUARANTINE'
                  ? '⚠️'
                  : risk.tier === 'STANDARD_QUARANTINE'
                  ? '🏢'
                  : '✅'}
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      risk.tier === 'ENTRY_PROHIBITED'
                        ? 'bg-red-200 text-red-900'
                        : risk.tier === 'HIGH_RISK_QUARANTINE'
                        ? 'bg-amber-200 text-amber-900'
                        : risk.tier === 'STANDARD_QUARANTINE'
                        ? 'bg-blue-200 text-blue-900'
                        : 'bg-emerald-200 text-emerald-900'
                    }`}
                  >
                    {risk.badge}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500">{risk.quarantineDays}</span>
                </div>
                <h4 className="font-bold text-base">{risk.title}</h4>
                <p className="text-xs sm:text-sm mt-1">{risk.description}</p>
                <div className="mt-2 text-xs font-semibold">
                  Primary Quarantine Facility: <span className="underline">{risk.facility}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-800 mb-3">
              Recommended Statutory Compliance Protocol:
            </h5>
            <ul className="space-y-2">
              {risk.actionItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                  <span className="text-[#0FA958] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/en/checker"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              Verify Complete Compliance Dossier for Your Route →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
