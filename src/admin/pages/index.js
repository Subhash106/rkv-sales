import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

export default function AdminDashboard() {
  return (
    <>
      <Header />
      <div className="p-xs">
        <Outlet />
      </div>
    </>
  );
}
