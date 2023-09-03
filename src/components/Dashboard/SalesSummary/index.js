import React from 'react';
import Card from '@mui/material/Card';
import { number } from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export default function SalesSummary({ ordersCount, ordersAmount, month, year }) {
  const { t } = useTranslation();

  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="heading-secondary">{t('dashboard.salesSummary.title')}</h2>
      <dl>
        <dt>{t('dashboard.salesSummary.salesCount')}</dt>
        <dd className="mb-xs">
          <strong>
            <NavLink to={`/orders?month=${month}&year=${year}`}>{ordersCount}</NavLink>
          </strong>
        </dd>
        <dt>{t('dashboard.salesSummary.totalSales')}</dt>
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
