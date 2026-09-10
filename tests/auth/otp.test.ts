import { describe, it, expect, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as sendOtpRoute } from '@/app/api/auth/otp/send/route';
import { POST as verifyOtpRoute } from '@/app/api/auth/otp/verify/route';
import { db } from '@/lib/db';

describe('OTP Authentication Engine', () => {
  const testEmail = `otp_test_${Date.now()}@pawvalid.online`;

  beforeEach(async () => {
    await db.otpVerification.deleteMany({ where: { email: testEmail } });
    await db.user.deleteMany({ where: { email: testEmail } });
  });

  it('should reject invalid or missing email when requesting OTP', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalid-email' }),
    });

    const res = await sendOtpRoute(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('valid email address');
  });

  it('should generate and store a 6-digit OTP code with 10-minute expiry', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail }),
    });

    const res = await sendOtpRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.devOtp).toBeDefined();
    expect(data.devOtp).toMatch(/^\d{6}$/);

    const savedRecord = await db.otpVerification.findFirst({
      where: { email: testEmail },
    });
    expect(savedRecord).not.toBeNull();
    expect(savedRecord?.code).toBe(data.devOtp);
    expect(savedRecord!.expiresAt.getTime()).toBeGreaterThan(Date.now() + 8 * 60 * 1000);
  });

  it('should reject incorrect OTP code', async () => {
    // Generate valid OTP
    await db.otpVerification.create({
      data: {
        email: testEmail,
        code: '123456',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    const req = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, code: '999999' }),
    });

    const res = await verifyOtpRoute(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('Invalid verification code');
  });

  it('should reject expired OTP code', async () => {
    // Generate expired OTP
    await db.otpVerification.create({
      data: {
        email: testEmail,
        code: '654321',
        expiresAt: new Date(Date.now() - 5000), // expired 5 seconds ago
      },
    });

    const req = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, code: '654321' }),
    });

    const res = await verifyOtpRoute(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('expired');
  });

  it('should verify valid OTP, auto-create User account, and clear single-use token', async () => {
    // Generate valid OTP
    await db.otpVerification.create({
      data: {
        email: testEmail,
        code: '789123',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    const req = new NextRequest('http://localhost:3000/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, code: '789123' }),
    });

    const res = await verifyOtpRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.userEmail).toBe(testEmail);
    expect(data.user).toBeDefined();

    // Verify User model in DB
    const userInDb = await db.user.findUnique({ where: { email: testEmail } });
    expect(userInDb).not.toBeNull();
    expect(userInDb?.email).toBe(testEmail);

    // Verify OTP token was deleted (single-use protection)
    const tokenLeft = await db.otpVerification.findFirst({ where: { email: testEmail } });
    expect(tokenLeft).toBeNull();
  });
});
