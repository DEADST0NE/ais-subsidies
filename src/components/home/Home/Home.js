import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CalculatorForm from '../../forms/CalculatorForm';
import CalculatorResult from '../CalculatorResult';

import './Home.scss';

const Home = () => {
  return (
    <Row className="app-body m-3">
      <Col className="pages-block-content">
        <h1 className="page-title">Предварительный расчет субсидий</h1>
        <CalculatorForm />
      </Col>
      <Col md={4} className="pages-block-content">
        <h1 className="page-title">Результат</h1>
        <CalculatorResult />
      </Col>
    </Row>
  );
};

export default Home;
