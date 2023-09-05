import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Alert } from '@mui/material';

import './style.css';

const Error = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const tryAgain = e => {
    e.preventDefault();

    navigate(-1);
  };

  return (
    <div className="error-page">
      <div className="error-page--content">
        <Alert severity="warning">{t('somethingWentWrong')}</Alert>
        <Button variant="text" onClick={tryAgain}>
          {t('tryAgain')}
        </Button>
      </div>
    </div>
  );
};

export default Error;
