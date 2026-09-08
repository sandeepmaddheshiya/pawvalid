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
