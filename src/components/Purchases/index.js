import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Button } from '@mui/material';
import moment from 'moment';
import './style.css';
import PurchasesTable from './PurchasesTable';

const Purchases = () => {
  const [purchase, setPurchase] = useState({ date: moment().format('YYYY-MM-DD'), amount: '' });

  const { date, amount } = purchase;

  const chnageHandler = e => {
    const {
      target: { value, name }
    } = e;

    setPurchase({ ...purchase, [name]: value });
  };

  const submitHandler = e => {
    e.preventDefault();
    const url = 'https://basic-react-a8d88-default-rtdb.firebaseio.com/purchases.json';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(purchase)
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <div className="purchases">
      <div className="bg-white" style={{ padding: '2rem', borderRadius: '1.2rem' }}>
        <h1 className="heading-primary">Purchases</h1>
        <form onSubmit={submitHandler} style={{ marginBottom: '4rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField onChange={chnageHandler} name="date" type="date" id="date" value={date} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField onChange={chnageHandler} name="amount" type="number" id="amount" value={amount} />
            </Grid>
            <Grid item xs={12} md={3}>
              file to upload
            </Grid>
            <Grid item xs={12} md={3}>
              <Button onClick={submitHandler} variant="contained" color="success">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <h1 style={{ marginBottom: '2rem' }}>All Purchases</h1>
            <PurchasesTable />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Purchases;
