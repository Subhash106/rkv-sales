import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { arrayOf } from 'prop-types';

import '../shared/table.css';
import NoRecord from '../NoRecord';

export default function PurchasesTable({ rows }) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} xs={12} lg={12}>
        <table className="table purchases--summary">
          <thead>
            <tr>
              <th className="text-left">{t('purchases.date')}</th>
              <th className="text-right">{t('purchases.amount')}</th>
              <th className="text-left">{t('purchases.invoice')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map(row => (
                <tr key={`${row.date}_${row.amount}_${row.invoiceName}`}>
                  <td className="text-left">{row.date}</td>
                  <td className="text-right">{row.amount}</td>
                  <td className="text-left">
                    <a download={row.invoiceName} href={row.invoice}>
                      {row.invoiceName}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>
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

PurchasesTable.propTypes = {
  rows: arrayOf({})
};
