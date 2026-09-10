import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  wrapPawValidEmail,
  sendWelcomeEmail,
  sendMagicAuthLinkEmail,
  sendTripSummaryEmail,
  sendConciergeConfirmationEmail,
  sendPurchaseReceiptEmail,
} from '@/lib/email/templates';

describe('PawValid Consolidated Email Templates', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    // Force mock mode so tests don't make real outbound Brevo API calls
    delete process.env.BREVO_API_KEY;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('wrapPawValidEmail Layout', () => {
    it('wraps HTML content with standard branding, header, and preheader', () => {
      const html = wrapPawValidEmail({
        title: 'Test Email Title',
        preheader: 'This is a test preheader.',
        contentHtml: '<p>Test message body content</p>',
      });

      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('Paw<span class="brand-accent">Valid</span>');
      expect(html).toContain('This is a test preheader.');
      expect(html).toContain('Test message body content');
    });

    it('always includes independent compliance disclaimer in footer', () => {
      const html = wrapPawValidEmail({
        title: 'Disclaimer Check',
        preheader: 'Preheader',
        contentHtml: '<p>Content</p>',
      });

      expect(html).toContain('PawValid is an independent travel preparation tool');
      expect(html).toContain('support@pawvalid.online');
    });
  });

  describe('1. sendWelcomeEmail', () => {
    it('dispatches welcome email with custom name and dashboard link', async () => {
      const res = await sendWelcomeEmail('test@example.com', 'Alex');

      expect(res.success).toBe(true);
      expect(res.messageId).toContain('mock-');
    });

    it('dispatches welcome email gracefully without a name', async () => {
      const res = await sendWelcomeEmail('test@example.com');

      expect(res.success).toBe(true);
    });
  });

  describe('2. sendMagicAuthLinkEmail', () => {
    it('dispatches magic auth link email with correct action URL', async () => {
      const magicUrl = 'https://pawvalid.online/login?token=abc.123.def&email=test%40example.com';
      const res = await sendMagicAuthLinkEmail('test@example.com', magicUrl);

      expect(res.success).toBe(true);
      expect(res.messageId).toContain('mock-');
    });
  });

  describe('3. sendTripSummaryEmail', () => {
    it('dispatches trip summary with route, pet profile, and earliest flight date', async () => {
      const res = await sendTripSummaryEmail({
        id: 'trip-12345',
        userEmail: 'traveler@example.com',
        petName: 'Milo',
        species: 'DOG',
        breed: 'Golden Retriever',
        origin: 'United Kingdom',
        destination: 'Germany',
        departureDate: '2026-10-15',
        overallStatus: 'ACTION_REQUIRED',
        earliestFlightDate: '2026-10-01',
        actionItemCount: 3,
      });

      expect(res.success).toBe(true);
      expect(res.messageId).toContain('mock-');
    });
  });

  describe('4. sendConciergeConfirmationEmail', () => {
    it('dispatches confirmation to traveler with WhatsApp liaison timeline', async () => {
      const trip = {
        id: 'trip-concierge-1',
        userEmail: 'vip@example.com',
        petName: 'Bella',
        species: 'CAT',
        breed: 'Siamese',
        origin: 'United States',
        destination: 'United Kingdom',
      };

      const res = await sendConciergeConfirmationEmail(trip, '+44 7700 900077');

      expect(res.success).toBe(true);
      expect(res.messageId).toContain('mock-');
    });
  });

  describe('5. sendPurchaseReceiptEmail', () => {
    it('dispatches Certified Pass purchase receipt with dynamic pricing', async () => {
      const trip = {
        id: 'trip-pass-1',
        userEmail: 'buyer@example.com',
        petName: 'Rocky',
        species: 'DOG',
        origin: 'France',
        destination: 'Spain',
      };

      const res = await sendPurchaseReceiptEmail({
        trip,
        paymentId: 'pay_ABC123456',
        amount: 1900,
        currency: 'GBP',
        targetTier: 'CERTIFIED_PASS',
        recipientEmail: 'buyer@example.com',
      });

      expect(res.success).toBe(true);
      expect(res.messageId).toContain('mock-');
    });

    it('dispatches Concierge Review purchase receipt with dynamic pricing', async () => {
      const trip = {
        id: 'trip-concierge-2',
        userEmail: 'vip2@example.com',
        petName: 'Luna',
        species: 'CAT',
        origin: 'USA',
        destination: 'Japan',
      };

      const res = await sendPurchaseReceiptEmail({
        trip,
        paymentId: 'pay_XYZ789012',
        amount: 5900,
        currency: 'GBP',
        targetTier: 'CONCIERGE',
        recipientEmail: 'vip2@example.com',
      });

      expect(res.success).toBe(true);
      expect(res.messageId).toContain('mock-');
    });
  });
});
