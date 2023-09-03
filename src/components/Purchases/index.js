import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Button, Alert } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import './style.css';
import PurchasesTable from './PurchasesTable';
import { useStorePurchasesMutation } from '../../services/base';
import Loader from '../Loader';

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const Purchases = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState(null);
  const [addPurchase, { isLoading }] = useStorePurchasesMutation();
  const [feedback, setFeedback] = useState({ success: false, error: false, errorMessage: '', successMessage: '' });
  const { success, error, successMessage, errorMessage } = feedback;
  const [purchase, setPurchase] = useState({
    date: moment().format('YYYY-MM-DD'),
    amount: '',
    invoice: '',
    invoiceName: ''
  });
  const { date, amount } = purchase;

  const changeHandler = async e => {
    const {
      target: { value, name }
    } = e;

    if (name === 'invoice') {
      const file = e.target.files[0];
      setPurchase({ ...purchase, [name]: await toBase64(file), invoiceName: file.name });
    } else {
      setPurchase({ ...purchase, [name]: value });
      if (name === 'amount' && value) {
        setErrors({ ...errors, amount: false });
      }
    }
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!purchase.amount) {
      setErrors({ ...errors, amount: true });
      return false;
    }

    try {
      await addPurchase(purchase).unwrap();
      setFeedback({ ...feedback, success: true, successMessage: t('purchases.savedSuccessfully') });
      setPurchase({ ...purchase, amount: '', invoice: '', invoiceName: '' });
    } catch (e) {
      setFeedback({ ...feedback, error: true, errorMessage: t('purchases.savedError') });
    }

    setTimeout(() => {
      setFeedback({ ...feedback, success: false, error: false });
    }, 10000);
  };

  return (
    <div className="purchases">
      <div className="bg-white page-wrapper">
        <h1 className="heading-primary">{t('purchases.title')}</h1>
        {isLoading && <Loader />}
        {success && <Alert severity="success">{successMessage}</Alert>}
        {error && <Alert severity="error">{errorMessage}</Alert>}
        <form encType="multipart/form-data" onSubmit={submitHandler} className="mb-md mt-sm">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                onChange={changeHandler}
                name="date"
                type="date"
                id="date"
                value={date}
                label={t('purchases.date')}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                onChange={changeHandler}
                name="amount"
                type="number"
                id="amount"
                value={amount}
                label={t('purchases.amount')}
                required
                error={errors?.amount}
                helperText={errors?.amount ? t('required') : ''}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="file"
                name="invoice"
                min="0"
                id="invoice"
                onChange={changeHandler}
                label={t('purchases.invoice')}
              />
            </Grid>
            <Grid item xs={12} md={3} className="text-right">
              <Button onClick={submitHandler} variant="contained" color="success">
                {t('purchases.save')}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <h1 className="mb-sm">{t('purchases.allPurchases')}</h1>
            <PurchasesTable />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Purchases;
