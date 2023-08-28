import React, { useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';

import './style.css';
import { logout } from '../../store/auth';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hamburgerRef = useRef();
  const topnavRef = useRef();
  const closeRef = useRef();
  const token = useSelector(state => state.auth.idToken) || localStorage.getItem('token');
  const logoutHandler = e => {
    e.preventDefault();
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresIn');
        navigate('/');
      })
      .catch(error => {
        // An error happened.
        console.error('logout error', error);
      });
  };

  const hamburgerClickHandler = () => {
    topnavRef.current.style.display = 'block';
  };

  const closeClickHandler = () => {
    topnavRef.current.style.display = 'none';
  };

  return (
    <div className="header">
      <div className="container">
        <header className="main-header">
          <div onClick={hamburgerClickHandler} ref={hamburgerRef} role="button" tabIndex={0} className="hamburger">
            <div className="hamburger--top"></div>
            <div className="hamburger--middle"></div>
            <div className="hamburger--bottom"></div>
          </div>
          <div className="logo-box">
            <NavLink to="/">
              <img src="../../../img/logo.jpg" alt="Logo" className="logo" />
            </NavLink>
          </div>

          <div ref={topnavRef} className="top-nav">
            <div onClick={closeClickHandler} ref={closeRef} role="button" tabIndex={0} className="close">
              <div className="close--top"></div>
              <div className="close--middle"></div>
              <div className="close--bottom"></div>
            </div>
            <ul>
              <li>
                <NavLink
                  onClick={closeClickHandler}
                  to="/dashboard"
                  className={({ isActive }) => {
                    return isActive ? 'active' : '';
                  }}
                  end
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={closeClickHandler}
                  to="/sales"
                  className={({ isActive }) => {
                    return isActive ? 'active' : '';
                  }}
                >
                  Sales
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={closeClickHandler}
                  to="/orders"
                  className={({ isActive }) => {
                    return isActive ? 'active' : '';
                  }}
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={closeClickHandler}
                  to="/purchases"
                  className={({ isActive }) => {
                    return isActive ? 'active' : '';
                  }}
                >
                  Purchases
                </NavLink>
              </li>
              {token && (
                <li>
                  <a href="#" onClick={logoutHandler}>
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
