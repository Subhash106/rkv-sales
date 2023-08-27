import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          login: {
            chooseLanguage: 'Choose Language',
            title: 'Login',
            email: 'Email',
            password: 'Password',
            loginBtn: 'Login'
          }
        }
      },
      hi: {
        translations: {
          login: {
            chooseLanguage: 'भाषा चुनें',
            title: 'लॉग इन',
            email: 'ईमेल',
            password: 'पासवर्ड',
            loginBtn: 'लॉग इन करें'
          }
        }
      }
    },
    fallbackLng: 'hi',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: '.', // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
