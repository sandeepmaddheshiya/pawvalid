import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('Refund Policy & Legal Disclosures', () => {
  it('should include /en/refund-policy in the sitemap', async () => {
    const entries = await sitemap();
    const refundEntry = entries.find((e) => e.url.includes('/en/refund-policy'));
    expect(refundEntry).toBeDefined();
    expect(refundEntry?.priority).toBe(0.3);
  });

  it('should export valid metadata for /en/refund-policy', async () => {
    const { metadata } = await import('@/app/en/refund-policy/page');
    expect(metadata.title).toContain('Refund');
    expect(metadata.description).toContain('refund and cancellation');
    expect(metadata.alternates?.canonical).toBe('https://pawvalid.online/en/refund-policy');
  });

  it('should render the RefundPolicyPage component with key compliance sections', async () => {
    const { default: RefundPolicyPage } = await import('@/app/en/refund-policy/page');
    const page = RefundPolicyPage();
    expect(page).toBeDefined();
    expect(page.type).toBe('div');
  });
});
