import { describe, it, expect } from 'vitest';
import { COUNTRIES, getCountryBySlug, getAllCountries } from '@/lib/data/countries';
import { GUIDES } from '@/lib/data/guides';

describe('SEO Architecture & Content Thickening Validation', () => {
  describe('Priority 1: Singapore Country Hub Thickening', () => {
    it('should have a comprehensive Singapore statutory ruleset with at least 7 requirements', () => {
      const singapore = getCountryBySlug('singapore');
      expect(singapore).toBeDefined();
      if (!singapore) return;

      expect(singapore.statutoryRequirements.length).toBeGreaterThanOrEqual(7);

      const categories = singapore.statutoryRequirements.map((r) => r.category);
      expect(categories).toContain('IMPORT_PERMIT');
      expect(categories).toContain('TITER_TEST');
      expect(categories).toContain('MICROCHIP');
      expect(categories).toContain('QUARANTINE_BOOKING');
      expect(categories).toContain('CORE_VACCINES');
      expect(categories).toContain('PARASITE_TREATMENT');
      expect(categories).toContain('HEALTH_CERTIFICATE');
      expect(categories).toContain('BREED_RESTRICTIONS');
    });

    it('should configure verified inbound corridors for Singapore', () => {
      const singapore = getCountryBySlug('singapore');
      expect(singapore?.inboundCorridors.length).toBeGreaterThanOrEqual(4);

      const corridorSlugs = singapore?.inboundCorridors.map((c) => c.corridorSlug);
      expect(corridorSlugs).toContain('usa-to-singapore');
      expect(corridorSlugs).toContain('uk-to-singapore');
      expect(corridorSlugs).toContain('australia-to-singapore');
      expect(corridorSlugs).toContain('india-to-singapore');
    });

    it('should include practical FAQs covering AVS Category tiers and CAPQ quarantine booking', () => {
      const singapore = getCountryBySlug('singapore');
      expect(singapore?.faqs.length).toBeGreaterThanOrEqual(4);

      const faqText = singapore?.faqs.map((f) => f.q + ' ' + f.a).join(' ') || '';
      expect(faqText).toContain('Category A');
      expect(faqText).toContain('CAPQ');
      expect(faqText).toContain('GoBusiness');
    });
  });

  describe('Priority 2: High-Value Guide Cross-Linking', () => {
    it('should cross-link FAVN Guide with USDA VEHCS Guide, tools, and destination hubs', () => {
      const favnGuide = GUIDES.find((g) => g.slug === 'rabies-titer-test-favn-guide');
      expect(favnGuide).toBeDefined();
      if (!favnGuide) return;

      expect(favnGuide.relatedGuides?.map((g) => g.slug)).toContain('usda-aphis-vehcs-guide');
      expect(favnGuide.relatedGuides?.map((g) => g.slug)).toContain('iata-crate-requirements');

      const countrySlugs = favnGuide.relatedCountries?.map((c) => c.slug);
      expect(countrySlugs).toContain('singapore');
      expect(countrySlugs).toContain('japan');
      expect(countrySlugs).toContain('australia');
      expect(countrySlugs).toContain('united-arab-emirates');

      const toolSlugs = favnGuide.relatedTools?.map((t) => t.slug);
      expect(toolSlugs).toContain('favn-titer-calculator');
      expect(toolSlugs).toContain('rabies-waiting-period-calculator');
    });

    it('should feature "Rabies Titer Test" and "FAVN" in H1, with DVM reviewer, citations, and comparison H2', () => {
      const guide = GUIDES.find((g) => g.slug === 'rabies-titer-test-favn-guide');
      expect(guide).toBeDefined();
      if (!guide) return;

      expect(guide.title).toContain('Rabies Titer Test');
      expect(guide.title).toContain('FAVN');
      expect(guide.seoTitle).toContain('Rabies Titer Test');
      expect(guide.summary.startsWith('A rabies titer test')).toBe(true);
      expect(guide.sections[0].title).toBe('1. Rabies Titer Test vs. FAVN Test: Are They the Same Thing?');
      expect(guide.reviewerName).toBe('Dr. Sarah Miller, DVM');
      expect(guide.officialSources?.length).toBeGreaterThanOrEqual(4);
    });

    it('should cross-link USDA VEHCS Guide with FAVN Guide, Canada, IATA crate guide, and EU hubs', () => {
      const vehcsGuide = GUIDES.find((g) => g.slug === 'usda-aphis-vehcs-guide');
      expect(vehcsGuide).toBeDefined();
      if (!vehcsGuide) return;

      expect(vehcsGuide.relatedGuides?.map((g) => g.slug)).toContain('rabies-titer-test-favn-guide');
      expect(vehcsGuide.relatedGuides?.map((g) => g.slug)).toContain('iata-crate-requirements');

      const countrySlugs = vehcsGuide.relatedCountries?.map((c) => c.slug);
      expect(countrySlugs).toContain('germany');
      expect(countrySlugs).toContain('united-kingdom');
      expect(countrySlugs).toContain('canada');
      expect(countrySlugs).toContain('singapore');

      expect(vehcsGuide.reviewerName).toBe('Dr. Sarah Miller, DVM');
      expect(vehcsGuide.officialSources?.length).toBeGreaterThanOrEqual(4);

      const feeSection = vehcsGuide.sections.find((s) => s.id === 'fee-schedule');
      expect(feeSection?.content.join(' ')).toContain('[rabies titer test requirements](/en/guides/rabies-titer-test-favn-guide)');
    });

    it('should have H2 "1. What is VEHCS?" with the definition answered directly in the first sentence', () => {
      const vehcsGuide = GUIDES.find((g) => g.slug === 'usda-aphis-vehcs-guide');
      expect(vehcsGuide).toBeDefined();
      if (!vehcsGuide) return;

      const firstSection = vehcsGuide.sections[0];
      expect(firstSection.title).toBe('1. What is VEHCS?');
      expect(firstSection.content[0]).toMatch(
        /^VEHCS \(Veterinary Export Health Certification System\) is the official online federal portal/
      );
      expect(firstSection.content[0]).toContain('https://www.aphis.usda.gov/pet-travel');
    });

    it('should include target H3 FAQs for "What is USDA APHIS VEHCS?" and "VEHCS APHIS"', () => {
      const vehcsGuide = GUIDES.find((g) => g.slug === 'usda-aphis-vehcs-guide');
      expect(vehcsGuide).toBeDefined();
      if (!vehcsGuide) return;

      const faqQuestions = vehcsGuide.faqs.map((f) => f.q);
      const faqAnswers = vehcsGuide.faqs.map((f) => f.a).join(' ');

      expect(faqQuestions).toContain('What is USDA APHIS VEHCS?');
      expect(faqAnswers).toContain('VEHCS APHIS');
      expect(faqAnswers).toContain('USDA APHIS VEHCS');
    });
  });

  describe('Priority 3: Global Country Dataset Completeness', () => {
    it('should ensure all destination country hubs have at least 3 statutory requirements', () => {
      const all = getAllCountries();
      expect(all.length).toBeGreaterThanOrEqual(15);

      for (const country of all) {
        expect(country.statutoryRequirements.length).toBeGreaterThanOrEqual(3);
        expect(country.authority).toBeTruthy();
        expect(country.authorityUrl.startsWith('https://') || country.authorityUrl.startsWith('http://')).toBe(true);
        expect(country.faqs.length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('Priority 4: Commercial Intent Keyword Optimization ("Pet Document Verification")', () => {
    it('should configure Pet Document Verification in homepage and checker metadata', async () => {
      const { metadata: homeMetadata } = await import('@/app/page');
      const { metadata: checkerMetadata } = await import('@/app/en/checker/layout');

      expect(homeMetadata.title).toContain('Pet Document Verification');
      expect(homeMetadata.description).toContain('pet document verification');

      expect(checkerMetadata.title).toContain('Pet Document Verification');
      expect(checkerMetadata.description).toContain('pet document verification');
    });
  });

  describe('Priority 5: Species-Specific Sub-Intent ("Cat Passport Canada")', () => {
    it('should provide comprehensive CFIA cat guidance and cat passport rules for Canada', () => {
      const canada = getCountryBySlug('canada');
      expect(canada).toBeDefined();
      if (!canada) return;

      expect(canada.catGuidance).toBeDefined();
      expect(canada.catGuidance?.headline).toContain('Cat Passport Canada');
      expect(canada.catGuidance?.rabiesRules).toContain('3 months of age');
      expect(canada.catGuidance?.quarantineRules).toContain('0 Days');
      expect(canada.catGuidance?.checklist.length).toBeGreaterThanOrEqual(4);

      const catFaq = canada.faqs.find((f) => f.q.toLowerCase().includes('cat passport'));
      expect(catFaq).toBeDefined();
      expect(catFaq?.a).toContain('CFIA');
    });
  });

  describe('Priority 6: Content Depth & Terminology Bridging ("Australian Pet Passport" & "Pet Travel to Australia")', () => {
    it('should bridge terminology and rank for both "Australian pet passport" and "pet travel to australia"', () => {
      const australia = getCountryBySlug('australia');
      expect(australia).toBeDefined();
      if (!australia) return;

      expect(australia.headline).toContain('Pet Travel to Australia');
      expect(australia.headline).toContain('Australian Pet Passport Guide');
      expect(australia.description.toLowerCase()).toContain('pet travel to australia');
      expect(australia.description.toLowerCase()).toContain('australian pet passport');
      expect(australia.certificateType).toContain('Australian Pet Passport');

      const passportFaq = australia.faqs.find((f) => f.q.includes('Australian Pet Passport'));
      expect(passportFaq).toBeDefined();
      expect(passportFaq?.a).toContain('DAFF');

      const travelFaq = australia.faqs.find((f) => f.q.includes('How do I travel to Australia with my pet?'));
      expect(travelFaq).toBeDefined();
      expect(travelFaq?.a).toContain('180-day');
      expect(travelFaq?.a).toContain('Mickleham');
    });

    it('should provide 8 statutory requirements matching Singapore & UK depth', () => {
      const australia = getCountryBySlug('australia');
      expect(australia?.statutoryRequirements.length).toBeGreaterThanOrEqual(8);

      const categories = australia?.statutoryRequirements.map((r) => r.category);
      expect(categories).toContain('MICROCHIP');
      expect(categories).toContain('TITER_TEST');
      expect(categories).toContain('IMPORT_PERMIT');
      expect(categories).toContain('QUARANTINE_BOOKING');
      expect(categories).toContain('CORE_VACCINES');
      expect(categories).toContain('DISEASE_TESTING');
      expect(categories).toContain('PARASITE_TREATMENT');
      expect(categories).toContain('HEALTH_CERTIFICATE');

      const diseaseReq = australia?.statutoryRequirements.find((r) => r.category === 'DISEASE_TESTING');
      expect(diseaseReq?.rules.join(' ')).toContain('Ehrlichia');
      expect(diseaseReq?.rules.join(' ')).toContain('Brucella');
      expect(diseaseReq?.rules.join(' ')).toContain('Leishmania');
    });

    it('should configure 6 inbound corridors and comprehensive Mickleham PEQ FAQs', () => {
      const australia = getCountryBySlug('australia');
      expect(australia?.inboundCorridors.length).toBeGreaterThanOrEqual(6);
      expect(australia?.faqs.length).toBeGreaterThanOrEqual(8);

      const corridorSlugs = australia?.inboundCorridors.map((c) => c.corridorSlug);
      expect(corridorSlugs).toContain('usa-to-australia');
      expect(corridorSlugs).toContain('uk-to-australia');
      expect(corridorSlugs).toContain('canada-to-australia');
      expect(corridorSlugs).toContain('singapore-to-australia');
      expect(corridorSlugs).toContain('new-zealand-to-australia');
      expect(corridorSlugs).toContain('india-to-australia');
    });
  });

  describe('Priority 7: Head Term Optimization ("Pet Travel Canada")', () => {
    it('should answer "How do I travel to Canada with my pet?" verbatim with 5-point CFIA protocol', () => {
      const canada = getCountryBySlug('canada');
      expect(canada).toBeDefined();
      if (!canada) return;

      expect(canada.headline).toContain('Pet Travel Canada');
      expect(canada.description.toLowerCase()).toContain('pet travel to canada');

      const verbatimFaq = canada.faqs.find((f) => f.q === 'How do I travel to Canada with my pet?');
      expect(verbatimFaq).toBeDefined();
      expect(verbatimFaq?.a).toContain('CFIA');
      expect(verbatimFaq?.a).toContain('ISO 11784/11785');
      expect(verbatimFaq?.a).toContain('0 days quarantine');

      expect(canada.statutoryRequirements.length).toBeGreaterThanOrEqual(5);
      expect(canada.inboundCorridors.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Priority 8: UK DEFRA Market Rebuilding ("Dog Import UK")', () => {
    it('should provide comprehensive DEFRA statutory detail, 8 rules, and dog import UK FAQs', () => {
      const uk = getCountryBySlug('united-kingdom');
      expect(uk).toBeDefined();
      if (!uk) return;

      expect(uk.headline).toContain('Dog Import UK');
      expect(uk.description).toContain('DEFRA');
      expect(uk.description).toContain('Heathrow Animal Reception Centre');

      expect(uk.statutoryRequirements.length).toBeGreaterThanOrEqual(8);
      expect(uk.inboundCorridors.length).toBeGreaterThanOrEqual(6);

      const dogImportFaq = uk.faqs.find((f) => f.q.includes('dog import to the UK'));
      expect(dogImportFaq).toBeDefined();
      expect(dogImportFaq?.a).toContain('DEFRA');
      expect(dogImportFaq?.a).toContain('Praziquantel');
      expect(dogImportFaq?.a).toContain('manifest cargo');

      const tapewormRule = uk.statutoryRequirements.find((r) => r.category === 'TAPEWORM_TREATMENT');
      expect(tapewormRule).toBeDefined();
      expect(tapewormRule?.rules.join(' ')).toContain('24 and 120 hours');
    });
  });

  describe('Priority 9: Canonical Hub for Head Term ("Pet Import")', () => {
    it('should configure /en/countries as the single canonical hub for "Pet Import"', async () => {
      const { metadata } = await import('@/app/en/countries/page');
      expect(metadata.title).toContain('Pet Import');
      expect(metadata.description?.toLowerCase()).toContain('pet import');
      expect(metadata.keywords).toContain('pet import');
      expect(metadata.keywords).toContain('pet import requirements');
    });

    it('should verify country page metadata includes "Pet Import" keywords and title', async () => {
      const { generateMetadata } = await import('@/app/en/countries/[country]/page');
      const meta = await generateMetadata({ params: Promise.resolve({ country: 'germany' }) });
      expect(meta.title).toContain('Import');
      expect((meta.keywords as string[])).toContain('pet import germany');
    });
  });

  describe('Section 6: Striking-Distance Keywords Validation (Positions 4–30)', () => {
    it('should map all striking-distance queries to existing canonical URLs without URL fragmentation', async () => {
      // 1. pet document verification (Pos 10.00) -> Homepage / Checker
      const { metadata: homeMeta } = await import('@/app/page');
      expect(homeMeta.title).toContain('Pet Document Verification');

      // 2. vehcs / usda aphis vehcs / vehcs aphis (Pos 16.57 - 18.00) -> VEHCS Guide
      const vehcsGuide = GUIDES.find((g) => g.slug === 'usda-aphis-vehcs-guide');
      expect(vehcsGuide).toBeDefined();
      expect(vehcsGuide?.faqs.some((f) => f.q === 'What is USDA APHIS VEHCS?')).toBe(true);

      // 3. cat passport canada (Pos 21.00) -> Canada Country Page (Cat Section)
      const canada = getCountryBySlug('canada');
      expect(canada?.catGuidance?.headline).toContain('Cat Passport Canada');

      // 4. australian pet passport (Pos 23.00) -> Australia Country Page (Bridge)
      const australia = getCountryBySlug('australia');
      expect(australia?.headline).toContain('Australian Pet Passport');
    });
  });

  describe('Section 7: Query → Page Mapping & Cannibalization Prevention', () => {
    it('should provide explicit USDA Endorsement Office FAQ in usda-aphis-vehcs-guide', () => {
      const vehcsGuide = GUIDES.find((g) => g.slug === 'usda-aphis-vehcs-guide');
      expect(vehcsGuide).toBeDefined();

      const officeFaq = vehcsGuide?.faqs.find((f) =>
        f.q.toLowerCase().includes('usda endorsement office')
      );
      expect(officeFaq).toBeDefined();
      expect(officeFaq?.a).toContain('Endorsement Service Centers');
      expect(officeFaq?.a).toContain('VEHCS');
    });

    it('should provide feline biosecurity depth and cat import FAQs for Singapore', () => {
      const sg = getCountryBySlug('singapore');
      expect(sg).toBeDefined();
      if (!sg) return;

      expect(sg.headline).toContain('Import Pet to Singapore');
      expect(sg.description.toLowerCase()).toContain('importing cats to singapore');
      expect(sg.catGuidance).toBeDefined();
      expect(sg.catGuidance?.headline).toContain('Cat Passport Singapore');
      expect(sg.catGuidance?.checklist.length).toBeGreaterThanOrEqual(5);

      const catFaq = sg.faqs.find((f) => f.q.toLowerCase().includes('importing cats to singapore'));
      expect(catFaq).toBeDefined();
      expect(catFaq?.a).toContain('FVRCP');

      const hdbCatFaq = sg.faqs.find((f) => f.q.toLowerCase().includes('cat management framework'));
      expect(hdbCatFaq).toBeDefined();
      expect(hdbCatFaq?.a).toContain('HDB');
    });

    it('should satisfy "bring a pet to canada" and "pet travel canada" on single Canada country page', () => {
      const ca = getCountryBySlug('canada');
      expect(ca).toBeDefined();
      if (!ca) return;

      expect(ca.description.toLowerCase()).toContain('bring a pet to canada');
      expect(ca.description.toLowerCase()).toContain('pet travel to canada');

      const bringPetFaq = ca.faqs.find((f) => f.q.toLowerCase().includes('bring a pet to canada'));
      expect(bringPetFaq).toBeDefined();
      expect(bringPetFaq?.a).toContain('CFIA');
    });

    it('should verify blog posts link to canonical guides and country hubs without cannibalization', async () => {
      const { BLOG_POSTS } = await import('@/lib/data/blog');
      expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(5);

      // USDA blog post links to VEHCS pillar guide and FAVN guide
      const usdaBlog = BLOG_POSTS.find((p) => p.slug === 'usda-pet-health-certificate-guide');
      expect(usdaBlog).toBeDefined();
      const usdaBlogText = usdaBlog?.sections.map((s) => s.paragraphs.join(' ')).join(' ') || '';
      expect(usdaBlogText).toContain('/en/guides/usda-aphis-vehcs-guide');
      expect(usdaBlogText).toContain('/en/guides/rabies-titer-test-favn-guide');

      // Titer waiting blog post links to FAVN pillar guide
      const titerBlog = BLOG_POSTS.find((p) => p.slug === 'how-long-to-travel-after-rabies-titer-test');
      expect(titerBlog).toBeDefined();
      const titerBlogText = titerBlog?.sections.map((s) => s.paragraphs.join(' ')).join(' ') || '';
      expect(titerBlogText).toContain('/en/guides/rabies-titer-test-favn-guide');

      // EU blog post links to VEHCS guide and EU countries
      const euBlog = BLOG_POSTS.find((p) => p.slug === 'eu-annex-iv-certificate-explained');
      expect(euBlog).toBeDefined();
      const euBlogText = euBlog?.sections.map((s) => s.paragraphs.join(' ')).join(' ') || '';
      expect(euBlogText).toContain('/en/guides/usda-aphis-vehcs-guide');
      expect(euBlogText).toContain('/en/countries/germany');
    });
  });

  describe('Section 8: Country Strategy & Depth Qualification Framework', () => {
    const HIGH_IMPRESSION_COUNTRIES = ['singapore', 'canada', 'united-kingdom', 'australia', 'united-arab-emirates', 'united-states', 'vietnam'];

    it('all high-impression country pages must pass the 7-point qualification framework', () => {
      for (const slug of HIGH_IMPRESSION_COUNTRIES) {
        const country = getCountryBySlug(slug);
        expect(country).toBeDefined();
        if (!country) continue;

        // 1. Species-specific rules (catGuidance)
        expect(country.catGuidance).toBeDefined();
        expect(country.catGuidance?.headline).toBeTruthy();
        expect(country.catGuidance?.checklist.length).toBeGreaterThanOrEqual(4);

        // 2. Full requirement checklist (at least 6-8 statutory items with category labels)
        expect(country.statutoryRequirements.length).toBeGreaterThanOrEqual(6);
        for (const req of country.statutoryRequirements) {
          expect(req.title).toBeTruthy();
          expect(req.rules.length).toBeGreaterThanOrEqual(1);
          expect(req.protocol).toBeTruthy();
        }

        // 3. Named government source with working authority link
        expect(country.authority).toBeTruthy();
        expect(country.authorityUrl).toMatch(/^https?:\/\//);

        // 4. Verification timestamp
        for (const req of country.statutoryRequirements) {
          expect(req.lastVerifiedAt).toContain('2026');
        }

        // 5. Inbound corridors configured for major origin routes
        expect(country.inboundCorridors.length).toBeGreaterThanOrEqual(4);

        // 6. Comprehensive FAQ block (at least 4-8 FAQs per market)
        expect(country.faqs.length).toBeGreaterThanOrEqual(4);
      }
    });

    it('should verify Vietnam country page has complete statutory depth', () => {
      const vn = getCountryBySlug('vietnam');
      expect(vn).toBeDefined();
      if (!vn) return;

      expect(vn.authority).toContain('Department of Animal Health');
      expect(vn.quarantineDays).toBe('0 Days Quarantine');
      expect(vn.titerStatus).toBe('exempt');
      expect(vn.statutoryRequirements.length).toBeGreaterThanOrEqual(6);
      expect(vn.faqs.length).toBeGreaterThanOrEqual(7);
      expect(vn.inboundCorridors.length).toBeGreaterThanOrEqual(4);
    });

    it('should verify UAE country page has 8 statutory requirements and manifest cargo mandate', () => {
      const uae = getCountryBySlug('united-arab-emirates');
      expect(uae).toBeDefined();
      if (!uae) return;

      expect(uae.statutoryRequirements.length).toBeGreaterThanOrEqual(8);
      expect(uae.faqs.length).toBeGreaterThanOrEqual(8);
      const cargoReq = uae.statutoryRequirements.find((r) => r.category === 'CARGO_LOGISTICS');
      expect(cargoReq).toBeDefined();
      expect(cargoReq?.rules.join(' ')).toContain('manifested cargo');
    });

    it('should verify US country page has 8 statutory requirements covering CDC Dog Import Rule', () => {
      const us = getCountryBySlug('united-states');
      expect(us).toBeDefined();
      if (!us) return;

      expect(us.statutoryRequirements.length).toBeGreaterThanOrEqual(8);
      expect(us.faqs.length).toBeGreaterThanOrEqual(8);
      const ageReq = us.statutoryRequirements.find((r) => r.category === 'AGE_REQUIREMENT');
      expect(ageReq).toBeDefined();
      expect(ageReq?.rules.join(' ')).toContain('6 months');
    });
  });
});
