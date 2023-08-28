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
            loginBtn: 'Login',
            noInternet: 'No internet connection. Please check internet and try again.',
            wrongCredentials: 'Email or password is incorrect. Please check and try again.'
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
            loginBtn: 'लॉग इन करें',
            noInternet: 'कोई इंटरनेट कनेक्शन नहीं। कृपया इंटरनेट जांचें और पुनः प्रयास करें।',
            wrongCredentials: 'ईमेल या पासवर्ड गलत है। कृपया जाँच करें और पुनः प्रयास करें।'
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
