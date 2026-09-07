'use client';

import { useState, Suspense } from 'react';
import CheckerForm from '@/components/CheckerForm';
import AssessmentResult from '@/components/AssessmentResult';
import DocumentDropzone from '@/components/DocumentDropzone';
import ScannerResultView from '@/components/ScannerResultView';
import PricingModal from '@/components/PricingModal';
import type { CheckResponse } from '@/lib/validations';
import type { ItemVerdict, OverallVerdict } from '@/lib/requirements/schema';
import type { ScanResult } from '@/lib/types/scanner';

export default function CheckerPage() {
  const [activeMode, setActiveMode] = useState<'DROPZONE' | 'MANUAL'>('DROPZONE');
  const [formResult, setFormResult] = useState<CheckResponse | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-surface-950 pb-16">
      {/* Header */}
      <section className="bg-white dark:bg-surface-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-display font-black text-zinc-900 dark:text-white mb-3">
            Pet Travel Readiness &amp; Document Checker
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Upload your pet&apos;s vaccination records &amp; passport for instant AI border compliance verification, or complete the manual checklist.
          </p>

          {!formResult && !scanResult && (
            <div className="flex justify-center mt-6">
              <div className="inline-flex p-1 rounded-2xl bg-zinc-100 dark:bg-surface-800 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveMode('DROPZONE')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeMode === 'DROPZONE'
                      ? 'bg-white dark:bg-surface-900 text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span>📑</span>
                  <span>AI Document Dropzone</span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-full font-extrabold uppercase">
                    Recommended
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMode('MANUAL')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeMode === 'MANUAL'
                      ? 'bg-white dark:bg-surface-900 text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span>📝</span>
                  <span>Manual Form</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {scanResult ? (
          <ScannerResultView
            result={scanResult}
            onReset={() => setScanResult(null)}
            onOpenPricing={() => setPricingOpen(true)}
          />
        ) : formResult ? (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setFormResult(null)}
              className="btn-ghost text-sm mb-6 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>←</span>
              <span>Start New Check</span>
            </button>

            <AssessmentResult
              overallVerdict={formResult.overallVerdict as OverallVerdict}
              items={formResult.items as unknown as ItemVerdict[]}
              assessmentId={formResult.assessmentId}
            />
          </div>
        ) : activeMode === 'DROPZONE' ? (
          <DocumentDropzone onScanComplete={(res) => setScanResult(res)} />
        ) : (
          <div className="max-w-3xl mx-auto">
            <Suspense fallback={<div className="text-center py-12 text-zinc-500">Loading trip checker...</div>}>
              <CheckerForm onResult={setFormResult} />
            </Suspense>
          </div>
        )}
      </div>

      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />
    </div>
  );
}
