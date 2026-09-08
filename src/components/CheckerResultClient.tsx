'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScannerResultView from '@/components/ScannerResultView';
import PricingModal from '@/components/PricingModal';
import type { ScanResult } from '@/lib/types/scanner';

interface CheckerResultClientProps {
  initialResult: ScanResult;
  tripId: string;
  tier?: string;
}

export default function CheckerResultClient({
  initialResult,
  tripId,
  tier = 'FREE',
}: CheckerResultClientProps) {
  const router = useRouter();
  const [scanResult, setScanResult] = useState<ScanResult>(initialResult);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const handleReset = () => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const match = pathname.match(/^\/(en|de|fr|es)/);
    const locale = match ? match[1] : 'en';
    router.push(`/${locale}/checker`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScannerResultView
          result={scanResult}
          tripId={tripId}
          onReset={handleReset}
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
    </div>
  );
}
