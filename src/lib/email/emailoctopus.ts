import crypto from 'crypto';

/**
 * EmailOctopus v2 REST API Client for PawValid
 * 
 * Documentation: https://emailoctopus.com/api-documentation/v2
 * Base URL: https://api.emailoctopus.com
 * Auth: Authorization: Bearer {token}
 */

const EMAILOCTOPUS_BASE_URL = 'https://api.emailoctopus.com';

export interface EmailOctopusContactPayload {
  email_address: string;
  fields?: Record<string, any>;
  tags?: Record<string, boolean>;
  status?: 'subscribed' | 'pending' | 'unsubscribed';
}

export interface EmailOctopusSyncResult {
  success: boolean;
  contactId?: string;
  mocked?: boolean;
  error?: string;
  status?: number;
  data?: any;
}

export interface EmailOctopusAutomationResult {
  success: boolean;
  queued?: boolean;
  mocked?: boolean;
  error?: string;
  status?: number;
}

/**
 * Computes MD5 hash of lowercase email address for EmailOctopus contact identification.
 */
export function getEmailOctopusContactId(email: string): string {
  return crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
}

/**
 * Retrieves EmailOctopus environment credentials
 */
export function getEmailOctopusConfig() {
  const apiKey = process.env.EMAILOCTOPUS_API_KEY?.trim();
  const listId = process.env.EMAILOCTOPUS_LIST_ID?.trim();
  const onboardingAutomationId = process.env.EMAILOCTOPUS_AUTOMATION_ONBOARDING_ID?.trim();
  const paidAutomationId = process.env.EMAILOCTOPUS_AUTOMATION_PAID_ID?.trim();

  return {
    apiKey,
    listId,
    onboardingAutomationId,
    paidAutomationId,
    isConfigured: Boolean(apiKey && apiKey.length > 5),
  };
}

/**
 * Generic fetch wrapper with Bearer authentication, rate limit handling, and JSON parsing.
 */
async function emailOctopusFetch(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    retries?: number;
  } = {}
): Promise<{ ok: boolean; status: number; data?: any; error?: string }> {
  const { apiKey } = getEmailOctopusConfig();
  if (!apiKey) {
    return {
      ok: false,
      status: 401,
      error: 'EMAILOCTOPUS_API_KEY is not configured in environment',
    };
  }

  const url = endpoint.startsWith('http') ? endpoint : `${EMAILOCTOPUS_BASE_URL}${endpoint}`;
  const method = options.method || 'GET';
  const retries = options.retries ?? 2;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    // Handle Rate Limiting (Token Bucket: 429)
    if (res.status === 429 && retries > 0) {
      const retryAfter = parseInt(res.headers.get('X-RateLimit-Retry-After') || '1', 10);
      const backoffMs = Math.max(retryAfter * 1000, 500);
      console.warn(`[EmailOctopus] Rate limited (429). Retrying after ${backoffMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
      return emailOctopusFetch(endpoint, { ...options, retries: retries - 1 });
    }

    if (res.status === 204) {
      return { ok: true, status: 204 };
    }

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorDetail = data?.detail || data?.title || (data?.errors && JSON.stringify(data.errors)) || `HTTP ${res.status}`;
      return {
        ok: false,
        status: res.status,
        data,
        error: errorDetail,
      };
    }

    return { ok: true, status: res.status, data };
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      error: err.message || 'Network error communicating with EmailOctopus API',
    };
  }
}

/**
 * Upserts (creates or updates) a contact in an EmailOctopus list.
 * PUT /lists/{list_id}/contacts
 */
export async function upsertContact(
  listId: string,
  payload: EmailOctopusContactPayload
): Promise<EmailOctopusSyncResult> {
  const { isConfigured } = getEmailOctopusConfig();

  if (!isConfigured) {
    console.log(
      `[EmailOctopus Mock] upsertContact to list ${listId}: ${payload.email_address} (tags: ${JSON.stringify(payload.tags)})`
    );
    return {
      success: true,
      mocked: true,
      contactId: getEmailOctopusContactId(payload.email_address),
    };
  }

  const endpoint = `/lists/${encodeURIComponent(listId)}/contacts`;
  const res = await emailOctopusFetch(endpoint, {
    method: 'PUT',
    body: {
      email_address: payload.email_address.toLowerCase().trim(),
      fields: payload.fields || {},
      tags: payload.tags || {},
      status: payload.status || 'subscribed',
    },
  });

  if (!res.ok) {
    console.error(`[EmailOctopus Error] Failed to upsert contact ${payload.email_address}:`, res.error);
    return {
      success: false,
      status: res.status,
      error: res.error,
    };
  }

  return {
    success: true,
    contactId: res.data?.id || getEmailOctopusContactId(payload.email_address),
    data: res.data,
  };
}

/**
 * Starts an automation sequence for a specific contact.
 * POST /automations/{automation_id}/queue
 */
export async function queueAutomation(
  automationId: string,
  emailOrContactId: string
): Promise<EmailOctopusAutomationResult> {
  const { isConfigured } = getEmailOctopusConfig();

  // If provided an email, compute MD5 contact ID
  const contactId = emailOrContactId.includes('@')
    ? getEmailOctopusContactId(emailOrContactId)
    : emailOrContactId;

  if (!isConfigured) {
    console.log(`[EmailOctopus Mock] Queued automation ${automationId} for contact ${contactId}`);
    return {
      success: true,
      queued: true,
      mocked: true,
    };
  }

  const endpoint = `/automations/${encodeURIComponent(automationId)}/queue`;
  const res = await emailOctopusFetch(endpoint, {
    method: 'POST',
    body: { contact_id: contactId },
  });

  if (!res.ok) {
    console.error(`[EmailOctopus Error] Failed to queue automation ${automationId}:`, res.error);
    return {
      success: false,
      status: res.status,
      error: res.error,
    };
  }

  return {
    success: true,
    queued: true,
    status: res.status,
  };
}

/**
 * Retrieves all lists from EmailOctopus account.
 * GET /lists
 */
export async function getLists() {
  return emailOctopusFetch('/lists');
}

/**
 * Syncs a PawValid traveler trip into EmailOctopus with structured compliance metadata.
 */
export async function syncTravelerToEmailOctopus(
  trip: {
    userEmail: string;
    petName?: string | null;
    species?: string | null;
    origin?: string | null;
    destination?: string | null;
    departureDate?: string | null;
    tier?: string | null;
    id?: string | null;
    route?: any;
    petProfile?: any;
    [key: string]: any;
  },
  options: {
    tag?: string;
    isPaid?: boolean;
    triggerAutomationId?: string;
  } = {}
): Promise<EmailOctopusSyncResult> {
  const { listId, onboardingAutomationId, paidAutomationId } = getEmailOctopusConfig();
  const targetListId = listId || 'default-pawvalid-list';

  const email = trip.userEmail?.trim();
  if (!email || (email.startsWith('guest_') && email.includes('@guest.'))) {
    // Skip anonymous guest temporary emails to protect list reputation
    return {
      success: true,
      mocked: true,
      error: 'Skipped guest placeholder email',
    };
  }

  const petName = trip.petName || trip.petProfile?.name || 'Pet';
  const species = trip.species || trip.petProfile?.species || 'Canine';
  const origin = trip.route?.origin || trip.origin || 'United Kingdom';
  const destination = trip.route?.destination || trip.destination || 'International';
  const departureDate = trip.route?.departureDate || trip.departureDate || '';
  const tier = trip.tier || (options.isPaid ? 'CERTIFIED_PASS' : 'FREE');

  // Build custom fields
  const fields: Record<string, any> = {
    PetName: petName,
    Species: species,
    Origin: origin,
    Destination: destination,
    DepartureDate: departureDate,
    Tier: tier,
    PassId: trip.id ? `PV-2026-${trip.id.slice(0, 8)}` : 'PV-2026',
  };

  // Build tags
  const tags: Record<string, boolean> = {
    traveler: true,
    [species.toLowerCase()]: true,
  };

  if (tier === 'CERTIFIED_PASS') {
    tags.certified_pass = true;
    tags.free_scanner = false;
  } else if (tier === 'CONCIERGE') {
    tags.concierge = true;
    tags.certified_pass = true;
    tags.free_scanner = false;
  } else {
    tags.free_scanner = true;
  }

  if (options.tag) {
    tags[options.tag] = true;
  }

  // 1. Upsert contact in list
  const upsertRes = await upsertContact(targetListId, {
    email_address: email,
    fields,
    tags,
    status: 'subscribed',
  });

  // 2. Trigger relevant automation if configured
  const targetAutomation =
    options.triggerAutomationId ||
    (options.isPaid || tier !== 'FREE' ? paidAutomationId : onboardingAutomationId);

  if (targetAutomation) {
    try {
      await queueAutomation(targetAutomation, email);
    } catch (autoErr) {
      console.warn('[EmailOctopus] Automation trigger warning:', autoErr);
    }
  }

  return upsertRes;
}

/**
 * Quick diagnostic test to verify EmailOctopus API connectivity & account settings.
 */
export async function testEmailOctopusConnection() {
  const config = getEmailOctopusConfig();
  if (!config.isConfigured) {
    return {
      configured: false,
      message: 'EMAILOCTOPUS_API_KEY is not set in environment.',
      envStatus: {
        hasApiKey: false,
        listId: config.listId || null,
      },
    };
  }

  const listsRes = await getLists();
  if (!listsRes.ok) {
    return {
      configured: true,
      connected: false,
      error: listsRes.error,
      status: listsRes.status,
    };
  }

  const lists = listsRes.data?.data || [];
  return {
    configured: true,
    connected: true,
    listCount: lists.length,
    lists: lists.map((l: any) => ({ id: l.id, name: l.name })),
    targetListFound: config.listId ? lists.some((l: any) => l.id === config.listId) : false,
  };
}
