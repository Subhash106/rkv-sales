import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import { login } from '../../store/auth';

import './style.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBADITX6fzdS0kND2XsAW4p_gIMU4zNCCQ',
  authDomain: 'basic-react-a8d88.firebaseapp.com',
  databaseURL: 'https://basic-react-a8d88-default-rtdb.firebaseio.com',
  projectId: 'basic-react-a8d88',
  storageBucket: 'basic-react-a8d88.appspot.com',
  messagingSenderId: '46136678640',
  appId: '1:46136678640:web:1511ada39fdede04d5ca35',
  measurementId: 'G-P97BZSSRCH'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log('analytics', analytics);

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
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
        navigate('/dashboard');
      })
      .catch(error => {
        console.log('error', error);
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