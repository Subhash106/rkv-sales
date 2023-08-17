import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Orders from './components/Orders';
const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: 'orders',
          element: <Orders />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
