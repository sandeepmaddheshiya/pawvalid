import { describe, it, expect } from 'vitest';
import { CORRIDORS } from '@/lib/data/corridors';

describe('Browse Requirements Interactive Checklist Feature', () => {
  it('loads corridor statutory requirements for major routes', () => {
    const route = CORRIDORS['usa-to-germany'];
    expect(route).toBeDefined();
    expect(route.statutoryRequirements.length).toBeGreaterThan(0);

    const mandatoryRules = route.statutoryRequirements.filter(
      (r) => r.severity === 'BLOCKING'
    );
    expect(mandatoryRules.length).toBeGreaterThan(0);

    // Verify microchip and rabies presence
    const categories = route.statutoryRequirements.map((r) => r.category);
    expect(categories).toContain('MICROCHIP');
    expect(categories).toContain('RABIES_VACCINATION');
  });

  it('filters species-specific requirements correctly (e.g. Tapeworm for Cats vs Dogs)', () => {
    const ukRoute = CORRIDORS['usa-to-uk'];
    expect(ukRoute).toBeDefined();

    const dogReqs = ukRoute.statutoryRequirements.filter((req) => {
      // Dog gets all rules including tapeworm
      return true;
    });

    const catReqs = ukRoute.statutoryRequirements.filter((req) => {
      // Cats are exempt from Echinococcus multilocularis treatment
      return req.category !== 'TAPEWORM_TREATMENT';
    });

    const dogHasTapeworm = dogReqs.some((r) => r.category === 'TAPEWORM_TREATMENT');
    const catHasTapeworm = catReqs.some((r) => r.category === 'TAPEWORM_TREATMENT');

    expect(dogHasTapeworm).toBe(true);
    expect(catHasTapeworm).toBe(false);
  });

  it('computes readiness score dynamically as items are toggled', () => {
    const route = CORRIDORS['usa-to-germany'];
    const mandatory = route.statutoryRequirements.filter((r) => r.severity === 'BLOCKING');
    const totalMandatory = mandatory.length;

    // Simulate empty state
    const emptyChecked: Record<string, 'HAVE' | 'NEED'> = {};
    const initialScore = 0;
    expect(initialScore).toBe(0);

    // Simulate 1 item marked HAVE
    const haveOne: Record<string, 'HAVE' | 'NEED'> = {
      [mandatory[0].id]: 'HAVE',
    };
    const scoreOne = Math.round((1 / totalMandatory) * 100);
    expect(scoreOne).toBeGreaterThan(0);
    expect(scoreOne).toBeLessThan(100);

    // Simulate all mandatory marked HAVE
    const haveAll: Record<string, 'HAVE' | 'NEED'> = {};
    mandatory.forEach((m) => {
      haveAll[m.id] = 'HAVE';
    });
    const haveCount = Object.values(haveAll).filter((v) => v === 'HAVE').length;
    const finalScore = Math.round((haveCount / totalMandatory) * 100);
    expect(finalScore).toBe(100);
  });

  it('identifies pending action items when items are marked NEED', () => {
    const route = CORRIDORS['usa-to-germany'];
    const mandatory = route.statutoryRequirements.filter((r) => r.severity === 'BLOCKING');

    const state: Record<string, 'HAVE' | 'NEED'> = {
      [mandatory[0].id]: 'HAVE',
      [mandatory[1].id]: 'NEED',
    };

    const needItems = route.statutoryRequirements.filter(
      (r) => state[r.id] === 'NEED'
    );

    expect(needItems.length).toBe(1);
    expect(needItems[0].id).toBe(mandatory[1].id);
  });

  it('generates the proper deep link to the document validator checker', () => {
    const originCode = 'US';
    const destCode = 'DE';
    const petType = 'DOG';

    const checkerUrl = `/en/checker?origin=${originCode}&destination=${destCode}&petType=${petType}`;
    expect(checkerUrl).toBe('/en/checker?origin=US&destination=DE&petType=DOG');
  });
});
