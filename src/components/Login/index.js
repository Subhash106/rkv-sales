import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import './style.css';

import signout from '../../utils/logout';
import { login } from '../../store/auth';
import Loader from '../Loader';
import validateEmail from '../../utils/validateEmail';
import { PASSWORD_LENGTH } from '../constant';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoging, setIsLoging] = useState(false);
  const { email, password } = credentials;
  const token =
    useSelector(state => {
      if (state.auth === null) return false;
      return state.auth.idToken;
    }) || localStorage.getItem('token');

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const handleChange = e => {
    const {
      target: { name, value }
    } = e;

    if (name === 'email' && value && validateEmail(value)) {
      setEmailError('');
    }

    if (name === 'password' && value && value.length === PASSWORD_LENGTH) {
      setPasswordError('');
    }

    setCredentials({ ...credentials, [name]: value });
  };

  const loginHandler = async e => {
    e.preventDefault();
    if (!email) {
      setEmailError(t('login.emailRequired'));
      return false;
    } else if (!validateEmail(email)) {
      setEmailError(t('login.validEmail'));
      return false;
    } else if (!password) {
      setPasswordError(t('login.passwordRequired'));
      return false;
    } else if (password.length < PASSWORD_LENGTH) {
      setPasswordError(t('login.passwordLength').replace('PASSWORD_LENGTH', PASSWORD_LENGTH));
      return false;
    }

    const auth = getAuth();
    setIsLoging(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const tokenResponse = userCredential._tokenResponse;
      localStorage.setItem('token', tokenResponse.idToken);
      localStorage.setItem('refreshToken', tokenResponse.refreshToken);
      localStorage.setItem('expiresIn', tokenResponse.expiresIn);
      // Auto refresh and update token before expiration
      setTimeout(() => {
        signout(dispatch, navigate);
      }, 3600 * 1000);
      dispatch(login(tokenResponse));
    } catch (error) {
      if (/network-request-failed/.test(error.message)) {
        setLoginError(t('noInternet'));
      } else {
        setLoginError(t('login.wrongCredentials'));
      }
    }
    setIsLoging(false);
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token]);

  return (
    <div className="login bg-white">
      <div className="login__container">
        <div className="change-language">
          {isLoging && <Loader />}
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
              required
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              variant="outlined"
              onChange={handleChange}
              value={password}
              id="password"
              name="password"
              label={t('login.password')}
              type="password"
              required
              error={!!passwordError}
              helperText={passwordError}
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
