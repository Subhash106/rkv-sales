import React from 'react';
import Card from '@mui/material/Card';
import { number } from 'prop-types';

export default function SalesSummary({ ordersCount, ordersAmount }) {
  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="mb-sm">Sales Summary</h2>
      <dl>
        <dt>Total Orders</dt>
        <dd className="mb-xs">
          <strong>{ordersCount}</strong>
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
  ordersAmount: number.isRequired
};
