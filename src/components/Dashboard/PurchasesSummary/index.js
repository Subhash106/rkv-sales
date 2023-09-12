import React from 'react';
import Card from '@mui/material/Card';
import { number, bool } from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

export default function PurchasesSummary({ purchasesCount, purchasesAmount, month, year, isLoading }) {
  const { t } = useTranslation();

  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="heading-secondary">{t('dashboard.purchasesSummary.title')}</h2>
      <dl>
        <dt>{t('dashboard.purchasesSummary.purchasesCount')}</dt>
        <dd className="mb-xs">
          <strong>
            {isLoading ? (
              <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />
            ) : (
              <NavLink to={`/purchases-summary?month=${month}&year=${year}`}>
                <strong>{purchasesCount}</strong>
              </NavLink>
            )}
          </strong>
        </dd>
        <dt>{t('dashboard.purchasesSummary.totalPurchases')}</dt>
        <dd>
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />
          ) : (
            <strong>{purchasesAmount}</strong>
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
  year: number,
  isLoading: bool.isRequired
};

PurchasesSummary.defaultProps = {
  month: moment().month() + 1,
  year: moment().year(),
  isLoading: false
};
