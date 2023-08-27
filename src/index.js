import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './i18n';

import App from './App';
import Error from './components/Error';
import Orders from './components/Orders';
import Sales from './components/Sales';
import Purchases from './components/Purchases';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [
      { index: true, element: <Login /> },
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
