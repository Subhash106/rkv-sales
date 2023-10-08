import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';

import InventoryTable from './InventoryTable';
import { useGetInventoryQuery } from '../../../services/base';
// import TextInput from '../shared/TextInput';
import TableSkelton from '../../../components/Loader';

import './style.css';

export default function InventorySummary() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  // const [params] = useSearchParams();
  const { error, isLoading, data = {} } = useGetInventoryQuery() || {};
  const [rows, setRows] = useState([]);
  // const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  // const month = params.get('month');
  // const year = params.get('year');

  useEffect(() => {
    if (!isLoading) setRows(Object.values(data));
  }, [isLoading]);

  // const dateChangeHandler = e => {
  //   const {
  //     target: { value }
  //   } = e;
  //   setDate(value);
  //   navigate('/Inventory-summary');
  // };

  if (error) {
    return <p>Oops, Something went wrong!</p>;
  }

  return (
    <div className="Inventory">
      <div className="bg-white page-wrapper">
        <h1 className="heading-primary">{t('inventorySummary.title')}</h1>
        {/* <div className="mb-sm">
          <TextInput value={date} onChange={dateChangeHandler} name="date" type="date" id="date" label="Select Date" />
        </div> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            {isLoading ? <TableSkelton columns={3} rows={2} /> : <InventoryTable rows={rows} />}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
