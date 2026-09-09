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
});
