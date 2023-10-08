import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

export default function Header() {
  return (
    <div>
      <nav className="admin-nav">
        <ul className="admin-header">
          <li>
            <NavLink to="/dashboard">Sales Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin">Admin Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/add-inventory">Add Inventory</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
