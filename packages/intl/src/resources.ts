import de from '../locales/de';
import en from '../locales/en';
import es from '../locales/es';
import pt from '../locales/pt';

export const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  es: {
    translation: es,
  },
  pt: {
    translation: pt,
  },
} as const;

export type Language = keyof typeof resources;
