import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

export const initI18n = async (options: InitOptions) => {
  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,

    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'translation',
    debug: true, // Add debug mode temporarily
    ...options,
  });

  // Preload languages and namespaces
  const languages = Object.keys(resources);
  console.log('🌐 Pre loading languages', languages);
  await Promise.all([
    i18n.loadLanguages(languages), // TODO: load languages from options
    i18n.loadNamespaces(['translation']), // TODO: load namespaces from options
  ]);
};

export default i18n;
