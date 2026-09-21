/**
 * Zod Validation Schemas (TRD §4)
 *
 * Zod-validated request/response types for all API endpoints.
 * Validation failures return 400 with field-level errors — never partial/best-effort evaluation.
 */

import { z } from 'zod';

// ─── Check API ─────────────────────────────────────────────────────────────────

export const checkRequestSchema = z.object({
  trip: z.object({
    originCountry: z.string().min(2).max(3),
    destinationCountry: z.string().min(2).max(3),
    transitCountries: z.union([z.array(z.string()), z.string()]).optional(),
    transit_countries: z.union([z.array(z.string()), z.string()]).optional(),
    departureDatetime: z.string().datetime({ message: 'Must be a valid ISO datetime' }),
    arrivalDatetime: z.string().datetime({ message: 'Must be a valid ISO datetime' }),
    airlineSlug: z.string().min(1),
    entryAirport: z.string().optional(),
  }),
  pet: z.object({
    species: z.enum(['DOG', 'CAT']),
    countryOfResidence: z.string().min(2).max(3),
    breed: z.string().optional(),
    ageMonths: z.number().int().positive().optional(),
    weightKg: z.number().positive().optional(),
    microchipNumber: z.string().optional(),
    microchipDate: z.string().datetime().optional(),
    sterilized: z.boolean().optional(),
    mostRecentRabiesVaccination: z.object({
      date: z.string().datetime(),
      type: z.enum(['PRIMARY', 'BOOSTER']),
      validityEnd: z.string().datetime().optional(),
    }).optional(),
    hasHealthCertificate: z.boolean().optional(),
    healthCertificateDate: z.string().datetime().optional(),
    hasImportPermit: z.boolean().optional(),
    hasTapewormTreatment: z.boolean().optional(),
    tapewormTreatmentDate: z.string().datetime().optional(),
    unknownFields: z.array(z.string()).optional(),
  }),
  save: z.boolean().optional().default(false),
});

export type CheckRequest = z.infer<typeof checkRequestSchema>;

export const checkResponseSchema = z.object({
  overallVerdict: z.enum([
    'APPEARS_READY',
    'MOSTLY_READY',
    'ACTION_REQUIRED',
    'UNABLE_TO_DETERMINE',
  ]),
  items: z.array(z.object({
    requirementId: z.string(),
    status: z.enum(['SATISFIED', 'PROBLEM', 'MISSING', 'UNABLE_TO_DETERMINE']),
    severity: z.enum(['BLOCKING', 'NON_BLOCKING', 'INFORMATIONAL']),
    category: z.string(),
    ruleText: z.string(),
    detail: z.string(),
    deadlineIfApplicable: z.string().optional(),
    confidence: z.string(),
    source: z.object({
      publisher: z.string(),
      url: z.string(),
      lastVerifiedAt: z.string(),
    }),
  })),
  assessmentId: z.string().optional(),
});

export type CheckResponse = z.infer<typeof checkResponseSchema>;

// ─── Requirements API ──────────────────────────────────────────────────────────

export const requirementsQuerySchema = z.object({
  route: z.string().min(1),
  species: z.enum(['DOG', 'CAT']),
});

// ─── Report Checkout ───────────────────────────────────────────────────────────

export const checkoutRequestSchema = z.object({
  assessmentId: z.string().min(1),
  email: z.string().email(),
  amount: z.number().int().positive().optional().default(49900), // amount in paisa (₹499 default)
  currency: z.string().optional().default('INR'),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;

// ─── Razorpay Webhook ──────────────────────────────────────────────────────────

export const razorpayWebhookSchema = z.object({
  event: z.string(),
  payload: z.object({
    payment: z.object({
      entity: z.object({
        id: z.string(),
        order_id: z.string(),
        status: z.string(),
        notes: z.record(z.string(), z.string()).optional(),
      }),
    }).optional(),
    order: z.object({
      entity: z.object({
        id: z.string(),
        status: z.string(),
        notes: z.record(z.string(), z.string()).optional(),
      }),
    }).optional(),
  }),
});
