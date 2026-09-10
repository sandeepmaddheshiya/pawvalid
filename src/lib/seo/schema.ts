/**
 * Schema.org JSON-LD Structured Data Generators for SEO, AEO & GEO
 *
 * Implements Google-compliant structured data for:
 * - Organization (E-E-A-T entity signals, logo, social links, support contact)
 * - SoftwareApplication / WebApplication (automated tool metadata, pricing, features)
 * - FAQPage (Answer Engine Optimization for Google SGE, Perplexity, ChatGPT)
 * - BreadcrumbList (navigational & geographic hierarchy for search engines)
 * - HowTo (step-by-step regulatory preparation timeline)
 */

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HowToStep {
  step: number;
  title: string;
  description: string;
}

/**
 * Organization Schema: Establishes brand entity, authority, and official support channels
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PawValid',
    legalName: 'PawValid Pet Travel Compliance',
    url: BASE_URL,
    logo: `${BASE_URL}/globe.svg`,
    description:
      'Independent global pet travel compliance platform. Verified cross-border requirement checks against DEFRA, USDA APHIS, EU TRACES & IATA regulations.',
    email: 'support@pawvalid.online',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'support@pawvalid.online',
        contactType: 'customer support',
        availableLanguage: ['English', 'German', 'French', 'Spanish'],
      },
    ],
    sameAs: [
      'https://twitter.com/pawvalid',
      'https://github.com/sandeepmaddheshiya/pawvalid',
    ],
  };
}

/**
 * WebApplication Schema: Signals an automated tool with specific pricing tiers and capabilities
 */
export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PawValid Compliance Assistant',
    url: BASE_URL,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'All (Web Browser)',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      'Automated pet travel readiness assessment engine. Instantly verifies veterinary records, microchips, rabies vaccination timelines, and government health certificates for international animal relocation.',
    offers: [
      {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'GBP',
        name: 'Free Document Verification & Gap Analysis',
        description: 'Instant document scan, quarantine calculation, and route compliance checklist.',
      },
      {
        '@type': 'Offer',
        price: '19.00',
        priceCurrency: 'GBP',
        name: 'Certified Trip Pass',
        description: 'Complete digital travel dossier, verifiable QR pass, and 12-month document vault access.',
      },
      {
        '@type': 'Offer',
        price: '59.00',
        priceCurrency: 'GBP',
        name: 'Priority Concierge Review',
        description: 'Dedicated veterinary import specialist audit, 24-hour WhatsApp liaison, and flight booking review.',
      },
    ],
    featureList: [
      'Multimodal Document OCR & Certificate Scanner',
      'DEFRA, USDA APHIS, EU Regulation 576/2013 Statutory Cross-Check',
      'Rabies Titer & Waiting Period Clocks',
      'Airline-Compliant IATA Crate Calculator',
      'Digital Pet Passport & Customs Verification QR',
    ],
  };
}

/**
 * FAQPage Schema: Enables Google Rich Snippets & direct AI Answer extraction (ChatGPT, Perplexity)
 */
export function getFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

/**
 * BreadcrumbList Schema: Informs search engines of geographic hierarchy (Home > Corridors > USA to Germany)
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * HowTo Schema: Formats timeline steps for rich instruction snippets
 */
export function getHowToSchema(options: {
  title: string;
  description: string;
  steps: HowToStep[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: options.title,
    description: options.description,
    step: options.steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.step,
      name: s.title,
      text: s.description,
    })),
  };
}
