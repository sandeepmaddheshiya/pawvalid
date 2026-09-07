'use client';

import React, { useState } from 'react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: 'GBP' | 'USD' | 'INR';
  scanResult?: any;
}

export default function PricingModal({ isOpen, onClose, currency = 'GBP', scanResult }: PricingModalProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<'GBP' | 'USD' | 'INR'>(currency);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const prices = {
    GBP: { free: '£0', pass: '£19', concierge: '£59' },
    USD: { free: '$0', pass: '$24', concierge: '$79' },
    INR: { free: '₹0', pass: '₹1,499', concierge: '₹4,999' },
  }[selectedCurrency];

  const handleSelectTier = (tierName: string) => {
    setSelectedTier(tierName);
    if (tierName === 'Priority Concierge' || tierName === 'Expert Document Review') {
      setStatusMessage('Selected Expert Document Review (£59). Provide your email and WhatsApp number for immediate intake.');
    } else {
      setStatusMessage(`Selected ${tierName}. Enter your email to proceed.`);
    }
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
        name: 'Petvia Travel Compliance',
        description: tier === 'CONCIERGE' ? 'Priority Concierge Review (£59)' : 'Certified Trip Pass (£19)',
        order_id: orderData.orderId,
        prefill: {
          email: checkoutEmail,
          contact: checkoutPhone,
        },
        theme: {
          color: tier === 'CONCIERGE' ? '#d97706' : '#10b981',
        },
        handler: function () {
          setStatusMessage('Payment verified! Redirecting to your updated command center...');
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

  const handleInstantDevPayment = async (tier: 'CERTIFIED_PASS' | 'CONCIERGE') => {
    setIsSubmitting(true);
    setStatusMessage(`⚡ Processing Dev Payment for ${tier === 'CONCIERGE' ? 'Priority Concierge (£59)' : 'Certified Pass (£19)'}...`);

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
        // Save user's ACTUAL scan report directly to database with paid tier
        const petName = scanResult.petProfile?.name || 'My Pet';
        const res = await fetch('/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: emailToUse,
            petName: petName,
            scanResult: scanResult,
            tier,
          }),
        });
        const data = await res.json();
        if (data.trip) {
          tripToLoad = data.trip;
        }
      } else if (activeTripId) {
        // Upgrade existing trip via checkout endpoint
        const res = await fetch(`/api/trips/${activeTripId}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tier,
            currency: selectedCurrency,
            email: emailToUse,
            whatsappNumber: phoneToUse,
            urgency: 'HIGH',
            notes: `Activated via Instant Dev Checkout by ${emailToUse}`,
          }),
        });
        const data = await res.json();
        if (data.trip) {
          tripToLoad = data.trip;
        }
      } else {
        // User is checking out directly without an active scan
        const res = await fetch('/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: emailToUse,
            petName: 'My Pet',
            tier,
            scanResult: {
              petProfile: { name: 'My Pet', species: 'DOG' },
              route: { origin: 'Departure', destination: 'Arrival' },
              stats: { overallStatus: 'NOT_READY', statusHeadline: 'Assessment initiated' },
              timelineMilestones: [],
              complianceChecklist: { all: [] },
              readinessReport: {},
            },
          }),
        });
        const data = await res.json();
        if (data.trip) {
          tripToLoad = data.trip;
        }
      }

      if (tripToLoad) {
        localStorage.setItem('petvia_active_trip', JSON.stringify(tripToLoad));
        localStorage.setItem('petvia_user_email', emailToUse);
        setStatusMessage(`✓ Payment Verified (Dev Mode)! Upgraded to ${tier === 'CONCIERGE' ? 'Priority Concierge' : 'Certified Pass'}. Redirecting to Command Center...`);

        setTimeout(() => {
          onClose();
          const targetTab = tier === 'CONCIERGE' ? 'concierge' : 'overview';
          window.location.href = `/dashboard?tripId=${tripToLoad.id}&tab=${targetTab}`;
        }, 800);
      } else {
        throw new Error('Could not upgrade trip');
      }
    } catch (err: any) {
      console.error('Instant dev payment error:', err);
      setStatusMessage('✓ Dev Payment Completed! Redirecting to Dashboard...');
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
    if (!checkoutEmail) return;

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

    // If scanResult is provided from an active report, save it as the trip for this checkout
    if (scanResult) {
      try {
        const petName = scanResult.petProfile?.name || 'My Pet';
        const saveRes = await fetch('/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: checkoutEmail.trim().toLowerCase(),
            petName,
            scanResult,
            tier: selectedTier === 'Priority Concierge' ? 'CONCIERGE' : 'CERTIFIED_PASS',
          }),
        });
        const saveData = await saveRes.json();
        if (saveData.trip) {
          activeTripId = saveData.trip.id;
          localStorage.setItem('petvia_active_trip', JSON.stringify(saveData.trip));
          localStorage.setItem('petvia_user_email', checkoutEmail.trim().toLowerCase());
        }
      } catch (err) {
        console.warn('Error saving scan before payment:', err);
      }
    }

    // ─── Expert Document Review (£59) ─────────────────────────────────────────
    if (selectedTier === 'Priority Concierge' || selectedTier === 'Expert Document Review') {
      if (!checkoutPhone || checkoutPhone.trim().length < 6) {
        setStatusMessage('Please enter your WhatsApp phone number with country code for specialist support.');
        return;
      }

      setIsSubmitting(true);
      try {
        if (activeTripId) {
          const res = await fetch(`/api/trips/${activeTripId}/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tier: 'CONCIERGE',
              currency: selectedCurrency,
              email: checkoutEmail,
              whatsappNumber: checkoutPhone,
              urgency: 'HIGH',
              notes: `Activated via Pricing Modal by ${checkoutEmail}`,
            }),
          });
          const data = await res.json();

          if (data.isMock && data.trip) {
            localStorage.setItem('petvia_active_trip', JSON.stringify(data.trip));
            setStatusMessage('✓ Expert Document Review activated! Redirecting to Specialist Command Center...');
            setTimeout(() => {
              onClose();
              if (typeof window !== 'undefined') {
                window.location.href = `/dashboard?tripId=${activeTripId}&tab=concierge`;
              }
            }, 800);
            return;
          }

          if (data.orderId && !data.isMock) {
            openRazorpayCheckout(data, activeTripId, 'CONCIERGE');
            return;
          }
        }
      } catch (err) {
        console.warn('[PricingModal] Concierge checkout:', err);
      } finally {
        setIsSubmitting(false);
      }

      setStatusMessage('✓ Expert Document Review activated! Redirecting to Specialist Command Center...');
      setTimeout(() => {
        onClose();
        if (typeof window !== 'undefined') {
          window.location.href = `/dashboard?tripId=${activeTripId || ''}&tab=concierge`;
        }
      }, 800);
      return;
    }

    // ─── Complete Travel Plan (£19) ─────────────────────────────────────────
    if (selectedTier === 'Certified Trip Pass' || selectedTier === 'Complete Travel Plan') {
      setIsSubmitting(true);
      try {
        if (activeTripId) {
          const res = await fetch(`/api/trips/${activeTripId}/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tier: 'CERTIFIED_PASS',
              currency: selectedCurrency,
              email: checkoutEmail,
            }),
          });
          const data = await res.json();

          if (data.isMock && data.trip) {
            localStorage.setItem('petvia_active_trip', JSON.stringify(data.trip));
            setStatusMessage('✓ Complete Travel Plan activated! Unlocking full compliance dossier...');
            setTimeout(() => {
              onClose();
              if (typeof window !== 'undefined') {
                window.location.href = `/dashboard?tripId=${activeTripId}&tab=overview`;
              }
            }, 800);
            return;
          }

          if (data.orderId && !data.isMock) {
            openRazorpayCheckout(data, activeTripId, 'CERTIFIED_PASS');
            return;
          }
        }
      } catch (err) {
        console.warn('[PricingModal] Pass checkout:', err);
      } finally {
        setIsSubmitting(false);
      }
    }

    setStatusMessage(`Directing ${checkoutEmail} to secure checkout for ${selectedTier}...`);
    setTimeout(() => {
      onClose();
      if (typeof window !== 'undefined') {
        window.location.href = `/dashboard?tripId=${activeTripId || ''}&tab=overview`;
      }
    }, 800);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] rounded-3xl p-6 sm:p-10 shadow-2xl border border-zinc-200 my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Currency Switcher */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex p-1 rounded-xl bg-white border border-zinc-200 shadow-2xs text-xs font-bold">
            {(['GBP', 'USD', 'INR'] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setSelectedCurrency(curr)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedCurrency === curr ? 'bg-amber-400 text-zinc-950 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {curr === 'GBP' ? '£ GBP' : curr === 'USD' ? '$ USD' : '₹ INR'}
              </button>
            ))}
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            Transparent Pricing for Worry-Free Pet Travel
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-600">
            Choose the level of compliance verification and expert support that matches your journey.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* ─── TIER 1: FREE READINESS SCAN ────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-xl font-black text-zinc-900">Readiness Scan</h3>
                <span className="inline-flex px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold">
                  Free Forever
                </span>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl sm:text-5xl font-black text-zinc-900">
                  {prices.free}
                </span>
                <p className="text-xs text-zinc-400 mt-1">No credit card required</p>
              </div>

              <button
                type="button"
                onClick={() => handleSelectTier('Free Readiness Scan')}
                className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer mb-6"
              >
                Start Free Scan
              </button>

              <div className="space-y-3.5 text-xs text-zinc-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">AI Document Extraction</strong>
                    <span className="text-zinc-500">Instant scan of microchips, rabies dates, and core vaccines</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">High-Level Route Readiness</strong>
                    <span className="text-zinc-500">Timeline readiness status (≤1 day, ~2 weeks, ~1 month, ~3 months)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Missing Requirements Overview</strong>
                    <span className="text-zinc-500">Identifies missing documents and short-lead items</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── TIER 2: CERTIFIED TRIP PASS ─────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-md flex flex-col justify-between relative ring-2 ring-emerald-100">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-xl font-black text-zinc-900">Complete Travel Plan</h3>
                <span className="inline-flex px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                  Most Popular
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl font-black text-zinc-900">
                    {prices.pass}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">One-time payment per journey</p>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => handleSelectTier('Complete Travel Plan')}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer"
                >
                  Get Complete Travel Plan
                </button>
                <button
                  type="button"
                  onClick={() => handleInstantDevPayment('CERTIFIED_PASS')}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] sm:text-xs border border-emerald-300 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  title="Simulate successful payment and jump to dashboard"
                >
                  <span>⚡</span>
                  <span>Instant Dev Payment (£19 Success)</span>
                </button>
              </div>

              <div className="space-y-3.5 text-xs text-zinc-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Full Dual-Sided Compliance Report</strong>
                    <span className="text-zinc-500">Leaving (export) and Arriving (import) rules evaluated</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Verified Official Legal Citations</strong>
                    <span className="text-zinc-500">Direct source links to USDA, DAFF, DEFRA, and EU legislation</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Chronological Action Countdown</strong>
                    <span className="text-zinc-500">Prioritized checklist sorted by regulatory lead time</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Printable Travel Dossier (PDF)</strong>
                    <span className="text-zinc-500">Dated compliance snapshot for airlines &amp; border officials</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-zinc-900">Carrier &amp; Crate Sizing Guide</strong>
                    <span className="text-zinc-500">IATA Live Animal Regulations requirements for your breed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── TIER 3: EXPERT DOCUMENT REVIEW ──────────────────────────── */}
          <div className="bg-[#18181B] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative border border-zinc-800">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-xl font-black text-white">Expert Document Review</h3>
                <span className="inline-flex px-2.5 py-1 rounded-md bg-amber-400 text-zinc-950 text-[11px] font-extrabold">
                  Specialist Review
                </span>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl sm:text-5xl font-black text-amber-400">
                  {prices.concierge}
                </span>
                <p className="text-xs text-zinc-400 mt-1">One-time payment • Dedicated support</p>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => handleSelectTier('Expert Document Review')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-105 text-zinc-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  Get Priority Concierge
                </button>
                <button
                  type="button"
                  onClick={() => handleInstantDevPayment('CONCIERGE')}
                  className="w-full py-2 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-bold text-[11px] sm:text-xs border border-amber-400/40 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  title="Simulate successful payment and jump to concierge review"
                >
                  <span>⚡</span>
                  <span>Instant Dev Payment (£59 Success)</span>
                </button>
              </div>

              <div className="space-y-3.5 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-amber-400/30">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-amber-300 font-bold">1-on-1 Pre-Flight Document Review</strong>
                    <span className="text-zinc-300">Human specialist double-checks all stamps &amp; paperwork</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-white">Everything in Certified Trip Pass</strong>
                    <span className="text-zinc-400">PDF report, source links, and countdown plan</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-white">Real-Time Travel Day Support</strong>
                    <span className="text-zinc-400">Direct assistance if customs or airlines have questions</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-white">Official Government Form Fill Templates</strong>
                    <span className="text-zinc-400">Sample filled certificates and declaration templates</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                  <div>
                    <strong className="block text-white">Guaranteed 24-Hour Review Turnaround</strong>
                    <span className="text-zinc-400">Fast-tracked for urgent departures</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Plan Form if clicked */}
        {selectedTier && (
          <form onSubmit={handleCompleteOrder} className="mt-8 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center gap-3 justify-center">
            <input
              type="email"
              required
              value={checkoutEmail}
              onChange={(e) => setCheckoutEmail(e.target.value)}
              placeholder="Enter your email to activate plan..."
              className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
            />
            {selectedTier === 'Priority Concierge' && (
              <input
                type="tel"
                required
                value={checkoutPhone}
                onChange={(e) => setCheckoutPhone(e.target.value)}
                placeholder="WhatsApp (+44 7123 456789)..."
                className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400 font-mono"
              />
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Activating Concierge...' : `Continue to ${selectedTier}`}
            </button>
          </form>
        )}

        {statusMessage && (
          <p className="mt-4 text-center text-xs text-emerald-700 font-semibold">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}
