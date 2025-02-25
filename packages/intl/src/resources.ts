import de from '../locales/de';
import en from '../locales/en';

export const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
} as const;

export type Language = keyof typeof resources;
