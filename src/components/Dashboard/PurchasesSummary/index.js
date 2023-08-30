import React from 'react';
import Card from '@mui/material/Card';
import { number } from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export default function PurchasesSummary({ purchasesCount, purchasesAmount, month, year }) {
  const { t } = useTranslation();

  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="mb-sm">{t('dashboard.purchasesSummary.title')}</h2>
      <dl>
        <dt>{t('dashboard.purchasesSummary.purchasesCount')}</dt>
        <dd className="mb-xs">
          <strong>
            <NavLink to={`/purchases?month=${month}&year=${year}`}> {purchasesCount}</NavLink>
          </strong>
        </dd>
        <dt>{t('dashboard.purchasesSummary.totalPurchases')}</dt>
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
