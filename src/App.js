import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';

import './App.css';

const App = () => {
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
