import enMessages from './messages/en.json';
import deMessages from './messages/de.json';
import frMessages from './messages/fr.json';
import esMessages from './messages/es.json';

export const locales = ['en', 'de', 'fr', 'es'] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = 'en';

export interface TransitHubInfo {
  locale: AppLocale;
  name: string;
  nativeName: string;
  flag: string;
  primaryHub: string;
  country: string;
}

export const TRANSIT_HUBS: Record<AppLocale, TransitHubInfo> = {
  en: {
    locale: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    primaryHub: 'London Heathrow / Global',
    country: 'United Kingdom / Global',
  },
  de: {
    locale: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    primaryHub: 'Frankfurt (FRA) / München (MUC)',
    country: 'Germany / Austria / Switzerland',
  },
  fr: {
    locale: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    primaryHub: 'Paris Charles de Gaulle (CDG)',
    country: 'France / Belgium / Switzerland',
  },
  es: {
    locale: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    primaryHub: 'Madrid-Barajas (MAD)',
    country: 'Spain / Latin America',
  },
};

export const messagesMap: Record<AppLocale, typeof enMessages> = {
  en: enMessages,
  de: deMessages,
  fr: frMessages,
  es: esMessages,
};

export function getMessages(locale: string = defaultLocale): typeof enMessages {
  if (locale in messagesMap) {
    return messagesMap[locale as AppLocale];
  }
  return messagesMap[defaultLocale];
}
