import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
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
