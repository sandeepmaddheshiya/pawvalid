'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { CheckResponse } from '@/lib/validations';

interface CheckerFormProps {
  onResult: (result: CheckResponse) => void;
}

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'DE', name: 'Germany' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'JP', name: 'Japan' },
];

const AIRLINES = [
  { slug: 'lufthansa', name: 'Lufthansa' },
  { slug: 'british-airways', name: 'British Airways' },
  { slug: 'united-airlines', name: 'United Airlines' },
  { slug: 'qantas', name: 'Qantas' },
  { slug: 'air-canada', name: 'Air Canada' },
  { slug: 'ana', name: 'ANA (All Nippon Airways)' },
  { slug: 'delta', name: 'Delta Air Lines' },
  { slug: 'american-airlines', name: 'American Airlines' },
];

export default function CheckerForm({ onResult }: CheckerFormProps) {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trip
  const [originCountry, setOriginCountry] = useState('US');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [departureDatetime, setDepartureDatetime] = useState('');
  const [arrivalDatetime, setArrivalDatetime] = useState('');
  const [airlineSlug, setAirlineSlug] = useState('');
  const [entryAirport, setEntryAirport] = useState('');

  // Prefill from search parameters
  useEffect(() => {
    const from = searchParams.get('from') || searchParams.get('origin');
    const to = searchParams.get('to') || searchParams.get('destination');
    const spec = searchParams.get('species');
    const date = searchParams.get('date') || searchParams.get('departure');
    const airline = searchParams.get('airline');

    if (from) setOriginCountry(from.toUpperCase());
    if (to) setDestinationCountry(to.toUpperCase());
    if (spec === 'DOG' || spec === 'CAT') setSpecies(spec);
    if (airline) setAirlineSlug(airline);
    if (date) {
      // If date provided (e.g. YYYY-MM-DD), default departure and arrival times
      setDepartureDatetime(`${date}T10:00`);
      setArrivalDatetime(`${date}T18:00`);
    }
  }, [searchParams]);

  // Pet
  const [species, setSpecies] = useState<'DOG' | 'CAT'>('DOG');
  const [breed, setBreed] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('US');
  const [microchipNumber, setMicrochipNumber] = useState('');
  const [microchipDate, setMicrochipDate] = useState('');

  // Vaccinations & Docs
  const [rabiesVaccinationDate, setRabiesVaccinationDate] = useState('');
  const [rabiesVaccinationType, setRabiesVaccinationType] = useState<'PRIMARY' | 'BOOSTER'>('PRIMARY');
  const [hasHealthCertificate, setHasHealthCertificate] = useState<boolean | undefined>(undefined);
  const [hasImportPermit, setHasImportPermit] = useState<boolean | undefined>(undefined);

  const totalSteps = 3;

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    try {
      const requestBody = {
        trip: {
          originCountry,
          destinationCountry,
          departureDatetime: new Date(departureDatetime).toISOString(),
          arrivalDatetime: new Date(arrivalDatetime).toISOString(),
          airlineSlug,
          entryAirport: entryAirport || undefined,
        },
        pet: {
          species,
          countryOfResidence,
          breed: breed || undefined,
          ageMonths: ageMonths ? parseInt(ageMonths) : undefined,
          weightKg: weightKg ? parseFloat(weightKg) : undefined,
          microchipNumber: microchipNumber || undefined,
          microchipDate: microchipDate ? new Date(microchipDate).toISOString() : undefined,
          mostRecentRabiesVaccination: rabiesVaccinationDate
            ? {
                date: new Date(rabiesVaccinationDate).toISOString(),
                type: rabiesVaccinationType,
              }
            : undefined,
          hasHealthCertificate,
          hasImportPermit,
        },
        save: true,
      };

      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (!res.ok && res.status !== 200) {
        throw new Error(data.error || 'Failed to run check');
      }

      onResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                transition-all duration-300
                ${s <= step
                  ? 'bg-primary-600 text-white shadow-glow'
                  : 'bg-zinc-100 dark:bg-surface-800 text-zinc-400'}
              `}
            >
              {s < step ? '✓' : s}
            </div>
            {s < totalSteps && (
              <div
                className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${
                  s < step ? 'bg-primary-500' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mb-8 px-1">
        {['Trip Details', 'Pet Information', 'Documents'].map((label, i) => (
          <span
            key={label}
            className={`text-xs font-medium transition-colors ${
              i + 1 <= step ? 'text-primary-600 dark:text-primary-400' : 'text-zinc-400'
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Form Steps */}
      <div className="card p-6 sm:p-8">
        {/* Step 1: Trip Details */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-up">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Where are you traveling?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Departure Country
                </label>
                <select
                  value={originCountry}
                  onChange={(e) => setOriginCountry(e.target.value)}
                  className="select-field"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Destination Country
                </label>
                <select
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="select-field"
                >
                  <option value="">Select destination...</option>
                  {COUNTRIES.filter(c => c.code !== originCountry).map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Departure Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={departureDatetime}
                  onChange={(e) => setDepartureDatetime(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Arrival Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={arrivalDatetime}
                  onChange={(e) => setArrivalDatetime(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Airline
                </label>
                <select
                  value={airlineSlug}
                  onChange={(e) => setAirlineSlug(e.target.value)}
                  className="select-field"
                >
                  <option value="">Select airline...</option>
                  {AIRLINES.map((a) => (
                    <option key={a.slug} value={a.slug}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Entry Airport <span className="text-zinc-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={entryAirport}
                  onChange={(e) => setEntryAirport(e.target.value)}
                  placeholder="e.g., FRA"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pet Information */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-up">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Tell us about your pet
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Pet Type
                </label>
                <div className="flex gap-3">
                  {(['DOG', 'CAT'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpecies(s)}
                      className={`
                        flex-1 py-3 px-4 rounded-xl border text-sm font-semibold
                        transition-all duration-200
                        ${species === s
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-400 shadow-glow'
                          : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'}
                      `}
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 opacity-75" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="7" cy="8.5" r="2" />
                          <circle cx="17" cy="8.5" r="2" />
                          <circle cx="10" cy="5" r="1.8" />
                          <circle cx="14" cy="5" r="1.8" />
                          <path d="M12 10.5c-2.4 0-4.5 1.8-4.5 4.2 0 1.9 1.4 3.3 4.5 3.3s4.5-1.4 4.5-3.3c0-2.4-2.1-4.2-4.5-4.2z" />
                        </svg>
                        <span>{s === 'DOG' ? 'Dog (Canine)' : 'Cat (Feline)'}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Country of Residence
                </label>
                <select
                  value={countryOfResidence}
                  onChange={(e) => setCountryOfResidence(e.target.value)}
                  className="select-field"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Breed <span className="text-zinc-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="e.g., Golden Retriever"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Age (months)
                </label>
                <input
                  type="number"
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(e.target.value)}
                  placeholder="e.g., 24"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="e.g., 12.5"
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Microchip Number
                </label>
                <input
                  type="text"
                  value={microchipNumber}
                  onChange={(e) => setMicrochipNumber(e.target.value)}
                  placeholder="15-digit ISO number"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Microchip Date
                </label>
                <input
                  type="date"
                  value={microchipDate}
                  onChange={(e) => setMicrochipDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Documents & Vaccinations */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-up">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Vaccinations & Documents
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Rabies Vaccination Date
                </label>
                <input
                  type="date"
                  value={rabiesVaccinationDate}
                  onChange={(e) => setRabiesVaccinationDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Vaccination Type
                </label>
                <div className="flex gap-3">
                  {(['PRIMARY', 'BOOSTER'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setRabiesVaccinationType(t)}
                      className={`
                        flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-200
                        ${rabiesVaccinationType === t
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-400'
                          : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'}
                      `}
                    >
                      {t === 'PRIMARY' ? 'Primary' : 'Booster'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-surface-800/50">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Do you have a health certificate?
                </span>
                <div className="flex gap-2">
                  {[true, false].map((val) => (
                    <button
                      key={String(val)}
                      onClick={() => setHasHealthCertificate(val)}
                      className={`
                        px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                        ${hasHealthCertificate === val
                          ? val
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-zinc-100 dark:bg-surface-700 text-zinc-500'}
                      `}
                    >
                      {val ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-surface-800/50">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Do you have an import permit?
                </span>
                <div className="flex gap-2">
                  {[true, false].map((val) => (
                    <button
                      key={String(val)}
                      onClick={() => setHasImportPermit(val)}
                      className={`
                        px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                        ${hasImportPermit === val
                          ? val
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-zinc-100 dark:bg-surface-700 text-zinc-500'}
                      `}
                    >
                      {val ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn-secondary text-sm">
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && (!destinationCountry || !departureDatetime || !arrivalDatetime || !airlineSlug))
              }
              className="btn-primary text-sm"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Evaluating...
                </span>
              ) : (
                'Check Readiness →'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
