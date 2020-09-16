import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoginForm from './LoginForm';
import Icon from '../generic/Icon';
import formLoginImg from '../../images/form-login-img.jpg';

import './Login.scss';

const Login = () => (
  <div className="d-flex align-items-center min-vh-100 py-3 py-md-0 login-form">
    <Container>
      <div className="login-form-card">
        <Row>
          <Col md={5} className="login-form-card-img">
            <img src={formLoginImg} alt="login-form-img" />
          </Col>
          <Col md={7} className="login-form-card-body">
            <div className="login-form-card-logo brand-wrapper d-flex align-items-center mb-3">
              <Icon name="logo" className="mr-3" />
              <div>
                <h1 className="mb-0">Субсидии</h1>
                <h6 className="ml-1">ЖКУ</h6>
              </div>
            </div>
            <p className="login-form-card-description mb-3">Войдите в свой аккаунт</p>
            <LoginForm />
          </Col>
        </Row>
      </div>
    </Container>
  </div>
);

export default Login;
