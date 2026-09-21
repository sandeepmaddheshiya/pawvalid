import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BLOG_POSTS } from '@/lib/data/blog';
import sitemap from '@/app/sitemap';

describe('Evidence-Based Regulatory Blog (Item 24)', () => {
  const originalEnv = process.env.NEXT_PUBLIC_APP_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://pawvalid.online';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = originalEnv;
  });

  it('contains exactly 5 high-intent compliance articles with verified schemas', () => {
    expect(BLOG_POSTS).toHaveLength(5);
    const slugs = BLOG_POSTS.map((p) => p.slug);

    expect(slugs).toContain('usda-pet-health-certificate-guide');
    expect(slugs).toContain('pet-rejected-at-airport-what-to-do');
    expect(slugs).toContain('pet-travel-from-india-step-by-step');
    expect(slugs).toContain('eu-annex-iv-certificate-explained');
    expect(slugs).toContain('how-long-to-travel-after-rabies-titer-test');
  });

  it('ensures zero thin content: each article has substantive word count, sections, and FAQs', () => {
    for (const post of BLOG_POSTS) {
      expect(post.title.length).toBeGreaterThan(30);
      expect(post.description.length).toBeGreaterThan(80);
      expect(post.summary.length).toBeGreaterThan(100);
      expect(post.sections.length).toBeGreaterThanOrEqual(3);
      expect(post.keyTakeaways.length).toBeGreaterThanOrEqual(3);
      expect(post.faqs.length).toBeGreaterThanOrEqual(2);
      expect(post.author.name).toBeTruthy();
      expect(post.author.role).toBeTruthy();

      const totalWords = post.sections
        .flatMap((s) => s.paragraphs)
        .join(' ')
        .split(/\s+/).length;
      expect(totalWords, `Article ${post.slug} must be substantive`).toBeGreaterThanOrEqual(300);
    }
  });

  it('indexes all 5 blog posts and 3 calculator tools in sitemap.xml', async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    // Hub pages
    expect(urls).toContain('https://pawvalid.online/en/tools');
    expect(urls).toContain('https://pawvalid.online/en/blog');

    // Calculators
    expect(urls).toContain('https://pawvalid.online/en/tools/rabies-waiting-period-calculator');
    expect(urls).toContain('https://pawvalid.online/en/tools/favn-titer-calculator');
    expect(urls).toContain('https://pawvalid.online/en/tools/quarantine-risk-checker');

    // Blog articles
    expect(urls).toContain('https://pawvalid.online/en/blog/usda-pet-health-certificate-guide');
    expect(urls).toContain('https://pawvalid.online/en/blog/pet-rejected-at-airport-what-to-do');
    expect(urls).toContain('https://pawvalid.online/en/blog/pet-travel-from-india-step-by-step');
    expect(urls).toContain('https://pawvalid.online/en/blog/eu-annex-iv-certificate-explained');
    expect(urls).toContain('https://pawvalid.online/en/blog/how-long-to-travel-after-rabies-titer-test');
  });
});
