import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import './style.css';

export default function Header() {
  const { t } = useTranslation();
  return (
    <div className="admin-panel-header">
      <div className="logo-box">
        <NavLink to="/">
          <img src="../../../img/logo.jpg" alt="Logo" className="logo" />
        </NavLink>
      </div>
      <nav className="top-nav">
        <ul className="admin-header">
          <li>
            <NavLink to="/dashboard">{t('header.saleDashboard')}</NavLink>
          </li>
          <li>
            <NavLink to="/admin">{t('header.adminDashboard')}</NavLink>
          </li>
          <li>
            <NavLink to="/items">{t('header.item')}</NavLink>
          </li>
          <li>
            <NavLink to="/colors">{t('header.color')}</NavLink>
          </li>
          <li>
            <NavLink to="/add-inventory">{t('header.addInventory')}</NavLink>
          </li>
          <li>
            <NavLink to="/inventory-summary">{t('header.inventorySummary')}</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
