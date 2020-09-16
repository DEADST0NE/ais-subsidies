import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { loginUser } from '../../store/user/actions';

class LoginForm extends Component {
  state = {
    login: '',
    password: '',
    validated: false,
    submitBtnStatus: '',
  };

  componentDidUpdate(prevProps) {
    const {
      user: { error },
    } = this.props;

    if (error && error !== prevProps.user.error) {
      const errorMsg = error.response ? error.response.data.errors[0] : error.message;
      toast.error(errorMsg);
    }
  }

  onSubmit = (evt) => {
    const form = evt.currentTarget;
    const { login, password } = this.state;
    const { history, loginUser } = this.props;

    evt.preventDefault();

    this.setState({ validated: true });

    if (form.checkValidity() === false) {
      evt.stopPropagation();
    } else {
      this.setState({ submitBtnStatus: 'submiting' });
      loginUser({ login, password }).then(() => history.push('/'));
    }
  };

  render() {
    const { login, password, validated, submitBtnStatus } = this.state;

    return (
      <Form validated={validated} onSubmit={this.onSubmit} noValidate>
        <Form.Group controlId="login">
          <Form.Control
            placeholder="Логин"
            value={login}
            onChange={(evt) => this.setState({ login: evt.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(evt) => this.setState({ password: evt.target.value })}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="outline-dark"
          block
          disabled={submitBtnStatus === 'submiting'}
        >
          {submitBtnStatus === 'submiting' ? (
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
          ) : (
            'Войти'
          )}
        </Button>
        <NavLink className="forgot-password-link mt-2" to="/login">
          Забыли пароль ?
        </NavLink>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  user: PropTypes.shape({
    userData: PropTypes.oneOfType([PropTypes.object]),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
  }).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default withRouter(
  connect(mapStateToProps, {
    loginUser,
  })(LoginForm)
);
