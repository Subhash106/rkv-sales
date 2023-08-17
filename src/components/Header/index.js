import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <header className="main-header">
          <div className="logo-box">
            <NavLink to="/">
              <img src="../../../img/logo.jpg" alt="Logo" className="logo" />
            </NavLink>
          </div>

          <div className="top-nav">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return isActive ? 'active' : '';
                  }}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orders"
                  className={({ isActive }) => {
                    return isActive ? 'active' : '';
                  }}
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
