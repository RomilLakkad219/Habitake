import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import your JSON translations
import en from './en.json';
import es from './es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

// Detect device language
export const detectLanguage = (): string => {
  const bestLang = RNLocalize.findBestLanguageTag(Object.keys(resources));
  return bestLang?.languageTag?.split('-')[0] || 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
}).then(() => {
  console.log('Current i18n language:', i18n.language); 
});

export default i18n;
