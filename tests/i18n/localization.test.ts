import { describe, it, expect } from 'vitest';
import { locales, defaultLocale, TRANSIT_HUBS, getMessages, type AppLocale } from '@/lib/i18n';
import en from '@/lib/i18n/messages/en.json';
import de from '@/lib/i18n/messages/de.json';
import fr from '@/lib/i18n/messages/fr.json';
import es from '@/lib/i18n/messages/es.json';

function getAllKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(getAllKeys(v as Record<string, unknown>, full));
    } else {
      keys.push(full);
    }
  }
  return keys.sort();
}

describe('Multi-Language Localization (i18n) & European Transit Hubs', () => {
  it('should define all required European locales and default to English', () => {
    expect(locales).toEqual(['en', 'de', 'fr', 'es']);
    expect(defaultLocale).toBe('en');
  });

  it('should have complete transit hub metadata for continental European transit hubs', () => {
    // German transit hub (Frankfurt FRA / Munich)
    expect(TRANSIT_HUBS.de.primaryHub).toContain('Frankfurt');
    expect(TRANSIT_HUBS.de.nativeName).toBe('Deutsch');
    expect(TRANSIT_HUBS.de.flag).toBe('🇩🇪');

    // French transit hub (Paris CDG)
    expect(TRANSIT_HUBS.fr.primaryHub).toContain('Paris Charles de Gaulle');
    expect(TRANSIT_HUBS.fr.nativeName).toBe('Français');
    expect(TRANSIT_HUBS.fr.flag).toBe('🇫🇷');

    // Spanish transit hub (Madrid Barajas MAD)
    expect(TRANSIT_HUBS.es.primaryHub).toContain('Madrid-Barajas');
    expect(TRANSIT_HUBS.es.nativeName).toBe('Español');
    expect(TRANSIT_HUBS.es.flag).toBe('🇪🇸');

    // English hub
    expect(TRANSIT_HUBS.en.nativeName).toBe('English');
    expect(TRANSIT_HUBS.en.flag).toBe('🇬🇧');
  });

  it('should enforce exact key parity across all dictionaries (EN, DE, FR, ES)', () => {
    const enKeys = getAllKeys(en as Record<string, unknown>);
    const deKeys = getAllKeys(de as Record<string, unknown>);
    const frKeys = getAllKeys(fr as Record<string, unknown>);
    const esKeys = getAllKeys(es as Record<string, unknown>);

    expect(enKeys.length).toBeGreaterThan(50);
    expect(deKeys).toEqual(enKeys);
    expect(frKeys).toEqual(enKeys);
    expect(esKeys).toEqual(enKeys);
  });

  it('should contain no empty or blank strings in any translation dictionary', () => {
    const dictionaries = [
      { name: 'en', dict: en },
      { name: 'de', dict: de },
      { name: 'fr', dict: fr },
      { name: 'es', dict: es },
    ];

    for (const { name, dict } of dictionaries) {
      const keys = getAllKeys(dict as Record<string, unknown>);
      for (const k of keys) {
        const parts = k.split('.');
        let val: unknown = dict;
        for (const p of parts) {
          val = (val as Record<string, unknown>)[p];
        }
        expect(typeof val, `${name}: ${k} must be a non-empty string`).toBe('string');
        expect((val as string).trim().length, `${name}: ${k} cannot be empty`).toBeGreaterThan(0);
      }
    }
  });

  it('should contain accurate veterinary and statutory terminology in German (Frankfurt FRA)', () => {
    expect(de.checker.fields.rabiesVaccinationDate).toContain('Tollwut');
    expect(de.checker.fields.microchipNumber).toContain('Mikrochip');
    expect(de.checker.fields.healthCertificate).toContain('Tiergesundheitsbescheinigung');
    expect(de.assessment.verdicts.APPEARS_READY).toBe('Reisebereit');
    expect(de.assessment.verdicts.ACTION_REQUIRED).toBe('Dringender Handlungsbedarf');
  });

  it('should contain accurate veterinary and statutory terminology in French (Paris CDG)', () => {
    expect(fr.checker.fields.rabiesVaccinationDate).toContain('antirabique');
    expect(fr.checker.fields.microchipNumber).toContain('transpondeur');
    expect(fr.checker.fields.healthCertificate).toContain('certificat sanitaire');
    expect(fr.assessment.verdicts.APPEARS_READY).toBe('Prêt pour le départ');
    expect(fr.assessment.verdicts.ACTION_REQUIRED).toBe('Action obligatoire requise');
  });

  it('should contain accurate veterinary and statutory terminology in Spanish (Madrid Barajas)', () => {
    expect(es.checker.fields.rabiesVaccinationDate).toContain('antirrábica');
    expect(es.checker.fields.microchipNumber).toContain('microchip');
    expect(es.checker.fields.healthCertificate).toContain('certificado zoosanitario');
    expect(es.assessment.verdicts.APPEARS_READY).toBe('Listo para viajar');
    expect(es.assessment.verdicts.ACTION_REQUIRED).toBe('Acción obligatoria requerida');
  });

  it('should resolve messages with getMessages and fallback to default English', () => {
    expect(getMessages('de').checker.title).toBe(de.checker.title);
    expect(getMessages('fr').checker.title).toBe(fr.checker.title);
    expect(getMessages('es').checker.title).toBe(es.checker.title);
    expect(getMessages('en').checker.title).toBe(en.checker.title);

    // Fallback on invalid locale
    expect(getMessages('it' as AppLocale).checker.title).toBe(en.checker.title);
    expect(getMessages(undefined).checker.title).toBe(en.checker.title);
  });
});
