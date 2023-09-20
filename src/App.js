import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './components/Header';

import './App.css';
import signout from './utils/logout';
import { useDispatch } from 'react-redux';
let timeoutId;

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto refresh and update token before expiration
    timeoutId = setTimeout(() => {
      signout(dispatch, navigate);
    }, 60 * 60 * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="container bg-gray">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
