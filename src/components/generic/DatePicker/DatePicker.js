import React from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import MaskedInput from 'react-text-mask';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

import inputMasksMap from '../../../utils/inputMasksMap';

registerLocale('ru', ru);
setDefaultLocale('ru');

const DatePicker = ({ name, label, isDisabled }) => {
  const [field, meta, helpers] = useField(name);
  const isInvalid = meta.touched && meta.error;

  let className = field.value ? 'has-value' : '';
  if (isInvalid) {
    className += ' is-invalid';
  }

  return (
    <div className="custom-field">
      <div className={className}>
        <ReactDatePicker
          id={name}
          className={isInvalid ? 'is-invalid' : ''}
          name={name}
          selected={field.value}
          onChange={(val) => helpers.setValue(val)}
          onBlur={field.onBlur}
          dateFormat="dd.MM.yyyy"
          disabled={isDisabled}
          autoComplete="off"
          customInput={<MaskedInput className="form-control" mask={inputMasksMap.date} />}
        />
      </div>
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control.Feedback className="invalid-tooltip" type="invalidd">
        {meta.error}
      </Form.Control.Feedback>
    </div>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

DatePicker.defaultProps = {
  isDisabled: false,
};

export default DatePicker;
