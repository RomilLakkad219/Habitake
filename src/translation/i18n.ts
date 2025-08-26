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
const bestLang = RNLocalize.findBestLanguageTag(Object.keys(resources));
const defaultLang = bestLang?.languageTag?.split('-')[0] || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: {
    escapeValue: false,
    },
  });
console.log('System language detected:', bestLang);
console.log('App language set:', defaultLang);

export default i18n;
