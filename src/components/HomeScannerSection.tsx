'use client';

import React, { useState } from 'react';
import DocumentDropzone from '@/components/DocumentDropzone';
import ScannerResultView from '@/components/ScannerResultView';
import PricingModal from '@/components/PricingModal';
import HeroTripForm from '@/components/HeroTripForm';
import type { ScanResult } from '@/lib/types/scanner';

export default function HomeScannerSection() {
  const [activeMode, setActiveMode] = useState<'DROPZONE' | 'MANUAL'>('DROPZONE');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  if (scanResult) {
    return (
      <div className="py-8">
        <ScannerResultView
          result={scanResult}
          onReset={() => setScanResult(null)}
          onOpenPricing={() => setPricingModalOpen(true)}
        />
        <PricingModal
          isOpen={pricingModalOpen}
          onClose={() => setPricingModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mode Switcher Pills */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 rounded-2xl bg-zinc-100 border border-zinc-200/80 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveMode('DROPZONE')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'DROPZONE'
                ? 'bg-white text-zinc-900 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <span>📄</span>
            <span>AI Document Dropzone (Instant)</span>
            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-full font-extrabold uppercase">
              Free
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('MANUAL')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'MANUAL'
                ? 'bg-white text-zinc-900 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <span>📝</span>
            <span>Manual Route Form</span>
          </button>
        </div>
      </div>

      {activeMode === 'DROPZONE' ? (
        <DocumentDropzone onScanComplete={(res) => setScanResult(res)} />
      ) : (
        <div className="flex justify-center">
          <HeroTripForm />
        </div>
      )}

      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
      />
    </div>
  );
}
