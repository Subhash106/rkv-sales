import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import SalesSummary from './SalesSummary';
import PurchasesSummary from './PurchasesSummary';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import moment from 'moment';

import './style.css';
import { useGetOrdersQuery, useGetPurchasesQuery } from '../../services/base';

const Dashboard = () => {
  const [filters, setFilters] = useState({ month: moment().month() + 1, year: moment().year() });
  const { month, year } = filters;
  const [ordersCount, setOrdersCount] = useState(0);
  const [ordersAmount, setOrdersAmount] = useState(0);
  const [purchasesCount, setPurchasesCount] = useState(0);
  const [purchasesAmount, setPurchasesAmount] = useState(0);
  const { isLoading: loadingOrders, data: orders = {} } = useGetOrdersQuery();
  const { isLoading: loadingPurchases, data: purchases = {} } = useGetPurchasesQuery();

  const handleChange = e => {
    const {
      target: { name, value }
    } = e;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    if (!loadingOrders) {
      setOrdersCount(
        Object.values(orders).filter(order => {
          const dateArray = order?.date?.split('-');
          return month === +dateArray?.[1] && year === +dateArray?.[0];
        }).length
      );
      setOrdersAmount(
        Object.values(orders)
          .filter(order => {
            const dateArray = order?.date?.split('-');
            return month === +dateArray?.[1] && year === +dateArray?.[0];
          })
          .reduce((total, current) => {
            return total + current.subTotal;
          }, 0)
      );
    }

    if (!loadingPurchases) {
      setPurchasesCount(
        Object.values(purchases).filter(purchase => {
          const dateArray = purchase?.date?.split('-');
          return month === +dateArray?.[1] && year === +dateArray?.[0];
        }).length
      );
      setPurchasesAmount(
        Object.values(purchases)
          .filter(purchase => {
            const dateArray = purchase?.date?.split('-');
            return month === +dateArray?.[1] && year === +dateArray?.[0];
          })
          .reduce((total, current) => {
            return total + +current.amount;
          }, 0)
      );
    }
  }, [month, year, loadingOrders, loadingPurchases, orders, purchases]);

  return (
    <div className="dashboard">
      <div className="bg-white" style={{ padding: '2rem', borderRadius: '1.2rem' }}>
        <h1 style={{ marginBottom: '4rem' }}>Welcome, Radha Krishana Vastralaya!</h1>
        <div style={{ paddingBottom: '2rem' }}>
          <form className="mb-sm">
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="month">Month</InputLabel>
                  <Select labelId="month" id="month" name="month" value={month} label="Age" onChange={handleChange}>
                    {Array(12)
                      .fill()
                      .map((_, i) => i + 1)
                      .map(el => (
                        <MenuItem key={el} value={el}>
                          {moment(el, 'M').format('MMMM')}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="month">Year</InputLabel>
                  <Select labelId="month" id="year" name="year" value={year} label="Age" onChange={handleChange}>
                    {Array(3)
                      .fill()
                      .map((_, i) => moment().year() - i)
                      .map(el => (
                        <MenuItem key={el} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <PurchasesSummary purchasesCount={purchasesCount} purchasesAmount={purchasesAmount} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <SalesSummary month={month} year={year} ordersCount={ordersCount} ordersAmount={ordersAmount} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
