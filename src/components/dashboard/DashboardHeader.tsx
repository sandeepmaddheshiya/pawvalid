'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
  const species = trip?.species === 'CAT' ? '🐱' : '🐶';
  const origin = trip?.origin || 'Origin';
  const destination = trip?.destination || 'Destination';
  const displayEmail = userEmail || trip?.userEmail || 'traveler@petvia.com';
  const tier = trip?.tier || 'FREE';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Brand & Trip Switcher */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
            P
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-display font-black text-lg text-zinc-900 tracking-tight">Petvia</span>
            <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/80 text-[10px] font-bold uppercase tracking-wider">
              Portal
            </span>
          </div>
        </Link>

        {/* Pet & Trip Switcher Dropdown */}
        {trip ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/90 text-xs font-semibold text-zinc-900 transition-all cursor-pointer shadow-2xs"
            >
              <span className="text-sm">{species}</span>
              <span className="font-bold text-zinc-900">{petName}</span>
              <span className="hidden md:inline text-zinc-300 font-normal">|</span>
              <span className="hidden md:inline text-zinc-600 font-medium">{origin} → {destination}</span>
              <span className="text-[9px] text-zinc-400 ml-1">▼</span>
            </button>

            {isSwitcherOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-zinc-200 p-2 z-50 animate-fade-in">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-1.5">
                  Saved Trips ({allTrips.length})
                </div>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {allTrips.map((t) => {
                    const isCurrent = t.id === trip?.id;
                    const petIcon = t.species === 'CAT' ? '🐱' : '🐶';
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          onSelectTrip(t.id);
                          setIsSwitcherOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200'
                            : 'hover:bg-zinc-50 text-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span>{petIcon}</span>
                          <div className="truncate">
                            <strong className="block text-zinc-900 truncate">{t.petName}</strong>
                            <span className="text-[11px] text-zinc-500">{t.origin} → {t.destination}</span>
                          </div>
                        </div>
                        {isCurrent && <span className="text-emerald-600 font-bold text-xs">Active</span>}
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
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>+</span>
                    <span>Add Another Pet / New Trip</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={onNewTrip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
          >
            <span>+</span>
            <span>Check Pet Compliance</span>
          </button>
        )}
      </div>

      {/* Right: Actions & User Info */}
      <div className="flex items-center gap-3">
        {/* Instant Dossier Download Button (only if trip exists) */}
        {trip && (
          <button
            type="button"
            disabled={isDownloadingDossier}
            onClick={onDownloadDossier}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-60 whitespace-nowrap"
          >
            <span>{isDownloadingDossier ? '⏳' : '📄'}</span>
            <span className="hidden sm:inline">
              {isDownloadingDossier ? 'Generating PDF...' : 'Download Dossier (PDF)'}
            </span>
            <span className="sm:hidden">Dossier</span>
          </button>
        )}

        {/* Profile Avatar / Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 flex items-center justify-center text-xs font-black text-zinc-700 cursor-pointer"
          >
            {displayEmail.charAt(0).toUpperCase()}
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-zinc-200 p-3 z-50 animate-fade-in text-xs">
              <div className="border-b border-zinc-100 pb-2 mb-2">
                <span className="text-[11px] text-zinc-400 block font-semibold">Signed in as</span>
                <strong className="text-zinc-900 block truncate">{displayEmail}</strong>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                  {tier === 'CONCIERGE' ? '★ Priority Expert Review' : tier === 'CERTIFIED_PASS' ? '✓ Complete Travel Plan' : 'Readiness Member'}
                </span>
              </div>
              <div className="space-y-1 text-zinc-600">
                <Link href="/" className="block px-2.5 py-1.5 rounded-lg hover:bg-zinc-50 hover:text-zinc-900">
                  Return to Home
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onNewTrip();
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer"
                >
                  New Trip Assessment
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
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-amber-700 hover:bg-amber-50 font-medium cursor-pointer transition-colors"
                  >
                    Remove Current Journey
                  </button>
                )}

                <div className="border-t border-zinc-100 my-1"></div>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.removeItem('petvia_active_trip');
                      localStorage.removeItem('petvia_user_email');
                    } catch {
                      // ignore
                    }
                    window.location.href = '/login';
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold cursor-pointer transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
