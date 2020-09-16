import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CalculatorSubsidyForm from '../forms/CalculatorSubsidyForm';
import CalculatorSubsidyResult from '../CalculatorSubsidyResult/CalculatorSubsidyResult';

import './Home.scss';

const Home = () => {
  return (
    <Row className="app-body m-3">
      <Col className="pages-block-content">
        <h1 className="page-title">Предварительный расчет субсидий</h1>
        <CalculatorSubsidyForm />
      </Col>
      <Col md={4} className="pages-block-content">
        <h1 className="page-title">Результат</h1>
        <CalculatorSubsidyResult />
      </Col>
    </Row>
  );
};

export default Home;
