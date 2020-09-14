import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '../generic/Icon';

import './AppSidebar.scss';

const NAV_ITEMS = [
  {
    label: 'Документы',
    icon: 'employees',
    link: '/documents',
  },
  {
    label: 'Услуги',
    icon: 'services',
    link: '/services',
  },
  {
    label: 'СМЭВ',
    icon: 'smev',
    link: '/smev',
  },
];

const AppSidebar = () => (
  <aside className="app-sidebar">
    <nav>
      <ul className="list-unstyled">
        {NAV_ITEMS.map(({ label, icon, link }) => (
          <li key={link}>
            <NavLink className="nav-item" to={link}>
              <Icon name={icon} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default AppSidebar;
