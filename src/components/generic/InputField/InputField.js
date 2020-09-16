import React from 'react';
import PropTypes from 'prop-types';

import { Col, Form } from 'react-bootstrap';

import './InputField.scss';

const InputField = ({ size, name, type, placeholder, error, col }) => {
  return (
    <Form.Group as={Col} md={col} controlId={name}>
      <Form.Control
        size={size}
        className={Object.keys(error).length && 'is-invalid'}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {Object.keys(error).length ? <p className="is-invalid-text mb-0">{error.message}</p> : ''}
    </Form.Group>
  );
};

InputField.defaultProps = {
  size: '',
  type: 'text',
  placeholder: '',
  error: {},
  col: '12',
};

InputField.propTypes = {
  size: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
    ref: PropTypes.instanceOf(Element),
  }),
  col: PropTypes.string,
};

export default InputField;
