export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';

export const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Strips leading locale prefixes (/en, /de, /fr, /es) if present in the given pathname.
 */
export function cleanLocalePath(path: string): string {
  let clean = path.trim();
  if (!clean.startsWith('/')) {
    clean = `/${clean}`;
  }
  for (const loc of SUPPORTED_LOCALES) {
    if (clean === `/${loc}`) {
      return '';
    }
    if (clean.startsWith(`/${loc}/`)) {
      return clean.slice(loc.length + 1);
    }
  }
  return clean === '/' ? '' : clean;
}

/**
 * Returns a Next.js Metadata alternates object containing canonical and hreflang language alternates.
 */
export function getHreflangAlternates(pathname: string = '') {
  const cleanPath = cleanLocalePath(pathname);

  // Root homepage alternates
  if (!cleanPath) {
    return {
      canonical: BASE_URL,
      languages: {
        en: `${BASE_URL}/en/checker`,
        de: `${BASE_URL}/de/checker`,
        fr: `${BASE_URL}/fr/checker`,
        es: `${BASE_URL}/es/checker`,
        'x-default': BASE_URL,
      },
    };
  }

  return {
    canonical: `${BASE_URL}/en${cleanPath}`,
    languages: {
      en: `${BASE_URL}/en${cleanPath}`,
      de: `${BASE_URL}/de${cleanPath}`,
      fr: `${BASE_URL}/fr${cleanPath}`,
      es: `${BASE_URL}/es${cleanPath}`,
      'x-default': `${BASE_URL}/en${cleanPath}`,
    },
  };
}
