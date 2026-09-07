'use client';

import React, { useState, useRef } from 'react';
import type { ScanResult } from '@/lib/types/scanner';

interface DocumentDropzoneProps {
  onScanComplete: (result: ScanResult) => void;
}

const SUPPORTED_COUNTRIES = [
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
];

export default function DocumentDropzone({ onScanComplete }: DocumentDropzoneProps) {
  const [originCountry, setOriginCountry] = useState('Australia');
  const [destinationCountry, setDestinationCountry] = useState('Austria');
  const [transitCountries, setTransitCountries] = useState<string[]>([]);
  const [showTransitInput, setShowTransitInput] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    setErrorMessage(null);
    const validExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp', 'txt'];
    const filtered = newFiles.filter((f) => {
      const ext = f.name.split('.').pop()?.toLowerCase() || '';
      return validExtensions.includes(ext);
    });

    if (filtered.length < newFiles.length) {
      setErrorMessage('Some files were skipped. Only PDF, Word, JPEG, PNG, and Text files are supported.');
    }

    setFiles((prev) => {
      const combined = [...prev, ...filtered];
      if (combined.length > 8) {
        setErrorMessage('Maximum 8 documents allowed per check. The first 8 were selected.');
        return combined.slice(0, 8);
      }
      return combined;
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTransitCountry = (countryName: string) => {
    setTransitCountries((prev) =>
      prev.includes(countryName) ? prev.filter((c) => c !== countryName) : [...prev, countryName]
    );
  };

  const handleScan = async () => {
    if (files.length === 0) {
      setErrorMessage('Please upload at least one document to scan.');
      return;
    }

    setScanning(true);
    setScanStep(1);
    setErrorMessage(null);

    const stepInterval = setInterval(() => {
      setScanStep((s) => (s < 3 ? s + 1 : s));
    }, 1800);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('origin_country', originCountry);
      formData.append('destination_country', destinationCountry);
      if (transitCountries.length > 0) {
        formData.append('transit_countries', transitCountries.join(','));
      }
      if (departureDate) {
        formData.append('departure_date', departureDate);
      }

      const res = await fetch('/api/documents/scan', {
        method: 'POST',
        body: formData,
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data: ScanResult = await res.json();
      onScanComplete(data);
    } catch (err: unknown) {
      clearInterval(stepInterval);
      const msg = err instanceof Error ? err.message : 'An error occurred while scanning.';
      setErrorMessage(msg);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-6 sm:p-10 relative overflow-hidden">
        {/* Top Trust Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold tracking-wider text-emerald-800 uppercase shadow-2xs">
            <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Official Government &amp; Airline Compliance Engine</span>
          </div>
        </div>

        {/* Big Bold Headline */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-black text-zinc-900 tracking-tight leading-[1.15]">
            Will Your Pet Clear Border Control?<br />
            <span className="text-emerald-600">Upload Paperwork</span> to Verify
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-lg mx-auto">
            Upload photos or PDFs of your rabies certificate, microchip registration, pet passport, or export permits. Petvia evaluates prerequisites and waiting periods against official border regulations for your exact route.
          </p>
        </div>

        {/* Route Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Origin */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
              Origin (Departure Country)
            </label>
            <div className="relative">
              <select
                value={originCountry}
                onChange={(e) => setOriginCountry(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-800 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={`orig-${c.code}`} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
              Destination (Arrival Country)
            </label>
            <div className="relative">
              <select
                value={destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-800 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={`dest-${c.code}`} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Transit Countries & Optional Departure Date Toggle */}
        <div className="mb-5 bg-zinc-50/80 p-3.5 rounded-2xl border border-zinc-100">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowTransitInput(!showTransitInput)}
              className="text-xs font-bold text-zinc-700 hover:text-emerald-700 flex items-center gap-1.5 cursor-pointer"
            >
              <span>✈️</span>
              <span>{showTransitInput ? 'Hide' : '+ Add'} Layover / Transit Countries or Planned Date</span>
            </button>
            {transitCountries.length > 0 && (
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {transitCountries.length} transit stop{transitCountries.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {showTransitInput && (
            <div className="mt-3 pt-3 border-t border-zinc-200/60 space-y-3 animate-fade-in">
              <div>
                <p className="text-[11px] text-zinc-500 mb-2">
                  Select any countries your pet will transit or have a layover in (transit quarantine / permits apply):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Singapore', 'Germany', 'United Kingdom', 'France', 'United States'].map((tName) => {
                    const selected = transitCountries.includes(tName);
                    return (
                      <button
                        key={tName}
                        type="button"
                        onClick={() => toggleTransitCountry(tName)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                          selected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '} {tName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Target Departure Date (Optional)
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
          )}
        </div>

        {/* Dropzone Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01]'
              : 'border-zinc-300 bg-[#FAFBFB] hover:bg-[#F3F8F5]'
          }`}
        >
          {/* Golden Passport Icon */}
          <div className="w-12 h-14 mx-auto mb-3 bg-[#FEF08A] border-2 border-[#EAB308] rounded-md shadow-sm flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
            <span className="text-xl">🪪</span>
          </div>

          <h3 className="font-display font-bold text-zinc-900 text-base sm:text-lg mb-1">
            Drop pet paperwork &amp; documents here
          </h3>
          <p className="text-xs text-zinc-500 mb-4">
            Supports PDF, Word, JPEG, PNG, Text · up to 8 documents per check
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.txt"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Choose files from device</span>
          </button>
        </div>

        {/* Uploaded Files Chips */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-zinc-700 flex justify-between items-center">
              <span>Attached Documents ({files.length}/8):</span>
              <button
                type="button"
                onClick={() => setFiles([])}
                className="text-[11px] text-red-600 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </p>
            <div className="flex flex-wrap gap-2">
              {files.map((file, idx) => (
                <div
                  key={`${file.name}-${idx}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs text-zinc-800"
                >
                  <span className="text-zinc-500">📄</span>
                  <span className="font-medium truncate max-w-[140px] sm:max-w-[200px]">{file.name}</span>
                  <span className="text-[10px] text-zinc-400">({(file.size / 1024).toFixed(0)} KB)</span>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-zinc-400 hover:text-red-500 ml-1 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Callout */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
            <span className="text-sm">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* One Pet at a Time helper notice */}
        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 bg-zinc-50/70 p-2.5 rounded-xl border border-zinc-100">
          <span>🐾</span>
          <span>
            <strong>One pet at a time</strong> — upload all documents for a single pet. Checking another? Run a separate scan.
          </span>
        </div>

        {/* Footer & Action Bar */}
        <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-zinc-400 leading-tight text-center sm:text-left">
            All files are parsed securely.<br />
            Deterministic prerequisite checks governed by Regulation (EU) 2026/131 &amp; USDA APHIS.
          </div>

          <button
            type="button"
            onClick={handleScan}
            disabled={scanning || files.length === 0}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all ${
              scanning
                ? 'bg-zinc-200 text-zinc-500 cursor-wait'
                : files.length > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98 cursor-pointer'
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200'
            }`}
          >
            {scanning ? (
              <>
                <svg className="animate-spin h-4 w-4 text-zinc-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>
                  {scanStep === 1 && 'Extracting document facts...'}
                  {scanStep === 2 && 'Evaluating prerequisite dependency graph...'}
                  {scanStep === 3 && 'Calculating earliest flight timeline...'}
                </span>
              </>
            ) : (
              <>
                <span>📑</span>
                <span>Check Travel Readiness — Free</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
