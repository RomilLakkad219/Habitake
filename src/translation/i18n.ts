//PACKAGES
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import your JSON translations
import en from './en.json';
import es from './es.json'

const resources = {
  en: { translation: en },
  es: { translation: es }
};

// Optional: Detect device language
const bestLang = RNLocalize.findBestLanguageTag(Object.keys(resources));
const defaultLang = bestLang?.languageTag || 'en';

i18n
  .use(initReactI18next)
  .init({
    // compatibilityJSON: 'v3',
    resources,
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for React
    },
  });

export default i18n;