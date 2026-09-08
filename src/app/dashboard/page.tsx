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
import PassportView from '@/components/dashboard/PassportView';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tripIdParam = searchParams.get('tripId');
  const tabParam = (searchParams.get('tab') as DashboardTab) || 'overview';

  const [activeTab, setActiveTab] = useState<DashboardTab>(tabParam);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [currentTrip, setCurrentTrip] = useState<any>(null);
  const [allTrips, setAllTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDownloadingDossier, setIsDownloadingDossier] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);

  // Load active trip
  useEffect(() => {
    async function loadTripData() {
      try {
        setLoading(true);

        const cachedEmail = localStorage.getItem('petvia_user_email');
        const cachedTrip = localStorage.getItem('petvia_active_trip');
        let initialTrip = cachedTrip ? JSON.parse(cachedTrip) : null;

        const userEmail = cachedEmail || initialTrip?.userEmail || null;

        if (!userEmail && !tripIdParam) {
          router.replace('/login');
          return;
        }

        if (userEmail) {
          setCurrentUserEmail(userEmail);
        }

        // 1. Fetch specific trip if tripId is in URL
        if (tripIdParam) {
          const res = await fetch(`/api/trips/${tripIdParam}`);
          if (res.ok) {
            const data = await res.json();
            if (data.trip) {
              initialTrip = data.trip;
              localStorage.setItem('petvia_active_trip', JSON.stringify(data.trip));
              if (data.trip.userEmail) {
                setCurrentUserEmail(data.trip.userEmail);
                localStorage.setItem('petvia_user_email', data.trip.userEmail);
              }
            }
          }
        }

        // 2. Fetch all trips for this user
        const targetEmail = userEmail || initialTrip?.userEmail;
        if (targetEmail) {
          const listRes = await fetch(`/api/trips?email=${encodeURIComponent(targetEmail)}`);
          if (listRes.ok) {
            const listData = await listRes.json();
            const trips = listData.trips || [];
            setAllTrips(trips);

            if (trips.length > 0) {
              const matched = tripIdParam
                ? trips.find((t: any) => t.id === tripIdParam) || trips[0]
                : (initialTrip && trips.some((t: any) => t.id === initialTrip.id) ? initialTrip : trips[0]);
              setCurrentTrip(matched);
              localStorage.setItem('petvia_active_trip', JSON.stringify(matched));
            } else {
              // Brand new user with no trips created yet
              setCurrentTrip(null);
              localStorage.removeItem('petvia_active_trip');
              if (tripIdParam) {
                router.replace('/dashboard');
              }
            }
          }
        } else if (initialTrip) {
          setCurrentTrip(initialTrip);
          setAllTrips([initialTrip]);
        } else {
          router.replace('/login');
          return;
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadTripData();
  }, [tripIdParam, router]);

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

  // Delete trip
  const handleDeleteTrip = async (tripId: string) => {
    try {
      const res = await fetch(`/api/trips/${tripId}`, { method: 'DELETE' });
      if (res.ok) {
        const remaining = allTrips.filter((t) => t.id !== tripId);
        setAllTrips(remaining);
        if (remaining.length > 0) {
          setCurrentTrip(remaining[0]);
          localStorage.setItem('petvia_active_trip', JSON.stringify(remaining[0]));
          router.push(`/dashboard?tripId=${remaining[0].id}`);
        } else {
          setCurrentTrip(null);
          localStorage.removeItem('petvia_active_trip');
          router.push('/dashboard');
        }
      }
    } catch (err) {
      console.error('Error deleting trip:', err);
    }
  };

  // Load sample demo trip on demand
  const handleLoadDemoTrip = async () => {
    try {
      setLoadingDemo(true);
      const email = currentUserEmail || localStorage.getItem('petvia_user_email') || 'traveler@example.com';
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.trip) {
        setCurrentTrip(data.trip);
        setAllTrips([data.trip]);
        localStorage.setItem('petvia_active_trip', JSON.stringify(data.trip));
        router.push(`/dashboard?tripId=${data.trip.id}`);
      }
    } catch (err) {
      console.error('Error loading sample demo trip:', err);
    } finally {
      setLoadingDemo(false);
    }
  };

  // Download PDF Dossier from dashboard
  const handleDownloadDossier = async () => {
    if (!currentTrip) return;
    try {
      setIsDownloadingDossier(true);
      const activeOrigin =
        currentTrip.route?.origin &&
        currentTrip.route.origin !== 'Not Specified' &&
        currentTrip.route.origin !== 'Origin'
          ? currentTrip.route.origin
          : currentTrip.origin &&
            currentTrip.origin !== 'Not Specified' &&
            currentTrip.origin !== 'Origin'
          ? currentTrip.origin
          : 'United Kingdom';

      const activeDestination =
        currentTrip.route?.destination &&
        currentTrip.route.destination !== 'Not Specified' &&
        currentTrip.route.destination !== 'Destination'
          ? currentTrip.route.destination
          : currentTrip.destination &&
            currentTrip.destination !== 'Not Specified' &&
            currentTrip.destination !== 'Destination'
          ? currentTrip.destination
          : 'Germany';

      const activeTransits =
        currentTrip.route?.transitCountries && currentTrip.route.transitCountries.length > 0
          ? currentTrip.route.transitCountries
          : currentTrip.transitCountries && currentTrip.transitCountries.length > 0
          ? currentTrip.transitCountries
          : [];

      const activeDepartureDate =
        currentTrip.route?.departureDate || currentTrip.departureDate || null;

      const payload = {
        route: {
          origin: activeOrigin,
          destination: activeDestination,
          transitCountries: activeTransits,
          departureDate: activeDepartureDate,
        },
        trip: {
          id: currentTrip.id,
          petName: currentTrip.petName,
          species: currentTrip.species,
          breed: currentTrip.breed,
          origin: activeOrigin,
          destination: activeDestination,
          transitCountries: activeTransits,
          departureDate: activeDepartureDate,
          earliestFlightDate: currentTrip.earliestFlightDate || currentTrip.stats?.earliestFlightDate || 'Verified',
          overallStatus: currentTrip.overallStatus || currentTrip.stats?.overallStatus || 'ACTION_REQUIRED',
          statusHeadline: currentTrip.statusHeadline || currentTrip.stats?.statusHeadline || 'Compliance Clearance',
        },
        petProfile: {
          ...currentTrip.petProfile,
          name: currentTrip.petName || currentTrip.petProfile?.name,
          species: currentTrip.species || currentTrip.petProfile?.species,
          breed: currentTrip.breed || currentTrip.petProfile?.breed,
        },
        stats: currentTrip.stats || {},
        timelineMilestones: currentTrip.timelineMilestones || [],
        complianceChecklist: currentTrip.complianceChecklist || {},
        readinessReport: currentTrip.readinessReport || {},
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

  // User logged in but has no saved trips yet (clean empty state)
  if (!currentTrip && currentUserEmail) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <DashboardHeader
          trip={null}
          userEmail={currentUserEmail}
          allTrips={[]}
          onSelectTrip={() => {}}
          onNewTrip={() => router.push('/en/checker')}
          onDownloadDossier={() => {}}
          isDownloadingDossier={false}
        />

        <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-12 max-w-5xl mx-auto w-full flex flex-col justify-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200/90 shadow-sm text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-3xl flex items-center justify-center mx-auto shadow-2xs">
              🐾
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                Account Active · No Saved Journeys
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 tracking-tight">
                Welcome to your Pet Travel Command Center
              </h1>
              <p className="text-sm text-zinc-600 leading-relaxed">
                You haven&apos;t run a pet travel compliance check yet.
                Start a readiness assessment for your upcoming flight to verify mandatory rabies timelines, microchip standards, and download your official dossier.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push('/en/checker')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0E1B33] hover:bg-[#16274a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                + Check Pet Travel Compliance Now →
              </button>
              <button
                type="button"
                disabled={loadingDemo}
                onClick={handleLoadDemoTrip}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold text-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {loadingDemo ? 'Loading Sample...' : '📋 Explore Sample Journey (Milo · US → Germany)'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left pt-6 border-t border-zinc-100">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                <div className="text-xl">⏱️</div>
                <h4 className="font-bold text-xs text-zinc-900">Live Deadlines</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  21-day rabies latency &amp; 120h tapeworm administration windows.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                <div className="text-xl">⚖️</div>
                <h4 className="font-bold text-xs text-zinc-900">Statute Checklists</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Verified EU 2026/131, USDA APHIS &amp; DEFRA requirements.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                <div className="text-xl">📁</div>
                <h4 className="font-bold text-xs text-zinc-900">Document Vault</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Upload certificates for OCR and veterinary validation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                <div className="text-xl">✈️</div>
                <h4 className="font-bold text-xs text-zinc-900">Crate Sizing</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  IATA CR-82 compliant carrier calculator for cargo and cabin.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Not logged in at all
  if (!currentTrip) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 text-center max-w-md shadow-sm space-y-4">
          <div className="text-3xl">🔒</div>
          <h2 className="font-display font-black text-xl text-zinc-900">Sign In Required</h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Please log in to access your pet travel command center.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="px-6 py-2.5 rounded-xl bg-[#0E1B33] hover:bg-[#16274a] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              Sign In to View Dashboard →
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-6 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-bold text-xs transition-all cursor-pointer"
            >
              Back to Homepage
            </button>
          </div>
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
        userEmail={currentUserEmail || undefined}
        allTrips={allTrips}
        onSelectTrip={handleSelectTrip}
        onNewTrip={() => router.push('/en/checker')}
        onDownloadDossier={handleDownloadDossier}
        isDownloadingDossier={isDownloadingDossier}
        onDeleteTrip={handleDeleteTrip}
      />

      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          blockersCount={blockerCount}
          docsCount={docsCount}
          tier={currentTrip.tier}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {activeTab === 'overview' && (
              <OverviewView
                trip={currentTrip}
                onNavigate={handleTabChange}
                onDownloadDossier={handleDownloadDossier}
                isDownloadingDossier={isDownloadingDossier}
              />
            )}

            {activeTab === 'passport' && (
              <PassportView
                trip={currentTrip}
                userEmail={currentUserEmail || currentTrip.userEmail}
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
                onDownloadDossier={handleDownloadDossier}
                isDownloadingDossier={isDownloadingDossier}
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
          </div>
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
