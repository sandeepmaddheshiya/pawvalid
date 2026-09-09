import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getBrevoConfig,
  sendTransactionalEmail,
} from '@/lib/email/brevo';

describe('Brevo Transactional Email Engine', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('Configuration Handling', () => {
    it('identifies unconfigured state when API key is missing', () => {
      delete process.env.BREVO_API_KEY;
      const config = getBrevoConfig();
      expect(config.isConfigured).toBe(false);
      expect(config.apiKey).toBeUndefined();
    });

    it('identifies unconfigured state when API key does not start with xkeysib-', () => {
      process.env.BREVO_API_KEY = 'invalid-prefix-key-12345';
      const config = getBrevoConfig();
      expect(config.isConfigured).toBe(false);
    });

    it('identifies configured state with custom sender details', () => {
      process.env.BREVO_API_KEY = 'xkeysib-test-mock-key-value';
      process.env.BREVO_SENDER_EMAIL = 'custom@pawvalid.online';
      process.env.BREVO_SENDER_NAME = 'PawValid Priority Desk';

      const config = getBrevoConfig();
      expect(config.isConfigured).toBe(true);
      expect(config.apiKey).toBe('xkeysib-test-mock-key-value');
      expect(config.defaultSenderEmail).toBe('custom@pawvalid.online');
      expect(config.defaultSenderName).toBe('PawValid Priority Desk');
    });

    it('provides sensible defaults when sender env vars are omitted', () => {
      process.env.BREVO_API_KEY = 'xkeysib-test-mock-key-value';
      delete process.env.BREVO_SENDER_EMAIL;
      delete process.env.BREVO_SENDER_NAME;

      const config = getBrevoConfig();
      expect(config.isConfigured).toBe(true);
      expect(config.defaultSenderEmail).toBe('hdmoviesxyz@gmail.com');
      expect(config.defaultSenderName).toBe('PawValid Compliance');
    });
  });

  describe('Mock Mode Fallback', () => {
    it('gracefully returns mocked result when Brevo is unconfigured', async () => {
      delete process.env.BREVO_API_KEY;
      const fetchSpy = vi.spyOn(globalThis, 'fetch');

      const result = await sendTransactionalEmail({
        to: 'traveler@example.com',
        subject: 'Your Travel Pass Ready',
        htmlContent: '<p>Passport attached</p>',
      });

      expect(result.success).toBe(true);
      expect(result.mocked).toBe(true);
      expect(result.messageId).toContain('mock-brevo-');
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  describe('API Delivery & Payload Serialization', () => {
    beforeEach(() => {
      process.env.BREVO_API_KEY = 'xkeysib-active-key-test';
      process.env.BREVO_SENDER_EMAIL = 'hdmoviesxyz@gmail.com';
      process.env.BREVO_SENDER_NAME = 'PawValid Compliance';
    });

    it('serializes single recipient, custom replyTo, and HTML content', async () => {
      const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ messageId: '<20260909.12345@smtp-relay.mailin.fr>' }),
      } as Response);

      const result = await sendTransactionalEmail({
        to: 'owner@pawvalid.online',
        subject: 'Travel Docket Certified',
        htmlContent: '<h1>Certified</h1>',
        textContent: 'Certified',
        replyTo: { email: 'help@pawvalid.online', name: 'PawValid Support' },
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('<20260909.12345@smtp-relay.mailin.fr>');
      expect(mockFetch).toHaveBeenCalledTimes(1);

      const [url, requestInit] = mockFetch.mock.calls[0];
      expect(url).toBe('https://api.brevo.com/v3/smtp/email');
      expect(requestInit?.headers).toMatchObject({
        'api-key': 'xkeysib-active-key-test',
        'Content-Type': 'application/json',
      });

      const body = JSON.parse(requestInit?.body as string);
      expect(body.sender).toEqual({
        name: 'PawValid Compliance',
        email: 'hdmoviesxyz@gmail.com',
      });
      expect(body.to).toEqual([{ email: 'owner@pawvalid.online' }]);
      expect(body.subject).toBe('Travel Docket Certified');
      expect(body.htmlContent).toBe('<h1>Certified</h1>');
      expect(body.textContent).toBe('Certified');
      expect(body.replyTo).toEqual({
        email: 'help@pawvalid.online',
        name: 'PawValid Support',
      });
    });

    it('handles recipient arrays with optional names and attachments', async () => {
      const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ messageId: '<test-id-batch>' }),
      } as Response);

      const result = await sendTransactionalEmail({
        to: [
          { email: 'specialist1@pawvalid.online', name: 'Dr. Jane' },
          { email: 'specialist2@pawvalid.online' },
        ],
        subject: 'Urgent Triage Request',
        htmlContent: '<p>Triage</p>',
        attachment: [
          { name: 'vet_sheet.pdf', content: 'JVBERi0xLjQK...' },
        ],
      });

      expect(result.success).toBe(true);
      const body = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(body.to).toHaveLength(2);
      expect(body.to[0]).toEqual({ email: 'specialist1@pawvalid.online', name: 'Dr. Jane' });
      expect(body.to[1]).toEqual({ email: 'specialist2@pawvalid.online' });
      expect(body.attachment).toEqual([
        { name: 'vet_sheet.pdf', content: 'JVBERi0xLjQK...' },
      ]);
    });

    it('captures Brevo API error responses with descriptive message', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          code: 'invalid_parameter',
          message: 'Sender email not authorized on account',
        }),
      } as Response);

      const result = await sendTransactionalEmail({
        to: 'test@example.com',
        subject: 'Test',
        htmlContent: '<p>Test</p>',
      });

      expect(result.success).toBe(false);
      expect(result.status).toBe(400);
      expect(result.error).toBe('Sender email not authorized on account');
    });

    it('handles network exceptions without crashing', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Connection timed out'));

      const result = await sendTransactionalEmail({
        to: 'test@example.com',
        subject: 'Test',
        htmlContent: '<p>Test</p>',
      });

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.error).toContain('Connection timed out');
    });
  });
});
