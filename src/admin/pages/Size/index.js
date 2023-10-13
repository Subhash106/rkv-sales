import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Button, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

// import './style.css';
import { useAddSizeMutation, useGetSizeQuery } from '../../../services/base';
import Loader from '../../../components/Loader';

const Size = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState(null);
  const [addSize, { isLoading }] = useAddSizeMutation();
  const { data = {}, isLoading: loadingSizes } = useGetSizeQuery({}, { refetchOnMountOrArgChange: true }) || {};
  const [feedback, setFeedback] = useState({ success: false, error: false, errorMessage: '', successMessage: '' });
  const { success, error, successMessage, errorMessage } = feedback;
  const [size, setSize] = useState('');
  const [sizes, setSizes] = useState([]);
  const { size: sizeError } = errors || {};

  useEffect(() => {
    console.log('size fteched');
    if (!loadingSizes) {
      setSizes(Object.entries(data || {}).map(([id, { size }]) => ({ id, size })));
    }
  }, [loadingSizes, data]);

  const changeHandler = async e => {
    const {
      target: { value }
    } = e;

    setSize(value);

    if (value) {
      setErrors({ ...errors, size: '' });
    }
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!size) {
      setErrors({ ...errors, size: t('required') });
      return false;
    }

    try {
      await addSize({ size }).unwrap();

      setFeedback({ ...feedback, success: true, successMessage: t('size.savedSuccessfully') });
      setSize('');
    } catch (e) {
      setFeedback({ ...feedback, error: true, errorMessage: t('size.savedError') });
    }

    setTimeout(() => {
      setFeedback({ ...feedback, success: false, error: false });
    }, 10000);
  };

  return (
    <div className="purchases">
      <div className="bg-white page-wrapper">
        <h1 className="heading-primary">{t('size.title')}</h1>
        {isLoading && <Loader />}
        {success && <Alert severity="success">{successMessage}</Alert>}
        {error && <Alert severity="error">{errorMessage}</Alert>}
        <form encType="multipart/form-data" onSubmit={submitHandler} className="mb-md mt-sm">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                onChange={changeHandler}
                name="size"
                type="text"
                id="size"
                value={size}
                label={t('size.size')}
                required
                error={!!sizeError}
                helperText={sizeError}
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
          {sizes.map(({ id, size }) => (
            <li className="items-list--item" key={id}>
              {size}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Size;
