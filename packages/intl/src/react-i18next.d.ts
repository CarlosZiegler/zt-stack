import type { resources } from './resources';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: (typeof resources)['en'];
  }
}
