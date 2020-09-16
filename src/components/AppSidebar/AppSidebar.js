// eslint-disable jsx-props-no-spreading

import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { NAV_ITEMS } from '../../utils/constants';
import sidebarBurgerShow from '../../store/sidebar/actions';
import Icon from '../generic/Icon';

import './AppSidebar.scss';

const statusSidebar = (showParentSidebar, showChildrenSidebar) => {
  if (showParentSidebar && showChildrenSidebar === false) {
    return 'halfOpenSidebar';
  }
  if (showParentSidebar && showChildrenSidebar) {
    return 'openSidebar';
  }
  return 'closedSidebar';
};

const AppSidebar = ({ location }) => {
  const dispatch = useDispatch();
  if (location.pathname === '/') return null;
  const [urlSubclasses, setUrlSubclasses] = useState(location.pathname);
  const { showParentSidebar, showChildrenSidebar } = useSelector(({ sidebar }) => sidebar);

  return (
    <aside>
      <div className={`sidebar ${statusSidebar(showParentSidebar, showChildrenSidebar)}`}>
        <nav className="sidebar-parent">
          <ul className="sidebar-parent-list">
            {NAV_ITEMS.map(({ label, icon, link, subclasses }) => (
              <li key={link} className="sidebar-parent-item">
                <NavLink
                  to={link}
                  onClick={
                    subclasses
                      ? (events) => {
                          setUrlSubclasses(link);
                          dispatch(sidebarBurgerShow(1, false));
                          events.preventDefault();
                        }
                      : () => {
                          dispatch(sidebarBurgerShow(false, false));
                          setUrlSubclasses(link);
                        }
                  }
                >
                  <Icon name={icon} />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {NAV_ITEMS.map(({ subclasses, link }) =>
          subclasses ? (
            <nav
              key={link}
              className={`sidebar-сhild ${
                new RegExp(`^${link}`).test(urlSubclasses) ? '' : 'd-none'
              }`}
            >
              <ul className="sidebar-сhild-list">
                {subclasses.map(({ label, link, icon }) => (
                  <li
                    key={link}
                    className={`${new RegExp(`^${link}`).test(location.pathname) ? 'active' : ''}`}
                  >
                    <NavLink to={link}>
                      <Icon name={icon} />
                      <span>{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null
        )}
      </div>
    </aside>
  );
};

AppSidebar.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(AppSidebar);
