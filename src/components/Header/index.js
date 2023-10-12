import React, { useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop } from '@mui/material';

import './style.css';
import signout from '../../utils/logout';
import Loader from '../Loader';
import Menu from './menu';

const Header = () => {
  const [backdrop, setBackdrop] = useState(false);
  const [isSigningout, setIsSigningout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hamburgerRef = useRef();
  const topnavRef = useRef();
  const closeRef = useRef();
  const token =
    useSelector(state => {
      if (state.auth === null) return false;
      return state.auth.idToken;
    }) || localStorage.getItem('token');

  const logoutHandler = async e => {
    e.preventDefault();
    setIsSigningout(true);
    await signout(dispatch, navigate);
    setIsSigningout(true);
  };

  const hamburgerClickHandler = () => {
    topnavRef.current.style.width = '60vw';
    setBackdrop(true);
  };

  const closeClickHandler = () => {
    topnavRef.current.style.width = '0rem';
    setBackdrop(false);
  };

  return (
    <div className="header">
      <div className="container--header">
        {isSigningout && <Loader />}
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

          <div className="top-nav top-nav--desktop">
            <ul>
              <li>
                <div onClick={closeClickHandler} ref={closeRef} role="button" tabIndex={0} className="close">
                  <div className="close--top"></div>
                  <div className="close--middle"></div>
                  <div className="close--bottom"></div>
                </div>
              </li>
              <Menu closeClickHandler={closeClickHandler} token={token} logoutHandler={logoutHandler} />
            </ul>
          </div>

          <Backdrop
            onClick={closeClickHandler}
            sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
            open={backdrop}
          >
            <div ref={topnavRef} className="top-nav">
              <ul>
                <li>
                  <div onClick={closeClickHandler} ref={closeRef} role="button" tabIndex={0} className="close">
                    <div className="close--top"></div>
                    <div className="close--middle"></div>
                    <div className="close--bottom"></div>
                  </div>
                </li>
                <Menu closeClickHandler={closeClickHandler} token={token} logoutHandler={logoutHandler} />
              </ul>
            </div>
          </Backdrop>
        </header>
      </div>
    </div>
  );
};

export default Header;
