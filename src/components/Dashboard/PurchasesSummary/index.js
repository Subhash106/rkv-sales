import React from 'react';
import Card from '@mui/material/Card';
import { number } from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Text from '../../Purchases/Skelton/Text';

export default function PurchasesSummary({ purchasesCount, purchasesAmount, month, year }) {
  const { t } = useTranslation();

  console.log('purchasesCount', purchasesCount, typeof purchasesCount);
  console.log('purchasesAmount', purchasesAmount, typeof purchasesAmount);

  return (
    <Card className="p-sm" variant="outlined">
      <h2 className="heading-secondary">{t('dashboard.purchasesSummary.title')}</h2>
      <dl>
        <dt>{t('dashboard.purchasesSummary.purchasesCount')}</dt>
        <dd className="mb-xs">
          <strong>
            <NavLink to={`/purchases?month=${month}&year=${year}`}>
              {purchasesCount === 0 || purchasesCount ? <strong>{purchasesCount}</strong> : <Text />}
            </NavLink>
          </strong>
        </dd>
        <dt>{t('dashboard.purchasesSummary.totalPurchases')}</dt>
        <dd>{purchasesAmount === 0 || purchasesAmount ? <strong>{purchasesAmount}</strong> : <Text />}</dd>
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
