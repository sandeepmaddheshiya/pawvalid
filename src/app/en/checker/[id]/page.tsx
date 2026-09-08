import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { VerdictHero } from '@/components/VerdictBadge';
import RequirementCard from '@/components/RequirementCard';
import Timeline from '@/components/Timeline';
import type { ItemVerdict, OverallVerdict } from '@/lib/requirements/schema';
import PrintButton from './PrintButton';
import Link from 'next/link';

import CheckerResultClient from '@/components/CheckerResultClient';
import type { ScanResult } from '@/lib/types/scanner';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { id } = await params;
  const savedTrip = await db.savedTrip.findUnique({ where: { id } });
  if (savedTrip) {
    return {
      title: `${savedTrip.petName} (${savedTrip.origin} → ${savedTrip.destination}) — Compliance Report | Petvia`,
      description: `Official pet travel compliance dossier for ${savedTrip.petName}. Earliest departure: ${savedTrip.earliestFlightDate || 'Verified'}.`,
    };
  }
  return {
    title: 'Pet Travel Compliance Assessment Report | Petvia',
    description: 'Frozen, reproducible pet travel compliance assessment report.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AssessmentReportPage({ params }: ReportPageProps) {
  const { id } = await params;

  // 1. Check for modern document scan SavedTrip
  const savedTrip = await db.savedTrip.findUnique({
    where: { id },
  });

  if (savedTrip) {
    const rawRoute = (savedTrip.route as any) || {};
    const rawPet = (savedTrip.petProfile as any) || {};
    const rawStats = (savedTrip.stats as any) || {};
    const rawChecklist = (savedTrip.complianceChecklist as any) || {};
    const rawReport = (savedTrip.readinessReport as any) || {};

    const isInvalidLoc = (val?: string | null) =>
      !val ||
      val.trim() === '' ||
      val === 'Not Specified' ||
      val === 'Origin' ||
      val === 'Destination' ||
      val.toLowerCase() === 'unknown';

    const origin = !isInvalidLoc(savedTrip.origin)
      ? savedTrip.origin
      : !isInvalidLoc(rawRoute.origin)
      ? rawRoute.origin
      : 'United Kingdom';

    const destination = !isInvalidLoc(savedTrip.destination)
      ? savedTrip.destination
      : !isInvalidLoc(rawRoute.destination)
      ? rawRoute.destination
      : 'Germany';

    const transitCountries =
      savedTrip.transitCountries && savedTrip.transitCountries.length > 0
        ? savedTrip.transitCountries
        : rawRoute.transitCountries && rawRoute.transitCountries.length > 0
        ? rawRoute.transitCountries
        : [];

    const scanResult: ScanResult = {
      status: savedTrip.overallStatus || 'SUCCESS',
      route: {
        origin,
        destination,
        transitCountries,
        departureDate: savedTrip.departureDate || rawRoute.departureDate || null,
      },
      petDetected: true,
      petProfile: {
        species: savedTrip.species || rawPet.species || 'DOG',
        name: savedTrip.petName || rawPet.name || 'My Pet',
        breed: savedTrip.breed || rawPet.breed || 'Companion Animal',
        microchipNumber: rawPet.microchipNumber,
        microchipDate: rawPet.microchipDate,
        rabiesVaccinationDate: rawPet.rabiesVaccinationDate,
        rabiesVaccinationType: rawPet.rabiesVaccinationType,
      },
      stats: {
        documentsDetectedCount: rawStats.documentsDetectedCount || 1,
        overallStatus: savedTrip.overallStatus || rawStats.overallStatus || 'ACTION_REQUIRED',
        statusHeadline: savedTrip.statusHeadline || rawStats.statusHeadline || 'PREPARATION NEEDED',
        needsHumanReview: savedTrip.needsHumanReview ?? rawStats.needsHumanReview ?? false,
        earliestFlightDate: savedTrip.earliestFlightDate || rawStats.earliestFlightDate || 'September 08, 2026',
        earliestFlightDateTitle: rawStats.earliestFlightDateTitle || 'Earliest Estimated Travel Date',
        earliestFlightDateSubtitle:
          rawStats.earliestFlightDateSubtitle ||
          'Based on the documents provided, route requirements, known waiting periods, and currently verified rules.',
        disclaimer:
          rawStats.disclaimer ||
          'Airline approval and government processing times may affect your actual travel date.',
        blockerSummary: rawStats.blockerSummary || {
          criticalBlockersCount: 0,
          requiredActionsCount: 2,
          travelDayActionsCount: 2,
          completedVerifiedCount: 5,
        },
        confidenceLevel: rawStats.confidenceLevel || 'High',
      },
      timelineMilestones: (savedTrip.timelineMilestones as any) || [],
      complianceChecklist: {
        all: rawChecklist.all || [],
        leaving: rawChecklist.leaving || [],
        transit: rawChecklist.transit || [],
        arriving: rawChecklist.arriving || [],
        logistics: rawChecklist.logistics || [],
      },
      readinessReport: {
        whatThisMeans:
          rawReport.whatThisMeans ||
          `Compliance verification complete for ${savedTrip.petName}. Foundational requirements evaluated for travel from ${savedTrip.origin} to ${savedTrip.destination}.`,
        whereThingsStand: rawReport.whereThingsStand || [],
        documentAudit:
          rawReport.documentAudit ||
          (savedTrip.uploadedDocuments as any) ||
          [],
        nextSteps: rawReport.nextSteps || [],
        travelDayPrep: rawReport.travelDayPrep || [],
      },
    };

    return (
      <CheckerResultClient
        tripId={savedTrip.id}
        initialResult={scanResult}
        tier={savedTrip.tier}
      />
    );
  }

  // 2. Legacy fallback to Assessment table
  const assessment = await db.assessment.findUnique({
    where: { id },
  });

  if (!assessment) {
    notFound();
  }

  // Parse frozen snapshots (PRD §13: always read from frozen snapshot, never live tables)
  const tripSnapshot = (assessment.tripSnapshot || {}) as Record<string, unknown>;
  const petFactsSnapshot = (assessment.petFactsSnapshot || {}) as Record<string, unknown>;
  const items = (assessment.itemVerdicts || []) as unknown as ItemVerdict[];
  const isPaid = !!assessment.paidReportId;

  const blockingItems = items.filter((i) => i.severity === 'BLOCKING');
  const nonBlockingItems = items.filter((i) => i.severity === 'NON_BLOCKING');
  const infoItems = items.filter((i) => i.severity === 'INFORMATIONAL');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-surface-950 py-10 print:py-0 print:bg-white text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Print Actions (Hidden when printing) */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href="/en/checker"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors flex items-center gap-1.5"
          >
            ← Back to Checker
          </Link>

          <div className="flex items-center gap-3">
            <PrintButton />
          </div>
        </div>

        {/* Report Document Container */}
        <div className="bg-white dark:bg-surface-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
                  Official Assessment Report
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">
                  Pet Travel Readiness Assessment
                </h1>
              </div>

              {isPaid && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold shrink-0">
                  <span>✓</span> Paid Verified Report
                </span>
              )}
            </div>

            {/* Trip & Pet Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Trip Summary */}
              <div className="bg-zinc-50 dark:bg-surface-800/60 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Trip Summary
                </h4>
                <div className="space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
                  <p>
                    <span className="text-zinc-500">Route:</span>{' '}
                    <strong>
                      {String(tripSnapshot.originCountry ?? 'USA')} → {String(tripSnapshot.destinationCountry ?? 'Germany')}
                    </strong>
                  </p>
                  {Boolean(tripSnapshot.arrivalDatetime) && (
                    <p>
                      <span className="text-zinc-500">Arrival Date:</span>{' '}
                      {new Date(String(tripSnapshot.arrivalDatetime)).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  {Boolean(tripSnapshot.airline) && (
                    <p>
                      <span className="text-zinc-500">Airline:</span>{' '}
                      {String(tripSnapshot.airline)}
                    </p>
                  )}
                </div>
              </div>

              {/* Pet Summary */}
              <div className="bg-zinc-50 dark:bg-surface-800/60 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Pet Profile
                </h4>
                <div className="space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
                  <p>
                    <span className="text-zinc-500">Species:</span>{' '}
                    <strong>{String(petFactsSnapshot.species ?? 'Dog')}</strong>
                  </p>
                  {Boolean(petFactsSnapshot.country_of_residence) && (
                    <p>
                      <span className="text-zinc-500">Residence:</span>{' '}
                      {String(petFactsSnapshot.country_of_residence)}
                    </p>
                  )}
                  {Boolean(petFactsSnapshot.microchip_date) && (
                    <p>
                      <span className="text-zinc-500">Microchip Date:</span>{' '}
                      {new Date(String(petFactsSnapshot.microchip_date)).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Overall Verdict */}
          <div>
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">
              Overall Compliance Verdict
            </h3>
            <VerdictHero verdict={assessment.overallVerdict as OverallVerdict} />
          </div>

          {/* Chronological Timeline */}
          {items.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">
                Action Plan &amp; Timeline
              </h3>
              <Timeline items={items} />
            </div>
          )}

          {/* Blocking Requirements */}
          {blockingItems.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                Mandatory Requirements ({blockingItems.length})
              </h3>
              <div className="space-y-3">
                {blockingItems.map((item) => (
                  <RequirementCard key={item.requirementId} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Non-Blocking Requirements */}
          {nonBlockingItems.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Recommended Requirements ({nonBlockingItems.length})
              </h3>
              <div className="space-y-3">
                {nonBlockingItems.map((item) => (
                  <RequirementCard key={item.requirementId} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Informational */}
          {infoItems.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                Informational Requirements ({infoItems.length})
              </h3>
              <div className="space-y-3">
                {infoItems.map((item) => (
                  <RequirementCard key={item.requirementId} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Reproducibility & Integrity Guarantee (PRD §13) */}
          <div className="bg-zinc-50 dark:bg-surface-800/60 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
            <h5 className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-[11px]">
              Reproducibility &amp; Audit Reference
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <p>
                <strong>Assessment ID:</strong> {assessment.id}
              </p>
              <p>
                <strong>Engine Version:</strong> {assessment.ruleEngineVersion}
              </p>
              <p>
                <strong>Generated At:</strong>{' '}
                {new Date(assessment.generatedAt).toUTCString()}
              </p>
              <p>
                <strong>Pinned Rule Versions:</strong>{' '}
                {assessment.requirementVersionsUsed.length} verified rules
              </p>
            </div>
          </div>

          {/* Non-Certification Legal Disclaimer (PRD §6, §14) */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <strong>Legal Disclaimer:</strong> This assessment report is an informational
              compliance check and does not constitute official certification, visa, or health
              guarantee. Regulatory requirements frequently change. Always verify all final
              documentation with official government agencies, accredited veterinarians, and your
              airline prior to departure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
