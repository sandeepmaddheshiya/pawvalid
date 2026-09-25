import { Polar } from '@polar-sh/sdk';
import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks';

/**
 * Returns true if Polar credentials are configured.
 */
export function isPolarConfigured(): boolean {
  return Boolean(process.env.POLAR_ACCESS_TOKEN?.trim());
}

/**
 * Get an initialized Polar SDK client.
 */
export function getPolarClient(): Polar {
  const token = process.env.POLAR_ACCESS_TOKEN || '';
  const isProd = process.env.POLAR_ENVIRONMENT === 'production' || process.env.NODE_ENV === 'production';
  const server = isProd ? 'production' : 'sandbox';

  return new Polar({
    accessToken: token,
    server: (process.env.POLAR_SERVER as 'sandbox' | 'production') || server,
  });
}

export const POLAR_TIER_PRICES: Record<string, Record<string, number>> = {
  CERTIFIED_PASS: {
    GBP: 1900, // £19.00 in pence
    USD: 2400, // $24.00 in cents
    EUR: 2200, // €22.00 in cents
  },
  CONCIERGE: {
    GBP: 5900, // £59.00 in pence
    USD: 7900, // $79.00 in cents
    EUR: 6900, // €69.00 in cents
  },
};

export interface CreatePolarTripCheckoutParams {
  tripId: string;
  tier: 'CERTIFIED_PASS' | 'CONCIERGE';
  email: string;
  whatsappNumber?: string;
  urgency?: string;
  notes?: string;
  currency?: string;
  successUrl?: string;
  returnUrl?: string;
}

/**
 * Creates a Polar checkout session for a saved trip plan.
 */
export async function createPolarTripCheckout(params: CreatePolarTripCheckoutParams) {
  const {
    tripId,
    tier,
    email,
    whatsappNumber = '',
    urgency = 'HIGH',
    notes = '',
    currency = 'GBP',
    successUrl,
    returnUrl,
  } = params;

  const polar = getPolarClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';

  // Check if explicit product IDs are configured in environment
  const envProductId =
    tier === 'CONCIERGE'
      ? process.env.POLAR_PRODUCT_ID_CONCIERGE
      : process.env.POLAR_PRODUCT_ID_CERTIFIED_PASS;

  // Fallback product ID if a single product is configured
  const defaultProductId = process.env.POLAR_PRODUCT_ID;
  const productIdToUse = envProductId || defaultProductId;

  const defaultSuccessUrl = `${appUrl}/dashboard?tripId=${tripId}&tab=${
    tier === 'CONCIERGE' ? 'concierge' : 'overview'
  }&checkout_id={CHECKOUT_ID}&payment_provider=polar`;

  const defaultReturnUrl = `${appUrl}/dashboard?tripId=${tripId}`;

  const metadata: Record<string, string | number | boolean> = {
    tripId,
    tier,
    email: email.toLowerCase().trim(),
    urgency: urgency || 'HIGH',
    source: 'pawvalid_trip_checkout',
  };

  if (whatsappNumber && whatsappNumber.trim()) {
    metadata.whatsappNumber = whatsappNumber.trim();
  }
  if (notes && notes.trim()) {
    metadata.notes = notes.trim();
  }

  // If product ID exists, create checkout with product
  if (productIdToUse) {
    const checkout = await polar.checkouts.create({
      products: [productIdToUse],
      customerEmail: email.toLowerCase().trim(),
      successUrl: successUrl || defaultSuccessUrl,
      returnUrl: returnUrl || defaultReturnUrl,
      metadata,
    });

    return checkout;
  }

  // If no product ID is configured, list available products or create checkout
  try {
    const productsList = await polar.products.list({ limit: 10 });
    const matchingProduct = productsList.result?.items?.find((p) =>
      tier === 'CONCIERGE'
        ? p.name.toLowerCase().includes('concierge') || p.name.toLowerCase().includes('review')
        : p.name.toLowerCase().includes('pass') || p.name.toLowerCase().includes('plan')
    ) || productsList.result?.items?.[0];

    if (matchingProduct) {
      const checkout = await polar.checkouts.create({
        products: [matchingProduct.id],
        customerEmail: email.toLowerCase().trim(),
        successUrl: successUrl || defaultSuccessUrl,
        returnUrl: returnUrl || defaultReturnUrl,
        metadata,
      });

      return checkout;
    }
  } catch (prodErr) {
    console.warn('[Polar] Could not fetch products list automatically:', prodErr);
  }

  throw new Error(
    'No Polar Product ID configured. Please set POLAR_PRODUCT_ID_CERTIFIED_PASS and POLAR_PRODUCT_ID_CONCIERGE in your environment variables.'
  );
}

export interface CreatePolarReportCheckoutParams {
  assessmentId: string;
  email: string;
  successUrl?: string;
  returnUrl?: string;
}

/**
 * Creates a Polar checkout session for an assessment report.
 */
export async function createPolarReportCheckout(params: CreatePolarReportCheckoutParams) {
  const { assessmentId, email, successUrl, returnUrl } = params;
  const polar = getPolarClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';

  const productId =
    process.env.POLAR_PRODUCT_ID_REPORT ||
    process.env.POLAR_PRODUCT_ID_CERTIFIED_PASS ||
    process.env.POLAR_PRODUCT_ID;

  const defaultSuccessUrl = `${appUrl}/en/checker/${assessmentId}?checkout_id={CHECKOUT_ID}&payment_provider=polar`;
  const defaultReturnUrl = `${appUrl}/en/checker/${assessmentId}`;

  const metadata: Record<string, string | number | boolean> = {
    assessmentId,
    email: email.toLowerCase().trim(),
    source: 'pawvalid_assessment_checkout',
  };

  if (productId) {
    const checkout = await polar.checkouts.create({
      products: [productId],
      customerEmail: email.toLowerCase().trim(),
      successUrl: successUrl || defaultSuccessUrl,
      returnUrl: returnUrl || defaultReturnUrl,
      metadata,
    });
    return checkout;
  }

  // Attempt to find any active product
  const productsList = await polar.products.list({ limit: 5 });
  const firstProduct = productsList.result?.items?.[0];
  if (!firstProduct) {
    throw new Error('No products found on Polar organization.');
  }

  const checkout = await polar.checkouts.create({
    products: [firstProduct.id],
    customerEmail: email.toLowerCase().trim(),
    successUrl: successUrl || defaultSuccessUrl,
    returnUrl: returnUrl || defaultReturnUrl,
    metadata,
  });

  return checkout;
}

/**
 * Validates a Polar webhook event.
 */
export function parseAndValidatePolarWebhook(
  rawBody: string,
  headers: Record<string, string>,
  webhookSecret?: string
) {
  const secret = webhookSecret || process.env.POLAR_WEBHOOK_SECRET;

  if (secret) {
    return validateEvent(rawBody, headers, secret);
  }

  // In local development or testing without a webhook secret, parse raw JSON
  try {
    return JSON.parse(rawBody);
  } catch (err) {
    throw new WebhookVerificationError('Failed to parse webhook JSON payload');
  }
}
