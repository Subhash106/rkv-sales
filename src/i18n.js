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
          save: 'Save',
          required: 'Required',
          noInternet: 'No internet connection. Please check internet and try again.',
          somethingWentWrong: 'Something went wrong. Please try again.',
          tryAgain: 'Try again',
          login: {
            chooseLanguage: 'Choose Language',
            title: 'Login',
            email: 'Email',
            password: 'Password',
            loginBtn: 'Login',
            emailRequired: 'Email is required!',
            validEmail: 'Please enter valid email!',
            passwordRequired: 'Password is required!',
            passwordLength: 'Password must be atleast PASSWORD_LENGTH chars long!',
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
            unit: 'Unit',
            rate: 'Rate',
            save: 'Save',
            addItem: 'Add Item',
            savedSuccessfully: 'Sale saved successfully.',
            savedError: 'Error while saving sale. Please try again.',
            errors: {
              exceedQuantity: 'Quantity can not be greater than available quantity.'
            }
          },
          purchases: {
            title: 'Purchases',
            date: 'Date',
            amount: 'Amount',
            invoice: 'Invoice',
            comment: 'Comment',
            save: 'Save',
            savedSuccessfully: 'Purchase saved successfully.',
            savedError: 'Error while saving purchase. Please try again.'
          },
          purchasesSummary: {
            title: 'Purchases Summary',
            date: 'Date',
            amount: 'Amount',
            invoice: 'Invoice',
            noRecord: 'No Purchases Found!',
            view: 'View'
          },
          header: {
            dashboard: 'Dashboard',
            sales: 'Sales',
            purchases: 'Purchases',
            salesSummary: 'SalesSummary',
            purchasesSummary: 'Purchases Summary',
            inventory: 'Inventory',
            logout: 'Logout',
            addInventory: 'Add Inventory',
            inventorySummary: 'Inventory Summary',
            adminDashboard: 'Admin Dashboard',
            saleDashboard: 'Sale Dashboard',
            item: 'Item',
            color: 'Color'
          },
          salesSummary: {
            title: 'Sales Summary',
            onlineSales: 'Online Sales',
            offlineSales: 'Offline Sales',
            selectDate: 'Salect Date',
            customerName: 'Customer Name',
            mobile: 'Mobile',
            address: 'Address',
            items: 'Items',
            total: 'Total',
            date: 'Date',
            sync: 'Sync',
            noRecord: 'No Sales Found!'
          },
          inventory: {
            title: 'Add Inventory',
            item: 'Item',
            unit: 'Unit',
            date: 'Date',
            price: 'Price',
            color: 'Color',
            quantity: 'Quantity',
            comment: 'Comment',
            price10: '+ 10%',
            price20: '+ 20%',
            price30: '+ 30%',
            price40: '+ 40%',
            price50: '+ 50%',
            savedSuccessfully: 'Inventory saved successfully.',
            savedError: 'Error while saving inventory. Please try again.'
          },
          inventorySummary: {
            title: 'Inventory Summary'
          },
          item: {
            title: 'Item',
            item: 'Item',
            savedSuccessfully: 'Item saved successfully.',
            savedError: 'Error while saving item. Please try again.'
          },
          color: {
            title: 'Color',
            item: 'Color',
            savedSuccessfully: 'Color saved successfully.',
            savedError: 'Error while saving color. Please try again.'
          }
        }
      },
      hi: {
        translations: {
          save: 'सुरक्षित करें',
          required: 'आवश्यक',
          noInternet: 'कोई इंटरनेट कनेक्शन नहीं। कृपया इंटरनेट जांचें और पुनः प्रयास करें।',
          somethingWentWrong: 'कुछ गलत हो गया। कृपया पुन: प्रयास करें।',
          tryAgain: 'पुन: प्रयास करें',
          login: {
            chooseLanguage: 'भाषा चुनें',
            title: 'लॉग इन',
            email: 'ईमेल',
            password: 'पासवर्ड',
            loginBtn: 'लॉग इन करें',
            emailRequired: 'ईमेल दर्ज करना आवश्यक है!',
            validEmail: 'कृपया वैध ईमेल दर्ज़ करें!',
            passwordRequired: 'पासवर्ड दर्ज करना आवश्यक है!',
            passwordLength: 'पासवर्ड कम से कम PASSWORD_LENGTH अक्षर लंबा होना चाहिए!',
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
            unit: 'इकाई',
            rate: 'दर',
            save: 'सुरक्षित करें',
            addItem: 'नया समान जोड़ें',
            savedSuccessfully: 'बिक्री सफलतापूर्वक सहेजी गई।',
            savedError: 'बिक्री सहेजते समय त्रुटि. कृपया पुन: प्रयास करें।',
            errors: {
              exceedQuantity: 'मात्रा उपलब्ध मात्रा से अधिक नहीं हो सकती।'
            }
          },
          purchases: {
            title: 'खरीद',
            date: 'तारीख',
            amount: 'धनराशि',
            invoice: 'चालान',
            comment: 'टिप्पणी',
            save: 'सुरक्षित करें',
            savedSuccessfully: 'खरीदारी सफलतापूर्वक सहेजी गई।',
            savedError: 'खरीदारी सहेजते समय त्रुटि. कृपया पुन: प्रयास करें।'
          },
          purchasesSummary: {
            title: 'खरीद सारांश',
            date: 'तारीख',
            amount: 'धनराशि',
            invoice: 'चालान',
            noRecord: 'कोई खरीद नहीं!',
            view: 'देखें'
          },
          header: {
            dashboard: 'डैशबोर्ड',
            sales: 'बिक्री',
            purchases: 'खरीद',
            salesSummary: 'बिक्री सारांश',
            purchasesSummary: 'खरीद सारांश',
            inventory: 'इन्वेंटरी',
            logout: 'लॉग आउट',
            addInventory: 'इन्वेंटरी जोड़ें',
            inventorySummary: 'इन्वेंटरी सारांश',
            adminDashboard: 'व्यवस्थापक डैशबोर्ड',
            saleDashboard: 'बिक्री डैशबोर्ड',
            item: 'सामान',
            color: 'कलर'
          },
          salesSummary: {
            title: 'बिक्री सारांश',
            onlineSales: 'ऑनलाइन बिक्री',
            offlineSales: 'ऑफ़लाइन बिक्री',
            selectDate: 'तारीख़ चुनें',
            customerName: 'ग्राहक का नाम',
            mobile: 'मोबाइल',
            address: 'पता',
            items: 'सामान',
            total: 'टोटल',
            date: 'तारीख',
            sync: 'Sync',
            noRecord: 'कोई बिक्री नहीं!'
          },
          inventory: {
            title: 'इन्वेंटरी जोड़ें',
            item: 'समान',
            unit: 'Unit',
            date: 'Date',
            color: 'Color',
            price: 'Price',
            quantity: 'Quantity',
            comment: 'Comment',
            price10: '+ 10%',
            price20: '+ 20%',
            price30: '+ 30%',
            price40: '+ 40%',
            price50: '+ 50%',
            savedSuccessfully: 'इन्वेंटरी सफलतापूर्वक सहेजी गई।',
            savedError: 'इन्वेंटरी सहेजते समय त्रुटि. कृपया पुन: प्रयास करें।'
          },
          inventorySummary: {
            title: 'इन्वेंटरी सारांश'
          },
          item: {
            title: 'समान',
            item: 'समान',
            savedSuccessfully: 'समान सफलतापूर्वक सहेजा गया.',
            savedError: 'समान सहेजते समय त्रुटि. कृपया पुन: प्रयास करें।'
          },
          color: {
            title: 'रंग',
            item: 'रंग',
            savedSuccessfully: 'रंग सफलतापूर्वक सहेजा गया।',
            savedError: 'रंग सहेजते समय त्रुटि. कृपया पुन: प्रयास करें।'
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
