import React from 'react';
import Card from '@mui/material/Card';
import { number, bool } from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

export default function SalesSummary({ salesCount, salesAmount, month, year, isLoading }) {
  const { t } = useTranslation();

  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="heading-secondary">{t('dashboard.salesSummary.title')}</h2>
      <dl>
        <dt>{t('dashboard.salesSummary.salesCount')}</dt>
        <dd className="mb-xs">
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />
          ) : (
            <NavLink to={`/orders?month=${month}&year=${year}`}>
              <strong>{salesCount}</strong>
            </NavLink>
          )}
        </dd>
        <dt>{t('dashboard.salesSummary.totalSales')}</dt>
        <dd>
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />
          ) : (
            <strong>{salesAmount}</strong>
          )}
        </dd>
      </dl>
    </Card>
  );
}

SalesSummary.propTypes = {
  salesCount: number.isRequired,
  salesAmount: number.isRequired,
  month: number,
  year: number,
  isLoading: bool.isRequired
};

SalesSummary.defaultProps = {
  month: moment().month() + 1,
  year: moment().year(),
  isLoading: false
};
