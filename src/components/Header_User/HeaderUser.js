/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';

import Icon from '../generic/Icon';
import { logoutUser } from '../../store/user/actions';

import './HeaderUser.scss';

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
      <div className="drop-menu-account">
        <button tabIndex="1" type="button" className="btn d-flex">
          <Icon name="user" />
          <span>{userData.sub}</span>
        </button>
        <div className="drop-account-list">
          <ul>
            <li className="drop-account-user">
              <Icon name="user" />
              <span>{userData.sub}</span>
            </li>
            <li>
              <Nav.Link as={NavLink} to="/lk">
                Личный кабинет
              </Nav.Link>
            </li>
            <li onClick={this.onLogout}>Выйти</li>
          </ul>
        </div>
      </div>
    ) : (
      <Nav.Link as={NavLink} to="/login">
        Войти
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
