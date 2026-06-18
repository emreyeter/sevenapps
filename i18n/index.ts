import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './locales/en';
import { tr } from './locales/tr';

export const defaultNS = 'translation' as const;

export const resources = {
  en: { translation: en },
  tr: { translation: tr },
} as const;

export const supportedLanguages = Object.keys(resources);

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';
const initialLanguage = supportedLanguages.includes(deviceLanguage)
  ? deviceLanguage
  : 'en';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    defaultNS,
    interpolation: { escapeValue: false },
  });
}

export default i18n;
