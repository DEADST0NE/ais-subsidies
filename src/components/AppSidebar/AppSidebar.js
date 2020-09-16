import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '../generic/Icon';

import './AppSidebar.scss';

const NAV_ITEMS = [
  {
    label: 'Главная',
    icon: 'home',
    link: '/Home',
  },
  {
    label: 'Справочники',
    icon: 'directory',
    link: '/Directory',
  },
  {
    label: 'Журналы',
    icon: 'journal',
    link: '/Journal',
  },
  {
    label: 'Отчеты',
    icon: 'reports',
    link: '/Reports',
  },
  {
    label: 'Заявки с ЕПГУ',
    icon: 'applications',
    link: '/Applications',
  },
  {
    label: 'Ошибки в ЕГИССО',
    icon: 'error',
    link: '/Errors',
  },
  {
    label: 'Настройки',
    icon: 'settings',
    link: '/Settings',
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
