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
}) => (
  <Form.Group as={Col} md={col}>
    <div className="custom-field">
      <Form.Label>{label}</Form.Label>
      <MaskedInput
        type="text"
        id={name}
        placeholder={placeholder}
        className={`form-control form-control-${size} ${Object.keys(error).length && 'is-invalid'}`}
        name={name}
        mask={mask}
        disabled={isDisabled}
        autoComplete="off"
        guide={false}
        ref={Ref}
      />
    </div>
  </Form.Group>
);

MaskedInputField.defaultProps = {
  size: 'sm',
  placeholder: '',
  isDisabled: false,
  error: {},
  col: '12',
  Ref: () => {},
};

MaskedInputField.propTypes = {
  size: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
    ref: PropTypes.instanceOf(Element),
  }),
  col: PropTypes.string,
  mask: PropTypes.arrayOf(PropTypes.string).isRequired,
  Ref: PropTypes.func,
};

export default MaskedInputField;
