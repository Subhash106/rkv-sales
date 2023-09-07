import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import PurchasesTable from './PurchasesTable';
import { useGetPurchasesQuery } from '../../services/base';
import TextInput from '../shared/TextInput';

import './style.css';
import Loader from '../Loader';

export default function PurchaseSummary() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { error, isLoading, data = {} } = useGetPurchasesQuery();
  const [rows, setRows] = useState([]);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const month = params.get('month');
  const year = params.get('year');

  useEffect(() => {
    const filteredData = Object.values(data).filter(order => {
      const orderDateArray = order?.date?.split('-');
      const dateArray = date?.split('-');

      if (month && year) {
        return +orderDateArray?.[0] === +year && +orderDateArray?.[1] === +month;
      }

      return (
        orderDateArray?.[0] === dateArray?.[0] &&
        orderDateArray?.[1] === dateArray?.[1] &&
        orderDateArray?.[2] === dateArray?.[2]
      );
    });
    setRows(filteredData);
  }, [date, data]);

  const dateChangeHandler = e => {
    const {
      target: { value }
    } = e;
    setDate(value);
    navigate('/purchases-summary');
  };

  if (error) {
    return <p>Oops, Something went wrong!</p>;
  }

  return (
    <div className="purchases">
      <div className="bg-white page-wrapper">
        {isLoading && <Loader />}
        <h1 className="heading-primary">{t('purchasesSummary.title')}</h1>
        <div className="mb-sm">
          <TextInput value={date} onChange={dateChangeHandler} type="date" id="date" label="Select Date" />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <PurchasesTable rows={rows} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
