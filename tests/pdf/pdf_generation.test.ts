import { describe, it, expect } from 'vitest';
import {
  generateVetSheetHtml,
  generatePassportHtml,
  generateVerificationPassHtml,
  generatePdfFromHtml,
} from '@/lib/pdf/generator';

describe('Server-Side PDF Binary Generation', () => {
  it('should generate valid Veterinary Clinic Sheet HTML template', () => {
    const html = generateVetSheetHtml({
      petName: 'Bella',
      species: 'Canine',
      breed: 'Golden Retriever',
      destination: 'Germany',
      origin: 'United Kingdom',
      microchip: '985141002847192',
      userEmail: 'traveler@example.com',
    });

    expect(html).toContain('Bella');
    expect(html).toContain('985141002847192');
    expect(html).toContain('MANDATORY MICROCHIP SCANNING SEQUENCE');
    expect(html).toContain('ECHINOCOCCUS MULTILOCULARIS (TAPEWORM)');
    expect(html).toContain('Praziquantel');
    expect(html).toContain('Attending Veterinarian Attestation');
    expect(html).toContain('AFFIX VETERINARY');
  });

  it('should generate valid Digital Pet Passport HTML template with embedded QR code', async () => {
    const html = await generatePassportHtml({
      passId: 'PV-2026-UKDE-9842',
      pet: {
        name: 'Bailey',
        species: 'Canine',
        breed: 'Golden Retriever',
        ageMonths: 36,
        weightKg: 28.5,
        microchipNumber: '985141002847192',
      },
      origin: 'United Kingdom',
      destination: 'Germany',
      userEmail: 'traveler@petvia.com',
      verificationUrl: 'https://petvia.com/verify/PV-2026-UKDE-9842',
    });

    expect(html).toContain('Bailey');
    expect(html).toContain('PV-2026-UKDE-9842');
    expect(html).toContain('data:image/png;base64,');
    expect(html).toContain('Section I: Transponder &amp; Animal Identification');
    expect(html).toContain('Section III: Certified Veterinary Medical Ledger');
    expect(html).toContain('SHA-256 HASH:');
  });

  it('should generate valid Border Verification Dossier HTML template', async () => {
    const html = await generateVerificationPassHtml({
      passId: 'PV-2026-TEST-1234',
      petName: 'Milo',
      species: 'Canine',
      microchip: '985141002847192',
      origin: 'United Kingdom (London LHR)',
      destination: 'Germany (Frankfurt FRA)',
      verificationUrl: 'https://petvia.com/verify/PV-2026-TEST-1234',
    });

    expect(html).toContain('Milo');
    expect(html).toContain('PV-2026-TEST-1234');
    expect(html).toContain('data:image/png;base64,');
    expect(html).toContain('Pet Travel Regulatory Audit Matrix');
  });

  it('should compile an HTML template into a valid PDF binary buffer via headless Chrome', async () => {
    const simpleHtml = `<!DOCTYPE html>
      <html>
        <head><title>Test PDF</title></head>
        <body>
          <h1>Petvia Compliance Document Test</h1>
          <p>Verified statutory record.</p>
        </body>
      </html>`;

    const pdfBuffer = await generatePdfFromHtml(simpleHtml);

    expect(pdfBuffer).toBeInstanceOf(Buffer);
    expect(pdfBuffer.length).toBeGreaterThan(1000);

    // PDF magic number check (%PDF-)
    const header = pdfBuffer.subarray(0, 5).toString('ascii');
    expect(header).toBe('%PDF-');
  }, 30000);

  it('should dynamically adapt tapeworm and titer requirements by destination', async () => {
    // 1. UK -> Germany (EU destination: tapeworm exempt, titer exempt)
    const euHtml = await generatePassportHtml({
      passId: 'PV-2026-UKDE-9842',
      pet: { name: 'Bailey', species: 'DOG' },
      origin: 'United Kingdom',
      destination: 'Germany',
      userEmail: 'traveler@petvia.com',
      verificationUrl: 'https://petvia.com/verify/PV-2026-UKDE-9842',
    });
    expect(euHtml).toContain('Regulation (EU) 2026/131');
    expect(euHtml).toContain('Exempt for direct entry into Germany');
    expect(euHtml).toContain('Exempt for this certified origin-destination route');

    // 2. USA -> UK (UK destination: tapeworm mandatory, GB scheme)
    const ukHtml = await generatePassportHtml({
      passId: 'PV-2026-USUK-1111',
      pet: { name: 'Cooper', species: 'DOG' },
      origin: 'United States',
      destination: 'United Kingdom',
      userEmail: 'traveler@petvia.com',
      verificationUrl: 'https://petvia.com/verify/PV-2026-USUK-1111',
    });
    expect(ukHtml).toContain('GB Pet Travel Scheme');
    expect(ukHtml).toContain('Praziquantel • Mandatory 24h to 120h pre-arrival administration');

    // 3. Border Verification Pass for Australia (Titer required)
    const auPassHtml = await generateVerificationPassHtml({
      passId: 'PV-2026-UKAU-2222',
      petName: 'Luna',
      destination: 'Australia',
      verificationUrl: 'https://petvia.com/verify/PV-2026-UKAU-2222',
    });
    expect(auPassHtml).toContain('FAVN/RNATT required for this route');
    expect(auPassHtml).toContain('Action Required');
  });
});
