'use client';

import React, { useState } from 'react';

interface TimelineViewProps {
  trip: any;
  onTripUpdated?: (updatedTrip: any) => void;
}

export default function TimelineView({ trip, onTripUpdated }: TimelineViewProps) {
  const milestones = trip?.timelineMilestones || [];
  const stats = trip?.stats || {};
  const earliestDate = stats?.earliestFlightDate || 'Calculated after prerequisites';

  const [remindersEnabled, setRemindersEnabled] = useState(trip?.remindersEnabled ?? true);
  const [activeSendingType, setActiveSendingType] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddToCalendar = () => {
    const petName = trip?.petName || 'Pet';
    const departure = trip?.route?.departureDate || earliestDate;
    const title = encodeURIComponent(`${petName}'s Flight Departure to ${trip?.destination}`);
    const details = encodeURIComponent(
      `Petvia Compliance Dossier Verified.\nEarliest Estimated Flight Date: ${earliestDate}\nDestination: ${trip?.destination}`
    );
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(googleCalUrl, '_blank');
  };

  const handleToggleReminders = async () => {
    const nextState = !remindersEnabled;
    setRemindersEnabled(nextState);
    try {
      const res = await fetch(`/api/trips/${trip.id}/reminders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remindersEnabled: nextState }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update preferences');
      if (onTripUpdated) {
        onTripUpdated({ ...trip, remindersEnabled: nextState });
      }
    } catch (err: any) {
      setRemindersEnabled(!nextState); // rollback
      setErrorMessage(err.message || 'Error updating reminder preferences');
    }
  };

  const handleSendTestReminder = async (type: 'DAY_30' | 'DAY_5' | 'DAY_2') => {
    setActiveSendingType(type);
    setFeedbackMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/trips/${trip.id}/reminders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch reminder');
      }

      const typeLabel = type === 'DAY_30' ? 'Day -30 (Airline/Crate)' : type === 'DAY_5' ? 'Day -5 (Tapeworm)' : 'Day -2 (Endorsement/Folder)';
      setFeedbackMessage(`✓ Test reminder for ${typeLabel} dispatched to ${trip.userEmail}!`);
      if (onTripUpdated) {
        onTripUpdated({
          ...trip,
          lastReminderSent: `${type}_${new Date().toISOString()}`,
        });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error sending test reminder email');
    } finally {
      setActiveSendingType(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
            Milestone Timeline &amp; Pre-Flight Windows
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-black text-zinc-900 mt-1">
            Chronological Journey Roadmap
          </h2>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
            Strict dependency chain ensuring every prerequisite (microchip, vaccine wait periods, tapeworm windows) is satisfied in statutory order.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCalendar}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap"
        >
          <span>📅</span>
          <span>Add Departure to Calendar</span>
        </button>
      </div>

      {/* Hero Clearance Banner */}
      <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Official Travel Clearance Date
          </span>
          <div className="font-display text-lg sm:text-xl font-black text-emerald-950 mt-0.5">
            ✈️ Earliest Estimated Travel Date: {earliestDate}
          </div>
          <p className="text-xs text-emerald-800/90 mt-1">
            Based on the documents provided, route requirements, known waiting periods, and currently verified rules.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 shrink-0">
          ✓ Prerequisites In Progress
        </span>
      </div>

      {/* ─── NEW: AUTOMATED PRE-FLIGHT EMAIL REMINDERS (RESEND) ───────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">🔔</span>
              <h3 className="font-display font-black text-lg text-zinc-900">
                Automated Pre-Flight Email Reminders
              </h3>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Powered by Resend. Automated regulatory alerts delivered directly to{' '}
              <strong className="text-zinc-800 font-mono">{trip.userEmail}</strong>.
            </p>
          </div>

          {/* Toggle Control */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-zinc-600">
              {remindersEnabled ? 'Reminders Active' : 'Reminders Paused'}
            </span>
            <button
              type="button"
              onClick={handleToggleReminders}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                remindersEnabled ? 'bg-emerald-600' : 'bg-zinc-200'
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
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between">
            <span>{feedbackMessage}</span>
            <button
              type="button"
              onClick={() => setFeedbackMessage(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-semibold flex items-center justify-between">
            <span>⚠️ {errorMessage}</span>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-red-700 hover:text-red-950 font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* 3 Scheduled Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Day -30 */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-bold text-[10px] uppercase">
                  Day -30
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">1 Month Out</span>
              </div>
              <strong className="block text-zinc-900 font-bold text-sm">
                Airline Booking &amp; CR-82 Crate
              </strong>
              <p className="text-zinc-500 text-[11px] mt-1 leading-relaxed">
                Live-animal hold reservation confirmation, crate headroom calculations, and metal fastener audit.
              </p>
            </div>

            <button
              type="button"
              disabled={activeSendingType === 'DAY_30'}
              onClick={() => handleSendTestReminder('DAY_30')}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 font-bold text-[11px] transition-all cursor-pointer disabled:opacity-50 text-center"
            >
              {activeSendingType === 'DAY_30' ? 'Sending...' : '✉️ Send Test Day -30 Email'}
            </button>
          </div>

          {/* Day -5 */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">
                  Day -5
                </span>
                <span className="text-[10px] text-amber-700 font-mono">Mandatory Window</span>
              </div>
              <strong className="block text-zinc-900 font-bold text-sm">
                Tapeworm Administration
              </strong>
              <p className="text-zinc-500 text-[11px] mt-1 leading-relaxed">
                Strict 24h&ndash;120h Praziquantel treatment window alert with clinic instruction sheet.
              </p>
            </div>

            <button
              type="button"
              disabled={activeSendingType === 'DAY_5'}
              onClick={() => handleSendTestReminder('DAY_5')}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-100/50 border border-amber-300 text-amber-900 font-bold text-[11px] transition-all cursor-pointer disabled:opacity-50 text-center"
            >
              {activeSendingType === 'DAY_5' ? 'Sending...' : '✉️ Send Test Day -5 Email'}
            </button>
          </div>

          {/* Day -2 */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[10px] uppercase">
                  Day -2
                </span>
                <span className="text-[10px] text-emerald-700 font-mono">48 Hours Out</span>
              </div>
              <strong className="block text-zinc-900 font-bold text-sm">
                Endorsement &amp; Travel Folder
              </strong>
              <p className="text-zinc-500 text-[11px] mt-1 leading-relaxed">
                Collect physical USDA/DEFRA health certificate endorsement and assemble carry-on document binder.
              </p>
            </div>

            <button
              type="button"
              disabled={activeSendingType === 'DAY_2'}
              onClick={() => handleSendTestReminder('DAY_2')}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-100/50 border border-emerald-300 text-emerald-900 font-bold text-[11px] transition-all cursor-pointer disabled:opacity-50 text-center"
            >
              {activeSendingType === 'DAY_2' ? 'Sending...' : '✉️ Send Test Day -2 Email'}
            </button>
          </div>
        </div>

        {trip.lastReminderSent && (
          <p className="text-[10px] text-zinc-400 font-mono">
            Last reminder activity: {trip.lastReminderSent}
          </p>
        )}
      </div>

      {/* Chronological Step List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-zinc-900">Pre-Flight Regulatory Milestones</h3>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200">
          {milestones.map((ms: any, idx: number) => {
            const isCompleted = ms.status === 'COMPLETED';
            const isGoal = ms.status === 'GOAL';

            return (
              <div key={`ms-${idx}`} className="relative group">
                {/* Node Icon */}
                <span
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-2xs'
                      : isGoal
                      ? 'bg-amber-400 border-amber-500 text-zinc-950 shadow-2xs'
                      : 'bg-white border-zinc-300 text-zinc-400'
                  }`}
                >
                  {isCompleted ? '✓' : isGoal ? '🏁' : idx + 1}
                </span>

                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-emerald-50/40 border-emerald-200/70 text-emerald-950'
                      : isGoal
                      ? 'bg-amber-50/50 border-amber-300/80 text-zinc-900'
                      : 'bg-zinc-50/70 border-zinc-200/80 text-zinc-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <strong className="text-sm font-bold block text-zinc-900">{ms.title}</strong>
                    <span className="font-mono text-xs font-bold text-zinc-500">{ms.date}</span>
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
