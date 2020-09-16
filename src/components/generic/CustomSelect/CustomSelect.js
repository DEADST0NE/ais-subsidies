import React from 'react';
import PropTypes from 'prop-types';

import { Form, Col } from 'react-bootstrap';
import Select from 'react-select';

import './CustomSelect.scss';

const CustomSelect = ({ name, data, label, placeholder, isLoading, isDisabled, error, col }) => {
  return (
    <Form.Group as={Col} md={col}>
      <div className="custom-select2">
        <Select
          className={Object.keys(error).length && 'is-invalid'}
          classNamePrefix="react-select"
          name={name}
          options={data}
          placeholder={placeholder}
          isClearable="true"
          isLoading={isLoading}
          isDisabled={isDisabled}
        />

        <Form.Label>{label}</Form.Label>
        {Object.keys(error).length ? <p className="is-invalid-text mb-0">{error.message}</p> : ''}
      </div>
    </Form.Group>
  );
};

CustomSelect.defaultProps = {
  data: [],
  placeholder: 'Выберите из вариантов',
  isLoading: false,
  isDisabled: false,
  error: {},
  col: '12',
};

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
    ref: PropTypes.instanceOf(Element),
  }),
  col: PropTypes.string,
};

export default CustomSelect;
