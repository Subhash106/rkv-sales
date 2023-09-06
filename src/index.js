import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import './i18n';
import App from './App';
import Error from './components/Error';
const Orders = React.lazy(() => import('./components/Orders'));
const Sales = React.lazy(() => import('./components/Sales'));
const Purchases = React.lazy(() => import('./components/Purchases'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Login = React.lazy(() => import('./components/Login'));
import ProtectedRoute from './components/ProtectedRoute';
import store from './store';
const PurchasesSummary = React.lazy(() => import('./components/PurchasesSummary'));

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log('analytics', analytics);

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Login />
          </Suspense>
        )
      },
      {
        element: <App />,
        children: [
          {
            path: '/dashboard',
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )
          },
          {
            path: '/sales',
            element: (
              <ProtectedRoute>
                <Sales />
              </ProtectedRoute>
            )
          },
          {
            path: '/orders',
            element: (
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            )
          },
          {
            path: '/purchases',
            element: (
              <ProtectedRoute>
                <Purchases />
              </ProtectedRoute>
            )
          },
          {
            path: '/purchases-summary',
            element: (
              <ProtectedRoute>
                <PurchasesSummary />
              </ProtectedRoute>
            )
          }
        ]
      }
    ]
  }
]);

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById('root')
);
