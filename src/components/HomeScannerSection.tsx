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
          onOpenPricing={(updated) => {
            if (updated) setScanResult(updated);
            setPricingModalOpen(true);
          }}
          onUpdateResult={(updated) => setScanResult(updated)}
        />
        <PricingModal
          isOpen={pricingModalOpen}
          onClose={() => setPricingModalOpen(false)}
          scanResult={scanResult}
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
            <span className="text-base">📄</span>
            <span>Automated Document Check</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
              Instant · Free
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
            <span className="text-base">📝</span>
            <span>Manual Route Check</span>
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
