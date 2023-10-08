import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { arrayOf, object } from 'prop-types';

import '../../../components/shared/table.css';
import NoRecord from '../../../components/NoRecord';
import moment from 'moment';

export default function InventoryTable({ rows }) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} xs={12} lg={12}>
        <table className="table inventory--summary">
          <thead>
            <tr>
              <th className="text-left">{t('inventory.date')}</th>
              <th className="text-left">{t('inventory.item')}</th>
              <th className="text-left">{t('inventory.color')}</th>
              <th className="text-left">{t('inventory.unit')}</th>
              <th className="text-right">{t('inventory.quantity')}</th>
              <th className="text-left">{t('inventory.comment')}</th>
              <th className="text-right">{t('inventory.price')}</th>
              <th className="text-right">{t('inventory.price10')}</th>
              <th className="text-right">{t('inventory.price20')}</th>
              <th className="text-right">{t('inventory.price30')}</th>
              <th className="text-right">{t('inventory.price40')}</th>
              <th className="text-right">{t('inventory.price50')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map(({ item, price, date, color, unit, comment, quantity }, index) => (
                <tr key={`${index}_${date}_${item}_${color}`}>
                  <td className="text-left">{moment(date).format('DD/MM/YY')}</td>
                  <td className="text-left">{item}</td>
                  <td className="text-left">{color}</td>
                  <td className="text-left">{unit}</td>
                  <td className="text-right">{quantity}</td>
                  <td className="text-left">{comment}</td>
                  <td className="text-right">{price}</td>
                  <td className="text-right">{parseInt(price * 1.1)}</td>
                  <td className="text-right">{parseInt(price * 1.2)}</td>
                  <td className="text-right">{parseInt(price * 1.3)}</td>
                  <td className="text-right">{parseInt(price * 1.4)}</td>
                  <td className="text-right">{parseInt(price * 1.5)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <NoRecord message={t('purchasesSummary.noRecord')} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
}

InventoryTable.propTypes = {
  rows: arrayOf(object)
};
