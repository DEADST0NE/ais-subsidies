import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { logoutUser } from '../../store/user/actions';

class HeaderUser extends Component {
  onLogout = () => {
    const { history, logoutUser } = this.props;

    logoutUser(history);
  };

  render() {
    const {
      user: { userData },
    } = this.props;

    return userData ? (
      <NavDropdown title={userData.sub} id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to="/lk">
          Мой профиль
        </NavDropdown.Item>
        <NavDropdown.Item onClick={this.onLogout}>Выйти</NavDropdown.Item>
      </NavDropdown>
    ) : (
      <Nav.Link as={NavLink} to="/lk">
        Личный кабинет
      </Nav.Link>
    );
  }
}

HeaderUser.propTypes = {
  user: PropTypes.shape({
    userData: PropTypes.oneOfType([PropTypes.object]),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
  }).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = { logoutUser };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderUser));
