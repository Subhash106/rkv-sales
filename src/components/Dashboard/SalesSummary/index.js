import React from 'react';
import Card from '@mui/material/Card';
import { number } from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export default function SalesSummary({ ordersCount, ordersAmount, month, year }) {
  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="mb-sm">Sales Summary</h2>
      <dl>
        <dt>Total Orders</dt>
        <dd className="mb-xs">
          <strong>
            <NavLink to={`/orders?month=${month}&year=${year}`}>{ordersCount}</NavLink>
          </strong>
        </dd>
        <dt>Total Sales</dt>
        <dd>
          <strong>{ordersAmount}</strong>
        </dd>
      </dl>
    </Card>
  );
}

SalesSummary.propTypes = {
  ordersCount: number.isRequired,
  ordersAmount: number.isRequired,
  month: number,
  year: number
};

SalesSummary.defaultProps = {
  month: moment().month() + 1,
  year: moment().year()
};
