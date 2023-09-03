import React from 'react';
import { Backdrop } from '@mui/material';

import './style.css';

export default function Loader() {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
      <div className="loader">
        <div className="loader__top"></div>
        <div className="loader__bottom"></div>
      </div>
    </Backdrop>
  );
}
