import React from 'react';
import Card from '@mui/material/Card';
import { number } from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

export default function PurchasesSummary({ purchasesCount, purchasesAmount, month, year }) {
  const { t } = useTranslation();

  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="heading-secondary">{t('dashboard.purchasesSummary.title')}</h2>
      <dl>
        <dt>{t('dashboard.purchasesSummary.purchasesCount')}</dt>
        <dd className="mb-xs">
          <strong>
            {purchasesCount === 0 || purchasesCount ? (
              <NavLink to={`/purchases-summary?month=${month}&year=${year}`}>
                <strong>{purchasesCount}</strong>
              </NavLink>
            ) : (
              <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />
            )}
          </strong>
        </dd>
        <dt>{t('dashboard.purchasesSummary.totalPurchases')}</dt>
        <dd>
          {purchasesAmount === 0 || purchasesAmount ? (
            <strong>{purchasesAmount}</strong>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />
          )}
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
