import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const CustomSelect = ({ name, data, label, placeholder, isLoading, isDisabled, onChange }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <div className="custom-select2">
        <Select
          className={meta.touched && meta.error ? 'is-invalid' : ''}
          classNamePrefix="react-select"
          name={field.name}
          options={data}
          value={field.value}
          onChange={onChange}
          placeholder={placeholder}
          isClearable="true"
          isLoading={isLoading}
          isDisabled={isDisabled}
        />

        <Form.Label>{label}</Form.Label>
        <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
          {meta.error}
        </Form.Control.Feedback>
      </div>
    )}
  </Field>
);

CustomSelect.defaultProps = {
  data: [],
  placeholder: 'Выберите из вариантов',
  isLoading: false,
  isDisabled: false,
};

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
