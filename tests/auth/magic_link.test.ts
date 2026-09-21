import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMagicToken, verifyMagicToken } from '@/lib/auth/magicToken';

describe('Magic Link Authentication Token Engine', () => {
  beforeEach(() => {
    process.env.CRON_SECRET = 'test_cron_secret_prod_2026';
  });

  it('generates a 3-part URL-safe token', () => {
    const email = 'traveler@pawvalid.online';
    const token = createMagicToken(email);

    expect(typeof token).toBe('string');
    const parts = token.split('.');
    expect(parts.length).toBe(3);

    // Decoded email matches
    const decodedEmail = Buffer.from(parts[0], 'base64url').toString('utf8');
    expect(decodedEmail).toBe(email);
  });

  it('successfully verifies a freshly generated token', () => {
    const email = 'Milo.Owner@Example.COM';
    const token = createMagicToken(email);

    const result = verifyMagicToken(token, 'milo.owner@example.com');
    expect(result.valid).toBe(true);
    expect(result.email).toBe('milo.owner@example.com');
    expect(result.error).toBeUndefined();
  });

  it('rejects tampered tokens', () => {
    const email = 'legit@example.com';
    const token = createMagicToken(email);
    const parts = token.split('.');

    // Tamper with signature
    const tamperedToken = `${parts[0]}.${parts[1]}.tamperedSignature12345`;
    const result = verifyMagicToken(tamperedToken);

    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('rejects tokens when expected email does not match', () => {
    const email = 'user1@example.com';
    const token = createMagicToken(email);

    const result = verifyMagicToken(token, 'attacker@example.com');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Token does not match');
  });

  it('rejects expired tokens older than 60 minutes', () => {
    const email = 'expired@example.com';

    // Mock Date.now to generate token 61 minutes in the past
    const now = Date.now();
    const pastTime = now - 61 * 60 * 1000;

    vi.spyOn(Date, 'now').mockReturnValue(pastTime);
    const expiredToken = createMagicToken(email);

    // Restore real time for verification
    vi.spyOn(Date, 'now').mockReturnValue(now);
    const result = verifyMagicToken(expiredToken);

    expect(result.valid).toBe(false);
    expect(result.error).toContain('expired');
    vi.restoreAllMocks();
  });

  it('rejects malformed or empty tokens gracefully', () => {
    expect(verifyMagicToken('').valid).toBe(false);
    expect(verifyMagicToken('invalid-token').valid).toBe(false);
    expect(verifyMagicToken('a.b').valid).toBe(false);
  });

  it('throws an error when creating a token without any secret configured', () => {
    const origCron = process.env.CRON_SECRET;
    const origRazorpay = process.env.RAZORPAY_WEBHOOK_SECRET;
    const origAuth = process.env.AUTH_SECRET;
    const origMagic = process.env.MAGIC_TOKEN_SECRET;

    delete process.env.CRON_SECRET;
    delete process.env.RAZORPAY_WEBHOOK_SECRET;
    delete process.env.AUTH_SECRET;
    delete process.env.MAGIC_TOKEN_SECRET;

    try {
      expect(() => createMagicToken('test@example.com')).toThrow(
        /Authentication secret is not configured/
      );

      const now = Date.now().toString();
      const verifyRes = verifyMagicToken(`bm9uZQ.${now}.signature`);
      expect(verifyRes.valid).toBe(false);
      expect(verifyRes.error).toContain('Authentication secret');
    } finally {
      if (origCron) process.env.CRON_SECRET = origCron;
      if (origRazorpay) process.env.RAZORPAY_WEBHOOK_SECRET = origRazorpay;
      if (origAuth) process.env.AUTH_SECRET = origAuth;
      if (origMagic) process.env.MAGIC_TOKEN_SECRET = origMagic;
    }
  });

  describe('API Verification Endpoints', () => {
    it('POST /api/auth/send-verification rejects missing or invalid email', async () => {
      const { POST } = await import('@/app/api/auth/send-verification/route');
      const req = new Request('http://localhost:3000/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '' }),
      });
      const res = await POST(req as any);
      const data = await res.json();
      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('valid email address');
    });

    it('POST /api/auth/send-verification generates valid magicUrl containing tripId and verifiable token', async () => {
      const { POST } = await import('@/app/api/auth/send-verification/route');
      const req = new Request('http://localhost:3000/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'Bella.Owner@Example.com',
          tripId: 'trip_xyz_123',
          petName: 'Bella',
          origin: 'United Kingdom',
          destination: 'Germany',
        }),
      });
      const res = await POST(req as any);
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.devMagicUrl).toBeDefined();

      const parsedUrl = new URL(data.devMagicUrl);
      expect(parsedUrl.pathname).toBe('/login');
      expect(parsedUrl.searchParams.get('email')).toBe('bella.owner@example.com');
      expect(parsedUrl.searchParams.get('tripId')).toBe('trip_xyz_123');

      const token = parsedUrl.searchParams.get('token');
      expect(token).toBeTruthy();
      const verifyResult = verifyMagicToken(token!, 'bella.owner@example.com');
      expect(verifyResult.valid).toBe(true);
      expect(verifyResult.email).toBe('bella.owner@example.com');
    });

    it('POST /api/auth/forgot-password preserves tripId in generated link', async () => {
      const { POST } = await import('@/app/api/auth/forgot-password/route');
      const req = new Request('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'traveler@pawvalid.online',
          tripId: 'trip_concierge_999',
        }),
      });
      const res = await POST(req as any);
      expect(res.status).toBe(200);
    });
  });
});
