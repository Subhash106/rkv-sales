import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Error from './components/Error';
import Orders from './components/Orders';
//import SalesForm from './components/SalesForm';
import Purchases from './components/Purchases';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: 'sales',
        element: <Orders />,
        errorElement: <Error />
      },
      {
        path: 'orders',
        element: <Orders />,
        errorElement: <Error />
      },
      {
        path: 'purchases',
        element: <Purchases />,
        errorElement: <Error />
      }
    ]
  }
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('root'));
