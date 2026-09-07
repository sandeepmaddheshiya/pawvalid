import { db } from '@/lib/db';

export async function getOrCreateDemoTrip(
  email: string = 'traveler@example.com',
  preferredTier: 'FREE' | 'CERTIFIED_PASS' | 'CONCIERGE' = 'CERTIFIED_PASS'
) {
  const cleanEmail = email.toLowerCase().trim();

  // Check if trip already exists for this email
  const existingTrip = await db.savedTrip.findFirst({
    where: { userEmail: cleanEmail },
    orderBy: { createdAt: 'desc' },
  });

  if (existingTrip) {
    if (preferredTier !== 'FREE' && existingTrip.tier === 'FREE') {
      const updated = await db.savedTrip.update({
        where: { id: existingTrip.id },
        data: {
          tier: preferredTier,
          conciergeStatus: preferredTier === 'CONCIERGE' ? 'IN_REVIEW' : existingTrip.conciergeStatus,
        },
      });
      return updated;
    }
    return existingTrip;
  }

  // Generate a rich, fully populated sample trip
  const departureDate = new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const demoTrip = await db.savedTrip.create({
    data: {
      userEmail: cleanEmail,
      petName: 'Milo',
      species: 'DOG',
      breed: 'Golden Retriever',
      origin: 'United States (JFK)',
      destination: 'Germany (Frankfurt FRA)',
      transitCountries: [],
      departureDate,
      earliestFlightDate: departureDate,
      overallStatus: preferredTier === 'CONCIERGE' ? 'IN_REVIEW' : 'READY',
      statusHeadline: 'Milo is 100% compliant for entry into Germany via Frankfurt Airport',
      needsHumanReview: false,
      tier: preferredTier,
      whatsappNumber: '+44 7123 456789',
      conciergeStatus: preferredTier === 'CONCIERGE' ? 'IN_REVIEW' : 'NONE',
      conciergeNotes: 'Traveler requested review of rabies vaccination certificate and airline crate specs.',
      remindersEnabled: true,
      petProfile: {
        name: 'Milo',
        species: 'DOG',
        breed: 'Golden Retriever',
        ageMonths: 36,
        weightKg: 28.5,
        microchipNumber: '985141001234567',
        microchipDate: '2023-04-12',
        rabiesVaccineDate: '2024-05-10',
        rabiesVaccineType: 'BOOSTER',
        healthCertHeld: true,
      },
      route: {
        origin: 'United States',
        originCode: 'US',
        destination: 'Germany',
        destCode: 'DE',
        airline: 'Lufthansa',
        flightNumber: 'LH401',
        departureDate,
        transitCountries: [],
      },
      stats: {
        overallStatus: 'READY',
        statusHeadline: 'All EU Regulation 2026/131 requirements satisfied',
        earliestFlightDate: departureDate,
        blockerSummary: {
          criticalBlockersCount: 0,
          requiredActionsCount: 2,
          completedVerifiedCount: 2,
          warningsCount: 1,
        },
      },
      timelineMilestones: [
        {
          daysFromDeparture: -30,
          title: 'Confirm Airline Live-Animal Reservation',
          description: 'Lock in Lufthansa cargo hold pet reservation and verify IATA crate dimensions.',
          status: 'COMPLETED',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        {
          daysFromDeparture: -21,
          title: 'Rabies Booster Immunity Window',
          description: 'Rabies booster valid; 21-day incubation latency fulfilled.',
          status: 'COMPLETED',
          dueDate: '2024-05-31',
        },
        {
          daysFromDeparture: -5,
          title: 'Veterinary Tapeworm & Clinical Check',
          description: 'Visit USDA-accredited vet for final clinical inspection and internal parasite treatment.',
          status: 'UPCOMING',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        {
          daysFromDeparture: -2,
          title: 'Collect Endorsed Non-Commercial EU Health Certificate',
          description: 'Pick up official stamped EU certificate from USDA APHIS / official veterinary portal.',
          status: 'UPCOMING',
          dueDate: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      ],
      complianceChecklist: {
        microchip: { status: 'COMPLETED', label: '15-Digit ISO 11784/11785 Microchip', verified: true },
        rabies: { status: 'COMPLETED', label: 'Inactivated Rabies Booster', verified: true },
        healthCert: { status: 'IN_PROGRESS', label: 'EU Form Non-Commercial Health Cert', verified: false },
        tapeworm: { status: 'UPCOMING', label: 'Praziquantel Tapeworm Administration (Dogs only)', verified: false },
        crateSizing: { status: 'COMPLETED', label: 'IATA CR-82 Compliant Hard Kennel', verified: true },
      },
      readinessReport: {
        score: 95,
        summary: 'Milo meets all German MAFF and EU 2026/131 entry requirements.',
        documentAudit: [
          { name: 'ISO Microchip Implant Record', type: 'MICROCHIP', status: 'VERIFIED' },
          { name: 'Rabies Vaccination Certificate', type: 'RABIES', status: 'VERIFIED' },
          { name: 'EU Health Certificate Draft', type: 'HEALTH_CERT', status: 'PENDING_ENDORSEMENT' },
        ],
      },
      uploadedDocuments: [
        {
          id: 'doc_1',
          name: 'milo_microchip_cert.pdf',
          type: 'MICROCHIP',
          status: 'VERIFIED',
          uploadedAt: new Date().toISOString(),
        },
        {
          id: 'doc_2',
          name: 'rabies_vaccination_2024.pdf',
          type: 'RABIES',
          status: 'VERIFIED',
          uploadedAt: new Date().toISOString(),
        },
      ],
    },
  });

  return demoTrip;
}
