import { Skeleton } from '@mui/material';
import React from 'react';

import './style.css';

export default function PageSkeleton() {
  return (
    <div className="page-skeleton">
      <div className="p-xs">
        <Skeleton variant="rectangle" height="10vh" width="100%" animation="wave" />
      </div>
      <div className="p-xs">
        <Skeleton variant="circular" height="10vh" width="10vh" animation="wave" />
      </div>
      <div className="p-xs">
        <Skeleton variant="rounded" height="30vh" width="100%" animation="wave" />
      </div>
      <div className="p-xs">
        <Skeleton variant="rectangle" height="30vh" width="100%" animation="wave" />
      </div>
    </div>
  );
}
