import { describe, it, expect } from 'vitest';
import { COUNTRIES, getAllCountries, getCountryBySlug } from '@/lib/data/countries';
import { getMedicalWebPageSchema, getBreadcrumbSchema, getFaqSchema } from '@/lib/seo/schema';
import { generateStaticParams } from '@/app/en/countries/[country]/page';

describe('Destination Countries Dataset (COUNTRIES)', () => {
  const EXPECTED_COUNTRIES = [
    'united-kingdom',
    'united-states',
    'germany',
    'france',
    'spain',
    'italy',
    'canada',
    'australia',
    'japan',
    'united-arab-emirates',
    'ireland',
    'mexico',
    'netherlands',
    'switzerland',
    'singapore',
  ];

  it('should contain exactly the top 15 destination countries', () => {
    const keys = Object.keys(COUNTRIES);
    expect(keys.length).toBe(15);
    for (const slug of EXPECTED_COUNTRIES) {
      expect(COUNTRIES[slug]).toBeDefined();
    }
  });

  it('every country should have valid compliance attributes', () => {
    for (const [slug, country] of Object.entries(COUNTRIES)) {
      expect(country.slug).toBe(slug);
      expect(country.name).toBeTruthy();
      expect(country.code).toMatch(/^[A-Z]{2}$/);
      expect(country.flag).toBeTruthy();
      expect(country.authority).toBeTruthy();
      expect(country.authorityUrl).toMatch(/^https?:\/\//);
      expect(country.legalBasis).toBeTruthy();
      expect(country.headline).toBeTruthy();
      expect(country.description).toBeTruthy();
      expect(['exempt', 'mandatory', 'conditional']).toContain(country.titerStatus);
      expect(country.quarantineDays).toBeTruthy();
      expect(country.leadTime).toBeTruthy();
      expect(country.certificateType).toBeTruthy();
      expect(country.entryAirports.length).toBeGreaterThan(0);
      expect(country.faqs.length).toBeGreaterThan(0);
      expect(country.statutoryRequirements.length).toBeGreaterThan(0);
    }
  });

  it('every statutory requirement rule should have official sources and verification timestamp', () => {
    for (const country of Object.values(COUNTRIES)) {
      for (const req of country.statutoryRequirements) {
        expect(req.id).toBeTruthy();
        expect(req.category).toBeTruthy();
        expect(req.title).toBeTruthy();
        expect(['BLOCKING', 'NON_BLOCKING']).toContain(req.severity);
        expect(req.rules.length).toBeGreaterThan(0);
        expect(req.protocol).toBeTruthy();
        expect(req.sourceName).toBeTruthy();
        expect(req.sourceUrl).toMatch(/^https?:\/\//);
        expect(req.lastVerifiedAt).toContain('2026');
      }
    }
  });

  it('getAllCountries() returns an array of 15 countries', () => {
    const all = getAllCountries();
    expect(all.length).toBe(15);
    expect(all.map((c) => c.slug)).toEqual(expect.arrayContaining(EXPECTED_COUNTRIES));
  });

  it('getCountryBySlug() finds existing country and returns undefined for invalid slug', () => {
    const uk = getCountryBySlug('united-kingdom');
    expect(uk).toBeDefined();
    expect(uk?.name).toBe('United Kingdom');

    const invalid = getCountryBySlug('atlantis');
    expect(invalid).toBeUndefined();
  });

  it('generateStaticParams() yields static routes for all 15 countries', async () => {
    const params = await generateStaticParams();
    expect(params.length).toBe(15);
    expect(params.map((p) => p.country)).toEqual(expect.arrayContaining(EXPECTED_COUNTRIES));
  });
});

describe('SEO Schema Generators for Country Pages', () => {
  it('generates valid MedicalWebPage JSON-LD schema with authority citations', () => {
    const schema = getMedicalWebPageSchema({
      name: 'Germany Pet Import Rules',
      description: 'Official BMEL pet entry guidelines',
      url: '/en/countries/germany',
      authority: 'German Federal Ministry of Food and Agriculture (BMEL)',
      authorityUrl: 'https://www.bmel.de',
      lastReviewed: '2026-09-21',
    });

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('MedicalWebPage');
    expect(schema.name).toBe('Germany Pet Import Rules');
    expect(schema.reviewedBy['@type']).toBe('Organization');
    expect(schema.reviewedBy.name).toBe('German Federal Ministry of Food and Agriculture (BMEL)');
    expect(schema.reviewedBy.url).toBe('https://www.bmel.de');
  });

  it('generates BreadcrumbList and FAQPage schemas properly', () => {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Destination Countries', url: '/en/countries' },
      { name: 'Japan', url: '/en/countries/japan' },
    ];
    const bSchema = getBreadcrumbSchema(breadcrumbs);
    expect(bSchema['@type']).toBe('BreadcrumbList');
    expect(bSchema.itemListElement.length).toBe(3);

    const faqs = [{ q: 'Is quarantine required in Japan?', a: '12 hours if all conditions met.' }];
    const fSchema = getFaqSchema(faqs);
    expect(fSchema['@type']).toBe('FAQPage');
    expect(fSchema.mainEntity.length).toBe(1);
    expect(fSchema.mainEntity[0].name).toBe('Is quarantine required in Japan?');
  });
});
