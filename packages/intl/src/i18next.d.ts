import 'i18next';
import type { resources } from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: (typeof resources)['en']['translation'];
    };
  }
}
