import { describe, it, expect } from 'vitest';
import { getDeclarativeRequirements, isRuleApplicable, CATALOG_RULES } from '@/lib/requirements/rulesCatalog';
import { evaluate } from '@/lib/requirements/evaluate';
import { scoreOverall } from '@/lib/requirements/scoring';
import { getCurrentRequirementVersions } from '@/lib/requirements/queries';
import { POST } from '@/app/api/check/route';
import { NextRequest } from 'next/server';

describe('Transit Country Biosecurity & Compliance Logic (Item 22)', () => {
  it('identifies Singapore transshipment permit rule when transiting SG', () => {
    const rules = getDeclarativeRequirements('US', 'AU', ['SG'], 'DOG');
    const sgTransit = rules.find((r) => r.id === 'decl-SG_NPARKS_TRANSIT_001');

    expect(sgTransit, 'Expected Singapore transshipment rule').toBeDefined();
    expect(sgTransit?.category).toBe('TRANSIT');
    expect(sgTransit?.severity).toBe('BLOCKING');
    expect(sgTransit?.source.publisher).toContain('NParks');
  });

  it('identifies EU Border Inspection Post rule when transiting Frankfurt or Paris', () => {
    const deTransit = getDeclarativeRequirements('US', 'IN', ['DE'], 'DOG');
    const euBipDe = deTransit.find((r) => r.id === 'decl-EU_TRANSIT_BIP_DE');
    expect(euBipDe, 'Expected EU BIP rule for DE transit').toBeDefined();
    expect(euBipDe?.category).toBe('TRANSIT');

    const frTransit = getDeclarativeRequirements('US', 'IN', ['FR'], 'CAT');
    const euBipFr = frTransit.find((r) => r.id === 'decl-EU_TRANSIT_BIP_DE');
    expect(euBipFr, 'Expected EU BIP rule for FR transit').toBeDefined();
  });

  it('identifies UK DEFRA manifest cargo rule when transiting London Heathrow (GB)', () => {
    const rules = getDeclarativeRequirements('US', 'IN', ['GB'], 'DOG');
    const ukTransit = rules.find((r) => r.id === 'decl-UK_DEFRA_TRANSIT_001');

    expect(ukTransit, 'Expected UK DEFRA cargo transit rule').toBeDefined();
    expect(ukTransit?.category).toBe('TRANSIT');
    expect(ukTransit?.ruleText).toContain('manifest cargo');
  });

  it('identifies UAE MOCCAE transit rule when transiting Dubai (AE)', () => {
    const rules = getDeclarativeRequirements('US', 'IN', ['AE'], 'DOG');
    const aeTransit = rules.find((r) => r.id === 'decl-AE_MOCCAE_TRANSIT_001');

    expect(aeTransit, 'Expected UAE MOCCAE transit rule').toBeDefined();
    expect(aeTransit?.category).toBe('TRANSIT');
  });

  it('does NOT include transit rules on direct flights with empty transit list', () => {
    const directRules = getDeclarativeRequirements('US', 'DE', [], 'DOG');
    const transitRules = directRules.filter((r) => r.category === 'TRANSIT');

    expect(transitRules.length).toBe(0);
  });

  it('evaluates transit items correctly in the Rule Engine', () => {
    const rules = getDeclarativeRequirements('US', 'AU', ['SG'], 'DOG');
    const now = new Date();
    const futureArrival = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString();

    const facts = {
      species: 'DOG',
      microchip_number: '985141001234567',
      microchip_date: '2025-01-01T00:00:00.000Z',
      rabies_vaccination_date: '2025-02-01T00:00:00.000Z',
      has_health_certificate: true,
      has_import_permit: false, // missing Singapore transit permit
      origin_country: 'US',
      destination_country: 'AU',
      transit_countries: 'SG',
      airline: 'singapore-airlines',
    };

    const verdicts = evaluate(rules, facts, futureArrival);
    const sgVerdict = verdicts.find((v) => v.requirementId === 'req-SG_NPARKS_TRANSIT_001');

    expect(sgVerdict).toBeDefined();
    expect(sgVerdict?.status).toBe('PROBLEM');
    expect(sgVerdict?.category).toBe('TRANSIT');
    expect(scoreOverall(verdicts)).toBe('ACTION_REQUIRED');
  });

  describe('POST /api/check with transit countries', () => {
    it('accepts transitCountries array in POST /api/check and returns evaluated transit item', async () => {
      const departure = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();
      const arrival = new Date(Date.now() + 31 * 24 * 3600 * 1000).toISOString();

      const req = new NextRequest('http://localhost:3000/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trip: {
            originCountry: 'US',
            destinationCountry: 'GB',
            transitCountries: ['SG'],
            departureDatetime: departure,
            arrivalDatetime: arrival,
            airlineSlug: 'singapore-airlines',
          },
          pet: {
            species: 'DOG',
            countryOfResidence: 'US',
            microchipNumber: '985141001234567',
            microchipDate: '2025-01-01T00:00:00.000Z',
            mostRecentRabiesVaccination: {
              date: '2025-02-01T00:00:00.000Z',
              type: 'PRIMARY',
            },
            hasHealthCertificate: true,
            hasImportPermit: true,
            hasTapewormTreatment: true,
            tapewormTreatmentDate: new Date(Date.now() + 30.5 * 24 * 3600 * 1000).toISOString(),
          },
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.overallVerdict).toBeDefined();
      expect(data.items).toBeInstanceOf(Array);

      const transitItem = data.items.find((i: { category: string }) => i.category === 'TRANSIT');
      expect(transitItem, 'Expected transit item in /api/check response').toBeDefined();
    });

    it('accepts snake_case transit_countries string in POST /api/check', async () => {
      const departure = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();
      const arrival = new Date(Date.now() + 31 * 24 * 3600 * 1000).toISOString();

      const req = new NextRequest('http://localhost:3000/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trip: {
            originCountry: 'US',
            destinationCountry: 'DE',
            transit_countries: 'GB,FR',
            departureDatetime: departure,
            arrivalDatetime: arrival,
            airlineSlug: 'british-airways',
          },
          pet: {
            species: 'DOG',
            countryOfResidence: 'US',
            microchipNumber: '985141001234567',
            microchipDate: '2025-01-01T00:00:00.000Z',
            hasHealthCertificate: true,
          },
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      const transitItems = data.items.filter((i: { category: string }) => i.category === 'TRANSIT');
      expect(transitItems.length).toBeGreaterThanOrEqual(1);
    });
  });
});
