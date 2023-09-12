import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { arrayOf, object } from 'prop-types';
import { getStorage, ref, getBlob } from 'firebase/storage';

import '../shared/table.css';
import NoRecord from '../NoRecord';

export default function PurchasesTable({ rows }) {
  const storage = getStorage();
  const { t } = useTranslation();

  const getDownloadLink = async (e, fileName) => {
    e.preventDefault();

    const fileRef = ref(storage, `purchases/${fileName}`);
    const blob = await getBlob(fileRef);
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  };

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
                    {row.invoice ? (
                      <a href={row.invoice} download={row.invoiceName}>
                        {row.invoiceName}
                      </a>
                    ) : (
                      <a href="#" onClick={e => getDownloadLink(e, row.invoiceName)}>
                        {row.invoiceName}
                      </a>
                    )}
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
  rows: arrayOf(object)
};
