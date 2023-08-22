import React from 'react';
import Card from '@mui/material/Card';
import { number } from 'prop-types';

export default function PurchasesSummary({ purchasesCount, purchasesAmount }) {
  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="mb-sm">Purchases Summary</h2>
      <dl>
        <dt>Total Purchases</dt>
        <dd className="mb-xs">
          <strong>{purchasesCount}</strong>
        </dd>
        <dt>Total Amount</dt>
        <dd>
          <strong>{purchasesAmount}</strong>
        </dd>
      </dl>
    </Card>
  );
}

PurchasesSummary.propTypes = {
  purchasesCount: number.isRequired,
  purchasesAmount: number.isRequired
};
