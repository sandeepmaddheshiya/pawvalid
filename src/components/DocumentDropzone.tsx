'use client';

import React, { useState, useRef } from 'react';
import type { ScanResult } from '@/lib/types/scanner';

interface DocumentDropzoneProps {
  onScanComplete: (result: ScanResult) => void;
}

interface UploadedItem {
  id: string;
  name: string;
  pages: number;
  size: string;
  status: 'verified' | 'analyzing' | 'ready';
  file?: File;
}

export default function DocumentDropzone({ onScanComplete }: DocumentDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedItems, setUploadedItems] = useState<UploadedItem[]>([
    { id: '1', name: 'pet_passport.pdf', pages: 4, size: '2.4 MB', status: 'verified' },
    { id: '2', name: 'rabies_cert.jpg', pages: 2, size: '1.1 MB', status: 'analyzing' },
    { id: '3', name: 'titer_report.pdf', pages: 2, size: '1.8 MB', status: 'verified' },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
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
      setErrorMessage('Some files were skipped. Supported formats: PDF, JPG, PNG, DOCX.');
    }

    const items: UploadedItem[] = filtered.map((f, idx) => ({
      id: `user-${Date.now()}-${idx}`,
      name: f.name,
      pages: Math.max(1, Math.ceil(f.size / (500 * 1024))),
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      status: 'ready',
      file: f,
    }));

    setFiles((prev) => [...prev, ...filtered]);
    setUploadedItems((prev) => [...items, ...prev].slice(0, 8));
  };

  const removeUploadedItem = (id: string) => {
    setUploadedItems((prev) => prev.filter((item) => item.id !== id));
    setFiles((prev) => prev.filter((_, idx) => `user-${idx}` !== id));
  };

  const handleScan = async () => {
    setScanning(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      if (files.length > 0) {
        files.forEach((file) => formData.append('files', file));
      } else {
        // Create mock payload if user tests without selecting new local files
        const dummy = new File(['mock content'], 'pet_passport.pdf', { type: 'application/pdf' });
        formData.append('files', dummy);
      }
      formData.append('origin_country', 'United Kingdom');
      formData.append('destination_country', 'Germany');

      const res = await fetch('/api/documents/scan', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data: ScanResult = await res.json();
      onScanComplete(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while scanning.';
      setErrorMessage(msg);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* Left Column: Copy & Checklist */}
      <div className="lg:col-span-6 space-y-5 text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider">
          DOCUMENT CHECKER
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0E2342] tracking-tight leading-tight">
          Upload Your Pet&apos;s Documents
        </h2>

        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-md">
          Get an instant check of your pet&apos;s travel requirements, with clear guidance on what&apos;s missing and what to do next.
        </p>

        {/* 3 Checkpoint Bullets with green checks */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-zinc-800">
            <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </span>
            <span>Pet passport &amp; vaccination records</span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-zinc-800">
            <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </span>
            <span>Titer test results &amp; health certificates</span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-zinc-800">
            <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </span>
            <span>Export permits &amp; other documents</span>
          </div>
        </div>

        {/* File Formats Supported */}
        <div className="pt-2 text-xs text-zinc-500 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
            PDF
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
            JPG
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
            PNG
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
            DOCX
          </span>
          <span className="text-[11px] text-zinc-400">
            • Up to 8 files • Max 15MB each
          </span>
        </div>

        <div className="pt-1">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E2342] hover:text-[#0FA958] transition-colors"
          >
            <span>How it works</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Right Column: Upload Card */}
      <div className="lg:col-span-6">
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sm:p-7 text-left">
          {/* Dropzone Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
              isDragging
                ? 'border-[#0FA958] bg-[#F4FBF7]'
                : 'border-zinc-200/90 hover:border-zinc-300 bg-zinc-50/40 hover:bg-zinc-50/80'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="w-10 h-10 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <p className="text-xs sm:text-[13px] font-medium text-zinc-700 mb-1">
              Drag &amp; drop your files here
            </p>
            <p className="text-[11px] text-zinc-400 mb-3">
              or click to browse
            </p>

            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold shadow-xs transition-colors pointer-events-none"
            >
              Choose Files
            </button>
          </div>

          {errorMessage && (
            <div className="mt-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Recent Uploads List */}
          <div className="mt-6 pt-4 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-zinc-900">
                Recent uploads
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {uploadedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-800 truncate max-w-[170px] sm:max-w-[220px]">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        {item.pages} pages •{' '}
                        {item.status === 'verified' && (
                          <span className="text-[#0FA958] font-medium">Verified</span>
                        )}
                        {item.status === 'analyzing' && (
                          <span className="text-teal-600 font-medium">Analyzing...</span>
                        )}
                        {item.status === 'ready' && (
                          <span className="text-blue-600 font-medium">Ready to scan</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === 'verified' && (
                      <span className="w-4 h-4 rounded-full bg-[#E8F8F0] text-[#0FA958] flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                    {item.status === 'analyzing' && (
                      <svg className="w-4 h-4 text-teal-600 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    )}
                    {item.status === 'ready' && (
                      <span className="text-[10px] text-zinc-400 font-medium">
                        {item.size}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeUploadedItem(item.id);
                      }}
                      className="text-zinc-400 hover:text-zinc-600 p-1 rounded"
                      title="Remove file"
                    >
                      ⋮
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button to run the scan */}
            <div className="mt-4 pt-2">
              <button
                type="button"
                onClick={handleScan}
                disabled={scanning}
                className="w-full flex items-center justify-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-xs shadow-xs active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {scanning ? (
                  <>
                    <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Analyzing Route Requirements...</span>
                  </>
                ) : (
                  <span>Verify Uploaded Documents →</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
