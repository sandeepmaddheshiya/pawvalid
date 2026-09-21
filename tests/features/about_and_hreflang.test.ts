import { describe, it, expect } from 'vitest';
import { getHreflangAlternates, cleanLocalePath, BASE_URL } from '@/lib/seo/hreflang';
import { metadata as aboutMetadata } from '@/app/en/about/page';

describe('Hreflang Alternates Utility (getHreflangAlternates)', () => {
  it('cleanLocalePath removes localized prefixes correctly', () => {
    expect(cleanLocalePath('/')).toBe('');
    expect(cleanLocalePath('/en')).toBe('');
    expect(cleanLocalePath('/de')).toBe('');
    expect(cleanLocalePath('/en/about')).toBe('/about');
    expect(cleanLocalePath('/de/countries/germany')).toBe('/countries/germany');
    expect(cleanLocalePath('/fr/pet-travel/usa-to-uk')).toBe('/pet-travel/usa-to-uk');
    expect(cleanLocalePath('pet-travel/usa-to-uk')).toBe('/pet-travel/usa-to-uk');
  });

  it('generates correct alternates for root homepage', () => {
    const alternates = getHreflangAlternates('/');
    expect(alternates.canonical).toBe(BASE_URL);
    expect(alternates.languages).toEqual({
      en: `${BASE_URL}/en/checker`,
      de: `${BASE_URL}/de/checker`,
      fr: `${BASE_URL}/fr/checker`,
      es: `${BASE_URL}/es/checker`,
      'x-default': BASE_URL,
    });
  });

  it('generates correct alternates for /about page', () => {
    const alternates = getHreflangAlternates('/about');
    expect(alternates.canonical).toBe(`${BASE_URL}/en/about`);
    expect(alternates.languages).toEqual({
      en: `${BASE_URL}/en/about`,
      de: `${BASE_URL}/de/about`,
      fr: `${BASE_URL}/fr/about`,
      es: `${BASE_URL}/es/about`,
      'x-default': `${BASE_URL}/en/about`,
    });
  });

  it('generates correct alternates for deep corridor and country routes', () => {
    const corridorAlt = getHreflangAlternates('/pet-travel/india-to-uk');
    expect(corridorAlt.canonical).toBe(`${BASE_URL}/en/pet-travel/india-to-uk`);
    expect(corridorAlt.languages.de).toBe(`${BASE_URL}/de/pet-travel/india-to-uk`);
    expect(corridorAlt.languages.fr).toBe(`${BASE_URL}/fr/pet-travel/india-to-uk`);
    expect(corridorAlt.languages.es).toBe(`${BASE_URL}/es/pet-travel/india-to-uk`);
    expect(corridorAlt.languages['x-default']).toBe(`${BASE_URL}/en/pet-travel/india-to-uk`);

    const countryAlt = getHreflangAlternates('/countries/australia');
    expect(countryAlt.canonical).toBe(`${BASE_URL}/en/countries/australia`);
    expect(countryAlt.languages.de).toBe(`${BASE_URL}/de/countries/australia`);
  });
});

describe('About & Team Page (E-E-A-T & Trust)', () => {
  it('has valid SEO metadata with canonical and hreflang', () => {
    expect(aboutMetadata.title).toContain('About PawValid');
    expect(aboutMetadata.description).toContain('Sandeep Maddheshiya');
    expect(aboutMetadata.alternates).toBeDefined();
    const alt = aboutMetadata.alternates as { canonical: string; languages: Record<string, string> };
    expect(alt.canonical).toBe(`${BASE_URL}/en/about`);
    expect(alt.languages.en).toBe(`${BASE_URL}/en/about`);
    expect(alt.languages.de).toBe(`${BASE_URL}/de/about`);
    expect(alt.languages.fr).toBe(`${BASE_URL}/fr/about`);
    expect(alt.languages.es).toBe(`${BASE_URL}/es/about`);
  });
});
