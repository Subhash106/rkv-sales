import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Error from './components/Error';
import Orders from './components/Orders';
import Sales from './components/Sales';
import Purchases from './components/Purchases';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />
      },
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
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('root'));
