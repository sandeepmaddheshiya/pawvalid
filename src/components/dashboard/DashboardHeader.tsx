'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '../Logo';

interface DashboardHeaderProps {
  trip?: any;
  userEmail?: string;
  allTrips: any[];
  onSelectTrip: (tripId: string) => void;
  onNewTrip: () => void;
  onDownloadDossier: () => void;
  isDownloadingDossier: boolean;
  onDeleteTrip?: (tripId: string) => void;
}

export default function DashboardHeader({
  trip,
  userEmail,
  allTrips,
  onSelectTrip,
  onNewTrip,
  onDownloadDossier,
  isDownloadingDossier,
  onDeleteTrip,
}: DashboardHeaderProps) {
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const petName = trip?.petName || 'My Pet';
  const origin = trip?.origin || 'Origin';
  const destination = trip?.destination || 'Destination';
  const displayEmail = userEmail || trip?.userEmail || 'traveler@pawvalid.online';
  const tier = trip?.tier || 'FREE';
  const isPaid = tier === 'CERTIFIED_PASS' || tier === 'CONCIERGE';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-2.5 sm:px-8 py-2 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 max-w-full overflow-x-clip">
      {/* Left: Brand & Trip Switcher */}
      <div className="flex items-center gap-1.5 sm:gap-4 min-w-0 flex-1">
        <div className="flex items-center gap-1.5 shrink-0">
          <Logo size="small" />
          <span className="hidden md:inline-block px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/80 text-[10px] font-bold uppercase tracking-wider">
            Portal
          </span>
        </div>

        {/* Pet & Trip Switcher Dropdown */}
        {trip ? (
          <div className="relative min-w-0 max-w-[115px] min-[360px]:max-w-[155px] min-[420px]:max-w-[200px] sm:max-w-none shrink">
            <button
              type="button"
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              className="w-full flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/90 text-xs font-semibold text-zinc-900 transition-all cursor-pointer shadow-2xs min-w-0"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-500 shrink-0 hidden min-[360px]:block" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 11c-2.4 0-4 1.8-4 3.5 0 2.2 2 3.5 4 3.5s4-1.3 4-3.5C16 12.8 14.4 11 12 11z" />
                <ellipse cx="6.5" cy="11.5" rx="1.8" ry="2.2" />
                <ellipse cx="9.2" cy="7" rx="1.8" ry="2.2" />
                <ellipse cx="14.8" cy="7" rx="1.8" ry="2.2" />
                <ellipse cx="17.5" cy="11.5" rx="1.8" ry="2.2" />
              </svg>
              <span className="font-bold text-zinc-900 min-w-0 truncate text-left">{petName}</span>
              <span className="hidden md:inline text-zinc-300 font-normal">|</span>
              <span className="hidden md:inline text-zinc-600 font-medium truncate">{origin} → {destination}</span>
              <svg
                className={`w-3 h-3 text-zinc-400 transition-transform shrink-0 ${isSwitcherOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isSwitcherOpen && (
              <>
                {/* Mobile Backdrop */}
                <div
                  className="fixed inset-0 z-40 bg-black/25 backdrop-blur-xs sm:hidden"
                  onClick={() => setIsSwitcherOpen(false)}
                />

                <div className="fixed inset-x-3 top-[54px] z-50 sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-2 sm:w-80 bg-white rounded-2xl shadow-xl border border-zinc-200 p-2 animate-fade-in max-w-[calc(100vw-1.5rem)]">
                  <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-1.5 flex items-center justify-between">
                    <span>Saved Trips ({allTrips.length})</span>
                    <button
                      type="button"
                      onClick={() => setIsSwitcherOpen(false)}
                      className="sm:hidden text-zinc-400 hover:text-zinc-600 p-1 -mr-1"
                      aria-label="Close"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {allTrips.map((t) => {
                      const isCurrent = t.id === trip?.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            onSelectTrip(t.id);
                            setIsSwitcherOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 sm:py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200'
                              : 'hover:bg-zinc-50 text-zinc-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                            <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 11c-2.4 0-4 1.8-4 3.5 0 2.2 2 3.5 4 3.5s4-1.3 4-3.5C16 12.8 14.4 11 12 11z" />
                              <ellipse cx="6.5" cy="11.5" rx="1.8" ry="2.2" />
                              <ellipse cx="9.2" cy="7" rx="1.8" ry="2.2" />
                              <ellipse cx="14.8" cy="7" rx="1.8" ry="2.2" />
                              <ellipse cx="17.5" cy="11.5" rx="1.8" ry="2.2" />
                            </svg>
                            <div className="min-w-0 flex-1">
                              <strong className="block text-zinc-900 truncate">{t.petName}</strong>
                              <span className="text-[11px] text-zinc-500 block truncate">{t.origin} → {t.destination}</span>
                            </div>
                          </div>
                          {isCurrent && <span className="text-emerald-600 font-bold text-xs shrink-0">Active</span>}
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t border-zinc-100 mt-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSwitcherOpen(false);
                        onNewTrip();
                      }}
                      className="w-full text-left px-3 py-2.5 sm:py-2 rounded-xl text-xs font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span>Add Another Pet / New Trip</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={onNewTrip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Check Pet Compliance</span>
          </button>
        )}
      </div>

      {/* Right: Actions & User Info */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Instant Dossier Download Button (only if trip exists) */}
        {trip && (
          <button
            type="button"
            disabled={isDownloadingDossier}
            onClick={onDownloadDossier}
            className={`inline-flex items-center justify-center gap-1 text-white font-semibold text-xs px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0 ${
              isPaid
                ? 'bg-[#0FA958] hover:bg-[#0D8E4A] ring-1 ring-[#0FA958]/30'
                : 'bg-zinc-800 hover:bg-zinc-900'
            }`}
            title={isPaid ? 'Download Certified Pet Travel Dossier (PDF)' : 'Download Free Preview Dossier (PDF)'}
          >
            {isDownloadingDossier ? (
              <svg className="w-3.5 h-3.5 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : isPaid ? (
              <svg className="w-3.5 h-3.5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-zinc-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            )}
            <span className="hidden lg:inline">
              {isDownloadingDossier
                ? (isPaid ? 'Generating Certified PDF...' : 'Generating Preview PDF...')
                : (isPaid ? 'Download Certified Dossier (PDF)' : 'Download Preview Dossier (PDF)')}
            </span>
            <span className="hidden md:inline lg:hidden">
              {isPaid ? 'Certified Dossier' : 'Preview Dossier'}
            </span>
            <span className="hidden sm:inline md:hidden">
              {isPaid ? 'Certified' : 'Preview'}
            </span>
            <span className="sm:hidden text-[10px] font-bold">
              {isDownloadingDossier ? 'PDF...' : 'PDF'}
            </span>
          </button>
        )}

        {/* Profile Avatar / Menu */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-1 sm:gap-2 p-0.5 sm:pl-1 sm:pr-2.5 sm:py-1 rounded-full border border-zinc-200/90 hover:border-zinc-300 bg-white hover:bg-zinc-50/80 transition-all cursor-pointer shadow-2xs group"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0E2342] text-white font-semibold text-[11px] sm:text-xs flex items-center justify-center tracking-tight shadow-xs shrink-0">
              {displayEmail.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-zinc-700 group-hover:text-zinc-900 max-w-[120px] truncate hidden md:inline">
              {displayEmail.split('@')[0]}
            </span>
            <svg
              className={`w-3 h-3 text-zinc-400 group-hover:text-zinc-600 transition-transform duration-200 hidden sm:inline ${
                isProfileOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isProfileOpen && (
            <>
              {/* Mobile Backdrop */}
              <div
                className="fixed inset-0 z-40 bg-black/25 backdrop-blur-xs sm:hidden"
                onClick={() => setIsProfileOpen(false)}
              />

              <div className="fixed inset-x-3 top-[54px] z-50 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72 bg-white rounded-2xl shadow-xl border border-zinc-200/90 p-1.5 animate-in fade-in zoom-in-95 duration-100 text-xs max-w-[calc(100vw-1.5rem)]">
                {/* Identity Header */}
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0E2342] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {displayEmail.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-zinc-900 truncate leading-tight">
                        {displayEmail}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200/80 truncate max-w-full">
                        {tier === 'CONCIERGE' ? '★ Priority Review' : tier === 'CERTIFIED_PASS' ? '✓ Travel Plan Active' : 'Readiness Member'}
                      </span>
                    </div>
                  </div>
                </div>

              {/* Menu items */}
              <div className="py-0.5 space-y-0.5">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors group"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span className="font-medium">Return to Home</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onNewTrip();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors group text-left cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="font-medium">New Trip Assessment</span>
                </button>

                {onDeleteTrip && trip?.id && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      if (confirm(`Remove ${trip.petName}'s journey from your dashboard?`)) {
                        onDeleteTrip(trip.id);
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-amber-700 hover:bg-amber-50 transition-colors group text-left cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    <span className="font-medium">Remove Current Journey</span>
                  </button>
                )}
              </div>

              <div className="border-t border-zinc-100 pt-1 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.removeItem('pawvalid_active_trip');
                      localStorage.removeItem('pawvalid_user_email');
                      localStorage.removeItem('petvia_active_trip');
                      localStorage.removeItem('petvia_user_email');
                    } catch {
                      // ignore
                    }
                    window.location.href = '/login';
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer group text-left"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-600 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <span className="font-semibold">Sign Out</span>
                </button>
              </div>
            </div>
          </>
        )}
        </div>
      </div>
    </header>
  );
}
