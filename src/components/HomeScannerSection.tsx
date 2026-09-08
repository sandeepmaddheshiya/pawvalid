'use client';

import React, { useState } from 'react';
import DocumentDropzone from '@/components/DocumentDropzone';
import ScannerResultView from '@/components/ScannerResultView';
import PricingModal from '@/components/PricingModal';
import type { ScanResult } from '@/lib/types/scanner';

export default function HomeScannerSection() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  if (scanResult) {
    return (
      <div className="py-6">
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
      <DocumentDropzone onScanComplete={(res) => setScanResult(res)} />

      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
      />
    </div>
  );
}
