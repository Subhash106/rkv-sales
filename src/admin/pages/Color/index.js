import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Button, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

// import './style.css';
import { useAddColorMutation, useGetColorQuery } from '../../../services/base';
import Loader from '../../../components/Loader';

const Color = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState(null);
  const [addColor, { isLoading }] = useAddColorMutation();
  const { data = {}, isLoading: loadingColors } = useGetColorQuery() || {};
  const [feedback, setFeedback] = useState({ success: false, error: false, errorMessage: '', successMessage: '' });
  const { success, error, successMessage, errorMessage } = feedback;
  const [color, setColor] = useState('');
  const [colors, setColors] = useState([]);
  const { color: colorError } = errors || {};

  useEffect(() => {
    console.log('color fteched');
    if (!loadingColors) {
      setColors(Object.entries(data || {}).map(([id, { color }]) => ({ id, color })));
    }
  }, [loadingColors, data]);

  const changeHandler = async e => {
    const {
      target: { value }
    } = e;

    setColor(value);

    if (value) {
      setErrors({ ...errors, color: '' });
    }
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!color) {
      setErrors({ ...errors, color: t('required') });
      return false;
    }

    try {
      await addColor({ color }).unwrap();

      setFeedback({ ...feedback, success: true, successMessage: t('color.savedSuccessfully') });
      setColor('');
    } catch (e) {
      setFeedback({ ...feedback, error: true, errorMessage: t('color.savedError') });
    }

    setTimeout(() => {
      setFeedback({ ...feedback, success: false, error: false });
    }, 10000);
  };

  return (
    <div className="purchases">
      <div className="bg-white page-wrapper">
        <h1 className="heading-primary">{t('color.title')}</h1>
        {isLoading && <Loader />}
        {success && <Alert severity="success">{successMessage}</Alert>}
        {error && <Alert severity="error">{errorMessage}</Alert>}
        <form encType="multipart/form-data" onSubmit={submitHandler} className="mb-md mt-sm">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                onChange={changeHandler}
                name="color"
                type="text"
                id="color"
                value={color}
                label={t('color.item')}
                required
                error={!!colorError}
                helperText={colorError}
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
          {colors.map(({ id, color }) => (
            <li className="items-list--item" key={id}>
              {color}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Color;
