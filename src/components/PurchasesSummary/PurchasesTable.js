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
              <th className="text-left">{t('purchases.comment')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map(({ amount, date, invoice, invoiceName, comment }, index) => (
                <tr key={`${index}_${date}_${amount}_${invoiceName}`}>
                  <td className="text-left">{date}</td>
                  <td className="text-right">{amount}</td>
                  <td className="text-left">
                    {invoice ? (
                      <a href={invoice} download={invoiceName}>
                        {invoiceName}
                      </a>
                    ) : (
                      <a href="#" onClick={e => getDownloadLink(e, invoiceName)}>
                        {invoiceName}
                      </a>
                    )}
                  </td>
                  <td className="text-left">{comment}</td>
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

PurchasesTable.propTypes = {
  rows: arrayOf(object)
};
