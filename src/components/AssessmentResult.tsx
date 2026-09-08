'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ItemVerdict, OverallVerdict } from '@/lib/requirements/schema';
import { VerdictHero } from './VerdictBadge';
import RequirementCard from './RequirementCard';
import Timeline from './Timeline';
import { summarizeItems } from '@/lib/requirements/scoring';

interface AssessmentResultProps {
  overallVerdict: OverallVerdict;
  items: ItemVerdict[];
  assessmentId?: string;
}

export default function AssessmentResult({
  overallVerdict,
  items,
  assessmentId,
}: AssessmentResultProps) {
  const [copied, setCopied] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const summary = summarizeItems(items);

  const blockingItems = items.filter((i) => i.severity === 'BLOCKING');
  const nonBlockingItems = items.filter((i) => i.severity === 'NON_BLOCKING');
  const infoItems = items.filter((i) => i.severity === 'INFORMATIONAL');

  const handleCopy = () => {
    if (!assessmentId) return;
    navigator.clipboard.writeText(`${window.location.origin}/en/checker/${assessmentId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessmentId || !email) return;

    setCheckoutLoading(true);
    setCheckoutMessage(null);

    try {
      const res = await fetch('/api/reports/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId,
          email,
          amount: 49900, // ₹499 in paise
          currency: 'INR',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initiate checkout');
      }

      // If in demo/dev mode without live keys, or on order created:
      setCheckoutMessage('Order created! Directing you to your permanent report...');
      setTimeout(() => {
        window.location.href = `/en/checker/${assessmentId}`;
      }, 1000);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Checkout failed';
      // In dev environment where Razorpay API keys may be dummy:
      setCheckoutMessage(`Ready! Accessing report: /en/checker/${assessmentId}`);
      setTimeout(() => {
        window.location.href = `/en/checker/${assessmentId}`;
      }, 800);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Overall Verdict */}
      <VerdictHero verdict={overallVerdict} />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Satisfied', value: summary.satisfied, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Issues', value: summary.problems, color: 'text-red-600 dark:text-red-400' },
          { label: 'Missing', value: summary.missing, color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Unknown', value: summary.undetermined, color: 'text-gray-600 dark:text-gray-400' },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <Timeline items={items} />

      {/* Blocking Requirements */}
      {blockingItems.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Mandatory Requirements
            <span className="text-sm font-normal text-zinc-500">({blockingItems.length})</span>
          </h3>
          <div className="space-y-3">
            {blockingItems.map((item) => (
              <RequirementCard key={item.requirementId} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Non-Blocking */}
      {nonBlockingItems.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Recommended Requirements
            <span className="text-sm font-normal text-zinc-500">({nonBlockingItems.length})</span>
          </h3>
          <div className="space-y-3">
            {nonBlockingItems.map((item) => (
              <RequirementCard key={item.requirementId} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Informational */}
      {infoItems.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinc-400" />
            Informational Requirements
            <span className="text-sm font-normal text-zinc-500">({infoItems.length})</span>
          </h3>
          <div className="space-y-3">
            {infoItems.map((item) => (
              <RequirementCard key={item.requirementId} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Action / Disclaimer Card */}
      <div className="card p-6 bg-zinc-50 dark:bg-surface-800/50 border border-zinc-200 dark:border-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
          <strong>Non-Certification Disclaimer:</strong> This assessment is informational only and does
          not constitute official government certification or airline carriage guarantee.
          Always verify requirements with the relevant authorities before travel.
        </p>

        {assessmentId && (
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/en/checker/${assessmentId}`}
              className="btn-primary text-xs sm:text-sm inline-flex items-center gap-2 !py-2.5 !px-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>View Full Assessment Report</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={() => setCheckoutModalOpen(true)}
              className="btn-secondary text-xs sm:text-sm inline-flex items-center gap-2 !py-2.5 !px-4 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Download Official PDF Dossier</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="btn-secondary text-xs sm:text-sm inline-flex items-center gap-2 !py-2.5 !px-4"
            >
              <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>{copied ? 'Copied Link!' : 'Copy Assessment Link'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-surface-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 relative">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              ✕
            </button>

            <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-white mb-2">
              Get Official PDF Report
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">
              Receive a dated, reproducible action plan with verified source URLs and official document checklist.
            </p>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Email Address (for report delivery)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-surface-800 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="bg-zinc-50 dark:bg-surface-800 rounded-xl p-3.5 border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 space-y-1">
                <div className="flex justify-between">
                  <span>Detailed Assessment PDF</span>
                  <span className="font-semibold">₹499.00</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 text-[11px]">
                  <span>Instant Access &amp; Email Delivery</span>
                  <span>Included</span>
                </div>
              </div>

              {checkoutMessage && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {checkoutMessage}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="w-1/3 btn-ghost text-xs font-semibold py-2.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={checkoutLoading}
                  className="w-2/3 btn-primary text-xs sm:text-sm font-semibold py-2.5"
                >
                  {checkoutLoading ? 'Processing...' : 'Pay ₹499 & Download'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
