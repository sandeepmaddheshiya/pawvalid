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
      `Hello! I am requesting pet travel specialist review support for my pet ${trip?.petName || 'my pet'} (PawValid Docket #${trip?.id?.slice(-6) || 'TRIP'}). We are traveling from ${trip?.origin} to ${trip?.destination}.`
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

      setSuccessMessage('✓ Review intake confirmed! Our pet travel specialist team has received your documents and WhatsApp contact.');
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
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 border border-zinc-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>£59 Priority Expert Review &amp; Departure Support</span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-black text-zinc-900">
          Pet Travel Specialist Review &amp; Departure Support
        </h2>
        <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
          For travelers who don&apos;t want to leave important paperwork to chance. A dedicated specialist reviews the submitted travel documents, veterinary records, stamps, and relevant dates.
        </p>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
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
            <div className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
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
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Specialist Review Active
                </span>
              </div>
              <h3 className="font-display font-black text-xl text-zinc-900 mt-1">
                Your Documents are in Priority Review
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Our pet relocation team has been assigned and is verifying your documents against destination requirements.
              </p>
            </div>

            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
              £59 Plan Active
            </span>
          </div>

          {/* Specialist Docket Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Registered WhatsApp</span>
              <div className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>+{trip.whatsappNumber || phone}</span>
              </div>
              <p className="text-[11px] text-zinc-500">Live chat support linked to this number</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">24-Hour Priority Review</span>
              <div className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Under 24 Hours</span>
              </div>
              <p className="text-[11px] text-zinc-500">Direct response via WhatsApp &amp; Email</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Priority WhatsApp Support</span>
              <div className="font-display font-bold text-sm text-emerald-700 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Standby Ready</span>
              </div>
              <p className="text-[11px] text-zinc-500">Direct support for check-in and transit inquiries</p>
            </div>
          </div>

          {/* Traveler Notes on File */}
          {trip.conciergeNotes && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs">
              <span className="font-bold text-amber-950 flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Your Notes for the Specialist:
              </span>
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
                Message your assigned specialist directly on WhatsApp with your trip ID ready.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.71.058-1.15-.084-.27-.084-.62-.2-1.07-.4-1.89-.84-3.12-2.76-3.21-2.89-.1-.13-.77-.98-.77-1.87 0-.89.47-1.33.64-1.51.17-.18.37-.22.49-.22.12 0 .25.001.35.007.12.006.27-.04.42.33.15.37.52 1.28.57 1.37.05.1.08.21.01.33-.06.13-.1.2-.19.31-.1.11-.2.24-.29.33-.1.09-.2.2-.09.4.12.19.51.84 1.1 1.36.76.68 1.4.89 1.6.99.2.1.32.08.43-.05.12-.13.51-.59.65-.8.14-.2.28-.16.48-.09.19.08 1.23.58 1.44.69.21.1.35.16.4.25.05.09.05.53-.09.93z" />
              </svg>
              <span>Launch Priority WhatsApp Support</span>
            </button>
          </div>
        </div>
      ) : (
        /* Intake Form & Feature Showcase */
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 pb-5">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Direct Specialist Onboarding
            </span>
            <h3 className="font-display font-black text-xl text-zinc-900 mt-1">
              Submit Your Trip for Priority Expert Review (£59)
            </h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
              Enter your WhatsApp phone number below. A dedicated specialist will review the submitted travel documents, veterinary records, stamps, and relevant dates.
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
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('STANDARD')}
                    className={`px-1.5 sm:px-2 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer text-center ${
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
                    className={`px-1.5 sm:px-2 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer text-center ${
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
                    className={`px-1.5 sm:px-2 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer text-center ${
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
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0E2342] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <strong className="block text-zinc-900 font-bold">1-on-1 Document Review</strong>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Specialist examines signatures, microchip matches, dates, and clinic stamps.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <strong className="block text-zinc-900 font-bold">Priority WhatsApp Support</strong>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Direct support with our review team on departure day for transit compliance queries.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <strong className="block text-zinc-900 font-bold">Expert-Reviewed Seal</strong>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Audit seal added to your digital travel verification pass confirming paperwork review.
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
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Confirm WhatsApp &amp; Initiate Priority Expert Review (£59)</span>
                  </>
                )}
              </button>
              <span className="text-xs text-zinc-400">
                100% money-back compliance review guarantee
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
