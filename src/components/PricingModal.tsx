'use client';

import React, { useState, useEffect } from 'react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: string;
  scanResult?: any;
  initialTier?: string;
}

export default function PricingModal({
  isOpen,
  onClose,
  scanResult,
  initialTier,
}: PricingModalProps) {
  const selectedCurrency = 'GBP';
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(initialTier || 'Complete Travel Plan');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill stored user email if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('pawvalid_user_email') || localStorage.getItem('petvia_user_email');
      if (storedEmail) setCheckoutEmail(storedEmail);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialTier) {
      setSelectedTier(initialTier);
    } else if (scanResult) {
      // Default to the popular £19 Complete Travel Plan for scan results
      setSelectedTier('Complete Travel Plan');
    }
  }, [initialTier, scanResult, isOpen]);

  if (!isOpen) return null;

  const prices = { free: '£0', pass: '£19', concierge: '£59' };

  const petName = scanResult?.petProfile?.name || 'Your Pet';
  const species = scanResult?.petProfile?.species === 'CAT' ? 'Cat' : 'Dog';
  const origin = scanResult?.route?.origin || 'Origin';
  const destination = scanResult?.route?.destination || 'Destination';
  const earliestDate = scanResult?.stats?.earliestFlightDate;

  const handleSelectTier = (tierName: string) => {
    setSelectedTier(tierName);
    setStatusMessage(null);
  };

  const openRazorpayCheckout = (orderData: any, tripId: string, tier: string) => {
    if (typeof window === 'undefined') return;
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'PawValid Pet Travel Compliance',
        description:
          tier === 'CONCIERGE'
            ? 'Priority Expert Review (£59)'
            : 'Complete Travel Plan (£19)',
        order_id: orderData.orderId,
        prefill: {
          email: checkoutEmail,
          contact: checkoutPhone,
        },
        theme: {
          color: '#0E2342',
        },
        handler: async function (response: any) {
          setStatusMessage('Payment verified! Finalizing account and unlocking dossier...');
          try {
            const verifyRes = await fetch(`/api/trips/${tripId}/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response?.razorpay_order_id,
                razorpay_payment_id: response?.razorpay_payment_id,
                razorpay_signature: response?.razorpay_signature,
                email: checkoutEmail.trim().toLowerCase(),
                whatsappNumber: checkoutPhone.trim(),
                tier,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.trip) {
              localStorage.setItem('pawvalid_active_trip', JSON.stringify(verifyData.trip));
              localStorage.setItem('petvia_active_trip', JSON.stringify(verifyData.trip));
            }
          } catch (verifyErr) {
            console.warn('Payment verify call note:', verifyErr);
          }
          localStorage.setItem('pawvalid_user_email', checkoutEmail.trim().toLowerCase());
          localStorage.setItem('petvia_user_email', checkoutEmail.trim().toLowerCase());
          setTimeout(() => {
            onClose();
            window.location.href = `/dashboard?tripId=${tripId}&tab=${tier === 'CONCIERGE' ? 'concierge' : 'overview'}`;
          }, 800);
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  const handleInstantDevPayment = async (tier: 'FREE' | 'CERTIFIED_PASS' | 'CONCIERGE') => {
    setIsSubmitting(true);
    const tierTitle =
      tier === 'FREE'
        ? 'Free Readiness Scan (£0)'
        : tier === 'CONCIERGE'
        ? 'Priority Expert Review (£59)'
        : 'Complete Travel Plan (£19)';
    setStatusMessage(`Processing simulation for ${tierTitle}...`);

    try {
      const savedRaw = typeof window !== 'undefined' ? (localStorage.getItem('pawvalid_active_trip') || localStorage.getItem('petvia_active_trip')) : null;
      let activeTripId: string | null = null;
      if (savedRaw) {
        try {
          const parsed = JSON.parse(savedRaw);
          activeTripId = parsed?.id || null;
        } catch (err) {
          console.warn('Error reading active trip cache', err);
        }
      }

      const emailToUse = checkoutEmail.trim() || 'traveler@example.com';
      const phoneToUse = checkoutPhone.trim() || '+44 7123 456789';

      let tripToLoad: any = null;

      if (scanResult) {
        const res = await fetch('/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: emailToUse,
            petName: scanResult.petProfile?.name || petName,
            scanResult: scanResult,
            tier,
          }),
        });
        const data = await res.json();
        if (data.trip) tripToLoad = data.trip;
      } else if (activeTripId) {
        const res = await fetch(`/api/trips/${activeTripId}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tier,
            currency: selectedCurrency,
            email: emailToUse,
            whatsappNumber: phoneToUse,
            urgency: 'HIGH',
            notes: `Activated via Dev Simulation by ${emailToUse}`,
          }),
        });
        const data = await res.json();
        if (data.trip) tripToLoad = data.trip;
      }

      if (tripToLoad) {
        localStorage.setItem('pawvalid_active_trip', JSON.stringify(tripToLoad));
        localStorage.setItem('pawvalid_user_email', emailToUse);
        localStorage.setItem('petvia_active_trip', JSON.stringify(tripToLoad));
        localStorage.setItem('petvia_user_email', emailToUse);
        setStatusMessage(`✓ Dev Mode Activated: ${tierTitle}. Loading dashboard...`);

        setTimeout(() => {
          onClose();
          const targetTab = tier === 'CONCIERGE' ? 'concierge' : tier === 'FREE' ? 'passport' : 'overview';
          window.location.href = `/dashboard?tripId=${tripToLoad.id}&tab=${targetTab}`;
        }, 800);
      } else {
        throw new Error('Could not update trip tier');
      }
    } catch (err) {
      console.error('Instant dev payment error:', err);
      setStatusMessage('✓ Activated! Redirecting to Dashboard...');
      setTimeout(() => {
        onClose();
        window.location.href = `/dashboard?tab=${tier === 'CONCIERGE' ? 'concierge' : 'overview'}`;
      }, 800);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isConciergeSelected =
    selectedTier === 'Priority Expert Review' ||
    selectedTier === 'Priority Concierge' ||
    selectedTier === 'Expert Document Review';

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail) {
      setStatusMessage('Please enter your email to proceed.');
      return;
    }

    if (isConciergeSelected && (!checkoutPhone || checkoutPhone.trim().length < 6)) {
      setStatusMessage('Please enter your WhatsApp phone number with country code for specialist intake.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Initiating secure checkout...');

    try {
      const savedRaw = typeof window !== 'undefined' ? (localStorage.getItem('pawvalid_active_trip') || localStorage.getItem('petvia_active_trip')) : null;
      let activeTripId: string | null = null;
      if (savedRaw) {
        try {
          const parsed = JSON.parse(savedRaw);
          activeTripId = parsed?.id || null;
        } catch (err) {
          console.warn('Error reading active trip cache', err);
        }
      }

      if (scanResult) {
        const saveRes = await fetch('/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: checkoutEmail.trim().toLowerCase(),
            petName: scanResult.petProfile?.name || petName,
            scanResult,
            tier: isConciergeSelected ? 'CONCIERGE' : 'CERTIFIED_PASS',
          }),
        });
        const saveData = await saveRes.json();
        if (saveData.trip) {
          activeTripId = saveData.trip.id;
          localStorage.setItem('pawvalid_active_trip', JSON.stringify(saveData.trip));
          localStorage.setItem('pawvalid_user_email', checkoutEmail.trim().toLowerCase());
          localStorage.setItem('petvia_active_trip', JSON.stringify(saveData.trip));
          localStorage.setItem('petvia_user_email', checkoutEmail.trim().toLowerCase());
        }
      }

      if (activeTripId) {
        const res = await fetch(`/api/trips/${activeTripId}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tier: isConciergeSelected ? 'CONCIERGE' : 'CERTIFIED_PASS',
            currency: selectedCurrency,
            email: checkoutEmail.trim().toLowerCase(),
            whatsappNumber: checkoutPhone.trim(),
            urgency: 'HIGH',
            notes: `Purchased via Travel Plan Modal by ${checkoutEmail}`,
          }),
        });
        const data = await res.json();

        if (data.isMock && data.trip) {
          localStorage.setItem('pawvalid_active_trip', JSON.stringify(data.trip));
          localStorage.setItem('petvia_active_trip', JSON.stringify(data.trip));
          setStatusMessage('✓ Order confirmed! Redirecting to your travel dashboard...');
          setTimeout(() => {
            onClose();
            window.location.href = `/dashboard?tripId=${activeTripId}&tab=${isConciergeSelected ? 'concierge' : 'overview'}`;
          }, 800);
          return;
        }

        if (data.orderId && !data.isMock) {
          openRazorpayCheckout(data, activeTripId, isConciergeSelected ? 'CONCIERGE' : 'CERTIFIED_PASS');
          return;
        }
      }

      // Fallback
      setStatusMessage('Order processed! Loading dashboard...');
      setTimeout(() => {
        onClose();
        window.location.href = `/dashboard?tripId=${activeTripId || ''}&tab=${isConciergeSelected ? 'concierge' : 'overview'}`;
      }, 800);
    } catch (err) {
      console.error('Checkout error:', err);
      setStatusMessage('Payment initialization failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E2342]/70 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-zinc-200 my-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Header Pill & Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[11px] font-bold tracking-wide uppercase">
            <span>★</span>
            <span>Digital Travel Preparation &amp; Verification</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight">
            Prepare Your Pet&apos;s Travel Plan
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            {scanResult ? (
              <span>
                Personalized for <strong className="text-zinc-900">{petName}</strong> ({species}) ·{' '}
                <strong className="text-zinc-900">{origin}</strong> →{' '}
                <strong className="text-zinc-900">{destination}</strong>
                {earliestDate ? ` • Earliest Travel: ${earliestDate}` : ''}
              </span>
            ) : (
              'We organize, check, and explain your pet\'s travel requirements — so you know exactly what needs to be done before departure.'
            )}
          </p>


        </div>

        {/* ─── 2-OPTION COMPARISON CARDS (Clear & Trustworthy) ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Card 1: Complete Travel Plan (£19) [⭐ MOST POPULAR] */}
          <div
            onClick={() => handleSelectTier('Complete Travel Plan')}
            className={`h-full rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between relative border-2 ${
              !isConciergeSelected
                ? 'border-[#0FA958] bg-[#F4FBF7] shadow-md ring-2 ring-[#0FA958]/20'
                : 'border-zinc-200 bg-white hover:border-zinc-300'
            }`}
          >
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="inline-flex px-2.5 py-0.5 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider">
                  ⭐ Most Popular · Travel-Preparation System
                </span>
                <input
                  type="radio"
                  name="tier"
                  checked={!isConciergeSelected}
                  onChange={() => handleSelectTier('Complete Travel Plan')}
                  className="accent-[#0FA958] w-4 h-4 cursor-pointer mt-0.5"
                />
              </div>

              <h3 className="font-serif text-xl font-bold text-[#0E2342]">
                Complete Travel Plan
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                Everything you need to prepare your pet&apos;s international journey in one place.
              </p>

              <div className="my-4 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0E2342]">
                  {prices.pass}
                </span>
                <span className="text-xs text-zinc-500 font-medium">one-time / trip</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-700 pt-2 border-t border-zinc-200/80 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Route-Specific Travel Checklist:</strong> Step-by-step
                    preparation docket with verified destination and transit requirements.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Digital Travel Verification Pass:</strong> A mobile-friendly
                    page summarizing your pet&apos;s travel-readiness status, document checks, and route information for easy reference during the journey.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Document Verification &amp; Timeline:</strong> Missing-document
                    detection, rabies latency countdown, and earliest eligible departure date based on documented requirements.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Secure Digital Document Vault:</strong> Secure storage
                    to reuse documents for future trips without starting from scratch.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Automated Deadline Reminders:</strong> Scheduled
                    alerts for vet window (Day -30), tapeworm (Day -5), and endorsement (Day -2).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Printable Pet Travel Card &amp; Dossier:</strong> Comprehensive
                    travel dossier and quick-reference pet travel card.
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-auto border-t border-zinc-200/80">
              <button
                type="button"
                onClick={() => handleSelectTier('Complete Travel Plan')}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                  !isConciergeSelected
                    ? 'bg-[#0FA958] hover:bg-[#0D8E4A] text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                }`}
              >
                {!isConciergeSelected ? '✓ Selected: Complete Travel Plan' : `Select Complete Travel Plan (${prices.pass})`}
              </button>
            </div>
          </div>

          {/* Card 2: Priority Expert Review (£59) */}
          <div
            onClick={() => handleSelectTier('Priority Expert Review')}
            className={`h-full rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between relative border-2 ${
              isConciergeSelected
                ? 'border-amber-400 bg-[#0E2342] text-white shadow-xl ring-2 ring-amber-400/30'
                : 'border-zinc-300 bg-zinc-900 text-white hover:border-zinc-400'
            }`}
          >
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="inline-flex px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  ★ Recommended For Complex Routes
                </span>
                <input
                  type="radio"
                  name="tier"
                  checked={isConciergeSelected}
                  onChange={() => handleSelectTier('Priority Expert Review')}
                  className="accent-amber-400 w-4 h-4 cursor-pointer mt-0.5"
                />
              </div>

              <h3 className="font-serif text-xl font-bold text-white">
                Priority Expert Review
              </h3>
              <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                Everything automated + a human specialist reviewing your case.
              </p>

              <div className="my-4 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400">
                  {prices.concierge}
                </span>
                <span className="text-xs text-zinc-400 font-medium">one-time / trip</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-200 pt-2 border-t border-white/10 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Includes Full Complete Travel Plan:</strong> All checklists,
                    digital verification pass, document vault, reminders, and comprehensive dossier.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Dedicated Specialist Review:</strong> A dedicated specialist
                    reviews the submitted travel documents, veterinary records, stamps, and relevant dates.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Expert-Reviewed Seal:</strong> Confirms that the submitted
                    documents were manually reviewed by a Pet Travel Specialist.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-white">24-Hour Priority Review:</strong> Fast-tracked review
                    turnaround with actionable notes on complex or conflicting records.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Priority WhatsApp Support:</strong> Real-time direct
                    messaging leading up to flight day for airline requirement questions.
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-auto border-t border-white/10">
              <button
                type="button"
                onClick={() => handleSelectTier('Priority Expert Review')}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                  isConciergeSelected
                    ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isConciergeSelected
                  ? '✓ Selected: Priority Expert Review'
                  : `Select Priority Expert Review (${prices.concierge})`}
              </button>
            </div>
          </div>
        </div>

        {/* ─── INTEGRATED CHECKOUT BAR ───────────────────────────────── */}
        <form
          onSubmit={handleCompleteOrder}
          className="mt-6 pt-5 border-t border-zinc-200 bg-[#FAFBFB] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-end justify-between gap-4"
        >
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div className="flex flex-col justify-end">
              <label className="block text-[11px] font-semibold text-zinc-600 mb-1.5 h-6 flex items-end">
                Your Email (to receive dossier &amp; pass)
              </label>
              <input
                type="email"
                required
                value={checkoutEmail}
                onChange={(e) => setCheckoutEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-11 px-3.5 rounded-xl border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0FA958]"
              />
            </div>

            {isConciergeSelected ? (
              <div className="flex flex-col justify-end">
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1.5 h-6 flex items-end">
                  WhatsApp Number (specialist intake)
                </label>
                <input
                  type="tel"
                  required
                  value={checkoutPhone}
                  onChange={(e) => setCheckoutPhone(e.target.value)}
                  placeholder="+44 7123 456789"
                  className="w-full h-11 px-3.5 rounded-xl border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400 font-mono"
                />
              </div>
            ) : (
              <div className="h-11 flex items-center gap-1.5 text-xs text-zinc-500">
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>256-bit SSL encrypted • Instant plan activation</span>
              </div>
            )}
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto h-11 px-6 rounded-xl bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50 whitespace-nowrap flex items-center justify-center"
            >
              {isSubmitting
                ? 'Processing...'
                : `Proceed with ${isConciergeSelected ? 'Priority Expert Review' : 'Complete Travel Plan'} (${
                    isConciergeSelected ? prices.concierge : prices.pass
                  }) →`}
            </button>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 pt-3 border-t border-zinc-200/70 mt-1 gap-2">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>14-Day Money-Back Guarantee &amp; Instant Access</span>
            </span>
            <span className="text-zinc-500 text-center sm:text-right">
              By proceeding, you agree to our{' '}
              <a href="/en/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-900">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/en/refund-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-900">
                Refund Policy
              </a>.
            </span>
          </div>
        </form>

        {statusMessage && (
          <p className="mt-3 text-center text-xs font-semibold text-emerald-700">
            {statusMessage}
          </p>
        )}

        {/* ─── DISCREET DEVELOPER HELPER FOOTER ───────────────────────── */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
          <span>Independent Pet Travel Preparation Service • PawValid</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-zinc-400">Dev Testing:</span>
            <button
              type="button"
              onClick={() => handleInstantDevPayment('CERTIFIED_PASS')}
              className="text-[10px] text-zinc-500 hover:text-zinc-800 underline cursor-pointer"
            >
              Simulate £19 Plan
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleInstantDevPayment('CONCIERGE')}
              className="text-[10px] text-zinc-500 hover:text-zinc-800 underline cursor-pointer"
            >
              Simulate £59 Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
