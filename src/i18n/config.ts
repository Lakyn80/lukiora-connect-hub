import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import cs from './locales/cs.json';
import en from './locales/en.json';
import ru from './locales/ru.json';
import sk from './locales/sk.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      cs: { translation: cs },
      en: { translation: en },
      ru: { translation: ru },
      sk: { translation: sk },
      es: { translation: es },
      de: { translation: de },
      fr: { translation: fr },
      it: { translation: it },
    },
    fallbackLng: 'cs',
    supportedLngs: ['cs', 'en', 'ru', 'sk', 'es', 'de', 'fr', 'it'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
