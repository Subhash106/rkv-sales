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
          required: 'Required',
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
          },
          sales: {
            title: 'Enter sales details and save',
            firstName: 'First name',
            lastName: 'Last name',
            mobile: 'Mobile Number',
            address: 'Address',
            date: 'Date',
            serialNumber: 'SNo.',
            total: 'Total',
            subTotal: 'Sub Total',
            item: 'Item',
            quantity: 'Quantity',
            rate: 'Rate',
            save: 'Save',
            addItem: 'Add Item'
          }
        }
      },
      hi: {
        translations: {
          required: 'आवश्यक',
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
          },
          sales: {
            title: 'बिक्री विवरण दर्ज करें और सहेजें',
            firstName: 'पहला नाम',
            lastName: 'उपनाम',
            mobile: 'मोबाइल नंबर',
            address: 'पता',
            date: 'तारीख',
            serialNumber: 'क्र.सं.',
            total: 'कुल',
            subTotal: 'उप योग',
            item: 'समान',
            quantity: 'मात्रा',
            rate: 'दर',
            save: 'जोड़ना',
            addItem: 'नया समान जोड़ें'
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
