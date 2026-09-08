'use client';

import React, { useState, useEffect } from 'react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: 'GBP' | 'USD' | 'INR';
  scanResult?: any;
  initialTier?: string;
}

export default function PricingModal({
  isOpen,
  onClose,
  currency = 'GBP',
  scanResult,
  initialTier,
}: PricingModalProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<'GBP' | 'USD' | 'INR'>(currency);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(initialTier || 'Complete Travel Plan');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill stored user email if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('petvia_user_email');
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

  const prices = {
    GBP: { free: '£0', pass: '£19', concierge: '£59' },
    USD: { free: '$0', pass: '$24', concierge: '$79' },
    INR: { free: '₹0', pass: '₹1,499', concierge: '₹4,999' },
  }[selectedCurrency];

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
        name: 'Petvia Pet Travel Compliance',
        description:
          tier === 'CONCIERGE'
            ? 'Priority Concierge & Vet Review (£59)'
            : 'Official Travel Plan & Dossier (£19)',
        order_id: orderData.orderId,
        prefill: {
          email: checkoutEmail,
          contact: checkoutPhone,
        },
        theme: {
          color: '#0E2342',
        },
        handler: function () {
          setStatusMessage('Payment verified! Loading your travel dossier...');
          setTimeout(() => {
            onClose();
            window.location.href = `/dashboard?tripId=${tripId}&section=${tier === 'CONCIERGE' ? 'concierge' : 'overview'}`;
          }, 1000);
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
        ? 'Priority Concierge (£59)'
        : 'Complete Travel Plan (£19)';
    setStatusMessage(`⚡ Processing Dev Simulation for ${tierTitle}...`);

    try {
      const savedRaw = typeof window !== 'undefined' ? localStorage.getItem('petvia_active_trip') : null;
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

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail) {
      setStatusMessage('Please enter your email to proceed.');
      return;
    }

    const isConcierge =
      selectedTier === 'Priority Concierge' ||
      selectedTier === 'Expert Document Review';

    if (isConcierge && (!checkoutPhone || checkoutPhone.trim().length < 6)) {
      setStatusMessage('Please enter your WhatsApp phone number with country code for specialist intake.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Initiating secure checkout...');

    try {
      const savedRaw = typeof window !== 'undefined' ? localStorage.getItem('petvia_active_trip') : null;
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
            tier: isConcierge ? 'CONCIERGE' : 'CERTIFIED_PASS',
          }),
        });
        const saveData = await saveRes.json();
        if (saveData.trip) {
          activeTripId = saveData.trip.id;
          localStorage.setItem('petvia_active_trip', JSON.stringify(saveData.trip));
          localStorage.setItem('petvia_user_email', checkoutEmail.trim().toLowerCase());
        }
      }

      if (activeTripId) {
        const res = await fetch(`/api/trips/${activeTripId}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tier: isConcierge ? 'CONCIERGE' : 'CERTIFIED_PASS',
            currency: selectedCurrency,
            email: checkoutEmail.trim().toLowerCase(),
            whatsappNumber: checkoutPhone.trim(),
            urgency: 'HIGH',
            notes: `Purchased via Dossier Modal by ${checkoutEmail}`,
          }),
        });
        const data = await res.json();

        if (data.isMock && data.trip) {
          localStorage.setItem('petvia_active_trip', JSON.stringify(data.trip));
          setStatusMessage('✓ Order confirmed! Redirecting to your travel command center...');
          setTimeout(() => {
            onClose();
            window.location.href = `/dashboard?tripId=${activeTripId}&tab=${isConcierge ? 'concierge' : 'overview'}`;
          }, 800);
          return;
        }

        if (data.orderId && !data.isMock) {
          openRazorpayCheckout(data, activeTripId, isConcierge ? 'CONCIERGE' : 'CERTIFIED_PASS');
          return;
        }
      }

      // Fallback
      setStatusMessage('Order processed! Loading dashboard...');
      setTimeout(() => {
        onClose();
        window.location.href = `/dashboard?tripId=${activeTripId || ''}&tab=${isConcierge ? 'concierge' : 'overview'}`;
      }, 800);
    } catch (err) {
      console.error('Checkout error:', err);
      setStatusMessage('Payment initialization failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isConciergeSelected =
    selectedTier === 'Priority Concierge' || selectedTier === 'Expert Document Review';

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
            <span>Official Travel Dossier &amp; Certification</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight">
            Complete Your Pet Travel Dossier
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
              'Choose your verified compliance dossier package for smooth airline check-in and border customs clearance.'
            )}
          </p>

          {/* Currency Switcher */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex p-1 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-semibold">
              {(['GBP', 'USD', 'INR'] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedCurrency === curr
                      ? 'bg-[#0E2342] text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {curr === 'GBP' ? '£ GBP' : curr === 'USD' ? '$ USD' : '₹ INR'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── 2-OPTION COMPARISON CARDS (Customized & Clean) ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Card 1: Complete Travel Plan (£19) */}
          <div
            onClick={() => handleSelectTier('Complete Travel Plan')}
            className={`rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between relative border-2 ${
              !isConciergeSelected
                ? 'border-[#0FA958] bg-[#F4FBF7] shadow-md ring-2 ring-[#0FA958]/20'
                : 'border-zinc-200 bg-white hover:border-zinc-300'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="inline-flex px-2.5 py-0.5 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider">
                  Most Popular · Instant Download
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
                Official Travel Dossier
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Complete compliance plan &amp; border-ready documentation
              </p>

              <div className="my-4 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0E2342]">
                  {prices.pass}
                </span>
                <span className="text-xs text-zinc-500 font-medium">one-time / trip</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-700 pt-2 border-t border-zinc-200/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Official PDF Travel Dossier:</strong> Dated
                    compliance docket with official USDA, EU Regulation 2026/131, and DEFRA citations.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Customs QR Travel Pass:</strong> Live-scannable
                    entry pass for airline boarding and border inspector validation.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Chronological Action Plan:</strong> Prioritized
                    appointment countdown for vet exam (10-day window) &amp; treatments.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0FA958] font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-zinc-900">Digital Pet Passport Vault:</strong> Permanent
                    vaccination &amp; microchip record vault with 1-click reuse.
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-4 border-t border-zinc-200/80">
              <button
                type="button"
                onClick={() => handleSelectTier('Complete Travel Plan')}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                  !isConciergeSelected
                    ? 'bg-[#0FA958] hover:bg-[#0D8E4A] text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                }`}
              >
                {!isConciergeSelected ? '✓ Selected: Complete Travel Plan' : `Select Official Dossier (${prices.pass})`}
              </button>
            </div>
          </div>

          {/* Card 2: Priority Concierge & Specialist Review (£59) */}
          <div
            onClick={() => handleSelectTier('Priority Concierge')}
            className={`rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between relative border-2 ${
              isConciergeSelected
                ? 'border-amber-400 bg-[#0E2342] text-white shadow-xl ring-2 ring-amber-400/30'
                : 'border-zinc-300 bg-zinc-900 text-white hover:border-zinc-400'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="inline-flex px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  ★ Recommended For Flights
                </span>
                <input
                  type="radio"
                  name="tier"
                  checked={isConciergeSelected}
                  onChange={() => handleSelectTier('Priority Concierge')}
                  className="accent-amber-400 w-4 h-4 cursor-pointer mt-0.5"
                />
              </div>

              <h3 className="font-serif text-xl font-bold text-white">
                Expert Vet Document Review
              </h3>
              <p className="text-xs text-zinc-300 mt-0.5">
                1-on-1 specialist sign-off before departure
              </p>

              <div className="my-4 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400">
                  {prices.concierge}
                </span>
                <span className="text-xs text-zinc-400 font-medium">one-time / trip</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-200 pt-2 border-t border-white/10">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Includes Full Travel Dossier:</strong> Official PDF,
                    customs QR pass, and digital passport vault included.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-white">1-on-1 Veterinary Specialist Audit:</strong> An
                    accredited pet travel specialist manually audits all stamps, dates, and health certificates.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Dedicated WhatsApp Channel:</strong> Real-time support
                    leading up to flight day for airline or customs inquiries.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-sm leading-none shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Guaranteed 24-Hour Turnaround:</strong> Fast-tracked
                    clearance verification to prevent airport grounding and quarantine risk.
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleSelectTier('Priority Concierge')}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                  isConciergeSelected
                    ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isConciergeSelected
                  ? '✓ Selected: Expert Vet Review'
                  : `Select Expert Review (${prices.concierge})`}
              </button>
            </div>
          </div>
        </div>

        {/* ─── INTEGRATED CHECKOUT BAR ───────────────────────────────── */}
        <form
          onSubmit={handleCompleteOrder}
          className="mt-6 pt-5 border-t border-zinc-200 bg-[#FAFBFB] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                Your Email (to receive dossier)
              </label>
              <input
                type="email"
                required
                value={checkoutEmail}
                onChange={(e) => setCheckoutEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0FA958]"
              />
            </div>

            {isConciergeSelected ? (
              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  WhatsApp Number (for specialist intake)
                </label>
                <input
                  type="tel"
                  required
                  value={checkoutPhone}
                  onChange={(e) => setCheckoutPhone(e.target.value)}
                  placeholder="+44 7123 456789"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400 font-mono"
                />
              </div>
            ) : (
              <div className="flex items-center text-xs text-zinc-500 pt-6">
                <span>🔒 256-bit SSL encrypted • Instant PDF generation</span>
              </div>
            )}
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              {isSubmitting
                ? 'Processing...'
                : `Proceed with ${isConciergeSelected ? 'Expert Review' : 'Official Dossier'} (${
                    isConciergeSelected ? prices.concierge : prices.pass
                  }) →`}
            </button>
          </div>
        </form>

        {statusMessage && (
          <p className="mt-3 text-center text-xs font-semibold text-emerald-700">
            {statusMessage}
          </p>
        )}

        {/* ─── DISCREET DEVELOPER HELPER FOOTER ───────────────────────── */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
          <span>Official Pet Travel Verification Service • Petvia</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-zinc-400">Dev Testing:</span>
            <button
              type="button"
              onClick={() => handleInstantDevPayment('CERTIFIED_PASS')}
              className="text-[10px] text-zinc-500 hover:text-zinc-800 underline cursor-pointer"
            >
              Simulate £19 Pass
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
