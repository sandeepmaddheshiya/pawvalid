'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar, { DashboardTab } from '@/components/dashboard/DashboardSidebar';
import DashboardMobileNav from '@/components/dashboard/DashboardMobileNav';
import OverviewView from '@/components/dashboard/OverviewView';
import TimelineView from '@/components/dashboard/TimelineView';
import ChecklistView from '@/components/dashboard/ChecklistView';
import VaultView from '@/components/dashboard/VaultView';
import VetSheetView from '@/components/dashboard/VetSheetView';
import CrateView from '@/components/dashboard/CrateView';
import ConciergeView from '@/components/dashboard/ConciergeView';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tripIdParam = searchParams.get('tripId');
  const tabParam = (searchParams.get('tab') as DashboardTab) || 'overview';

  const [activeTab, setActiveTab] = useState<DashboardTab>(tabParam);
  const [currentTrip, setCurrentTrip] = useState<any>(null);
  const [allTrips, setAllTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDownloadingDossier, setIsDownloadingDossier] = useState(false);

  // Load active trip
  useEffect(() => {
    async function loadTripData() {
      try {
        setLoading(true);

        // 1. Try local storage first for instant render
        const cachedTrip = localStorage.getItem('petvia_active_trip');
        let initialTrip = cachedTrip ? JSON.parse(cachedTrip) : null;

        // 2. Fetch from DB if tripId is provided
        if (tripIdParam) {
          const res = await fetch(`/api/trips/${tripIdParam}`);
          if (res.ok) {
            const data = await res.json();
            if (data.trip) {
              initialTrip = data.trip;
              localStorage.setItem('petvia_active_trip', JSON.stringify(data.trip));
            }
          }
        }

        if (initialTrip) {
          setCurrentTrip(initialTrip);

          // Fetch all trips for this user email
          if (initialTrip.userEmail) {
            const listRes = await fetch(`/api/trips?email=${encodeURIComponent(initialTrip.userEmail)}`);
            if (listRes.ok) {
              const listData = await listRes.json();
              if (listData.trips && listData.trips.length > 0) {
                setAllTrips(listData.trips);
              } else {
                setAllTrips([initialTrip]);
              }
            }
          } else {
            setAllTrips([initialTrip]);
          }
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadTripData();
  }, [tripIdParam]);

  // Keep activeTab synced with URL
  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`/dashboard?${params.toString()}`);
  };

  // Switch between pets / trips
  const handleSelectTrip = (tripId: string) => {
    const selected = allTrips.find((t) => t.id === tripId);
    if (selected) {
      setCurrentTrip(selected);
      localStorage.setItem('petvia_active_trip', JSON.stringify(selected));
      router.push(`/dashboard?tripId=${tripId}&tab=${activeTab}`);
    }
  };

  // Download PDF Dossier from dashboard
  const handleDownloadDossier = async () => {
    if (!currentTrip) return;
    try {
      setIsDownloadingDossier(true);
      const payload = {
        route: currentTrip.route,
        petProfile: currentTrip.petProfile,
        stats: currentTrip.stats,
        timelineMilestones: currentTrip.timelineMilestones,
        complianceChecklist: currentTrip.complianceChecklist,
        readinessReport: currentTrip.readinessReport,
      };

      const res = await fetch('/api/documents/dossier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Dossier download failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const petName = currentTrip.petName ? currentTrip.petName.replace(/[^a-zA-Z0-9]/g, '_') : 'Pet';
      a.download = `Petvia_Travel_Dossier_${petName}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading dossier:', err);
      alert('Unable to generate dossier. Please ensure the backend is running.');
    } finally {
      setIsDownloadingDossier(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-zinc-600">Loading your pet travel command center...</p>
        </div>
      </div>
    );
  }

  if (!currentTrip) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 text-center max-w-md shadow-sm space-y-4">
          <div className="text-3xl">🐾</div>
          <h2 className="font-display font-black text-xl text-zinc-900">No Saved Trip Found</h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            You haven&apos;t saved a pet journey yet. Run a free scan on our homepage to start tracking compliance!
          </p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Start Free Assessment →
          </button>
        </div>
      </div>
    );
  }

  const blockerCount = currentTrip.stats?.blockerSummary?.criticalBlockersCount || 0;
  const docsCount = (currentTrip.uploadedDocuments as any[])?.length || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Global Header */}
      <DashboardHeader
        trip={currentTrip}
        allTrips={allTrips}
        onSelectTrip={handleSelectTrip}
        onNewTrip={() => router.push('/')}
        onDownloadDossier={handleDownloadDossier}
        isDownloadingDossier={isDownloadingDossier}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 lg:pb-8">
        {/* Desktop Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          blockersCount={blockerCount}
          docsCount={docsCount}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewView
              trip={currentTrip}
              onNavigate={handleTabChange}
              onDownloadDossier={handleDownloadDossier}
              isDownloadingDossier={isDownloadingDossier}
            />
          )}

          {activeTab === 'timeline' && (
            <TimelineView
              trip={currentTrip}
              onTripUpdated={(updated) => {
                setCurrentTrip(updated);
                localStorage.setItem('petvia_active_trip', JSON.stringify(updated));
              }}
            />
          )}

          {activeTab === 'checklist' && (
            <ChecklistView trip={currentTrip} />
          )}

          {activeTab === 'vault' && (
            <VaultView
              trip={currentTrip}
              onTripUpdated={(updated) => {
                setCurrentTrip(updated);
                localStorage.setItem('petvia_active_trip', JSON.stringify(updated));
              }}
            />
          )}

          {activeTab === 'vetsheet' && (
            <VetSheetView trip={currentTrip} />
          )}

          {activeTab === 'crate' && (
            <CrateView trip={currentTrip} />
          )}

          {activeTab === 'concierge' && (
            <ConciergeView
              trip={currentTrip}
              onTripUpdated={(updated) => {
                setCurrentTrip(updated);
                localStorage.setItem('petvia_active_trip', JSON.stringify(updated));
              }}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Thumb Bar */}
      <DashboardMobileNav
        activeTab={activeTab}
        onSelectTab={handleTabChange}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
