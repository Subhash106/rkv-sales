import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
