import { describe, it, expect } from 'vitest';
import {
  getOrganizationSchema,
  getSoftwareApplicationSchema,
  getFaqSchema,
  getBreadcrumbSchema,
  getHowToSchema,
  BASE_URL,
} from '@/lib/seo/schema';

describe('Schema.org Structured Data Engine (SEO / AEO / GEO)', () => {
  describe('getOrganizationSchema', () => {
    it('returns a compliant Organization schema with E-E-A-T trust signals', () => {
      const schema = getOrganizationSchema();
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('PawValid');
      expect(schema.url).toBe(BASE_URL);
      expect(schema.email).toBe('support@pawvalid.online');
      expect(schema.contactPoint).toBeDefined();
      expect(schema.contactPoint[0].email).toBe('support@pawvalid.online');
      expect(schema.contactPoint[0].availableLanguage).toContain('English');
      expect(schema.sameAs).toBeInstanceOf(Array);
      expect(schema.sameAs.length).toBeGreaterThan(0);
    });
  });

  describe('getSoftwareApplicationSchema', () => {
    it('returns a valid WebApplication schema with pricing tiers and features', () => {
      const schema = getSoftwareApplicationSchema();
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebApplication');
      expect(schema.name).toBe('PawValid Compliance Assistant');
      expect(schema.applicationCategory).toBe('TravelApplication');
      expect(schema.offers).toHaveLength(3);

      const prices = schema.offers.map((o) => o.price);
      expect(prices).toContain('0.00');
      expect(prices).toContain('19.00');
      expect(prices).toContain('59.00');

      expect(schema.featureList).toBeInstanceOf(Array);
      expect(schema.featureList.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('getFaqSchema', () => {
    it('formats questions and answers into valid FAQPage schema for AEO extraction', () => {
      const sampleFaqs = [
        { q: 'Is a rabies titer test required for Germany?', a: 'No, direct travel from the US is exempt.' },
        { q: 'What is the minimum lead time?', a: '21 days after initial rabies vaccination.' },
      ];

      const schema = getFaqSchema(sampleFaqs);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toHaveLength(2);
      expect(schema.mainEntity[0]['@type']).toBe('Question');
      expect(schema.mainEntity[0].name).toBe('Is a rabies titer test required for Germany?');
      expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe('No, direct travel from the US is exempt.');
    });
  });

  describe('getBreadcrumbSchema', () => {
    it('structures hierarchical breadcrumb positions starting from 1', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'Pet Travel', url: '/en/pet-travel' },
        { name: 'USA to Germany', url: '/en/pet-travel/usa-to-germany' },
      ];

      const schema = getBreadcrumbSchema(items);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);

      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[0].name).toBe('Home');
      expect(schema.itemListElement[0].item).toBe(`${BASE_URL}/`);

      expect(schema.itemListElement[2].position).toBe(3);
      expect(schema.itemListElement[2].name).toBe('USA to Germany');
      expect(schema.itemListElement[2].item).toBe(`${BASE_URL}/en/pet-travel/usa-to-germany`);
    });
  });

  describe('getHowToSchema', () => {
    it('generates rich HowTo schema with sequential steps for timeline milestones', () => {
      const steps = [
        { step: 1, title: 'Microchip', description: 'ISO 11784/11785 15-digit chip.' },
        { step: 2, title: 'Rabies Shot', description: 'Must wait 21 days.' },
      ];

      const schema = getHowToSchema({
        title: 'How to Travel to Germany with a Dog',
        description: 'Complete non-commercial entry procedure.',
        steps,
      });

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('HowTo');
      expect(schema.name).toBe('How to Travel to Germany with a Dog');
      expect(schema.step).toHaveLength(2);
      expect(schema.step[0].position).toBe(1);
      expect(schema.step[0].name).toBe('Microchip');
      expect(schema.step[1].position).toBe(2);
      expect(schema.step[1].name).toBe('Rabies Shot');
    });
  });
});
