import { describe, it, expect } from 'vitest';
import { metadata } from '@/app/en/editorial-policy/page';
import { BASE_URL } from '@/lib/seo/hreflang';

describe('Editorial & Verification Policy Page', () => {
  it('has valid metadata with canonical and hreflang alternates', () => {
    expect(metadata.title).toContain('Editorial & Statutory Verification Policy');
    expect(metadata.description).toContain('statutory sourcing hierarchy');
    expect(metadata.alternates).toBeDefined();

    const alt = metadata.alternates as { canonical: string; languages: Record<string, string> };
    expect(alt.canonical).toBe(`${BASE_URL}/en/editorial-policy`);
    expect(alt.languages.en).toBe(`${BASE_URL}/en/editorial-policy`);
    expect(alt.languages.de).toBe(`${BASE_URL}/de/editorial-policy`);
    expect(alt.languages.fr).toBe(`${BASE_URL}/fr/editorial-policy`);
    expect(alt.languages.es).toBe(`${BASE_URL}/es/editorial-policy`);
    expect(alt.languages['x-default']).toBe(`${BASE_URL}/en/editorial-policy`);
  });

  it('openGraph metadata is configured properly', () => {
    expect(metadata.openGraph).toBeDefined();
    const og = metadata.openGraph as { url: string; siteName: string };
    expect(og.url).toBe(`${BASE_URL}/en/editorial-policy`);
    expect(og.siteName).toBe('PawValid');
  });
});
