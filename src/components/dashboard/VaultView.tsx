'use client';

import React, { useState } from 'react';

interface VaultViewProps {
  trip: any;
  onTripUpdated: (updatedTrip: any) => void;
}

export default function VaultView({ trip, onTripUpdated }: VaultViewProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const storedDocs = (trip?.uploadedDocuments as any[]) || [];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setUploadMessage('Scanning uploaded certificate with OCR & AI...');

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const res = await fetch(`/api/trips/${trip.id}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload analysis failed');
      }

      const data = await res.json();
      if (data.trip) {
        onTripUpdated(data.trip);
        setUploadMessage('✓ Certificate verified! Checklist and milestones updated.');
        setTimeout(() => setUploadMessage(null), 4000);
      }
    } catch (err) {
      console.error('Error uploading to trip:', err);
      setUploadMessage('Error uploading document. Please ensure backend is active.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
          Document Intelligence &amp; Record Repository
        </span>
        <h2 className="font-display text-xl sm:text-2xl font-black text-zinc-900 mt-1">
          {trip?.petName}&apos;s Document Vault
        </h2>
        <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
          Secure storage for your pet&apos;s travel certificates. Upload newly issued paperwork at any point to automatically update compliance clearance.
        </p>
      </div>

      {/* ─── INCREMENTAL UPLOAD DROPZONE ───────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-emerald-300 hover:border-emerald-500 transition-colors text-center relative">
        <input
          type="file"
          id="vault-file-input"
          multiple
          onChange={handleFileUpload}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          accept=".pdf,.png,.jpg,.jpeg,.txt"
        />
        <div className="max-w-md mx-auto space-y-2 pointer-events-none">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 text-2xl flex items-center justify-center mx-auto mb-3">
            {isUploading ? '⏳' : '📤'}
          </div>
          <h3 className="font-display font-bold text-base text-zinc-900">
            {isUploading ? 'Analyzing New Document...' : 'Upload Newly Issued Vet Certificate'}
          </h3>
          <p className="text-xs text-zinc-500">
            Received your pre-flight tapeworm pill proof, updated rabies booster, or government endorsement? Drop it here to re-evaluate compliance.
          </p>
          <div className="pt-2">
            <span className="inline-block px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs">
              Select Document (PDF / Photo)
            </span>
          </div>
        </div>

        {uploadMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 inline-block animate-fade-in">
            {uploadMessage}
          </div>
        )}
      </div>

      {/* ─── STORED DOCUMENTS GALLERY ───────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-zinc-900">
            Verified Records on File ({storedDocs.length})
          </h3>
          <span className="text-xs text-zinc-400">All data encrypted &amp; verified</span>
        </div>

        {storedDocs.length === 0 ? (
          <div className="p-8 text-center text-zinc-400 text-xs">
            No primary records archived yet. Use the upload station above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {storedDocs.map((doc: any, idx: number) => (
              <div
                key={`vault-doc-${idx}`}
                className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-all flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                  📄
                </div>
                <div className="truncate space-y-0.5">
                  <strong className="block text-xs font-bold text-zinc-900 truncate">
                    {doc.filename}
                  </strong>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    {doc.detected_type || 'Verified Certificate'}
                  </span>
                  <p className="text-[11px] text-zinc-500 leading-snug truncate">
                    {doc.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
