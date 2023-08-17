import React from 'react';
import Header from '../Header';
import Main from '../Main/Index';
import './style.css';

const Home = () => {
  if (navigator.onLine) {
    console.log('online');
  } else {
    console.log('offline');
  }
  return (
    <div className="home">
      <Header />
      <div className="container bg-gray">
        <Main />
      </div>
    </div>
  );
};

export default Home;
