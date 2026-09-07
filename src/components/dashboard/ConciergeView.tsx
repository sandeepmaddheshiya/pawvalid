'use client';

import React, { useState } from 'react';

interface ConciergeViewProps {
  trip: any;
  onTripUpdated?: (updatedTrip: any) => void;
}

export default function ConciergeView({ trip, onTripUpdated }: ConciergeViewProps) {
  const tier = trip?.tier || 'FREE';
  const conciergeStatus = trip?.conciergeStatus || 'NONE';
  const isConciergeActive = tier === 'CONCIERGE' || conciergeStatus === 'IN_REVIEW' || conciergeStatus === 'PENDING_REVIEW';

  const [phone, setPhone] = useState(trip?.whatsappNumber || '');
  const [urgency, setUrgency] = useState<'STANDARD' | 'HIGH' | 'IMMEDIATE'>('HIGH');
  const [notes, setNotes] = useState(trip?.conciergeNotes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cleanDigits = (trip?.whatsappNumber || phone).replace(/\D/g, '');

  const handleOpenWhatsApp = () => {
    const targetNumber = cleanDigits.length >= 7 ? cleanDigits : '447700900077';
    const text = encodeURIComponent(
      `Hello Dr. Jenkins! I am requesting expert audit support for my pet ${trip?.petName || 'my pet'} (Petvia Docket #${trip?.id?.slice(-6) || 'TRIP'}). We are traveling from ${trip?.origin} to ${trip?.destination}.`
    );
    window.open(`https://wa.me/${targetNumber}?text=${text}`, '_blank');
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 7) {
      setErrorMessage('Please enter a valid WhatsApp phone number including your country code (e.g. +44 7123 456789).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/concierge/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: trip.id,
          whatsappNumber: phone,
          notes,
          urgency,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit concierge intake');
      }

      setSuccessMessage('✓ Concierge intake confirmed! Our veterinary team has received your documents and WhatsApp contact.');
      if (onTripUpdated && data.trip) {
        onTripUpdated(data.trip);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error connecting to intake service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
          <span>★</span>
          <span>£59 Concierge Expert Audit &amp; Departure Hotline</span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-black text-zinc-900">
          Veterinary Specialist Review &amp; Departure Guard
        </h2>
        <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
          For pet parents facing high-risk routes, hand-written clinic entries, tight timeframes, or airline pushback. Our accredited veterinary relocation specialists manually audit every stamp and stay on standby on your departure day.
        </p>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🎉</span>
            <span>{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-950 text-xs cursor-pointer ml-4 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-700 hover:text-red-950 text-xs cursor-pointer ml-4 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Active Concierge State */}
      {isConciergeActive ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Specialist Review Active
                </span>
              </div>
              <h3 className="font-display font-black text-xl text-zinc-900 mt-1">
                Assigned Specialist: Dr. Sarah Jenkins (MRCVS)
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Senior Veterinary Relocation Specialist &bull; USDA &amp; DEFRA Certified Auditor
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-950 border border-amber-300">
                ⭐ £59 Concierge Active
              </span>
            </div>
          </div>

          {/* Specialist Docket Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Registered WhatsApp</span>
              <div className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                <span>📱</span>
                <span>+{trip.whatsappNumber || phone}</span>
              </div>
              <p className="text-[11px] text-zinc-500">Live chat hotline linked to this number</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Audit Turnaround SLA</span>
              <div className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                <span>⏱️</span>
                <span>Under 24 Hours</span>
              </div>
              <p className="text-[11px] text-zinc-500">Direct response via WhatsApp &amp; Email</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Departure Day Hotline</span>
              <div className="font-display font-bold text-sm text-emerald-700 flex items-center gap-1.5">
                <span>🟢</span>
                <span>Standby Ready</span>
              </div>
              <p className="text-[11px] text-zinc-500">Instant check-in and customs clearance escalation</p>
            </div>
          </div>

          {/* Traveler Notes on File */}
          {trip.conciergeNotes && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs">
              <span className="font-bold text-amber-950 block mb-1">📝 Your Notes for Dr. Jenkins:</span>
              <p className="text-amber-900 italic">&ldquo;{trip.conciergeNotes}&rdquo;</p>
            </div>
          )}

          {/* WhatsApp Direct Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200">
            <div>
              <strong className="block text-emerald-950 font-bold text-sm">
                Need an immediate answer or boarding check?
              </strong>
              <p className="text-xs text-emerald-800/90 mt-0.5">
                Message Dr. Jenkins directly on WhatsApp with your trip ID ready.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>💬</span>
              <span>Launch WhatsApp Specialist Hotline</span>
            </button>
          </div>
        </div>
      ) : (
        /* Intake Form & Feature Showcase */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 pb-5">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Direct Specialist Onboarding
            </span>
            <h3 className="font-display font-black text-xl text-zinc-900 mt-1">
              Submit Your Trip for Veterinary Audit (£59)
            </h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
              Enter your WhatsApp phone number below. Our review team will be dispatched immediately to audit all documents in your Travel Vault and confirm complete compliance.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleIntakeSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp Input */}
              <div className="space-y-1.5">
                <label htmlFor="whatsapp-number" className="block text-xs font-bold text-zinc-900">
                  WhatsApp Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="whatsapp-number"
                  type="tel"
                  required
                  placeholder="+44 7123 456789 or +1 415 555 2671"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-zinc-400">
                  Include international dial code (+44, +1, +61, +91 etc.). We do not share your number.
                </p>
              </div>

              {/* Urgency Level */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-900">
                  Departure Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('STANDARD')}
                    className={`px-2 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                      urgency === 'STANDARD'
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    Standard (48h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('HIGH')}
                    className={`px-2 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                      urgency === 'HIGH'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    High (24h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('IMMEDIATE')}
                    className={`px-2 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                      urgency === 'IMMEDIATE'
                        ? 'bg-red-600 text-white border-red-700 shadow-2xs'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    Urgent (&lt;12h)
                  </button>
                </div>
                <p className="text-[10px] text-zinc-400">
                  Select Urgent if flying within 48 hours.
                </p>
              </div>
            </div>

            {/* Custom Notes / Specific Concerns */}
            <div className="space-y-1.5">
              <label htmlFor="concierge-notes" className="block text-xs font-bold text-zinc-900">
                Special Questions or Document Concerns (Optional)
              </label>
              <textarea
                id="concierge-notes"
                rows={3}
                placeholder="e.g. My vet used blue ink instead of black; our transit in Singapore is 5 hours; is our microchip certificate enough for DEFRA?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Features Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                <span className="text-base">👩‍⚕️</span>
                <strong className="block text-zinc-900 font-bold">1-on-1 Document Audit</strong>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Veterinary auditor examines vet signatures, RNATT microchip matches, and clinic stamps.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                <span className="text-base">💬</span>
                <strong className="block text-zinc-900 font-bold">Direct WhatsApp Hotline</strong>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Dedicated hotline with our review team on departure day for customs clearance queries.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                <span className="text-base">🛡️</span>
                <strong className="block text-zinc-900 font-bold">Boarding Guarantee Shield</strong>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Carrier pushback support if airline desk staff question health certificate validity.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                    <span>Dispatching Review Team...</span>
                  </>
                ) : (
                  <>
                    <span>★</span>
                    <span>Confirm WhatsApp &amp; Initiate Expert Audit (£59)</span>
                  </>
                )}
              </button>
              <span className="text-xs text-zinc-400">
                100% money-back boarding clearance guarantee
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
