import { bool, func, object, shape } from 'prop-types';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader';

const SalesFormFields = props => {
  const { t } = useTranslation();
  const { values, handleChange, setFieldValue, handleSubmit, errors, touched, feedback, isLoading } = props;
  const { mobile, firstName, lastName, address, items, subTotal, date } = values;
  const { success, error, successMessage, errorMessage } = feedback;

  useEffect(() => {
    const subTotal = items.reduce((total, next) => {
      return next.rate * next.quantity + total;
    }, 0);

    setFieldValue('subTotal', subTotal);
  }, [items]);

  const addItemHandler = () => {
    const itemsCopy = [...items];
    itemsCopy.push({ item: '', quantity: '', rate: 0, total: 0 });
    setFieldValue('items', itemsCopy);
  };

  const errorHandling = fieldName => {
    const error = touched?.[fieldName] && !!errors?.[fieldName];
    const helperText = touched?.[fieldName] && errors?.[fieldName];
    return { error, helperText };
  };

  return (
    <div className="page-wrapper bg-white sales-form">
      <h1 className="heading-primary">{t('sales.title')}</h1>
      {isLoading && <Loader />}
      {success && <Alert severity="success">{successMessage}</Alert>}
      {error && <Alert severity="error">{errorMessage}</Alert>}
      <div className="row col-md-3 col-sm-1 mt-sm">
        <TextField
          variant="outlined"
          onChange={handleChange}
          value={mobile}
          id="mobile"
          name="mobile"
          label={t('sales.mobile')}
          required={true}
          {...errorHandling('mobile')}
        />
        <TextField
          variant="outlined"
          onChange={handleChange}
          value={firstName}
          id="firstName"
          name="firstName"
          label={t('sales.firstName')}
          required={true}
          {...errorHandling('firstName')}
        />
        <TextField
          variant="outlined"
          onChange={handleChange}
          value={lastName}
          id="lastName"
          name="lastName"
          label={t('sales.lastName')}
          required={true}
          {...errorHandling('lastName')}
        />
      </div>
      <div className="row col-md-2">
        <TextField
          variant="outlined"
          onChange={handleChange}
          value={address}
          id="address"
          name="address"
          label={t('sales.address')}
          required={true}
          {...errorHandling('address')}
        />
        <TextField
          variant="outlined"
          type="date"
          onChange={handleChange}
          value={date}
          required
          pattern="\d{4}-\d{2}-\d{2}"
          id="date"
          name="date"
          label={t('sales.date')}
        />
      </div>

      <div className="row col-md-1">
        <table>
          <thead>
            <tr>
              <th className="text-left">{t('sales.serialNumber')}</th>
              <th className="text-center">{t('sales.item')}</th>
              <th className="text-left quantity">{t('sales.quantity')}</th>
              <th className="text-left rate">{t('sales.rate')}</th>
              <th className="text-right">{t('sales.total')}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((el, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th className="text-center">
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    value={el.item}
                    id={`items[${index}].item`}
                    name={`items[${index}].item`}
                    type="text"
                    required={true}
                  />
                </th>
                <th>
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    className="text-right"
                    value={el.quantity}
                    id={`items[${index}].quantity`}
                    name={`items[${index}].quantity`}
                    type="number"
                    required={true}
                  />
                </th>
                <th>
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    className="text-right"
                    value={el.rate}
                    id={`items[${index}].rate`}
                    name={`items[${index}].rate`}
                    type="number"
                    required={true}
                  />
                </th>
                <th className="text-right">{el.rate * el.quantity}</th>
              </tr>
            ))}
            <tr>
              <th colSpan={3} className="text-left sub-total">
                {t('sales.subTotal')}
              </th>
              <th colSpan={2} className="text-right sub-total">
                &#8377;{subTotal}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row col-md-2">
        <div />
        <div className="row col-md-2">
          <Button color="success" variant="contained" onClick={() => handleSubmit(values)} className="btn-gray">
            {t('sales.save')}
          </Button>
          <Button color="secondary" variant="contained" onClick={() => addItemHandler()}>
            {t('sales.addItem')}
          </Button>
        </div>
      </div>
    </div>
  );
};

SalesFormFields.propTypes = {
  values: shape(object),
  handleChange: func,
  setFieldValue: func,
  handleSubmit: func,
  resetForm: func,
  errors: shape(object),
  touched: shape(object),
  feedback: shape(object),
  isLoading: bool
};

export default SalesFormFields;
