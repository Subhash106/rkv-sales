import React, { useEffect, useState } from 'react';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { bool, func, object, shape } from 'prop-types';
import { UNITS } from '../constants';
import Loader from '../../../components/Loader';
import { useGetColorQuery, useGetItemQuery, useGetSizeQuery } from '../../../services/base';

export default function InventoryForm(props) {
  const { t } = useTranslation();
  const { handleChange, /* touched, errors, */ handleSubmit, values, isLoading, feedback } = props;
  const { date, color, item, unit, price, quantity, comment, size } = values;
  const { success, successMessage, error, errorMessage } = feedback;
  const [colors, setColors] = useState([]);
  const [items, setItems] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { data: itemsData = {}, isLoading: loadingItems } = useGetItemQuery();
  const { data: colorsData = {}, isLoading: loadingColors } = useGetColorQuery();
  const { data: sizesData = {}, isLoading: loadingSizes } = useGetSizeQuery();
  //   const errorHandling = fieldName => {
  //     const error = touched?.[fieldName] && !!errors?.[fieldName];
  //     const helperText = touched?.[fieldName] && errors?.[fieldName];
  //     return { error, helperText };
  //   };

  useEffect(() => {
    if (!loadingColors) setColors(Object.entries(colorsData || {}).map(([id, { color }]) => ({ id, color })));
  }, [loadingColors]);

  useEffect(() => {
    if (!loadingItems) setItems(Object.entries(itemsData || {}).map(([id, { item }]) => ({ id, item })));
  }, [loadingItems]);

  useEffect(() => {
    if (!loadingSizes) setSizes(Object.entries(sizesData || {}).map(([id, { size }]) => ({ id, size })));
  }, [loadingSizes]);

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
            {items.map(({ id, item }) => (
              <MenuItem key={id} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="color">Color</InputLabel>
          <Select labelId="color" id="color" name="color" value={color} label="Color" onChange={handleChange}>
            {colors.map(({ id, color }) => (
              <MenuItem key={id} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="size">Size</InputLabel>
          <Select labelId="size" id="size" name="size" value={size} label="Size" onChange={handleChange}>
            {sizes.map(({ id, size }) => (
              <MenuItem key={id} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="row col-md-4 col-sm-1 mt-sm">
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
