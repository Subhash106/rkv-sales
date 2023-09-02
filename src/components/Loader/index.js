import React from 'react';
import { Backdrop } from '@mui/material';

export default function Loader() {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
      <div>Loading...</div>
    </Backdrop>
  );
}
