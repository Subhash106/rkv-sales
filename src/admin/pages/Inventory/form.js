import React from 'react';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { bool, func, object, shape } from 'prop-types';
import { COLORS, ITEMS, UNITS } from '../constants';
import Loader from '../../../components/Loader';

export default function InventoryForm(props) {
  const { t } = useTranslation();
  console.log('formProps', props);
  const { handleChange, /* touched, errors, */ handleSubmit, values, isLoading, feedback } = props;
  const { date, color, item, unit, price, quantity, comment } = values;
  const { success, successMessage, error, errorMessage } = feedback;
  //   const errorHandling = fieldName => {
  //     const error = touched?.[fieldName] && !!errors?.[fieldName];
  //     const helperText = touched?.[fieldName] && errors?.[fieldName];
  //     return { error, helperText };
  //   };

  return (
    <>
      {isLoading && <Loader />}
      {success && <Alert severity="success">{successMessage}</Alert>}
      {error && <Alert severity="error">{errorMessage}</Alert>}
      <div className="row col-md-4 col-sm-1 mt-sm">
        <TextField
          variant="outlined"
          type="date"
          onChange={handleChange}
          value={date}
          required
          pattern="\d{4}-\d{2}-\d{2}"
          id="date"
          name="date"
          label={t('inventory.date')}
        />
        <FormControl fullWidth>
          <InputLabel id="item">Item</InputLabel>
          <Select labelId="item" id="item" name="item" value={item} label="Item" onChange={handleChange}>
            {ITEMS.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="color">Color</InputLabel>
          <Select labelId="color" id="color" name="color" value={color} label="Color" onChange={handleChange}>
            {COLORS.map(color => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="unit">Unit</InputLabel>
          <Select labelId="unit" id="unit" name="unit" value={unit} label="Unit" onChange={handleChange}>
            {UNITS.map(unit => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="row col-md-4 col-sm-1 mt-sm">
        <TextField
          variant="outlined"
          type="number"
          onChange={handleChange}
          value={quantity}
          required
          id="quantity"
          name="quantity"
          label={t('inventory.quantity')}
        />
        <TextField
          variant="outlined"
          type="number"
          onChange={handleChange}
          value={price}
          required
          id="price"
          name="price"
          label={t('inventory.price')}
        />
        <TextField
          variant="outlined"
          type="text"
          onChange={handleChange}
          value={comment}
          required
          id="comment"
          name="comment"
          label={t('inventory.comment')}
        />
      </div>
      <div className="row col-sm-4 mt-sm">
        <Button variant="contained" onClick={() => handleSubmit(values)}>
          Save
        </Button>
      </div>
    </>
  );
}

InventoryForm.propTypes = {
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
