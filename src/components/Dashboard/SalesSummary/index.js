import React from 'react';
import Card from '@mui/material/Card';
import { number } from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Text from '../../Purchases/Skelton/Text';

export default function SalesSummary({ salesCount, salesAmount, month, year }) {
  const { t } = useTranslation();

  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="heading-secondary">{t('dashboard.salesSummary.title')}</h2>
      <dl>
        <dt>{t('dashboard.salesSummary.salesCount')}</dt>
        <dd className="mb-xs">
          <strong>
            <NavLink to={`/orders?month=${month}&year=${year}`}>
              {salesCount === 0 || salesCount ? <strong>{salesCount}</strong> : <Text />}
            </NavLink>
          </strong>
        </dd>
        <dt>{t('dashboard.salesSummary.totalSales')}</dt>
        <dd>{salesAmount === 0 || salesAmount ? <strong>{salesAmount}</strong> : <Text />}</dd>
      </dl>
    </Card>
  );
}

SalesSummary.propTypes = {
  salesCount: number.isRequired,
  salesAmount: number.isRequired,
  month: number,
  year: number
};

SalesSummary.defaultProps = {
  month: moment().month() + 1,
  year: moment().year()
};
