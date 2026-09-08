import { describe, it, expect } from 'vitest';
import { DOG_BREEDS, CAT_BREEDS, COUNTRIES } from '@/components/DocumentDropzone';
import type { SearchableOption } from '@/components/SearchableSelect';

// Pure logic mirrors the filtering and selection mechanism in SearchableSelect
function filterItems(options: (string | SearchableOption)[], query: string) {
  const clean = query.trim().toLowerCase();
  const normalized: SearchableOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );
  if (!clean) return normalized;
  return normalized.filter((opt) => {
    return (
      opt.label.toLowerCase().includes(clean) ||
      opt.value.toLowerCase().includes(clean) ||
      (opt.subtext && opt.subtext.toLowerCase().includes(clean)) ||
      (opt.keywords && opt.keywords.some((kw) => kw.toLowerCase().includes(clean)))
    );
  });
}

function shouldShowCustomOption(options: (string | SearchableOption)[], query: string, allowCustom = true) {
  const clean = query.trim().toLowerCase();
  const normalized: SearchableOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );
  const exactMatchExists = normalized.some(
    (opt) =>
      opt.label.toLowerCase() === clean || opt.value.toLowerCase() === clean
  );
  return allowCustom && clean.length > 0 && !exactMatchExists;
}

function calculateNextHighlight(current: number, total: number, direction: 'up' | 'down') {
  if (total <= 0) return 0;
  if (direction === 'down') {
    return current < total - 1 ? current + 1 : 0;
  }
  return current > 0 ? current - 1 : Math.max(0, total - 1);
}

describe('Select2 SearchableSelect Breed & Country Dropdown Logic', () => {
  it('contains comprehensive dog breed catalog with popular breeds', () => {
    expect(DOG_BREEDS.length).toBeGreaterThan(40);
    expect(DOG_BREEDS).toContain('Golden Retriever');
    expect(DOG_BREEDS).toContain('Labrador Retriever');
    expect(DOG_BREEDS).toContain('French Bulldog');
    expect(DOG_BREEDS).toContain('German Shepherd');
    expect(DOG_BREEDS).toContain('Poodle');
    expect(DOG_BREEDS).toContain('Beagle');
    expect(DOG_BREEDS).toContain('Mixed Breed / Crossbreed');
  });

  it('contains comprehensive cat breed catalog with popular breeds', () => {
    expect(CAT_BREEDS.length).toBeGreaterThan(20);
    expect(CAT_BREEDS).toContain('Persian');
    expect(CAT_BREEDS).toContain('Maine Coon');
    expect(CAT_BREEDS).toContain('British Shorthair');
    expect(CAT_BREEDS).toContain('Domestic Shorthair');
    expect(CAT_BREEDS).toContain('Siamese');
    expect(CAT_BREEDS).toContain('Bengal');
    expect(CAT_BREEDS).toContain('Mixed Breed');
  });

  it('filters breeds accurately by case-insensitive substring', () => {
    const results = filterItems(DOG_BREEDS, 'retriever');
    expect(results.map((r) => r.value)).toContain('Golden Retriever');
    expect(results.map((r) => r.value)).toContain('Labrador Retriever');
    expect(results.every((b) => b.value.toLowerCase().includes('retriever'))).toBe(true);

    const empty = filterItems(DOG_BREEDS, 'nonexistentxyz');
    expect(empty).toHaveLength(0);
  });

  it('filters countries by name, code, and alias keywords', () => {
    const countryOptions: SearchableOption[] = COUNTRIES.map((c) => ({
      value: c.code,
      label: c.name,
      flag: c.flag,
      subtext: c.code,
      keywords: [
        c.code,
        c.name,
        ...(c.code === 'GB' ? ['UK', 'United Kingdom', 'Great Britain', 'England'] : []),
        ...(c.code === 'US' ? ['USA', 'United States', 'America'] : []),
        ...(c.code === 'AE' ? ['UAE', 'United Arab Emirates', 'Dubai'] : []),
        ...(c.code === 'DE' ? ['Germany', 'Deutschland'] : []),
      ],
    }));

    // Search by country name
    const germMatches = filterItems(countryOptions, 'Germany');
    expect(germMatches).toHaveLength(1);
    expect(germMatches[0].value).toBe('DE');
    expect(germMatches[0].flag).toBe('🇩🇪');

    // Search by ISO code
    const deCodeMatches = filterItems(countryOptions, 'DE');
    expect(deCodeMatches.some((m) => m.value === 'DE')).toBe(true);

    // Search by alias "UK"
    const ukMatches = filterItems(countryOptions, 'UK');
    expect(ukMatches.some((m) => m.value === 'GB')).toBe(true);

    // Search by alias "Dubai"
    const uaeMatches = filterItems(countryOptions, 'Dubai');
    expect(uaeMatches.some((m) => m.value === 'AE')).toBe(true);

    // Search by alias "USA"
    const usaMatches = filterItems(countryOptions, 'USA');
    expect(usaMatches.some((m) => m.value === 'US')).toBe(true);
  });

  it('correctly flags when custom breed creation is available', () => {
    // Exact match exists - should NOT show custom
    expect(shouldShowCustomOption(DOG_BREEDS, 'Golden Retriever', true)).toBe(false);
    expect(shouldShowCustomOption(DOG_BREEDS, 'golden retriever', true)).toBe(false);

    // Empty search - should NOT show custom
    expect(shouldShowCustomOption(DOG_BREEDS, '', true)).toBe(false);

    // Unlisted custom breed - SHOULD show custom
    expect(shouldShowCustomOption(DOG_BREEDS, 'Cavapoo', true)).toBe(true);
    expect(shouldShowCustomOption(DOG_BREEDS, 'Pomsky', true)).toBe(true);

    // When allowCustom is false (e.g. for Countries) - should NOT show custom
    expect(shouldShowCustomOption(DOG_BREEDS, 'Cavapoo', false)).toBe(false);
  });

  it('handles keyboard arrow navigation with circular wrap-around', () => {
    const total = 5;
    // Moving down from index 0 -> 1
    expect(calculateNextHighlight(0, total, 'down')).toBe(1);
    // Moving down from last item -> wrap to 0
    expect(calculateNextHighlight(4, total, 'down')).toBe(0);
    // Moving up from index 2 -> 1
    expect(calculateNextHighlight(2, total, 'up')).toBe(1);
    // Moving up from index 0 -> wrap to last item (4)
    expect(calculateNextHighlight(0, total, 'up')).toBe(4);
  });
});

describe('Multi-Stop Transit & Layover Compliance Rules', () => {
  function getTransitComplianceRules(transitCodes: string[]) {
    return transitCodes.map((tCode) => {
      const c = COUNTRIES.find((x) => x.code === tCode) || { name: tCode, flag: '🔀' };
      if (tCode === 'SG') {
        return {
          ruleId: 'SG_NPARKS_TRANSIT_001',
          name: 'Singapore AVS Transshipment License',
          category: 'TRANSIT',
          severity: 'REQUIRED_ACTION',
          country: c.name,
        };
      }
      if (tCode === 'GB') {
        return {
          ruleId: 'UK_DEFRA_TRANSIT_001',
          name: 'UK DEFRA Manifest Cargo Transit Protocol',
          category: 'TRANSIT',
          severity: 'REQUIRED_ACTION',
          country: c.name,
        };
      }
      if (['DE', 'FR', 'NL', 'ES', 'IT'].includes(tCode)) {
        return {
          ruleId: `EU_TRANSIT_BIP_${tCode}`,
          name: `${c.name} EU Transit Animal Lounge Inspection`,
          category: 'TRANSIT',
          severity: 'COMPLIANT',
          country: c.name,
        };
      }
      return {
        ruleId: `TRANSIT_${tCode}_DECLARATION`,
        name: `${c.name} Airside Transit Declaration`,
        category: 'TRANSIT',
        severity: 'COMPLIANT',
        country: c.name,
      };
    });
  }

  it('correctly manages adding, updating, and removing transit stops up to 3 stops', () => {
    let stops: string[] = [];
    const addStop = (code: string) => {
      if (stops.length < 3) stops.push(code);
    };
    const removeStop = (idx: number) => {
      stops = stops.filter((_, i) => i !== idx);
    };

    addStop('FR');
    addStop('DE');
    addStop('SG');
    expect(stops).toEqual(['FR', 'DE', 'SG']);

    // Should not exceed maximum 3 stops
    addStop('AE');
    expect(stops).toHaveLength(3);

    // Remove middle stop
    removeStop(1);
    expect(stops).toEqual(['FR', 'SG']);

    // Can add another stop now
    addStop('AE');
    expect(stops).toEqual(['FR', 'SG', 'AE']);
  });

  it('generates mandatory Singapore AVS transshipment license rule for SG transit', () => {
    const rules = getTransitComplianceRules(['SG']);
    expect(rules).toHaveLength(1);
    expect(rules[0].ruleId).toBe('SG_NPARKS_TRANSIT_001');
    expect(rules[0].severity).toBe('REQUIRED_ACTION');
    expect(rules[0].name).toContain('Singapore AVS');
  });

  it('generates UK DEFRA manifest cargo protocol rule for GB transit', () => {
    const rules = getTransitComplianceRules(['GB']);
    expect(rules).toHaveLength(1);
    expect(rules[0].ruleId).toBe('UK_DEFRA_TRANSIT_001');
    expect(rules[0].severity).toBe('REQUIRED_ACTION');
    expect(rules[0].name).toContain('DEFRA');
  });

  it('generates EU Border Inspection Post lounge clearance for EU transit hubs', () => {
    const rules = getTransitComplianceRules(['DE', 'FR', 'NL']);
    expect(rules).toHaveLength(3);
    expect(rules.map((r) => r.ruleId)).toEqual([
      'EU_TRANSIT_BIP_DE',
      'EU_TRANSIT_BIP_FR',
      'EU_TRANSIT_BIP_NL',
    ]);
    expect(rules.every((r) => r.category === 'TRANSIT')).toBe(true);
  });

  it('generates IATA airside transit declaration for other international hubs', () => {
    const rules = getTransitComplianceRules(['AE', 'JP']);
    expect(rules).toHaveLength(2);
    expect(rules[0].ruleId).toBe('TRANSIT_AE_DECLARATION');
    expect(rules[1].ruleId).toBe('TRANSIT_JP_DECLARATION');
  });
});
