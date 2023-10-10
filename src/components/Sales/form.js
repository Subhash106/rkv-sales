import { bool, func, object, shape } from 'prop-types';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Alert, FormControl, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader';
import { useLazyGetInventoryQuery } from '../../services/base';
import { UNITS } from '../../admin/pages/constants';
import AsyncSelect from '../../admin/components/AsyncSelect';

const SalesFormFields = props => {
  const { t } = useTranslation();
  const {
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
    feedback,
    isLoading,
    setTouched,
    setErrors
  } = props;
  const { mobile, firstName, lastName, address, items, subTotal, date } = values;
  const { success, error, successMessage, errorMessage } = feedback;
  const [getInventory] = useLazyGetInventoryQuery();

  useEffect(() => {
    const subTotal = items.reduce((total, next) => {
      return next.rate * next.quantity + total;
    }, 0);

    setFieldValue('subTotal', subTotal);
  }, [items]);

  const addItemHandler = () => {
    const itemsCopy = [...items];
    itemsCopy.push({ item: '', quantity: '', unit: '', rate: '', total: 0 });
    setFieldValue('items', itemsCopy);
  };

  const errorHandling = (fieldName, index = -1) => {
    let error = '';
    let helperText = '';
    if (index > -1) {
      error = touched?.['items']?.[index]?.[fieldName] && !!errors?.['items']?.[index]?.[fieldName];
      helperText = touched?.['items']?.[index]?.[fieldName] && errors?.['items']?.[index]?.[fieldName];
    } else {
      error = touched?.[fieldName] && !!errors?.[fieldName];
      helperText = touched?.[fieldName] && errors?.[fieldName];
    }
    return { error, helperText };
  };

  const itemChangeHandler = (e, newValue, index) => {
    const itemsCopy = [...items];
    if (newValue) {
      itemsCopy[index]['item'] = newValue?.['title'];
      itemsCopy[index]['unit'] = newValue?.['unit'];
      itemsCopy[index]['id'] = newValue?.['id'];
      itemsCopy[index]['totalQuantity'] = newValue?.['quantity'];
    }
    setFieldValue('items', itemsCopy);
  };

  const quantityChangeHandler = async (e, index) => {
    const {
      target: { value }
    } = e;
    const itemsCopy = [...items];
    itemsCopy[index]['quantity'] = value;
    setFieldValue('items', itemsCopy);
    if (value > items[index]['totalQuantity']) {
      const touchedCopy = touched?.items ? [...touched.items] : [];
      const errorsCopy = errors?.items ? [...errors.items] : [];
      touchedCopy[index] = { ...touchedCopy[index], quantity: true };
      errorsCopy[index] = { ...errorsCopy[index], quantity: t('sales.errors.exceedQuantity') };
      await setTouched({ ...touched, items: touchedCopy });
      await setErrors({ ...errors, items: errorsCopy });
    }
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
              <th className="text-center">{t('sales.unit')}</th>
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
                  <AsyncSelect
                    changeHandler={itemChangeHandler}
                    id={`items[${index}].item`}
                    label=""
                    getOptions={getInventory}
                    index={index}
                    freeSolo
                  />
                </th>
                <th>
                  <FormControl fullWidth>
                    <Select
                      labelId={`items[${index}].unit`}
                      id={`items[${index}].unit`}
                      name={`items[${index}].unit`}
                      value={el.unit}
                      onChange={handleChange}
                    >
                      {UNITS.map(unit => (
                        <MenuItem key={unit} value={unit}>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </th>
                <th>
                  <TextField
                    variant="outlined"
                    onChange={e => quantityChangeHandler(e, index)}
                    className="text-right"
                    value={el.quantity}
                    id={`items[${index}].quantity`}
                    name={`items[${index}].quantity`}
                    type="number"
                    required={true}
                    {...errorHandling('quantity', index)}
                  />
                  {el.totalQuantity}
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
  setErrors: func,
  setTouched: func,
  handleSubmit: func,
  resetForm: func,
  errors: shape(object),
  touched: shape(object),
  feedback: shape(object),
  isLoading: bool
};

export default SalesFormFields;
