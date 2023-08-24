import React from 'react';
import Card from '@mui/material/Card';
import { number } from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export default function PurchasesSummary({ purchasesCount, purchasesAmount, month, year }) {
  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="mb-sm">Purchases Summary</h2>
      <dl>
        <dt>Total Purchases</dt>
        <dd className="mb-xs">
          <strong>
            <NavLink to={`/purchases?month=${month}&year=${year}`}> {purchasesCount}</NavLink>
          </strong>
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
  purchasesAmount: number.isRequired,
  month: number,
  year: number
};

PurchasesSummary.defaultProps = {
  month: moment().month() + 1,
  year: moment().year()
};
