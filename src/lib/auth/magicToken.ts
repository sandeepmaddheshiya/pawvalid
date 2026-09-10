import crypto from 'crypto';

const MAGIC_SECRET =
  process.env.CRON_SECRET ||
  process.env.RAZORPAY_WEBHOOK_SECRET ||
  'pawvalid_magic_auth_salt_969663bb0beb';

const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 60 minutes

export interface VerifyResult {
  valid: boolean;
  email?: string;
  error?: string;
}

/**
 * Creates a signed, time-limited magic login token for a given email address.
 * Format: <base64url_email>.<timestamp>.<signature>
 */
export function createMagicToken(email: string): string {
  const cleanEmail = email.toLowerCase().trim();
  const timestamp = Date.now().toString();
  const encodedEmail = Buffer.from(cleanEmail, 'utf8').toString('base64url');

  const payload = `${encodedEmail}.${timestamp}`;
  const signature = crypto
    .createHmac('sha256', MAGIC_SECRET)
    .update(payload)
    .digest('base64url');

  return `${payload}.${signature}`;
}

/**
 * Validates a signed magic login token.
 * Ensures the signature is authentic and the token has not expired.
 */
export function verifyMagicToken(token: string, expectedEmail?: string): VerifyResult {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token is missing or invalid' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Malformed token structure' };
  }

  const [encodedEmail, timestampStr, providedSignature] = parts;

  // Verify timestamp & expiration
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    return { valid: false, error: 'Invalid token timestamp' };
  }

  const age = Date.now() - timestamp;
  if (age < 0 || age > TOKEN_EXPIRY_MS) {
    return { valid: false, error: 'Magic link has expired. Please request a new one.' };
  }

  // Reconstruct and verify signature
  const payload = `${encodedEmail}.${timestampStr}`;
  const expectedSignature = crypto
    .createHmac('sha256', MAGIC_SECRET)
    .update(payload)
    .digest('base64url');

  try {
    const providedBuf = Buffer.from(providedSignature, 'utf8');
    const expectedBuf = Buffer.from(expectedSignature, 'utf8');

    if (
      providedBuf.length !== expectedBuf.length ||
      !crypto.timingSafeEqual(providedBuf, expectedBuf)
    ) {
      return { valid: false, error: 'Invalid token signature' };
    }
  } catch {
    return { valid: false, error: 'Security verification failure' };
  }

  // Decode email
  let decodedEmail: string;
  try {
    decodedEmail = Buffer.from(encodedEmail, 'base64url').toString('utf8').toLowerCase().trim();
  } catch {
    return { valid: false, error: 'Invalid encoded identity in token' };
  }

  if (expectedEmail) {
    const cleanExpected = expectedEmail.toLowerCase().trim();
    if (decodedEmail !== cleanExpected) {
      return { valid: false, error: 'Token does not match the provided email address' };
    }
  }

  return { valid: true, email: decodedEmail };
}
