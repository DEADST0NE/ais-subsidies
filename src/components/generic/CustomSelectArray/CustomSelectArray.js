import React from 'react';
import PropTypes from 'prop-types';

import makeAnimated from 'react-select/animated';
import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const CustomSelectArray = ({ name, data, label, placeholder, isLoading, isDisabled }) => {
  const [field, meta, helpers] = useField(name);
  const isInvalid = meta.touched && meta.error;

  let className = field.value ? 'has-value' : '';
  if (isInvalid) {
    className += ' is-invalid';
  }

  return (
    <div className="custom-select2 multi-custom-select2">
      <Select
        components={makeAnimated()}
        className={className}
        classNamePrefix="react-select"
        name={name}
        isMulti
        closeMenuOnSelect={false}
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

CustomSelectArray.defaultProps = {
  data: [],
  placeholder: 'Выберите из вариантов',
  isLoading: false,
  isDisabled: false,
};

CustomSelectArray.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default CustomSelectArray;
