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
          },
          dashboard: {
            title: 'Welcome, Radha Krishna Vastralaya!',
            month: 'Month',
            year: 'Year',
            purchasesSummary: {
              title: 'Purchases Summary',
              purchasesCount: 'Purchases Count',
              totalPurchases: 'Total Purchases'
            },
            salesSummary: {
              title: 'Sales Summary',
              salesCount: 'Sales Count',
              totalSales: 'Total Sales'
            }
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
          },
          dashboard: {
            title: 'स्वागत है, राधा कृष्ण वस्त्रालय!',
            month: 'महीना',
            year: 'वर्ष',
            purchasesSummary: {
              title: 'खरीद सारांश',
              purchasesCount: 'खरीद गिनती',
              totalPurchases: 'कुल खरीद'
            },
            salesSummary: {
              title: 'बिक्री सारांश',
              salesCount: 'बिक्री गणना',
              totalSales: 'कुल बिक्री'
            }
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
