import { Skeleton } from '@mui/material';
import { number } from 'prop-types';
import React from 'react';

import './style.css';

export default function TableSkelton({ columns, rows }) {
  console.log('[...Array(rows).keys()]', [...Array(rows).keys()]);
  return (
    <table className="skeleton-table">
      <thead>
        <tr>
          {[...Array(columns).keys()].map(el => (
            <th key={el}>
              <Skeleton sx={{ fontSize: '2rem' }} animation="wave" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows).keys()].map(el => (
          <tr key={el}>
            {[...Array(columns).keys()].map(elR => (
              <td key={elR}>
                <Skeleton sx={{ fontSize: '2rem' }} animation="wave" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableSkelton.propTypes = {
  columns: number,
  rows: number
};

TableSkelton.defaultProp = {
  columns: 3,
  rows: 3
};
