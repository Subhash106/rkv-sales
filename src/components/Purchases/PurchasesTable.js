import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import { useGetPurchasesQuery } from '../../services/base';

export default function PurchasesTable() {
  const [params] = useSearchParams();
  const { error, isFetching, data = {} } = useGetPurchasesQuery();
  let rows = [];
  const month = params.get('month');
  const year = params.get('year');

  if (month && year) {
    rows = Object.values(data).filter(purchase => {
      const dateArray = purchase?.date?.split('-');
      return +month === +dateArray?.[1] && +year === +dateArray?.[0];
    });
  } else {
    rows = Object.values(data);
  }

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
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Invoice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map(row => (
                  <TableRow
                    key={`${row.date}_${row.amount}`}
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
