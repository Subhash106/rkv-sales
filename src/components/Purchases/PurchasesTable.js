import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'react-router-dom';
import { Grid, Table, TableRow, TableHead, TableContainer, TableCell, TableBody } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useGetPurchasesQuery } from '../../services/base';

export default function PurchasesTable() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const { error, isFetching, data = {} } = useGetPurchasesQuery(null, { refetchOnMountOrArgChange: true });
  const [rows, setRows] = useState([]);
  const month = params.get('month');
  const year = params.get('year');

  useEffect(() => {
    if (month && year) {
      const filteredPurchases = Object.values(data || {}).filter(purchase => {
        const dateArray = purchase?.date?.split('-');
        console.log('dateArray', month, year, dateArray);
        return +month === +dateArray?.[1] && +year === +dateArray?.[0];
      });
      setRows(filteredPurchases);
    } else {
      const rows = Object.values(data || {});
      setRows(rows);
    }
  }, [month, year]);

  if (error) {
    return <p>Oops, Something went wrong!</p>;
  }

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} xs={12} lg={12}>
        <TableContainer component={Paper}>
          <Table aria-label="Purchases table">
            <TableHead>
              <TableRow>
                <TableCell>{t('purchases.date')}</TableCell>
                <TableCell align="right">{t('purchases.amount')}</TableCell>
                <TableCell align="right">{t('purchases.invoice')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map(row => (
                  <TableRow
                    key={`${row.date}_${row.amount}_${row.invoiceName}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.date}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">
                      <a download={row.invoiceName} href={row.invoice}>
                        {row.invoiceName}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
