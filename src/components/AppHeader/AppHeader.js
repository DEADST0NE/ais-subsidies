import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Icon from '../generic/Icon';
import HeaderUser from '../HeaderUser';

import './AppHeader.scss';

const AppHeader = () => (
  <Navbar className="app-header" variant="dark" expand="lg" sticky="top">
    <Navbar.Brand as={Link} to="/" className="pt-0 pb-0">
      <div className="logo">
        <Icon className="mr-2" name="logo" />
        <p className="mb-0">Субсидии</p>
      </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
      <Nav>
        <Nav.Link as={NavLink} to="/new-case">
          Новое обращение
        </Nav.Link>
      </Nav>
      <Nav>
        <HeaderUser />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AppHeader;
