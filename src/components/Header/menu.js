import { func, string } from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function Menu({ closeClickHandler, logoutHandler, token }) {
  const { t } = useTranslation();

  return (
    <>
      <li>
        <NavLink
          onClick={closeClickHandler}
          to="/dashboard"
          className={({ isActive }) => {
            return isActive ? 'active' : '';
          }}
          end
        >
          {t('header.dashboard')}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={closeClickHandler}
          to="/sales"
          className={({ isActive }) => {
            return isActive ? 'active' : '';
          }}
        >
          {t('header.sales')}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={closeClickHandler}
          to="/sales-summary"
          className={({ isActive }) => {
            return isActive ? 'active' : '';
          }}
        >
          {t('header.salesSummary')}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={closeClickHandler}
          to="/purchases"
          className={({ isActive }) => {
            return isActive ? 'active' : '';
          }}
        >
          {t('header.purchases')}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={closeClickHandler}
          to="/purchases-summary"
          className={({ isActive }) => {
            return isActive ? 'active' : '';
          }}
        >
          {t('header.purchasesSummary')}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={closeClickHandler}
          to="/admin"
          className={({ isActive }) => {
            return isActive ? 'active' : '';
          }}
        >
          {t('header.inventory')}
        </NavLink>
      </li>
      {token && (
        <li>
          <a href="#" onClick={logoutHandler}>
            {t('header.logout')}
          </a>
        </li>
      )}
    </>
  );
}

Menu.propTypes = {
  logoutHandler: func,
  closeClickHandler: func,
  token: string
};
