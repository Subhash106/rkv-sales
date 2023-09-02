import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import './style.css';

import signout from '../../utils/logout';
import { login } from '../../store/auth';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const { email, password } = credentials;
  const token = useSelector(state => state.auth.idToken) || localStorage.getItem('token');

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const handleChange = e => {
    const {
      target: { name, value }
    } = e;

    setCredentials({ ...credentials, [name]: value });
  };

  const loginHandler = e => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const tokenResponse = userCredential._tokenResponse;
        console.log('user', userCredential);
        localStorage.setItem('token', tokenResponse.idToken);
        localStorage.setItem('refreshToken', tokenResponse.refreshToken);
        localStorage.setItem('expiresIn', tokenResponse.expiresIn);
        dispatch(login(tokenResponse));
        // Auto refresh and update token before expiration
        setTimeout(() => {
          signout(dispatch, navigate);
        }, +tokenResponse.expiresIn * 1000);
        navigate('/dashboard');
      })
      .catch(error => {
        console.log('error', error);
        if (/network-request-failed/.test(error.message)) {
          setLoginError(t('login.noInternet'));
        } else {
          setLoginError(t('login.wrongCredentials'));
        }
      });
  };

  if (token) return <Navigate to="/dashboard" />;

  return (
    <div className="login bg-white">
      <div className="login__container">
        <div className="change-language">
          <p className="change-language--paragraph">{t('login.chooseLanguage')}</p>
          <div className="change-language--buttons">
            <button onClick={() => changeLanguage('hi')}>हिंदी</button>
            <button onClick={() => changeLanguage('en')}>English</button>
          </div>
        </div>
        <div className="logo__container">
          <img src="./img/logo.jpg" alt="logo" className="logo" />
        </div>
        <div className="row col-md-1">
          <h1 className="heading-primary" style={{ marginBottom: '0' }}>
            {t('login.title')}
          </h1>
        </div>
        {loginError && <p className="error--paragraph mb-sm">{loginError}</p>}
        <form>
          <div className="row col-md-1 col-sm-1">
            <TextField
              variant="outlined"
              onChange={handleChange}
              value={email}
              id="email"
              name="email"
              type="text"
              label={t('login.email')}
            />
            <TextField
              variant="outlined"
              onChange={handleChange}
              value={password}
              id="password"
              name="password"
              label={t('login.password')}
              type="password"
            />
            <Button onClick={loginHandler} variant="contained" color="success">
              {t('login.loginBtn')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
