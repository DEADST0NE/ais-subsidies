import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'formik';
import Form from 'react-bootstrap/Form';
import MaskedInput from 'react-text-mask';

import inputMasksMap from '../../../utils/inputMasksMap';

const CustomField = ({ name, label, type, mask, isDisabled, onFocusOut }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <div className="custom-field">
        {mask ? (
          <MaskedInput
            type={type}
            id={name}
            className={`form-control ${field.value || field.value === 0 ? 'has-value' : ''} ${
              meta.touched && meta.error ? 'is-invalid' : ''
            }`}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={() => {
              if (onFocusOut) {
                onFocusOut();
              }
              return field.onBlur;
            }}
            mask={inputMasksMap[mask]}
            disabled={isDisabled}
            autoComplete="off"
            guide={false}
          />
        ) : (
          <Form.Control
            type={type}
            id={field.id}
            className={field.value || field.value === 0 ? 'has-value' : ''}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={meta.touched && meta.error}
            disabled={isDisabled}
            autoComplete="off"
          />
        )}
        <Form.Label>{label}</Form.Label>
        <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
          {meta.error}
        </Form.Control.Feedback>
      </div>
    )}
  </Field>
);

CustomField.defaultProps = {
  type: 'text',
  isDisabled: false,
  mask: undefined,
  onFocusOut: undefined,
};

CustomField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  mask: PropTypes.string,
  onFocusOut: PropTypes.func,
};

export default CustomField;
