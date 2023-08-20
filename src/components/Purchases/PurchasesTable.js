import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetPurchasesQuery } from '../../store/base';

export default function PurchasesTable() {
  const { error, isFetching, data = {} } = useGetPurchasesQuery();

  const rows = Object.values(data);

  console.log('rows', rows);

  if (error) {
    return <p>Oops, Something went wrong!</p>;
  }

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">File</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map(row => (
              <TableRow key={`${row.date}_${row.amount}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.file}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
