'use client';

import React, { useState } from 'react';

interface TimelineViewProps {
  trip: any;
  onTripUpdated?: (updatedTrip: any) => void;
}

export default function TimelineView({ trip, onTripUpdated }: TimelineViewProps) {
  const milestones = trip?.timelineMilestones || [];
  const stats = trip?.stats || {};
  const earliestDate = stats?.earliestFlightDate || trip?.earliestFlightDate || 'Calculated after prerequisites';
  const petName = trip?.petName || trip?.petProfile?.name || 'Your Pet';
  const origin = trip?.origin || trip?.route?.origin || 'United Kingdom';
  const destination = trip?.destination || trip?.route?.destination || 'Germany';
  const userEmail = trip?.userEmail || 'traveler@example.com';

  const [remindersEnabled, setRemindersEnabled] = useState(trip?.remindersEnabled ?? true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddToCalendar = () => {
    const departure = trip?.route?.departureDate || earliestDate;
    const title = encodeURIComponent(`${petName}'s Flight Departure to ${destination}`);
    const details = encodeURIComponent(
      `PawValid Travel Compliance Dossier Verified.\nEarliest Estimated Flight Date: ${earliestDate}\nRoute: ${origin} to ${destination}`
    );
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(googleCalUrl, '_blank');
  };

  const handleToggleReminders = async () => {
    const nextState = !remindersEnabled;
    setRemindersEnabled(nextState);
    setFeedbackMessage(null);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/trips/${trip.id}/reminders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remindersEnabled: nextState }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update preferences');
      setFeedbackMessage(
        nextState
          ? `Automatic pre-flight email reminders enabled for ${userEmail}.`
          : 'Pre-flight email reminders paused.'
      );
      if (onTripUpdated) {
        onTripUpdated({ ...trip, remindersEnabled: nextState });
      }
    } catch (err: any) {
      setRemindersEnabled(!nextState); // rollback
      setErrorMessage(err.message || 'Error updating reminder preferences');
    }
  };

  return (
    <div className="space-y-6 text-left max-w-6xl mx-auto font-sans animate-fade-in">
      {/* ─── 1. PAGE HEADER ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <span>Pet Travel Compliance</span>
            <span>/</span>
            <span className="font-medium text-zinc-800">Timeline &amp; Deadlines</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            {petName}&apos;s Travel Timeline &amp; Milestones
          </h1>
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
            Key deadlines, mandatory vaccination waiting periods, and clinical examination windows for{' '}
            <strong className="text-zinc-700">{origin} → {destination}</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCalendar}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap w-full sm:w-auto"
        >
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Add Departure to Calendar</span>
        </button>
      </div>

      {/* ─── 2. EXECUTIVE DEPARTURE CLEARANCE CARD ─────────────────── */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 p-4 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Earliest Eligible Departure Date
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 self-start sm:self-auto">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>Prerequisites Met for Travel Window</span>
          </span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              {earliestDate}
            </div>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed max-w-2xl">
              Calculated based on your verified microchip sequence, 21-day rabies vaccination waiting interval,
              and destination border entry regulations.
            </p>
          </div>
          <div className="text-xs font-mono text-zinc-400 shrink-0">
            Route: {origin} → {destination}
          </div>
        </div>
      </div>

      {/* ─── 3. PRE-FLIGHT NOTIFICATION PREFERENCES ────────────────── */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 p-4 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center text-xs">
                <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </span>
              <h2 className="text-base font-bold text-zinc-900">
                Automated Pre-Flight Email Reminders
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              {remindersEnabled ? (
                <>
                  Alerts are active. Milestone emails are delivered automatically to{' '}
                  <strong className="text-zinc-800 font-medium">{userEmail}</strong>.
                </>
              ) : (
                'Reminders are paused. Toggle on to receive automated deadline alerts.'
              )}
            </p>
          </div>

          {/* Toggle Control */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-semibold text-zinc-700">
              {remindersEnabled ? 'Alerts Enabled' : 'Alerts Disabled'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={remindersEnabled}
              onClick={handleToggleReminders}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                remindersEnabled ? 'bg-[#0FA958]' : 'bg-zinc-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  remindersEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Feedback messages */}
        {feedbackMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feedbackMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedbackMessage(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold ml-2 cursor-pointer text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-medium flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-red-700 hover:text-red-950 font-bold ml-2 cursor-pointer text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* 3 Scheduled Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Day -30 */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-opacity ${
            remindersEnabled ? 'bg-zinc-50/70 border-zinc-200/80' : 'bg-zinc-50/40 border-zinc-200/50 opacity-70'
          }`}>
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/60 font-semibold text-[10px] uppercase tracking-wider">
                  30 Days Out
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">1 Month</span>
              </div>
              <h3 className="text-sm font-bold text-zinc-900">
                Airline Booking &amp; Crate Prep
              </h3>
              <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                Reconfirm live-animal reservation with your carrier and verify IATA CR-82 crate dimensions and ventilation.
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between">
              {remindersEnabled ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  Automated delivery active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                  Paused
                </span>
              )}
            </div>
          </div>

          {/* Day -5 */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-opacity ${
            remindersEnabled ? 'bg-amber-50/40 border-amber-200/70' : 'bg-zinc-50/40 border-zinc-200/50 opacity-70'
          }`}>
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-900 border border-amber-200/80 font-semibold text-[10px] uppercase tracking-wider">
                  5 Days Out
                </span>
                <span className="text-[11px] text-amber-700 font-mono">24h–120h Window</span>
              </div>
              <h3 className="text-sm font-bold text-zinc-900">
                Tapeworm Treatment Window
              </h3>
              <p className="text-zinc-600 text-xs mt-1 leading-relaxed">
                Visit your veterinarian for mandatory Praziquantel administration within 1 to 5 days prior to arrival.
              </p>
            </div>

            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
              {remindersEnabled ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  Mandatory window alert
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                  Paused
                </span>
              )}
            </div>
          </div>

          {/* Day -2 */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-opacity ${
            remindersEnabled ? 'bg-zinc-50/70 border-zinc-200/80' : 'bg-zinc-50/40 border-zinc-200/50 opacity-70'
          }`}>
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-zinc-200/70 text-zinc-800 border border-zinc-300/60 font-semibold text-[10px] uppercase tracking-wider">
                  48 Hours Out
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">2 Days</span>
              </div>
              <h3 className="text-sm font-bold text-zinc-900">
                Health Certificate &amp; Travel Folder
              </h3>
              <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                Collect endorsed official veterinary health certificate and assemble carry-on waterproof documents.
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between">
              {remindersEnabled ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                  Final checklist delivery
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                  Paused
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. CHRONOLOGICAL MILESTONES LEDGER ────────────────────── */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 p-4 sm:p-7 shadow-2xs space-y-5">
        <div>
          <h2 className="text-base font-bold text-zinc-900">
            Journey Milestones &amp; Compliance History
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Audit trail of verified medical prerequisites, statutory latency periods, and upcoming border clearance steps.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200">
          {milestones.map((ms: any, idx: number) => {
            const isCompleted = ms.status === 'COMPLETED';
            const isGoal = ms.status === 'GOAL';

            return (
              <div key={`ms-${idx}`} className="relative">
                {/* Node Icon */}
                <span
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#0FA958] text-white ring-4 ring-emerald-50'
                      : isGoal
                      ? 'bg-[#0E2342] text-white ring-4 ring-blue-50'
                      : 'bg-white border-2 border-zinc-300 text-zinc-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : isGoal ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ) : (
                    <span className="text-[11px] font-semibold">{idx + 1}</span>
                  )}
                </span>

                {/* Milestone Card */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    isCompleted
                      ? 'bg-white border-zinc-200/90 shadow-2xs hover:border-zinc-300'
                      : isGoal
                      ? 'bg-blue-50/40 border-blue-200/80 shadow-2xs'
                      : 'bg-zinc-50/60 border-zinc-200/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-zinc-900">{ms.title}</strong>
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-semibold">
                          Verified
                        </span>
                      )}
                      {isGoal && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 text-[10px] font-semibold">
                          Departure Clearance
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs font-semibold text-zinc-500 tabular-nums">
                      {ms.date}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">{ms.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

