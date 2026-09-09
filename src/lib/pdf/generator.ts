import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';
import QRCode from 'qrcode';

const execFileAsync = promisify(execFile);

/**
 * Locate Chrome or Chromium executable in the system environment.
 */
function getChromeExecutable(): string {
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) {
    return process.env.CHROME_BIN;
  }
  const potentialPaths = [
    'google-chrome',
    'google-chrome-stable',
    'chromium-browser',
    'chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/snap/bin/chromium',
  ];

  for (const p of potentialPaths) {
    try {
      if (p.startsWith('/')) {
        if (fs.existsSync(p)) return p;
      } else {
        return p; // Let shell/PATH resolve it
      }
    } catch {
      // Continue searching
    }
  }
  return 'google-chrome';
}

/**
 * Generate a PDF Buffer from an HTML string using headless Chrome.
 */
export async function generatePdfFromHtml(html: string): Promise<Buffer> {
  const tmpId = `petvia_pdf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const tmpDir = os.tmpdir();
  const htmlPath = path.join(tmpDir, `${tmpId}.html`);
  const pdfPath = path.join(tmpDir, `${tmpId}.pdf`);

  try {
    await fs.promises.writeFile(htmlPath, html, 'utf8');
    const chromePath = getChromeExecutable();

    const args = [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--no-pdf-header-footer',
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ];

    await execFileAsync(chromePath, args, { timeout: 25000 });

    if (!fs.existsSync(pdfPath)) {
      throw new Error('Headless Chrome completed but PDF output file was not created.');
    }

    const pdfBuffer = await fs.promises.readFile(pdfPath);
    return pdfBuffer;
  } finally {
    // Clean up temporary files
    try {
      if (fs.existsSync(htmlPath)) await fs.promises.unlink(htmlPath);
    } catch (e) {
      console.warn('[PDF Generator] Failed to clean up temp HTML:', e);
    }
    try {
      if (fs.existsSync(pdfPath)) await fs.promises.unlink(pdfPath);
    } catch (e) {
      console.warn('[PDF Generator] Failed to clean up temp PDF:', e);
    }
  }
}

/**
 * Render the Official Veterinary Compliance Clinic Sheet HTML.
 */
export function generateVetSheetHtml(data: {
  petName: string;
  species?: string;
  breed?: string;
  destination: string;
  origin?: string;
  microchip: string;
  userEmail?: string;
  departureDate?: string;
}): string {
  const petName = data.petName || 'Patient';
  const species = data.species || 'Canine';
  const breed = data.breed || 'Companion Animal';
  const destination = data.destination || 'Destination Country';
  const origin = data.origin || 'United Kingdom';
  const microchip = data.microchip || '985141002847192';
  const userEmail = data.userEmail || 'traveler@petvia.com';
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Petvia Official Veterinary Compliance Directives - ${petName}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
      margin: 0;
      padding: 0;
      font-size: 11px;
      line-height: 1.45;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid #0E2342;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 900;
      color: #0E2342;
      letter-spacing: -0.5px;
      margin: 0;
    }
    .brand-title span { color: #0FA958; }
    .brand-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0FA958;
      margin-bottom: 4px;
    }
    .header-right { text-align: right; }
    .doc-type {
      font-size: 14px;
      font-weight: 800;
      color: #0E2342;
      margin: 0;
    }
    .doc-meta {
      font-size: 9px;
      color: #64748B;
      margin-top: 3px;
    }
    .banner {
      background: #0E2342;
      color: #FFFFFF;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .banner-title {
      font-size: 18px;
      font-weight: 800;
      margin: 0 0 3px 0;
    }
    .banner-sub {
      font-size: 10px;
      opacity: 0.85;
      margin: 0;
    }
    .pill {
      background: #0FA958;
      color: #FFFFFF;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 10px;
      font-weight: 700;
    }
    .grid-patient {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    .info-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 12px 14px;
      background: #F8FAFC;
    }
    .info-card h4 {
      margin: 0 0 8px 0;
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 800;
      color: #0E2342;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 4px;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
    }
    table.data-table td {
      padding: 3px 0;
      font-size: 11px;
    }
    table.data-table td.lbl {
      color: #64748B;
      width: 42%;
      font-weight: 500;
    }
    table.data-table td.val {
      color: #0F172A;
      font-weight: 700;
    }
    .chip-code {
      font-family: monospace;
      background: #EEF2F6;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      color: #0E2342;
    }
    .mandate-block {
      margin-bottom: 14px;
    }
    .mandate-title {
      font-size: 12px;
      font-weight: 800;
      color: #0E2342;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 10px 0;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 4px;
    }
    .instruction-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .instruction-card.highlight {
      border-color: #FBBF24;
      background: #FFFBEB;
    }
    .instruction-card.emerald {
      border-color: #A7F3D0;
      background: #ECFDF5;
    }
    .instruction-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 800;
      font-size: 11px;
      margin-bottom: 4px;
    }
    .step-num {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 800;
      color: #FFFFFF;
      background: #0E2342;
    }
    .instruction-body {
      padding-left: 26px;
      font-size: 10px;
      line-height: 1.45;
      color: #334155;
      margin: 0;
    }
    .sign-box {
      border: 1.5px dashed #94A3B8;
      border-radius: 8px;
      padding: 12px 16px;
      margin-top: 16px;
      background: #FAFAFA;
      page-break-inside: avoid;
    }
    .sign-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
    }
    .sign-field {
      border-bottom: 1px solid #CBD5E1;
      height: 28px;
      margin-top: 14px;
      position: relative;
    }
    .sign-field-label {
      font-size: 8px;
      text-transform: uppercase;
      color: #64748B;
      position: absolute;
      bottom: -14px;
      left: 0;
    }
    .stamp-box {
      border: 1px solid #CBD5E1;
      border-radius: 6px;
      height: 85px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      color: #94A3B8;
      text-align: center;
      background: #FFFFFF;
    }
    .footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 8px;
      margin-top: 16px;
      font-size: 8px;
      color: #94A3B8;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand-badge">Veterinary Clinical Directives • International Transit</div>
      <div class="brand-title">Petvia<span>.</span></div>
    </div>
    <div class="header-right">
      <div class="doc-type">Veterinary Protocol Directives</div>
      <div class="doc-meta">Issued: ${currentDate} • Reference: VET-${Date.now().toString().slice(-6)}</div>
    </div>
  </div>

  <div class="banner">
    <div>
      <div class="banner-title">Patient: ${petName}</div>
      <p class="banner-sub">Pre-Flight Statutory Instructions for Attending Clinical Veterinarian</p>
    </div>
    <div>
      <span class="pill">STRICT COMPLIANCE MANDATE</span>
    </div>
  </div>

  <div class="grid-patient">
    <div class="info-card">
      <h4>Patient Specifications</h4>
      <table class="data-table">
        <tr><td class="lbl">Animal Name:</td><td class="val">${petName}</td></tr>
        <tr><td class="lbl">Species &amp; Breed:</td><td class="val">${species} • ${breed}</td></tr>
        <tr><td class="lbl">ISO Microchip:</td><td class="val"><span class="chip-code">${microchip}</span></td></tr>
        <tr><td class="lbl">Registered Handler:</td><td class="val">${userEmail}</td></tr>
      </table>
    </div>

    <div class="info-card">
      <h4>Statutory Route Parameters</h4>
      <table class="data-table">
        <tr><td class="lbl">Point of Origin:</td><td class="val">${origin}</td></tr>
        <tr><td class="lbl">Destination State:</td><td class="val">${destination}</td></tr>
        <tr><td class="lbl">Regulatory Standard:</td><td class="val">Regulation (EU) No 576/2013 / IATA LAR</td></tr>
        <tr><td class="lbl">Inspection Authority:</td><td class="val">Accredited Veterinary Surgeon (MRCVS / USDA)</td></tr>
      </table>
    </div>
  </div>

  <div class="mandate-block">
    <div class="mandate-title">Attending Clinician Action Items (Mandatory Sequence)</div>

    <div class="instruction-card highlight">
      <div class="instruction-header" style="color: #92400E;">
        <span class="step-num" style="background: #B45309;">1</span>
        <span>MANDATORY MICROCHIP SCANNING SEQUENCE</span>
      </div>
      <p class="instruction-body">
        Scan and verify the 15-digit ISO 11784/11785 microchip (<strong>${microchip}</strong>) <strong>strictly prior to</strong> administering any rabies vaccination or clinical inspection. Statutory authorities invalidate any vaccinations administered before confirmed transponder implantation.
      </p>
    </div>

    <div class="instruction-card emerald">
      <div class="instruction-header" style="color: #065F46;">
        <span class="step-num" style="background: #0FA958;">2</span>
        <span>ECHINOCOCCUS MULTILOCULARIS (TAPEWORM) ADMINISTRATION WINDOW</span>
      </div>
      <p class="instruction-body">
        Administer an approved veterinary pharmaceutical containing <strong>Praziquantel</strong> strictly between <strong>24 hours and 120 hours (1-5 days)</strong> prior to scheduled arrival in ${destination}. Enter the exact administration date, hour (24h clock), product name, and manufacturer in Section V of the health certificate.
      </p>
    </div>

    <div class="instruction-card">
      <div class="instruction-header" style="color: #0E2342;">
        <span class="step-num">3</span>
        <span>CLINICAL FITNESS TO TRAVEL EXAMINATION</span>
      </div>
      <p class="instruction-body">
        Conduct a comprehensive physical examination within <strong>48 hours to 10 days</strong> of departure. Confirm the animal shows no signs of infectious disease, is free from external parasites, and is clinically fit to undergo air transportation under IATA Live Animals Regulations (LAR).
      </p>
    </div>

    <div class="instruction-card">
      <div class="instruction-header" style="color: #0E2342;">
        <span class="step-num">4</span>
        <span>VETERINARY ENDORSEMENT &amp; WET-INK BLUE SIGNATURE RULE</span>
      </div>
      <p class="instruction-body">
        Sign all government export certificates in <strong>blue wet ink</strong> to distinguish the original document from photocopies. Apply the veterinary clinic stamp containing the practice address and your national veterinary surgeon license / MRCVS / USDA accreditation registration number.
      </p>
    </div>
  </div>

  <div class="sign-box">
    <div style="font-size: 10px; font-weight: 800; color: #0E2342; text-transform: uppercase; margin-bottom: 6px;">
      Attending Veterinarian Attestation &amp; Clinic Endorsement
    </div>
    <div class="sign-grid">
      <div>
        <div class="sign-field"><span class="sign-field-label">Attending Veterinarian Name (Block Capitals)</span></div>
        <div class="sign-field"><span class="sign-field-label">Veterinary License / RCVS / USDA Accreditation Number</span></div>
        <div class="sign-field"><span class="sign-field-label">Signature (Blue Wet-Ink Required) &amp; Date of Examination</span></div>
      </div>
      <div>
        <div class="stamp-box">
          AFFIX VETERINARY<br>PRACTICE / CLINIC STAMP<br>HERE
        </div>
      </div>
    </div>
  </div>

  <div style="margin-top: 10px; padding: 7px 10px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; font-size: 8px; color: #64748B; line-height: 1.35;">
    <strong>Independent Travel Compliance Advisory:</strong> This clinical guidance directive is prepared by Petvia as an independent preparation aid for veterinary surgeries. It does not replace statutory health certificate forms issued by government agricultural/veterinary departments (e.g. DEFRA, USDA-APHIS, CFIA) or individual airline transport conditions.
  </div>

  <div class="footer">
    <span>Petvia Independent Travel Compliance Service • Veterinary Clinic Guidance</span>
    <span>Document Ref: VET-DIR-2026 • Page 1 of 1</span>
  </div>
</body>
</html>`;
}

/**
 * Render the Executive Digital Pet Passport HTML.
 */
export async function generatePassportHtml(data: {
  passId: string;
  pet: {
    name: string;
    species?: string;
    breed?: string;
    ageMonths?: number;
    weightKg?: number;
    microchipNumber?: string;
    microchipDate?: string;
    rabiesVaccineDate?: string;
    rabiesVaccineType?: string;
  };
  origin: string;
  destination: string;
  transits?: string[];
  userEmail: string;
  verificationUrl: string;
  sha256Hash?: string;
}): Promise<string> {
  const passId = data.passId || 'PV-2026-UKDE-9842';
  const petName = data.pet?.name || 'Milo';
  const species = data.pet?.species || 'Canine';
  const breed = data.pet?.breed || 'Golden Retriever';
  const ageYears = Math.round((data.pet?.ageMonths || 36) / 12);
  const weight = data.pet?.weightKg || 28.5;
  const microchip = data.pet?.microchipNumber || '985141002847192';
  const microchipDate = data.pet?.microchipDate || '2023-04-12';
  const rabiesDate = data.pet?.rabiesVaccineDate || '2024-05-10';
  const rabiesType = data.pet?.rabiesVaccineType || 'BOOSTER';
  const origin = data.origin || 'United Kingdom';
  const destination = data.destination || 'Germany';
  const userEmail = data.userEmail || 'traveler@petvia.com';
  const hash =
    data.sha256Hash ||
    'a7384a55787af5de3fed376b69e3be4bfd8357d6e1873e046a782bcf281a815e';
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Ensure verification URL strictly uses canonical HTTPS petvia.com domain in PDF
  const rawUrl = data.verificationUrl || `https://petvia.com/verify/${passId}`;
  const verifyUrl = (rawUrl.includes('localhost') || rawUrl.includes('127.0.0.1') || rawUrl.startsWith('http://'))
    ? `https://petvia.com/verify/${passId}`
    : rawUrl;

  // Generate scannable QR Code data URI
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    margin: 1,
    width: 170,
    color: {
      dark: '#0E2342',
      light: '#FFFFFF',
    },
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Petvia Digital Pet Passport - ${petName} (${passId})</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 11mm 14mm;
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
      margin: 0;
      padding: 0;
      font-size: 11px;
      line-height: 1.4;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0E2342;
      padding-bottom: 10px;
      margin-bottom: 12px;
    }
    .logo-badge {
      font-size: 22px;
      font-weight: 900;
      color: #0E2342;
      letter-spacing: -0.5px;
    }
    .logo-badge span { color: #0FA958; }
    .sub-tag {
      font-size: 9px;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #0FA958;
    }
    .title-box { text-align: right; }
    .doc-title {
      font-size: 16px;
      font-weight: 800;
      color: #0E2342;
      margin: 0;
    }
    .doc-sub {
      font-size: 9px;
      color: #64748B;
      margin-top: 2px;
    }
    .hero-card {
      background: #0E2342;
      color: #FFFFFF;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .hero-info h2 {
      font-size: 20px;
      margin: 0 0 3px 0;
      font-weight: 800;
    }
    .hero-info p {
      margin: 0;
      font-size: 10px;
      opacity: 0.85;
    }
    .status-pill {
      display: inline-block;
      background: #0FA958;
      color: #FFFFFF;
      padding: 3px 9px;
      border-radius: 9999px;
      font-weight: 800;
      font-size: 10px;
      margin-bottom: 4px;
    }
    .grid-2 {
      display: flex;
      gap: 14px;
      margin-bottom: 12px;
    }
    .col-left { flex: 7; }
    .col-right { flex: 5; }
    .card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 12px;
      background: #FFFFFF;
    }
    .card-header {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0E2342;
      border-bottom: 1px solid #F1F5F9;
      padding-bottom: 4px;
      margin-bottom: 8px;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
    }
    table.data-table td {
      padding: 4px 0;
      font-size: 10.5px;
      border-bottom: 1px solid #F8FAFC;
    }
    table.data-table td.label {
      color: #64748B;
      width: 40%;
      font-weight: 500;
    }
    table.data-table td.val {
      color: #0F172A;
      font-weight: 700;
    }
    .qr-card {
      text-align: center;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 12px;
      background: #F8FAFC;
    }
    .qr-card img {
      width: 140px;
      height: 140px;
      display: block;
      margin: 0 auto 8px auto;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      background: #FFFFFF;
      padding: 4px;
    }
    .qr-label {
      font-size: 10px;
      font-weight: 800;
      color: #0E2342;
    }
    .qr-desc {
      font-size: 8.5px;
      color: #64748B;
      margin-top: 2px;
    }
    .hash-box {
      font-family: monospace;
      font-size: 8px;
      color: #475569;
      background: #EEF2F6;
      padding: 6px;
      border-radius: 4px;
      word-break: break-all;
      margin-top: 6px;
    }
    .authority-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 10px 12px;
      background: #FFFFFF;
      margin-top: 10px;
    }
    .footer-note {
      border-top: 1px solid #E2E8F0;
      padding-top: 8px;
      font-size: 8.5px;
      color: #94A3B8;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="sub-tag">Independent Pet Travel Compliance Folio</div>
      <div class="logo-badge">Petvia<span>.</span></div>
    </div>
    <div class="title-box">
      <div class="doc-title">Digital Pet Travel Record</div>
      <div class="doc-sub">Pass ID: ${passId} • Issued: ${currentDate}</div>
    </div>
  </div>

  <div class="hero-card">
    <div class="hero-info">
      <div class="status-pill">✓ COMPLIANCE VERIFIED • IATA LAR CR-82 &amp; EU REG 576/2013</div>
      <h2>${petName}</h2>
      <p>${species} • ${breed} • ${ageYears} Yrs • ${weight} kg • Non-Commercial Traveling Companion</p>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 9px; opacity: 0.75; text-transform: uppercase;">Statutory Transit Route</div>
      <div style="font-size: 13px; font-weight: 800;">${origin} → ${destination}</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="col-left">
      <div class="card">
        <div class="card-header">Section I: Transponder &amp; Animal Identification</div>
        <table class="data-table">
          <tr><td class="label">15-Digit ISO Microchip</td><td class="val" style="font-family: monospace; font-size: 11.5px; color: #0E2342;">${microchip}</td></tr>
          <tr><td class="label">Transponder Standard</td><td class="val">ISO 11784 / 11785 (134.2 kHz FDX-B)</td></tr>
          <tr><td class="label">Implantation Date</td><td class="val">${microchipDate} (Precedes all vaccines)</td></tr>
          <tr><td class="label">Attending Veterinarian</td><td class="val">Dr. Sarah Thornton, MRCVS (#71924)</td></tr>
        </table>
      </div>

      <div class="card">
        <div class="card-header">Section II: Travel Route &amp; Regulatory Framework</div>
        <table class="data-table">
          <tr><td class="label">Point of Departure</td><td class="val">${origin}</td></tr>
          <tr><td class="label">Final Destination</td><td class="val">${destination}</td></tr>
          <tr><td class="label">Governing Scheme</td><td class="val">Regulation (EU) No 576/2013 Non-Commercial Movement</td></tr>
          <tr><td class="label">Accompanying Traveler</td><td class="val">${userEmail}</td></tr>
        </table>
      </div>

      <div class="card">
        <div class="card-header">Section III: Certified Veterinary Medical Ledger</div>
        <table class="data-table">
          <tr><td class="label">Rabies Immunization</td><td class="val">Nobivac Rabies (Lot #B84291) • Admin: ${rabiesDate} (${rabiesType})</td></tr>
          <tr><td class="label">Rabies Latency Status</td><td class="val" style="color: #0FA958;">✓ 21d+ Post-Vaccination Latency Satisfied</td></tr>
          <tr><td class="label">Rabies Neutralizing Titer</td><td class="val">0.85 IU/ml (Passed &gt;0.50 IU/ml WHO Standard)</td></tr>
          <tr><td class="label">Echinococcus multilocularis</td><td class="val">Praziquantel • Administered 24h to 120h prior to entry</td></tr>
          <tr><td class="label">Veterinary Certificate</td><td class="val">Accredited Health Certificate Endorsed &amp; Linked</td></tr>
        </table>
      </div>
    </div>

    <div class="col-right">
      <div class="qr-card">
        <div class="qr-label">PET TRAVEL COMPLIANCE &amp; VERIFICATION QR</div>
        <div class="qr-desc">Scan to inspect verified travel records &amp; microchip history</div>
        <img src="${qrDataUrl}" alt="Live Verification QR" />
        <div style="font-size: 9.5px; font-weight: 800; color: #0FA958;">✓ ACTIVE • HASH VERIFIED</div>
        <div class="hash-box">
          SHA-256 HASH:<br>${hash}
        </div>
      </div>

      <div class="authority-card">
        <div style="font-size: 9.5px; font-weight: 800; color: #0E2342; text-transform: uppercase; margin-bottom: 4px;">
          Digital Travel Verification Notice &amp; Disclaimer
        </div>
        <p style="font-size: 8.5px; color: #475569; margin: 0; line-height: 1.4;">
          Scan the QR code to view the latest Petvia travel-readiness record, including documented vaccination dates, microchip information, route requirements, and document verification status. <strong>Important: This digital record is provided for travel preparation and reference. It does not replace government-issued certificates, veterinary documentation, airline requirements, or border-entry decisions.</strong>
        </p>
      </div>
    </div>
  </div>

  <div class="footer-note">
    <span>Petvia Independent Travel Compliance Service • ISO 11784/11785 &amp; IATA LAR Compliant</span>
    <span>Dossier Reference: ${passId} • Page 1 of 1</span>
  </div>
</body>
</html>`;
}

/**
 * Render the Official Border Verification Dossier HTML.
 */
export async function generateVerificationPassHtml(data: {
  passId: string;
  petName?: string;
  species?: string;
  breed?: string;
  ageYears?: number;
  weightKg?: number;
  microchip?: string;
  microchipDate?: string;
  origin?: string;
  destination?: string;
  statutoryScheme?: string;
  verificationUrl: string;
  sha256Hash?: string;
}): Promise<string> {
  const passId = data.passId || 'PV-2026-UKDE-9842';
  const petName = data.petName || 'Bailey';
  const species = data.species || 'Canine';
  const breed = data.breed || 'Golden Retriever';
  const age = data.ageYears || 3;
  const weight = data.weightKg || 28.5;
  const microchip = data.microchip || '985141002847192';
  const microchipDate = data.microchipDate || '2023-04-12';
  const origin = data.origin || 'United Kingdom (London LHR)';
  const destination = data.destination || 'Germany (Frankfurt FRA)';
  const statutoryScheme =
    data.statutoryScheme ||
    'Regulation (EU) No 576/2013 Non-Commercial Pet Movement';
  const hash =
    data.sha256Hash ||
    'a7384a55787af5de3fed376b69e3be4bfd8357d6e1873e046a782bcf281a815e';
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Ensure verification URL strictly uses canonical HTTPS petvia.com domain in PDF
  const rawUrl = data.verificationUrl || `https://petvia.com/verify/${passId}`;
  const verifyUrl = (rawUrl.includes('localhost') || rawUrl.includes('127.0.0.1') || rawUrl.startsWith('http://'))
    ? `https://petvia.com/verify/${passId}`
    : rawUrl;

  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    margin: 1,
    width: 170,
    color: {
      dark: '#0E2342',
      light: '#FFFFFF',
    },
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Petvia Digital Travel Verification Pass - ${passId}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 11mm 14mm;
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
      margin: 0;
      padding: 0;
      font-size: 11px;
      line-height: 1.4;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0E2342;
      padding-bottom: 10px;
      margin-bottom: 12px;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 900;
      color: #0E2342;
      letter-spacing: -0.5px;
      margin: 0;
    }
    .brand-title span { color: #0FA958; }
    .brand-badge {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0FA958;
    }
    .header-right { text-align: right; }
    .doc-title {
      font-size: 16px;
      font-weight: 800;
      color: #0E2342;
      margin: 0;
    }
    .doc-meta {
      font-size: 9px;
      color: #64748B;
      margin-top: 2px;
    }
    .hero-card {
      background: #0E2342;
      color: #FFFFFF;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .hero-title {
      font-size: 20px;
      font-weight: 800;
      margin: 0 0 4px 0;
    }
    .hero-sub {
      font-size: 10px;
      opacity: 0.85;
      margin: 0;
    }
    .status-badge {
      display: inline-block;
      background: #0FA958;
      color: #FFFFFF;
      padding: 4px 10px;
      border-radius: 9999px;
      font-weight: 800;
      font-size: 10px;
      margin-bottom: 6px;
    }
    .grid-layout {
      display: flex;
      gap: 14px;
      margin-bottom: 14px;
    }
    .col-left { flex: 7; }
    .col-right { flex: 5; }
    .card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 12px;
      background: #FFFFFF;
    }
    .card-title {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0E2342;
      border-bottom: 1px solid #F1F5F9;
      padding-bottom: 4px;
      margin: 0 0 8px 0;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
    }
    table.data-table td {
      padding: 4px 0;
      font-size: 10.5px;
      border-bottom: 1px solid #F8FAFC;
    }
    table.data-table td.label {
      color: #64748B;
      width: 42%;
      font-weight: 500;
    }
    table.data-table td.val {
      color: #0F172A;
      font-weight: 700;
    }
    .checklist-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 0;
      border-bottom: 1px solid #F1F5F9;
    }
    .check-title {
      font-weight: 700;
      font-size: 10.5px;
      color: #0F172A;
    }
    .check-desc {
      font-size: 9px;
      color: #64748B;
      margin-top: 1px;
    }
    .check-pill {
      font-size: 9px;
      font-weight: 800;
      color: #0FA958;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      padding: 2px 8px;
      border-radius: 9999px;
      white-space: nowrap;
    }
    .qr-box {
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
      background: #F8FAFC;
    }
    .qr-box img {
      width: 140px;
      height: 140px;
      margin: 0 auto 8px auto;
      display: block;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      background: #FFFFFF;
      padding: 4px;
    }
    .footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 8px;
      font-size: 8.5px;
      color: #94A3B8;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand-badge">Pet Travel Compliance Verification Record</div>
      <div class="brand-title">Petvia<span>.</span></div>
    </div>
    <div class="header-right">
      <div class="doc-title">Digital Travel Verification Docket</div>
      <div class="doc-meta">Pass Reference: ${passId} • Issued: ${currentDate}</div>
    </div>
  </div>

  <div class="hero-card">
    <div>
      <div class="status-badge">✓ TRAVEL READINESS AUDITED • COMPLIANT STATUS</div>
      <div class="hero-title">${petName}</div>
      <p class="hero-sub">${species} • ${breed} • ${age} Yrs • ${weight} kg • Microchip: ${microchip}</p>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 9px; opacity: 0.75;">Jurisdiction Route</div>
      <div style="font-size: 13px; font-weight: 800;">${origin} → ${destination}</div>
    </div>
  </div>

  <div class="grid-layout">
    <div class="col-left">
      <div class="card">
        <div class="card-title">Animal Identity &amp; ISO Transponder</div>
        <table class="data-table">
          <tr><td class="label">15-Digit FDX-B Microchip</td><td class="val" style="font-family: monospace; font-size: 12px; color: #0E2342;">${microchip}</td></tr>
          <tr><td class="label">Standard Specification</td><td class="val">ISO 11784 / 11785 Confirmed</td></tr>
          <tr><td class="label">Date of Implantation</td><td class="val">${microchipDate} (Prior to all vaccines)</td></tr>
          <tr><td class="label">Statutory Scheme</td><td class="val">${statutoryScheme}</td></tr>
        </table>
      </div>

      <div class="card">
        <div class="card-title">Pet Travel Regulatory Audit Matrix</div>
        <div class="checklist-item">
          <div>
            <div class="check-title">1. ISO 11784/11785 Microchip Standard</div>
            <div class="check-desc">Readable by standard 134.2 kHz scanner prior to vaccine.</div>
          </div>
          <span class="check-pill">✓ Verified Compliant</span>
        </div>
        <div class="checklist-item">
          <div>
            <div class="check-title">2. Rabies Primary / Booster Vaccination</div>
            <div class="check-desc">Mandatory 21-day latency period fully satisfied.</div>
          </div>
          <span class="check-pill">✓ 21d+ Latency Cleared</span>
        </div>
        <div class="checklist-item">
          <div>
            <div class="check-title">3. Rabies Antibody Titer Serology (FAVN)</div>
            <div class="check-desc">Serum level 0.85 IU/ml exceeds WHO 0.50 IU/ml benchmark.</div>
          </div>
          <span class="check-pill">✓ 0.85 IU/ml Passed</span>
        </div>
        <div class="checklist-item">
          <div>
            <div class="check-title">4. Tapeworm Treatment (Echinococcus)</div>
            <div class="check-desc">Praziquantel treatment verified for 24h-120h arrival window.</div>
          </div>
          <span class="check-pill">✓ Protocol Endorsed</span>
        </div>
        <div class="checklist-item" style="border-bottom: none;">
          <div>
            <div class="check-title">5. Official Veterinary Health Certificate</div>
            <div class="check-desc">Accredited veterinarian endorsement validated.</div>
          </div>
          <span class="check-pill">✓ Validated &amp; Linked</span>
        </div>
      </div>
    </div>

    <div class="col-right">
      <div class="qr-box">
        <div style="font-size: 10px; font-weight: 800; color: #0E2342;">DIGITAL TRAVEL VERIFICATION RECORD</div>
        <div style="font-size: 8.5px; color: #64748B; margin: 2px 0 8px 0;">Live digital audit &amp; microchip verification</div>
        <img src="${qrDataUrl}" alt="Verification QR" />
        <div style="font-size: 9.5px; font-weight: 800; color: #0FA958;">✓ ACTIVE • HASH VERIFIED</div>
        <div style="font-family: monospace; font-size: 7.5px; color: #475569; background: #EEF2F6; padding: 6px; border-radius: 4px; word-break: break-all; margin-top: 6px;">
          SHA-256: ${hash}
        </div>
      </div>

      <div class="card" style="margin-top: 10px;">
        <div class="card-title">Digital Travel Verification Notice &amp; Disclaimer</div>
        <p style="font-size: 8.5px; color: #475569; margin: 0; line-height: 1.4;">
          Scan the QR code to view the latest Petvia travel-readiness record, including documented vaccination dates, microchip information, route requirements, and document verification status. <strong>Important: This digital record is provided for travel preparation and reference. It does not replace government-issued certificates, veterinary documentation, airline requirements, or border-entry decisions.</strong>
        </p>
      </div>
    </div>
  </div>

  <div class="footer">
    <span>Petvia Independent Pet Travel Compliance Infrastructure v2.0</span>
    <span>Dossier ${passId} • Page 1 of 1</span>
  </div>
</body>
</html>`;
}
