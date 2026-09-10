import { describe, it, expect, vi } from 'vitest';
import { createMagicToken, verifyMagicToken } from '@/lib/auth/magicToken';

describe('Magic Link Authentication Token Engine', () => {
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
});
