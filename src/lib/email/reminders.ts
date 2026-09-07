/**
 * Pre-flight Email Reminders & Specialist Intake Dispatch Service
 * 
 * Uses Resend for transactional email delivery and Slack Webhooks for ops notifications.
 * Automatically falls back to mock/logging mode when RESEND_API_KEY is not configured.
 */

export interface SavedTripEmailContext {
  id: string;
  userEmail: string;
  petName: string;
  species: string;
  breed?: string | null;
  origin: string;
  destination: string;
  departureDate?: string | null;
  uploadedDocuments?: any;
  complianceChecklist?: any;
  readinessReport?: any;
  [key: string]: any;
}

export interface SpecialistIntakePayload {
  trip: SavedTripEmailContext;
  customerWhatsApp: string;
  notes?: string;
  urgency?: 'STANDARD' | 'HIGH' | 'IMMEDIATE';
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  mocked?: boolean;
  error?: string;
  slackNotified?: boolean;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Petvia Compliance <noreply@petvia.com>';
const SPECIALIST_TEAM_EMAIL = process.env.SPECIALIST_TEAM_EMAIL || 'specialists@petvia.com';

/**
 * Strips non-numeric characters for WhatsApp deep links
 */
export function formatWhatsAppLink(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

/**
 * Helper to get active Resend client or null if unconfigured
 */
async function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey || apiKey === '') {
    return null;
  }
  try {
    const { Resend } = await import('resend');
    return new Resend(apiKey);
  } catch (err) {
    console.warn('[Resend] Failed to load resend package:', err);
    return null;
  }
}

/**
 * Dispatch Slack webhook notification if configured
 */
export async function sendSlackOpsNotification(text: string, blocks?: any[]): Promise<boolean> {
  const slackUrl = process.env.SLACK_WEBHOOK_URL?.trim();
  if (!slackUrl) {
    return false;
  }
  try {
    const response = await fetch(slackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        blocks: blocks || [
          {
            type: 'section',
            text: { type: 'mrkdwn', text }
          }
        ]
      })
    });
    return response.ok;
  } catch (err) {
    console.warn('[Slack Webhook] Failed to send notification:', err);
    return false;
  }
}

/**
 * Shared HTML wrapper template matching Petvia's premium institutional design tokens
 */
function wrapHtmlEmail(title: string, preheader: string, contentHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #0f172a; color: #1e293b; }
    .container { max-width: 600px; margin: 24px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #10b981; }
    .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
    .body { padding: 32px 28px; background-color: #ffffff; font-size: 15px; line-height: 1.6; color: #334155; }
    .card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
    .card-urgent { background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
    .card-success { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
    .btn { display: inline-block; background-color: #10b981; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 12px 26px; border-radius: 6px; margin: 16px 0; font-size: 14px; text-align: center; }
    .badge { display: inline-block; padding: 3px 8px; font-size: 11px; font-weight: 700; border-radius: 4px; text-transform: uppercase; }
    .badge-high { background-color: #dc2626; color: #ffffff; }
    .badge-standard { background-color: #2563eb; color: #ffffff; }
    .badge-urgent { background-color: #b91c1c; color: #ffffff; }
    .footer { background-color: #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    .footer a { color: #0f766e; text-decoration: underline; }
    ul { margin: 8px 0; padding-left: 20px; }
    li { margin-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 14px; }
    th { text-align: left; padding: 8px; background-color: #e2e8f0; color: #334155; font-size: 12px; text-transform: uppercase; }
    td { padding: 8px; border-bottom: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <span style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</span>
  <div class="container">
    <div class="header">
      <h1>Petvia Compliance</h1>
      <p>Official International Travel Verification</p>
    </div>
    <div class="body">
      ${contentHtml}
    </div>
    <div class="footer">
      <p><strong>Institutional Travel Protection & Compliance</strong></p>
      <p>Petvia Global Travel Systems &bull; 27 Old Gloucester Street, London WC1N 3AX</p>
      <p>Official regulations sourced from DEFRA, USDA APHIS, EU TRACES & IATA LAR.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 1. Specialist Notification for Expert Review (£59 Tier Intake)
 * Dispatches full docket and WhatsApp direct link to Petvia's veterinary review team.
 */
export async function sendSpecialistIntakeNotification(
  payload: SpecialistIntakePayload
): Promise<EmailSendResult> {
  const { trip, customerWhatsApp, notes, urgency = 'STANDARD' } = payload;
  const cleanDigits = customerWhatsApp.replace(/\D/g, '');
  const waLink = formatWhatsAppLink(customerWhatsApp);
  const dashboardLink = `${APP_URL}/dashboard?tripId=${trip.id}&section=concierge`;

  // Parse documents
  let docList: Array<{ filename?: string; name?: string; category?: string }> = [];
  try {
    if (typeof trip.uploadedDocuments === 'string') {
      docList = JSON.parse(trip.uploadedDocuments);
    } else if (Array.isArray(trip.uploadedDocuments)) {
      docList = trip.uploadedDocuments;
    }
  } catch (e) {
    // fallback
  }

  // Parse blockers
  const blockers: string[] = [];
  try {
    const checklist = typeof trip.complianceChecklist === 'string' 
      ? JSON.parse(trip.complianceChecklist) 
      : trip.complianceChecklist;
    if (checklist?.all) {
      checklist.all
        .filter((item: any) => item.status === 'ACTION_REQUIRED' || item.status === 'NON_COMPLIANT')
        .forEach((item: any) => blockers.push(item.name || item.title));
    }
  } catch (e) {
    // ignore
  }

  const urgencyBadgeClass = urgency === 'IMMEDIATE' || urgency === 'HIGH' ? 'badge-high' : 'badge-standard';

  const htmlContent = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 16px;">
      <h2 style="margin:0; font-size: 20px; color: #0f172a;">🚨 New £59 Concierge Review Intake</h2>
      <span class="badge ${urgencyBadgeClass}">${urgency} PRIORITY</span>
    </div>
    <p>A pet owner has purchased the <strong>£59 Concierge Expert Audit</strong>. A licensed import specialist must review the dossier and contact the traveler.</p>

    <div class="card">
      <h3 style="margin-top:0; font-size:15px; color:#0f172a; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">📋 Travel Docket Information</h3>
      <table>
        <tr><td style="width: 35%; font-weight:600;">Pet Name:</td><td><strong>${trip.petName}</strong> (${trip.species}${trip.breed ? ` &bull; ${trip.breed}` : ''})</td></tr>
        <tr><td style="font-weight:600;">Route:</td><td><strong>${trip.origin} &rarr; ${trip.destination}</strong></td></tr>
        <tr><td style="font-weight:600;">Departure Date:</td><td>${trip.departureDate || 'Unspecified'}</td></tr>
        <tr><td style="font-weight:600;">Owner Email:</td><td><a href="mailto:${trip.userEmail}">${trip.userEmail}</a></td></tr>
        <tr><td style="font-weight:600;">WhatsApp Phone:</td><td><strong>+${cleanDigits}</strong></td></tr>
      </table>
      
      <div style="margin-top: 14px; text-align: center;">
        <a href="${waLink}" style="display: inline-block; background-color: #25D366; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px;">
          💬 Open WhatsApp Chat with Traveler (+${cleanDigits})
        </a>
      </div>
    </div>

    ${notes ? `
      <div class="card-urgent">
        <h4 style="margin: 0 0 6px 0; color: #991b1b; font-size: 14px;">📝 Owner's Personal Notes & Concerns:</h4>
        <p style="margin: 0; font-style: italic; color: #450a0a;">"${notes}"</p>
      </div>
    ` : ''}

    <div class="card">
      <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #0f172a;">📂 Uploaded Travel Documents (${docList.length})</h4>
      ${docList.length > 0 ? `
        <ul>
          ${docList.map(doc => `<li><strong>${doc.filename || doc.name || 'Document'}</strong> &mdash; <em>${doc.category || 'General'}</em></li>`).join('')}
        </ul>
      ` : '<p style="margin:0; font-size:13px; color:#64748b;">No documents uploaded to vault yet.</p>'}
    </div>

    ${blockers.length > 0 ? `
      <div class="card-urgent">
        <h4 style="margin: 0 0 8px 0; color: #991b1b; font-size: 14px;">⚠️ Detected Compliance Blockers (${blockers.length})</h4>
        <ul style="margin:0; padding-left:18px; color: #7f1d1d;">
          ${blockers.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    <div style="text-align: center; margin-top: 24px;">
      <a href="${dashboardLink}" class="btn" style="background-color: #0f172a;">
        Review Full Trip Dossier in Command Center &rarr;
      </a>
    </div>
  `;

  const subject = `🚨 [${urgency}] New £59 Concierge Review: ${trip.petName} (${trip.origin} → ${trip.destination})`;
  const fullHtml = wrapHtmlEmail(subject, `New intake received for ${trip.petName} traveling to ${trip.destination}`, htmlContent);

  // 1. Send Slack notification if configured
  const slackText = `🚨 *New £59 Concierge Review Intake*\n• *Pet:* ${trip.petName} (${trip.species})\n• *Route:* ${trip.origin} ➔ ${trip.destination}\n• *Date:* ${trip.departureDate || 'TBD'}\n• *WhatsApp:* <${waLink}|+${cleanDigits}>\n• *Email:* ${trip.userEmail}\n• *Urgency:* ${urgency}\n• *Notes:* ${notes || 'None'}\n• *Dossier:* <${dashboardLink}|View in Dashboard>`;
  const slackNotified = await sendSlackOpsNotification(slackText);

  // 2. Send email via Resend
  const resend = await getResendClient();
  if (!resend) {
    console.info(`[Email Service Mock] Specialist Notification dispatches for ${trip.petName} to ${SPECIALIST_TEAM_EMAIL}`);
    return {
      success: true,
      mocked: true,
      messageId: `mock-specialist-${Date.now()}`,
      slackNotified,
    };
  }

  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: SPECIALIST_TEAM_EMAIL,
      replyTo: trip.userEmail,
      subject,
      html: fullHtml,
    });

    return {
      success: true,
      messageId: res.data?.id,
      slackNotified,
    };
  } catch (err: any) {
    console.error('[Resend Error] Specialist intake failed:', err);
    return {
      success: false,
      error: err.message || 'Failed to send specialist email',
      slackNotified,
    };
  }
}

/**
 * 2. Day -30 Email Reminder
 * Airline live-animal booking (AVIH/PETC), IATA CR-82 crate sizing, rabies clock check.
 */
export async function sendDay30Reminder(trip: SavedTripEmailContext): Promise<EmailSendResult> {
  const crateLink = `${APP_URL}/dashboard?tripId=${trip.id}&section=crate`;
  const subject = `🐾 30 Days to Departure: Confirm Airline Booking & Crate Specs for ${trip.petName}`;

  const htmlContent = `
    <h2 style="margin-top:0; color: #0f172a; font-size: 20px;">30-Day Departure Countdown: Critical Milestones</h2>
    <p>Your scheduled departure with <strong>${trip.petName}</strong> is approximately 30 days away. International pet transit requires strict advance reservations and hardware compliance.</p>

    <div class="card">
      <h3 style="margin-top:0; color:#0f172a; font-size: 15px;">1. Confirm Airline Live-Animal Reservation (AVIH / PETC)</h3>
      <p style="margin: 4px 0; font-size: 13.5px; color: #475569;">
        Commercial airlines strictly cap the number of animals allowed in cabin (PETC) or temperature-controlled cargo hold (AVIH).
        Call your carrier's pet reservation desk now to confirm your pet's space is ticketed, not just requested.
      </p>
    </div>

    <div class="card">
      <h3 style="margin-top:0; color:#0f172a; font-size: 15px;">2. IATA Container Requirement 82 (CR-82) Compliance</h3>
      <p style="margin: 4px 0; font-size: 13.5px; color: #475569;">
        Airlines will reject pets at check-in if the crate does not meet IATA CR-82 dimensions:
      </p>
      <ul style="font-size: 13.5px; color: #334155;">
        <li><strong>Headroom:</strong> At least 5–7 cm clearance above ears/head while standing naturally.</li>
        <li><strong>Turning space:</strong> Pet must be able to turn around and lie down comfortably.</li>
        <li><strong>Hardware:</strong> Metal nuts and bolts only &mdash; plastic dial fasteners are banned on transatlantic routes.</li>
        <li><strong>Water Container:</strong> External funnel and dual-chamber water bowl attached to the door.</li>
      </ul>
      <div style="text-align: center; margin-top: 10px;">
        <a href="${crateLink}" class="btn">Calculate Crate Dimensions &rarr;</a>
      </div>
    </div>

    <div class="card-success">
      <h3 style="margin-top:0; color:#166534; font-size: 15px;">3. Rabies Clock Check</h3>
      <p style="margin: 4px 0; font-size: 13.5px; color: #15803d;">
        Ensure your pet's primary rabies vaccination was administered <strong>after</strong> microchip implantation and is at least 21 days old prior to flight day.
      </p>
    </div>
  `;

  return deliverTravelerEmail(trip, subject, `30 days until ${trip.petName}'s flight to ${trip.destination}`, htmlContent);
}

/**
 * 3. Day -5 Email Reminder
 * Mandatory Tapeworm (Echinococcus multilocularis) treatment window (24h - 120h).
 */
export async function sendDay5Reminder(trip: SavedTripEmailContext): Promise<EmailSendResult> {
  const vetSheetLink = `${APP_URL}/dashboard?tripId=${trip.id}&section=vetsheet`;
  const subject = `⚠️ Action Required: Mandatory Tapeworm Administration Window for ${trip.petName}`;

  const htmlContent = `
    <div style="border-left: 4px solid #f59e0b; padding-left: 14px; margin-bottom: 16px;">
      <h2 style="margin:0; color: #0f172a; font-size: 20px;">5 Days to Departure: Mandatory Tapeworm Treatment</h2>
      <p style="margin:4px 0 0 0; color:#b45309; font-weight:600; font-size:13px;">Strict 24 to 120 Hour Window Verification</p>
    </div>

    <p>Destinations such as the United Kingdom, Ireland, Finland, Norway, and Malta enforce <strong>zero-tolerance tapeworm treatment rules</strong> (EU Regulation 576/2013).</p>

    <div class="card-urgent">
      <h3 style="margin-top:0; color: #991b1b; font-size: 15px;">Veterinary Instructions Checklist</h3>
      <ul style="font-size: 13.5px; color: #7f1d1d;">
        <li><strong>Active Ingredient:</strong> Must contain <strong>Praziquantel</strong> or clinically approved equivalent.</li>
        <li><strong>Administration Window:</strong> Between <strong>24 hours</strong> and <strong>120 hours</strong> prior to your scheduled arrival time.</li>
        <li><strong>Veterinary Signature & Stamp:</strong> The administering vet must personally record the date, exact time (24h format), and product manufacturer on the official certificate.</li>
      </ul>
    </div>

    <div class="card">
      <h3 style="margin-top:0; color: #0f172a; font-size: 15px;">Print the Official Veterinary Instructions Sheet</h3>
      <p style="margin: 4px 0 12px 0; font-size: 13.5px; color: #475569;">
        Take our pre-filled, bilingual veterinary reference sheet to your appointment so your vet records the timestamps exactly as border inspectors require.
      </p>
      <div style="text-align: center;">
        <a href="${vetSheetLink}" class="btn" style="background-color:#0f766e;">
          Download Clinical Vet Sheet &rarr;
        </a>
      </div>
    </div>
  `;

  return deliverTravelerEmail(trip, subject, `Mandatory 24-120h tapeworm treatment window for ${trip.petName}`, htmlContent);
}

/**
 * 4. Day -2 Email Reminder
 * Government endorsement pickup & final travel folder assembly.
 */
export async function sendDay2Reminder(trip: SavedTripEmailContext): Promise<EmailSendResult> {
  const vaultLink = `${APP_URL}/dashboard?tripId=${trip.id}&section=vault`;
  const subject = `✈️ 48 Hours to Travel: Government Endorsement Pickup & Final Flight Folder`;

  const htmlContent = `
    <h2 style="margin-top:0; color: #0f172a; font-size: 20px;">Final 48 Hours: Flight Preparation Checklist</h2>
    <p>You are 2 days away from traveling with <strong>${trip.petName}</strong>. Complete these final operational steps to guarantee smooth border clearance:</p>

    <div class="card-success">
      <h3 style="margin-top:0; color:#166534; font-size: 15px;">1. Collect Physical Government Endorsement</h3>
      <p style="margin: 4px 0; font-size: 13.5px; color: #15803d;">
        Confirm your official Veterinary Health Certificate has been countersigned and embossed by your country's national veterinary authority (e.g., USDA APHIS, DEFRA, or State Vet Service). Digital QR codes must be clear and readable.
      </p>
    </div>

    <div class="card">
      <h3 style="margin-top:0; color:#0f172a; font-size: 15px;">2. Assemble Physical Travel Folder (Carry-On)</h3>
      <p style="margin: 4px 0; font-size: 13.5px; color: #475569;">
        Never pack pet travel documents in checked luggage. Prepare a waterproof folder containing:
      </p>
      <ul style="font-size: 13.5px; color: #334155;">
        <li>Original stamped Health Certificate + 2 photocopies</li>
        <li>Official Rabies Vaccination Certificate (showing 15-digit microchip)</li>
        <li>Original Rabies Neutralizing Antibody Titer Test (RNATT) lab sheet (if applicable)</li>
        <li>Tapeworm administration receipt & clinical certificate</li>
        <li>Airline live-animal confirmation ticket</li>
      </ul>
      <div style="text-align: center; margin-top: 10px;">
        <a href="${vaultLink}" class="btn">View Document Vault &amp; Digital Dossier &rarr;</a>
      </div>
    </div>

    <div class="card">
      <h3 style="margin-top:0; color:#0f172a; font-size: 15px;">3. Airport Check-in Tips</h3>
      <ul style="font-size: 13.5px; color: #334155;">
        <li>Arrive at the terminal at least <strong>3 to 4 hours</strong> prior to departure.</li>
        <li>Do not feed ${trip.petName} solid food within 4 hours of flight to prevent air sickness.</li>
        <li>Freeze water inside crate bowl so it melts gradually without spilling during loading.</li>
      </ul>
    </div>
  `;

  return deliverTravelerEmail(trip, subject, `48 hours until ${trip.petName}'s journey to ${trip.destination}`, htmlContent);
}

/**
 * Dispatcher helper for scheduled reminder emails to traveler
 */
async function deliverTravelerEmail(
  trip: SavedTripEmailContext,
  subject: string,
  preheader: string,
  htmlContent: string
): Promise<EmailSendResult> {
  const fullHtml = wrapHtmlEmail(subject, preheader, htmlContent);
  const resend = await getResendClient();

  if (!resend) {
    console.info(`[Email Service Mock] Delivered reminder "${subject}" to ${trip.userEmail}`);
    return {
      success: true,
      mocked: true,
      messageId: `mock-traveler-${Date.now()}`,
    };
  }

  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: trip.userEmail,
      subject,
      html: fullHtml,
    });

    return {
      success: true,
      messageId: res.data?.id,
    };
  } catch (err: any) {
    console.error(`[Resend Error] Reminder failed for ${trip.userEmail}:`, err);
    return {
      success: false,
      error: err.message || 'Failed to send reminder email',
    };
  }
}

/**
 * Universal dispatcher for test or cron reminders
 */
export async function sendTripReminder(
  trip: SavedTripEmailContext,
  reminderType: 'DAY_30' | 'DAY_5' | 'DAY_2'
): Promise<EmailSendResult> {
  switch (reminderType) {
    case 'DAY_30':
      return sendDay30Reminder(trip);
    case 'DAY_5':
      return sendDay5Reminder(trip);
    case 'DAY_2':
      return sendDay2Reminder(trip);
    default:
      throw new Error(`Unsupported reminder type: ${reminderType}`);
  }
}
