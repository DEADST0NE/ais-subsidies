/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';
import sidebarBurgerShow from '../../store/sidebar/actions';

import './AppLayout.scss';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { showParentSidebar } = useSelector(({ sidebar }) => sidebar);

  return (
    <div className="app">
      <AppHeader />
      <section className="app-container">
        <AppSidebar />
        <main
          className="app-content"
          onClick={() => (showParentSidebar ? dispatch(sidebarBurgerShow(4, false)) : null)}
        >
          {children}
        </main>
      </section>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;
