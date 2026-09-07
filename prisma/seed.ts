/**
 * Database Seed Script
 *
 * Seeds the 5 MVP routes (PRD §9) and creates a fully-populated
 * USA → Germany dog route as the reference "SUPPORTED" route.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // ─── Countries ───────────────────────────────────────────────────────────────
  const countries = await Promise.all([
    prisma.country.upsert({ where: { isoCode: 'US' }, update: {}, create: { isoCode: 'US', name: 'United States' } }),
    prisma.country.upsert({ where: { isoCode: 'DE' }, update: {}, create: { isoCode: 'DE', name: 'Germany' } }),
    prisma.country.upsert({ where: { isoCode: 'GB' }, update: {}, create: { isoCode: 'GB', name: 'United Kingdom' } }),
    prisma.country.upsert({ where: { isoCode: 'AU' }, update: {}, create: { isoCode: 'AU', name: 'Australia' } }),
    prisma.country.upsert({ where: { isoCode: 'CA' }, update: {}, create: { isoCode: 'CA', name: 'Canada' } }),
    prisma.country.upsert({ where: { isoCode: 'JP' }, update: {}, create: { isoCode: 'JP', name: 'Japan' } }),
  ]);
  console.log(`✅ ${countries.length} countries seeded`);

  const [us, de, gb, au, ca, jp] = countries;

  // ─── Airlines ────────────────────────────────────────────────────────────────
  const airlines = await Promise.all([
    prisma.airline.upsert({ where: { slug: 'lufthansa' }, update: {}, create: { slug: 'lufthansa', name: 'Lufthansa', petPolicyUrl: 'https://www.lufthansa.com/us/en/travelling-with-animals' } }),
    prisma.airline.upsert({ where: { slug: 'british-airways' }, update: {}, create: { slug: 'british-airways', name: 'British Airways', petPolicyUrl: 'https://www.britishairways.com/en-gb/information/travel-assistance/travelling-with-pets' } }),
    prisma.airline.upsert({ where: { slug: 'united-airlines' }, update: {}, create: { slug: 'united-airlines', name: 'United Airlines', petPolicyUrl: 'https://www.united.com/en/us/fly/travel/animals.html' } }),
    prisma.airline.upsert({ where: { slug: 'qantas' }, update: {}, create: { slug: 'qantas', name: 'Qantas', petPolicyUrl: 'https://www.qantas.com/au/en/travel-info/luggage/travelling-with-pets.html' } }),
    prisma.airline.upsert({ where: { slug: 'air-canada' }, update: {}, create: { slug: 'air-canada', name: 'Air Canada', petPolicyUrl: 'https://www.aircanada.com/ca/en/aco/home/plan/special-assistance/travelling-with-pets.html' } }),
    prisma.airline.upsert({ where: { slug: 'ana' }, update: {}, create: { slug: 'ana', name: 'ANA (All Nippon Airways)', petPolicyUrl: 'https://www.ana.co.jp/en/us/serviceinfo/domestic/support/pets/' } }),
    prisma.airline.upsert({ where: { slug: 'delta' }, update: {}, create: { slug: 'delta', name: 'Delta Air Lines', petPolicyUrl: 'https://www.delta.com/us/en/pet-travel/overview' } }),
    prisma.airline.upsert({ where: { slug: 'american-airlines' }, update: {}, create: { slug: 'american-airlines', name: 'American Airlines', petPolicyUrl: 'https://www.aa.com/i18n/travel-info/special-assistance/pets.jsp' } }),
  ]);
  console.log(`✅ ${airlines.length} airlines seeded`);

  // ─── Routes (PRD §9 Matrix) ──────────────────────────────────────────────────
  const routes = await Promise.all([
    prisma.route.upsert({
      where: { slug: 'usa-to-germany' },
      update: { status: 'SUPPORTED' },
      create: { slug: 'usa-to-germany', originCountryId: us.id, destinationCountryId: de.id, status: 'SUPPORTED' },
    }),
    prisma.route.upsert({
      where: { slug: 'usa-to-uk' },
      update: {},
      create: { slug: 'usa-to-uk', originCountryId: us.id, destinationCountryId: gb.id, status: 'NOT_STARTED' },
    }),
    prisma.route.upsert({
      where: { slug: 'usa-to-australia' },
      update: {},
      create: { slug: 'usa-to-australia', originCountryId: us.id, destinationCountryId: au.id, status: 'NOT_STARTED' },
    }),
    prisma.route.upsert({
      where: { slug: 'usa-to-canada' },
      update: {},
      create: { slug: 'usa-to-canada', originCountryId: us.id, destinationCountryId: ca.id, status: 'NOT_STARTED' },
    }),
    prisma.route.upsert({
      where: { slug: 'usa-to-japan' },
      update: {},
      create: { slug: 'usa-to-japan', originCountryId: us.id, destinationCountryId: jp.id, status: 'NOT_STARTED' },
    }),
  ]);
  console.log(`✅ ${routes.length} routes seeded`);

  const usaToGermany = routes[0];

  // ─── Source & Requirements for USA → Germany (Dog) ───────────────────────────
  const germanySource = await prisma.requirementSource.create({
    data: {
      url: 'https://www.bmel.de/EN/topics/animals/animal-welfare/pets-entry-requirements.html',
      publisher: 'German Federal Ministry of Food and Agriculture (BMEL)',
      authorityTier: 1,
    },
  });

  const euRegulationSource = await prisma.requirementSource.create({
    data: {
      url: 'https://food.ec.europa.eu/animals/movement-pets/eu-legislation_en',
      publisher: 'European Commission — Movement of Pets',
      authorityTier: 1,
    },
  });

  const sourceVersion1 = await prisma.sourceVersion.create({
    data: {
      sourceId: germanySource.id,
      retrievedAt: new Date('2026-09-01'),
      contentHash: 'sha256:abc123def456',
      snapshotLocation: 'snapshots/bmel-pet-entry-2026-09-01.html',
    },
  });

  const sourceVersion2 = await prisma.sourceVersion.create({
    data: {
      sourceId: euRegulationSource.id,
      retrievedAt: new Date('2026-09-01'),
      contentHash: 'sha256:789ghi012jkl',
      snapshotLocation: 'snapshots/eu-pet-movement-2026-09-01.html',
    },
  });

  const now = new Date();

  // Requirement 1: ISO Microchip (BLOCKING)
  const req1 = await prisma.requirement.create({
    data: {
      routeId: usaToGermany.id,
      petSpecies: 'DOG',
      category: 'MICROCHIP',
      severity: 'BLOCKING',
    },
  });
  await prisma.requirementVersion.create({
    data: {
      requirementId: req1.id,
      version: 1,
      ruleType: 'REQUIRED',
      ruleParams: { field: 'microchip_number' },
      ruleText: 'ISO 11784/11785 compliant microchip is required. Must be implanted before rabies vaccination.',
      sourceVersionId: sourceVersion2.id,
      effectiveFrom: new Date('2024-01-01'),
      confidence: 'VERIFIED',
      lastVerifiedAt: now,
      createdBy: 'seed',
      verifiedBy: 'seed',
    },
  });

  // Requirement 2: Microchip before vaccination (BLOCKING)
  const req2 = await prisma.requirement.create({
    data: {
      routeId: usaToGermany.id,
      petSpecies: 'DOG',
      category: 'MICROCHIP',
      severity: 'BLOCKING',
    },
  });
  await prisma.requirementVersion.create({
    data: {
      requirementId: req2.id,
      version: 1,
      ruleType: 'DATE_BEFORE',
      ruleParams: { field: 'microchip_date', before: 'rabies_vaccination_date' },
      ruleText: 'Microchip must be implanted before or on the same day as the rabies vaccination.',
      sourceVersionId: sourceVersion2.id,
      effectiveFrom: new Date('2024-01-01'),
      confidence: 'VERIFIED',
      lastVerifiedAt: now,
      createdBy: 'seed',
      verifiedBy: 'seed',
    },
  });

  // Requirement 3: Rabies Vaccination (BLOCKING)
  const req3 = await prisma.requirement.create({
    data: {
      routeId: usaToGermany.id,
      petSpecies: 'DOG',
      category: 'RABIES_VACCINATION',
      severity: 'BLOCKING',
    },
  });
  await prisma.requirementVersion.create({
    data: {
      requirementId: req3.id,
      version: 1,
      ruleType: 'REQUIRED',
      ruleParams: { field: 'rabies_vaccination_date' },
      ruleText: 'Valid rabies vaccination is required. Pet must be at least 12 weeks old at the time of vaccination.',
      sourceVersionId: sourceVersion1.id,
      effectiveFrom: new Date('2024-01-01'),
      confidence: 'VERIFIED',
      lastVerifiedAt: now,
      createdBy: 'seed',
      verifiedBy: 'seed',
    },
  });

  // Requirement 4: 21-day rabies wait (BLOCKING)
  const req4 = await prisma.requirement.create({
    data: {
      routeId: usaToGermany.id,
      petSpecies: 'DOG',
      category: 'RABIES_VACCINATION',
      severity: 'BLOCKING',
    },
  });
  await prisma.requirementVersion.create({
    data: {
      requirementId: req4.id,
      version: 1,
      ruleType: 'MIN_WAIT',
      ruleParams: { value: 21, unit: 'days', from: 'rabies_vaccination_date', to: 'arrival_datetime' },
      ruleText: 'At least 21 days must elapse between the primary rabies vaccination and the date of arrival in Germany.',
      sourceVersionId: sourceVersion1.id,
      effectiveFrom: new Date('2024-01-01'),
      confidence: 'VERIFIED',
      lastVerifiedAt: now,
      createdBy: 'seed',
      verifiedBy: 'seed',
    },
  });

  // Requirement 5: Health Certificate (BLOCKING)
  const req5 = await prisma.requirement.create({
    data: {
      routeId: usaToGermany.id,
      petSpecies: 'DOG',
      category: 'HEALTH_CERTIFICATE',
      severity: 'BLOCKING',
    },
  });
  await prisma.requirementVersion.create({
    data: {
      requirementId: req5.id,
      version: 1,
      ruleType: 'DOCUMENT_REQUIRED',
      ruleParams: { document_type: 'health_certificate', field: 'has_health_certificate' },
      ruleText: 'EU-format veterinary health certificate (Annex IV) issued by a USDA-accredited veterinarian and endorsed by APHIS within 10 days of travel.',
      sourceVersionId: sourceVersion1.id,
      effectiveFrom: new Date('2024-01-01'),
      confidence: 'VERIFIED',
      lastVerifiedAt: now,
      createdBy: 'seed',
      verifiedBy: 'seed',
    },
  });

  // Requirement 6: Tapeworm Treatment (BLOCKING for Germany)
  const req6 = await prisma.requirement.create({
    data: {
      routeId: usaToGermany.id,
      petSpecies: 'DOG',
      category: 'TAPEWORM_TREATMENT',
      severity: 'NON_BLOCKING',
    },
  });
  await prisma.requirementVersion.create({
    data: {
      requirementId: req6.id,
      version: 1,
      ruleType: 'DOCUMENT_REQUIRED',
      ruleParams: { document_type: 'tapeworm_treatment', field: 'has_tapeworm_treatment' },
      ruleText: 'Echinococcus tapeworm treatment (praziquantel) administered 1–5 days before entry. Required for dogs entering Germany, not required for cats.',
      sourceVersionId: sourceVersion1.id,
      effectiveFrom: new Date('2024-01-01'),
      confidence: 'VERIFIED',
      lastVerifiedAt: now,
      createdBy: 'seed',
      verifiedBy: 'seed',
    },
  });

  console.log('\n✅ 6 requirements seeded for USA → Germany (Dog)');
  console.log('\n🎉 Seed complete!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
