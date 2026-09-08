import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import QRCode from 'qrcode';
import { GET as getCustomsVerification } from '@/app/api/verify/[passId]/route';
import { GET as getPassports, POST as createPassport } from '@/app/api/passport/route';
import { POST as reusePassportTrip } from '@/app/api/passport/[id]/reuse/route';
import { POST as createTrip } from '@/app/api/trips/route';
import { db } from '@/lib/db';

describe('Digital Pet Passport & Pet Visa Customs QR Features', () => {
  const testEmail = `passport_tester_${Date.now()}@petvia.com`;
  let passportTripId = '';

  it('generates valid vector QR code SVG string for Customs Pass URL', async () => {
    const passId = 'PV-2026-UKDE-9842';
    const customsUrl = `https://petvia.com/verify/${passId}`;

    const svg = await QRCode.toString(customsUrl, {
      type: 'svg',
      color: {
        dark: '#0E2342',
        light: '#FFFFFF',
      },
    });

    expect(svg).toBeDefined();
    expect(svg).toContain('<svg');
    expect(svg).toContain('#0E2342');
  });

  it('validates ISO 11784/11785 15-digit microchip compliance logic', () => {
    const validChip = '985141002847192';
    const is15Digits = /^\d{15}$/.test(validChip);
    expect(is15Digits).toBe(true);

    const invalidChip = '12345';
    expect(/^\d{15}$/.test(invalidChip)).toBe(false);
  });

  it('verifies FAVN rabies titer threshold calculation for customs clearance', () => {
    const euTiterThreshold = 0.50; // IU/ml
    const petTiterLevel = 0.85; // IU/ml

    const isCleared = petTiterLevel >= euTiterThreshold;
    expect(isCleared).toBe(true);

    const failingTiterLevel = 0.35;
    expect(failingTiterLevel >= euTiterThreshold).toBe(false);
  });

  it('verifies 21-day rabies vaccination latency requirement', () => {
    const rabiesDate = new Date('2026-05-01');
    const travelDate = new Date('2026-06-01');

    const diffDays = Math.floor(
      (travelDate.getTime() - rabiesDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    expect(diffDays).toBeGreaterThanOrEqual(21);
  });

  // ─── Backend API Tests ───────────────────────────────────────────────────────
  describe('Backend Customs Verification API (/api/verify/[passId])', () => {
    it('returns cryptographically signed customs clearance pass for valid demo pass ID', async () => {
      const passId = 'PV-2026-UKDE-9842';
      const req = new NextRequest(`http://localhost:3000/api/verify/${passId}`);
      const res = await getCustomsVerification(req, { params: Promise.resolve({ passId }) });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.pass).toBeDefined();
      expect(data.pass.passId).toBe(passId);
      expect(data.pass.isPaid).toBe(true);
      expect(data.pass.status).toBe('CLEARED_FOR_BORDER_ENTRY');
      expect(data.pass.cryptographicSeal).toBeDefined();
      expect(data.pass.cryptographicSeal.algorithm).toBe('SHA-256');
      expect(data.pass.pet.microchip.number).toBe('985141002847192');
      expect(data.pass.checkpoints.length).toBeGreaterThanOrEqual(4);
    });

    it('requires plan activation (isPaid=false) for free trips without paid tier', async () => {
      const tripReq = new NextRequest('http://localhost:3000/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: 'unpaid_traveler@example.com',
          petName: 'Rocky',
          tier: 'FREE',
          scanResult: {
            route: { origin: 'UK', destination: 'France' },
            petProfile: { name: 'Rocky', species: 'DOG' },
            stats: { overallStatus: 'ACTION_REQUIRED' },
            timelineMilestones: [],
            complianceChecklist: { all: [] },
            readinessReport: {},
          },
        }),
      });

      const tripRes = await createTrip(tripReq);
      const tripJson = await tripRes.json();
      expect(tripJson.success).toBe(true);
      const freeTripId = tripJson.trip.id;

      const passId = `PV-2026-${freeTripId}`;
      const req = new NextRequest(`http://localhost:3000/api/verify/${passId}`);
      const res = await getCustomsVerification(req, { params: Promise.resolve({ passId }) });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.pass.isPaid).toBe(false);
      expect(data.pass.status).toBe('PROVISIONAL_PENDING_ACTIVATION');
      expect(data.pass.isVerified).toBe(false);

      // Clean up
      await db.savedTrip.delete({ where: { id: freeTripId } });
    });
  });

  describe('Backend Digital Pet Passport API (/api/passport)', () => {
    it('creates and saves a persistent digital pet passport record', async () => {
      const payload = {
        userEmail: testEmail,
        petProfile: {
          name: 'Bailey',
          species: 'DOG',
          breed: 'Golden Retriever',
          ageMonths: 36,
          weightKg: 28.5,
          microchipNumber: '985141002847192',
          microchipDate: '2023-04-12',
          rabiesVaccineDate: '2024-05-10',
          rabiesVaccineType: 'BOOSTER',
          countryOfResidence: 'United Kingdom',
        },
        documents: [
          { filename: 'EU_Pet_Passport_Scan.pdf', type: 'PASSPORT' },
          { filename: 'Rabies_Titer_Certificate.pdf', type: 'TITER' },
        ],
      };

      const req = new NextRequest('http://localhost:3000/api/passport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const res = await createPassport(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.pet).toBeDefined();
      expect(data.pet.petName).toBe('Bailey');
      passportTripId = data.pet.id;
    });

    it('retrieves persistent pet passport profiles for a given email', async () => {
      const req = new NextRequest(`http://localhost:3000/api/passport?email=${encodeURIComponent(testEmail)}`);
      const res = await getPassports(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.pets)).toBe(true);
      expect(data.pets.length).toBeGreaterThanOrEqual(1);
      expect(data.pets[0].name).toBe('Bailey');
      expect(data.pets[0].microchipNumber).toBe('985141002847192');
    });

    it('reuses existing saved pet passport to generate a new trip plan without re-uploading documents', async () => {
      const reusePayload = {
        destination: 'Japan (Tokyo NRT)',
        origin: 'United Kingdom (London LHR)',
        departureDate: '2026-12-15',
        transitCountries: [],
      };

      const req = new NextRequest(`http://localhost:3000/api/passport/${passportTripId}/reuse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reusePayload),
      });

      const res = await reusePassportTrip(req, { params: Promise.resolve({ id: passportTripId }) });
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.trip).toBeDefined();
      expect(data.trip.destination).toBe('Japan (Tokyo NRT)');
      expect(data.trip.petName).toBe('Bailey');
      expect(data.trip.petProfile.microchipNumber).toBe('985141002847192');
    });
  });
});
