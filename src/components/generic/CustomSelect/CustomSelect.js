import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const CustomSelect = ({ name, data, label, placeholder, isLoading, isDisabled }) => {
  const [field, meta, helpers] = useField(name);
  const isInvalid = meta.touched && meta.error;

  let className = field.value ? 'has-value' : '';
  if (isInvalid) {
    className += ' is-invalid';
  }

  return (
    <div className="custom-select2">
      <Select
        className={className}
        classNamePrefix="react-select"
        name={name}
        options={data}
        value={field.value}
        onChange={(val) => helpers.setValue(val)}
        onBlur={field.onBlur}
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
  );
};

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
};

export default CustomSelect;
