/**
 * PawValid Transactional Email Templates & Dispatchers
 *
 * Senders: PawValid.online <noreply@pawvalid.online>
 * All templates include:
 * - Brand styling (Navy & Emerald Green design tokens)
 * - Mobile-responsive layout
 * - Plain-text fallback for maximum deliverability & spam safety
 * - Independent regulatory disclaimer in footer
 */

import { sendTransactionalEmail, BrevoSendResult } from './brevo';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const SUPPORT_EMAIL = 'support@pawvalid.online';

/**
 * Shared HTML email layout wrapper with PawValid branding and compliant footer
 */
export function wrapPawValidEmail(options: {
  title: string;
  preheader: string;
  contentHtml: string;
}): string {
  const { title, preheader, contentHtml } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-collapse: separate; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background-color: #0f172a; padding: 30px 32px; text-align: left; }
    .brand { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-decoration: none; }
    .brand-accent { color: #10b981; }
    .header-tag { display: inline-block; background-color: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.5px; }
    .body { padding: 36px 32px 28px 32px; color: #334155; font-size: 15px; line-height: 1.6; }
    .h1 { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 14px 0; line-height: 1.3; }
    .lead { font-size: 15px; color: #475569; margin: 0 0 20px 0; line-height: 1.6; }
    .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
    .card-urgent { background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
    .btn { display: inline-block; background-color: #10b981; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 13px 26px; border-radius: 8px; text-align: center; }
    .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.6; }
    .footer a { color: #0f766e; text-decoration: underline; }
  </style>
</head>
<body>
  <span style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table class="container" width="100%" border="0" cellspacing="0" cellpadding="0">
          <!-- Header -->
          <tr>
            <td class="header">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span class="brand">🐾 Paw<span class="brand-accent">Valid</span></span>
                  </td>
                  <td align="right">
                    <span class="header-tag">Travel Assistant</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="body">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="margin: 0 0 6px 0; color: #64748b; font-weight: 600;">
                PawValid &bull; Global Pet Travel Compliance &bull; <a href="${APP_URL}">pawvalid.online</a>
              </p>
              <p style="margin: 0 0 10px 0;">
                Need assistance? Reply directly to this email or reach us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.
              </p>
              <p style="margin: 0; font-size: 11px; color: #cbd5e1; line-height: 1.5;">
                Disclaimer: PawValid is an independent travel preparation tool. We help pet owners verify requirements against DEFRA, USDA APHIS, EU TRACES &amp; IATA standards, but official government export endorsements must be issued by an accredited veterinarian or competent state authority.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. FIRST-TIME REGISTRATION / WELCOME EMAIL
// ─────────────────────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(
  userEmail: string,
  name?: string
): Promise<BrevoSendResult> {
  const greeting = name ? `Hello ${name},` : 'Hello,';
  const dashboardUrl = `${APP_URL}/dashboard`;

  const htmlContent = `
    <h1 class="h1">Welcome to PawValid!</h1>
    <p class="lead">
      ${greeting}<br><br>
      Thank you for creating your account. PawValid helps pet owners navigate international travel regulations without missed milestones, unexpected quarantine, or airport turnaways.
    </p>

    <div class="card">
      <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #0f172a;">3 Core Steps to Travel Readiness:</h3>
      <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155; line-height: 1.7;">
        <li><strong>Microchip Identification:</strong> Verify an ISO 11784/11785 compliant 15-digit chip is implanted <em>prior</em> to rabies vaccination.</li>
        <li><strong>Vaccination &amp; Titer Clocks:</strong> Track strict quarantine waiting periods (e.g. 21-day primary booster or 180-day rabies titer windows).</li>
        <li><strong>Veterinary Health Inspection:</strong> Complete clinical examinations and secure state government endorsements within departure limits.</li>
      </ol>
    </div>

    <p style="margin: 20px 0;">Ready to plan your trip? Access your personal dashboard below:</p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${dashboardUrl}" class="btn">
        Open My Travel Dashboard &rarr;
      </a>
    </div>

    <p style="margin: 0; font-size: 13px; color: #64748b;">
      Tip: You can add multiple pets, upload vet records into your secure vault, and generate travel dockets anytime.
    </p>
  `;

  const textContent = `
Welcome to PawValid!

${greeting}

Thank you for creating your account. PawValid helps pet owners navigate international travel regulations without missed milestones, unexpected quarantine, or airport turnaways.

3 Core Steps to Travel Readiness:
1. Microchip Identification (ISO 11784/11785 15-digit)
2. Vaccination & Titer Clocks
3. Veterinary Health Inspection & Government Endorsement

Access your dashboard: ${dashboardUrl}

Best regards,
PawValid Support Team
pawvalid.online
  `.trim();

  const fullHtml = wrapPawValidEmail({
    title: 'Welcome to PawValid — Global Pet Travel Compliance',
    preheader: 'Welcome to PawValid! Start preparing your pet for safe international travel.',
    contentHtml: htmlContent,
  });

  return sendTransactionalEmail({
    to: userEmail,
    subject: '🐾 Welcome to PawValid: Your Pet Travel Compliance Assistant',
    htmlContent: fullHtml,
    textContent,
    replyTo: { email: SUPPORT_EMAIL, name: 'PawValid Support' },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. FORGOT PASSWORD / MAGIC ACCESS LINK EMAIL
// ─────────────────────────────────────────────────────────────────────────────

export async function sendMagicAuthLinkEmail(
  userEmail: string,
  magicUrl: string
): Promise<BrevoSendResult> {
  const htmlContent = `
    <h1 class="h1">Sign in to your PawValid Account</h1>
    <p class="lead">
      We received a request to access your PawValid account for <strong>${userEmail}</strong>.
    </p>

    <p style="margin: 16px 0;">Click the secure button below to sign in instantly and access your pet travel dossiers:</p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${magicUrl}" class="btn">
        Sign In to PawValid &rarr;
      </a>
    </div>

    <div class="card">
      <p style="margin: 0; font-size: 13px; color: #64748b;">
        🔒 <strong>Security Note:</strong> This link is valid for <strong>60 minutes</strong> and can only be used once. If you did not request this email, you can safely ignore it.
      </p>
    </div>

    <p style="margin-top: 20px; font-size: 12px; color: #94a3b8; word-break: break-all;">
      Button not working? Copy and paste this URL into your browser:<br>
      <a href="${magicUrl}" style="color: #10b981;">${magicUrl}</a>
    </p>
  `;

  const textContent = `
Sign in to your PawValid Account

We received a request to access your PawValid account for ${userEmail}.

Click this link to sign in (valid for 60 minutes):
${magicUrl}

If you did not request this link, you can safely ignore this email.

PawValid Security
pawvalid.online
  `.trim();

  const fullHtml = wrapPawValidEmail({
    title: 'Sign In to PawValid',
    preheader: 'Your secure 1-click access link for PawValid.',
    contentHtml: htmlContent,
  });

  return sendTransactionalEmail({
    to: userEmail,
    subject: '🔑 Your PawValid Sign-In & Password Reset Link',
    htmlContent: fullHtml,
    textContent,
    replyTo: { email: SUPPORT_EMAIL, name: 'PawValid Support' },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2B. TRIP EMAIL VERIFICATION & OWNERSHIP CONFIRMATION
// ─────────────────────────────────────────────────────────────────────────────

export interface TripVerificationOptions {
  userEmail: string;
  magicUrl: string;
  petName?: string;
  origin?: string;
  destination?: string;
}

export async function sendTripVerificationEmail(
  options: TripVerificationOptions
): Promise<BrevoSendResult> {
  const { userEmail, magicUrl, petName = 'your pet', origin, destination } = options;
  const routeText = origin && destination ? ` (${origin} → ${destination})` : '';

  const htmlContent = `
    <h1 class="h1">Verify Email to Access ${petName}'s Travel Plan</h1>
    <p class="lead">
      We received a request to save and manage international travel compliance for <strong>${petName}</strong>${routeText} under <strong>${userEmail}</strong>.
    </p>

    <div class="card">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #0f172a; font-weight: 600;">
        🔒 Email Ownership Verification Required
      </p>
      <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.6;">
        To protect your pet's veterinary health records and prevent unauthorized access, please confirm that you own this email address.
      </p>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${magicUrl}" class="btn">
        Verify Email &amp; Open Dashboard &rarr;
      </a>
    </div>

    <p style="margin: 0; font-size: 13px; color: #64748b;">
      This secure 1-click verification link is valid for <strong>60 minutes</strong>. Once clicked, you will be instantly logged in to your Pet Travel Command Center.
    </p>

    <p style="margin-top: 20px; font-size: 12px; color: #94a3b8; word-break: break-all;">
      Button not working? Copy and paste this URL into your browser:<br>
      <a href="${magicUrl}" style="color: #10b981;">${magicUrl}</a>
    </p>
  `;

  const textContent = `
Verify Email to Access ${petName}'s Travel Plan

We received a request to save and manage international travel compliance for ${petName}${routeText} under ${userEmail}.

To protect your pet's veterinary health records, verify email ownership by clicking:
${magicUrl}

This link is valid for 60 minutes and grants instant access to your travel command center.

PawValid Security Team
pawvalid.online
  `.trim();

  const fullHtml = wrapPawValidEmail({
    title: `Verify Email: ${petName}'s Travel Plan`,
    preheader: `Confirm email ownership to access ${petName}'s pet travel compliance dashboard.`,
    contentHtml: htmlContent,
  });

  return sendTransactionalEmail({
    to: userEmail,
    subject: `🐾 Verify Your Email to Access ${petName}'s Travel Plan`,
    htmlContent: fullHtml,
    textContent,
    replyTo: { email: SUPPORT_EMAIL, name: 'PawValid Support' },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. FREE ASSESSMENT & SAVED TRIP SUMMARY EMAIL
// ─────────────────────────────────────────────────────────────────────────────

export interface TripSummaryOptions {
  id: string;
  userEmail: string;
  petName: string;
  species: string;
  breed?: string | null;
  origin: string;
  destination: string;
  departureDate?: string | null;
  overallStatus?: string;
  earliestFlightDate?: string | null;
  actionItemCount?: number;
}

export async function sendTripSummaryEmail(
  trip: TripSummaryOptions
): Promise<BrevoSendResult> {
  const dashboardUrl = `${APP_URL}/dashboard?tripId=${trip.id}`;
  const departureText = trip.departureDate || 'Not specified';
  const flightEarliestText = trip.earliestFlightDate || 'Pending vet audit';

  const htmlContent = `
    <h1 class="h1">Your Pet Travel Compliance Summary</h1>
    <p class="lead">
      We saved your international pet travel docket for <strong>${trip.petName}</strong> (${trip.species}${trip.breed ? ` &bull; ${trip.breed}` : ''}).
    </p>

    <div class="card">
      <h3 style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
        ✈️ Route &amp; Travel Docket
      </h3>
      <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #334155;">
        <tr>
          <td style="color: #64748b; width: 140px; font-weight: 600;">Pet Name:</td>
          <td><strong>${trip.petName}</strong></td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Route:</td>
          <td><strong>${trip.origin} &rarr; ${trip.destination}</strong></td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Departure Date:</td>
          <td>${departureText}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Earliest Flight Date:</td>
          <td><strong style="color: #0284c7;">${flightEarliestText}</strong></td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Readiness Status:</td>
          <td><span style="background-color: #fef3c7; color: #92400e; font-weight: 700; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${trip.overallStatus || 'ACTION_REQUIRED'}</span></td>
        </tr>
      </table>
    </div>

    <p style="margin: 20px 0;">
      You can track required vaccinations, microchip timeline rules, IATA crate sizing, and upload clinical sheets in your command center:
    </p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${dashboardUrl}" class="btn">
        View Travel Checklist &amp; Docket &rarr;
      </a>
    </div>

    <p style="margin: 0; font-size: 13px; color: #64748b;">
      Need full compliance certification or expert review? You can upgrade your trip pass directly from the dashboard.
    </p>
  `;

  const textContent = `
Your Pet Travel Compliance Summary: ${trip.petName}

Route: ${trip.origin} -> ${trip.destination}
Pet Name: ${trip.petName} (${trip.species})
Departure Date: ${departureText}
Earliest Eligible Flight Date: ${flightEarliestText}

View your full travel checklist and requirements:
${dashboardUrl}

PawValid Support Team
pawvalid.online
  `.trim();

  const fullHtml = wrapPawValidEmail({
    title: `Travel Readiness Summary: ${trip.petName} (${trip.origin} → ${trip.destination})`,
    preheader: `Your travel compliance summary for ${trip.petName} traveling to ${trip.destination}.`,
    contentHtml: htmlContent,
  });

  return sendTransactionalEmail({
    to: trip.userEmail,
    subject: `🐾 Travel Readiness Summary: ${trip.petName} (${trip.origin} → ${trip.destination})`,
    htmlContent: fullHtml,
    textContent,
    replyTo: { email: SUPPORT_EMAIL, name: 'PawValid Support' },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CONCIERGE TRAVELER CONFIRMATION EMAIL (£59 TIER)
// ─────────────────────────────────────────────────────────────────────────────

export async function sendConciergeConfirmationEmail(
  trip: any,
  customerWhatsApp: string
): Promise<BrevoSendResult> {
  const cleanPhone = customerWhatsApp.replace(/\D/g, '');
  const dashboardUrl = `${APP_URL}/dashboard?tripId=${trip.id}&section=concierge`;

  const htmlContent = `
    <h1 class="h1">Concierge Audit Assigned</h1>
    <p class="lead">
      Dear Traveler,<br><br>
      Thank you for purchasing the <strong>Priority Concierge Expert Audit (£59)</strong> for <strong>${trip.petName}</strong>.
    </p>

    <div class="card">
      <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #0f172a;">What Happens Next:</h3>
      <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155; line-height: 1.7;">
        <li><strong>Specialist Docket Review:</strong> Our veterinary import team has received ${trip.petName}'s travel route (<strong>${trip.origin} &rarr; ${trip.destination}</strong>) and is auditing all uploaded certificates.</li>
        <li><strong>Direct WhatsApp Liaison:</strong> A dedicated pet relocation specialist will contact you directly on WhatsApp at <strong>+${cleanPhone}</strong> within 24 hours.</li>
        <li><strong>Vet Sheet &amp; Endorsement Guide:</strong> We will provide an annotated clinical sheet to hand to your veterinarian to ensure zero administrative rejections.</li>
      </ol>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${dashboardUrl}" class="btn">
        View Concierge Docket in Command Center &rarr;
      </a>
    </div>

    <p style="margin: 0; font-size: 13px; color: #64748b;">
      Urgent travel question? You can reply directly to this email to reach our triage desk.
    </p>
  `;

  const textContent = `
Priority Concierge Review Assigned

Dear Traveler,
Thank you for purchasing the Priority Concierge Expert Audit for ${trip.petName}.

What Happens Next:
1. Specialist Review: Our veterinary import team is auditing ${trip.petName}'s travel route (${trip.origin} -> ${trip.destination}).
2. WhatsApp Liaison: A specialist will contact you on +${cleanPhone} within 24 hours.
3. Vet Instructions: We will assemble an annotated vet instruction sheet.

Access your command center: ${dashboardUrl}

PawValid Concierge Team
pawvalid.online
  `.trim();

  const fullHtml = wrapPawValidEmail({
    title: `Concierge Review Confirmed: ${trip.petName}`,
    preheader: `Our veterinary import team is now auditing ${trip.petName}'s travel docket.`,
    contentHtml: htmlContent,
  });

  return sendTransactionalEmail({
    to: trip.userEmail,
    subject: `🚨 Priority Concierge Assigned: ${trip.petName} (${trip.origin} → ${trip.destination})`,
    htmlContent: fullHtml,
    textContent,
    replyTo: { email: SUPPORT_EMAIL, name: 'PawValid Priority Desk' },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. PURCHASE RECEIPT EMAIL (CERTIFIED PASS & CONCIERGE)
// ─────────────────────────────────────────────────────────────────────────────

export interface PurchaseReceiptOptions {
  trip: any;
  paymentId: string;
  amount?: number;
  currency?: string;
  targetTier: string;
  recipientEmail: string;
}

export async function sendPurchaseReceiptEmail(
  options: PurchaseReceiptOptions
): Promise<BrevoSendResult> {
  const { trip, paymentId, amount, currency = 'GBP', targetTier, recipientEmail } = options;
  const appUrl = APP_URL;
  const dashboardUrl = `${appUrl}/dashboard?tripId=${trip.id}`;

  const isConcierge = targetTier === 'CONCIERGE';
  const tierName = isConcierge ? 'Priority Concierge Review' : 'Certified Trip Pass';

  // Format currency
  const currUpper = currency.toUpperCase();
  const symbol = currUpper === 'USD' ? '$' : currUpper === 'INR' ? '₹' : '£';
  const formattedPrice = amount
    ? `${symbol}${(amount / 100).toFixed(2)} ${currUpper}`
    : isConcierge ? '£59.00 GBP' : '£19.00 GBP';

  const htmlContent = `
    <h1 class="h1">Your PawValid Plan is Active!</h1>
    <p class="lead">
      Thank you for your purchase. Your international travel compliance plan for <strong>${trip.petName}</strong> is now fully unlocked.
    </p>

    <div class="card">
      <h3 style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
        💳 Order &amp; Transaction Details
      </h3>
      <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #334155;">
        <tr>
          <td style="color: #64748b; width: 140px; font-weight: 600;">Pet Name:</td>
          <td><strong>${trip.petName}</strong> (${trip.species})</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Travel Route:</td>
          <td><strong>${trip.origin} &rarr; ${trip.destination}</strong></td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Departure Date:</td>
          <td>${trip.departureDate || 'Unspecified'}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Plan Tier:</td>
          <td><strong>${tierName}</strong></td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Amount Paid:</td>
          <td><strong style="color: #10b981;">${formattedPrice}</strong></td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Transaction ID:</td>
          <td><code style="background-color: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${paymentId}</code></td>
        </tr>
      </table>
    </div>

    <p style="margin: 20px 0;">
      You can access your command center, download your digital travel dossier, print kennel crate stickers, and verify departure readiness anytime:
    </p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${dashboardUrl}" class="btn">
        Open Trip Command Center &rarr;
      </a>
    </div>

    <p style="margin: 0; font-size: 13px; color: #64748b;">
      Your travel dossier will remain accessible online with live QR verification throughout your journey.
    </p>
  `;

  const textContent = `
Your PawValid Plan is Active!

Thank you for your purchase. Your travel compliance plan for ${trip.petName} is unlocked.

Order Summary:
- Pet: ${trip.petName} (${trip.species})
- Route: ${trip.origin} -> ${trip.destination}
- Plan: ${tierName}
- Total Paid: ${formattedPrice}
- Transaction ID: ${paymentId}

Access your trip command center:
${dashboardUrl}

PawValid Support Team
pawvalid.online
  `.trim();

  const fullHtml = wrapPawValidEmail({
    title: `Payment Confirmed: ${tierName} (${trip.petName})`,
    preheader: `Your PawValid plan for ${trip.petName} is active! Access your travel command center.`,
    contentHtml: htmlContent,
  });

  return sendTransactionalEmail({
    to: recipientEmail,
    subject: `Payment Confirmed: PawValid ${tierName} (${trip.petName})`,
    htmlContent: fullHtml,
    textContent,
    replyTo: { email: SUPPORT_EMAIL, name: 'PawValid Billing Support' },
  });
}
