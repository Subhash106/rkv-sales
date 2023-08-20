import React from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import store from './store';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="home">
        <Header />
        <div className="container bg-gray">
          <Outlet />
        </div>
      </div>
    </Provider>
  );
};

export default App;
