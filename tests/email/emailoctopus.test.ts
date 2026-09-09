import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getEmailOctopusContactId,
  getEmailOctopusConfig,
  upsertContact,
  queueAutomation,
  syncTravelerToEmailOctopus,
  testEmailOctopusConnection,
} from '@/lib/email/emailoctopus';

describe('EmailOctopus v2 API Integration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('Contact ID & MD5 Hashing', () => {
    it('generates consistent MD5 hash for lowercase trimmed email', () => {
      const email = 'Traveler@PawValid.Online ';
      const hash = getEmailOctopusContactId(email);

      // MD5 of "traveler@pawvalid.online"
      expect(hash).toBeDefined();
      expect(hash).toHaveLength(32);
      expect(hash).toMatch(/^[a-f0-9]{32}$/);
      expect(hash).toBe(getEmailOctopusContactId('traveler@pawvalid.online'));
    });

    it('matches known test vectors', () => {
      // MD5 of "otto@example.com"
      expect(getEmailOctopusContactId('otto@example.com')).toBe('fe5406045b18b2d2377f81bcfed84cf7');
    });
  });

  describe('Configuration Handling', () => {
    it('identifies unconfigured state when API key is missing', () => {
      delete process.env.EMAILOCTOPUS_API_KEY;
      const config = getEmailOctopusConfig();
      expect(config.isConfigured).toBe(false);
      expect(config.apiKey).toBeUndefined();
    });

    it('identifies configured state when valid API key is present', () => {
      process.env.EMAILOCTOPUS_API_KEY = 'eo_live_secret_key_12345';
      process.env.EMAILOCTOPUS_LIST_ID = 'list_abc_987';
      process.env.EMAILOCTOPUS_AUTOMATION_ONBOARDING_ID = 'auto_onboard_1';
      process.env.EMAILOCTOPUS_AUTOMATION_PAID_ID = 'auto_paid_1';

      const config = getEmailOctopusConfig();
      expect(config.isConfigured).toBe(true);
      expect(config.apiKey).toBe('eo_live_secret_key_12345');
      expect(config.listId).toBe('list_abc_987');
      expect(config.onboardingAutomationId).toBe('auto_onboard_1');
      expect(config.paidAutomationId).toBe('auto_paid_1');
    });
  });

  describe('Mock & Safe Fallback Mode (No API Key)', () => {
    it('gracefully mocks contact upsert without network errors', async () => {
      delete process.env.EMAILOCTOPUS_API_KEY;
      const res = await upsertContact('test-list-id', {
        email_address: 'sarah@example.com',
        fields: { PetName: 'Bailey', Tier: 'FREE' },
        tags: { traveler: true, free_scanner: true },
        status: 'subscribed',
      });

      expect(res.success).toBe(true);
      expect(res.mocked).toBe(true);
      expect(res.contactId).toBe(getEmailOctopusContactId('sarah@example.com'));
    });

    it('gracefully mocks automation queuing without network errors', async () => {
      delete process.env.EMAILOCTOPUS_API_KEY;
      const res = await queueAutomation('auto_onboarding_123', 'sarah@example.com');

      expect(res.success).toBe(true);
      expect(res.mocked).toBe(true);
      expect(res.queued).toBe(true);
    });
  });

  describe('Traveler Sync Logic (syncTravelerToEmailOctopus)', () => {
    it('skips transient @guest. placeholder emails to protect list hygiene', async () => {
      const res = await syncTravelerToEmailOctopus({
        userEmail: 'guest_1788975939_ab12c@guest.pawvalid.online',
        petName: 'Rex',
      });

      expect(res.success).toBe(true);
      expect(res.error).toBe('Skipped guest placeholder email');
    });

    it('correctly maps pet profile and certified pass tier tags', async () => {
      delete process.env.EMAILOCTOPUS_API_KEY;
      const trip = {
        id: 'clt9842abcdef123456789',
        userEmail: 'traveler@pawvalid.online',
        petName: 'Bailey',
        species: 'DOG',
        origin: 'United Kingdom (London LHR)',
        destination: 'Germany (Frankfurt FRA)',
        departureDate: '2026-06-15',
        tier: 'CERTIFIED_PASS',
      };

      const res = await syncTravelerToEmailOctopus(trip, { isPaid: true });
      expect(res.success).toBe(true);
      expect(res.contactId).toBe(getEmailOctopusContactId('traveler@pawvalid.online'));
    });

    it('correctly tags VIP concierge tier customers', async () => {
      delete process.env.EMAILOCTOPUS_API_KEY;
      const trip = {
        id: 'clt1111abcdef123456789',
        userEmail: 'vip_traveler@example.com',
        petName: 'Cooper',
        species: 'CAT',
        origin: 'United States',
        destination: 'United Kingdom',
        tier: 'CONCIERGE',
      };

      const res = await syncTravelerToEmailOctopus(trip, { isPaid: true, tag: 'priority_intake' });
      expect(res.success).toBe(true);
    });
  });

  describe('Diagnostic Connection Helper', () => {
    it('returns informative unconfigured status when API key is not present', async () => {
      delete process.env.EMAILOCTOPUS_API_KEY;
      const status = await testEmailOctopusConnection();

      expect(status.configured).toBe(false);
      expect(status.message).toContain('EMAILOCTOPUS_API_KEY is not set');
    });

    it('attempts GET /lists when configured and handles mock/network responses', async () => {
      process.env.EMAILOCTOPUS_API_KEY = 'test_token';
      process.env.EMAILOCTOPUS_LIST_ID = 'test_list_id';

      // Mock global fetch for EmailOctopus /lists
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          data: [
            { id: 'test_list_id', name: 'PawValid Travelers' },
            { id: 'secondary_list', name: 'Newsletter' },
          ],
        }),
      });
      global.fetch = mockFetch;

      const status = await testEmailOctopusConnection();
      expect(status.configured).toBe(true);
      expect(status.connected).toBe(true);
      expect(status.listCount).toBe(2);
      expect(status.targetListFound).toBe(true);
    });
  });
});
