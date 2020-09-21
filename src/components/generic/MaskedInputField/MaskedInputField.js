import React from 'react';
import PropTypes from 'prop-types';

import { Form, Col } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';

const MaskedInputField = ({
  name,
  label,
  mask,
  isDisabled,
  placeholder,
  col,
  error,
  Ref,
  size,
  defaultValue,
}) => (
  <Form.Group as={Col} md={col}>
    <div className="custom-field">
      {label ? <Form.Label>{label}</Form.Label> : ''}
      <MaskedInput
        type="text"
        id={name}
        placeholder={placeholder}
        className={`form-control ${size ? `form-control-${size}` : ''} ${
          Object.keys(error).length ? 'is-invalid' : ''
        }`}
        name={name}
        mask={mask}
        disabled={isDisabled}
        autoComplete="off"
        guide
        ref={Ref}
        defaultValue={defaultValue}
        value={defaultValue}
      />
    </div>
    {Object.keys(error).length ? <p className="is-invalid-text mb-0">{error.message}</p> : ''}
  </Form.Group>
);

MaskedInputField.defaultProps = {
  size: 'sm',
  placeholder: '',
  isDisabled: false,
  error: {},
  col: '12',
  Ref: () => {},
  label: '',
  defaultValue: '',
};

MaskedInputField.propTypes = {
  defaultValue: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
    ref: PropTypes.instanceOf(Element),
  }),
  col: PropTypes.string,
  mask: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.oneOf([RegExp]), PropTypes.string, PropTypes.oneOf([null])])
  ).isRequired,
  Ref: PropTypes.func,
};

export default MaskedInputField;
