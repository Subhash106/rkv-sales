import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Button, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './style.css';
import { useAddItemMutation, useGetItemQuery } from '../../../services/base';
import Loader from '../../../components/Loader';

const Item = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState(null);
  const [addItem, { isLoading }] = useAddItemMutation();
  const { data = {}, isLoading: loadingItems } = useGetItemQuery(null, { refetchOnMountOrArgChange: true });
  const [feedback, setFeedback] = useState({ success: false, error: false, errorMessage: '', successMessage: '' });
  const { success, error, successMessage, errorMessage } = feedback;
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const { item: itemError } = errors || {};

  useEffect(() => {
    console.log('items fteched');
    if (!loadingItems) {
      setItems(Object.entries(data || {}).map(([id, { item }]) => ({ id, item })));
    }
  }, [loadingItems, data]);

  const changeHandler = async e => {
    const {
      target: { value }
    } = e;

    setItem(value);

    if (value) {
      setErrors({ ...errors, item: '' });
    }
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!item) {
      setErrors({ ...errors, item: t('required') });
      return false;
    }

    try {
      await addItem({ item }).unwrap();

      setFeedback({ ...feedback, success: true, successMessage: t('item.savedSuccessfully') });
      setItem('');
    } catch (e) {
      setFeedback({ ...feedback, error: true, errorMessage: t('item.savedError') });
    }

    setTimeout(() => {
      setFeedback({ ...feedback, success: false, error: false });
    }, 10000);
  };

  return (
    <div className="purchases">
      <div className="bg-white page-wrapper">
        <h1 className="heading-primary">{t('item.title')}</h1>
        {isLoading && <Loader />}
        {success && <Alert severity="success">{successMessage}</Alert>}
        {error && <Alert severity="error">{errorMessage}</Alert>}
        <form encType="multipart/form-data" onSubmit={submitHandler} className="mb-md mt-sm">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                onChange={changeHandler}
                name="item"
                type="text"
                id="item"
                value={item}
                label={t('item.item')}
                required
                error={!!itemError}
                helperText={itemError}
              />
            </Grid>

            <Grid item xs={12} md={3} className="text-right">
              <Button onClick={submitHandler} variant="contained" color="success">
                {t('save')}
              </Button>
            </Grid>
          </Grid>
        </form>
        <ul className="items-list">
          {items.map(({ id, item }) => (
            <li key={id} className="items-list--item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Item;
