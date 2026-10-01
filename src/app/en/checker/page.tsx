'use client';

import { useState } from 'react';
import DocumentDropzone from '@/components/DocumentDropzone';
import ScannerResultView from '@/components/ScannerResultView';
import PricingModal from '@/components/PricingModal';
import type { ScanResult } from '@/lib/types/scanner';

export default function CheckerPage() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-surface-950 pb-16">
      {/* Header */}
      <section className="bg-white dark:bg-surface-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-display font-black text-zinc-900 dark:text-white mb-3">
            Pet Document Verification &amp; Readiness Checker
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Upload your pet&apos;s vaccination records &amp; passport for instant statutory pet document verification and travel clearance.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {scanResult ? (
          <ScannerResultView
            result={scanResult}
            onReset={() => setScanResult(null)}
            onOpenPricing={(updated) => {
              if (updated) setScanResult(updated);
              setPricingOpen(true);
            }}
            onUpdateResult={(updated) => setScanResult(updated)}
          />
        ) : (
          <DocumentDropzone onScanComplete={(res) => setScanResult(res)} />
        )}
      </div>

      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
        scanResult={scanResult}
      />
    </div>
  );
}

