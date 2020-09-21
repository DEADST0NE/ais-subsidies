import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import GlobalSearchInput from '../generic/GlobalSearchInput';
import sidebarBurgerShow from '../../store/sidebar/actions';
import Icon from '../generic/Icon';
import HeaderUser from '../HeaderUser';

import './AppHeader.scss';

const AppHeader = () => {
  const dispatch = useDispatch();
  const { showParentSidebar, showChildrenSidebar } = useSelector(({ sidebar }) => sidebar);

  return (
    <Navbar className="app-header" variant="dark" expand="lg" sticky="top">
      <button
        type="button"
        className="burger-button"
        onClick={() => {
          dispatch(sidebarBurgerShow(showParentSidebar, showChildrenSidebar));
        }}
      >
        <Icon className={showParentSidebar ? 'svgActive' : 'svgNotActive'} name="burgerMenuMin" />
        <Icon className={showChildrenSidebar ? 'svgActive' : 'svgNotActive'} name="burgerMenuBig" />
      </button>
      <Navbar.Brand as={Link} to="/home" className="pt-0 pb-0 d-flex">
        <div className="logo">
          <Icon className="mr-2" name="logo" />
          <p className="mb-0">Субсидии</p>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav className="global-search">
          <GlobalSearchInput placeholder="Поиск по лицевому счету ..." />
        </Nav>
        <Nav>
          <HeaderUser />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppHeader;
