import React from 'react';
import PropTypes from 'prop-types';

import { Form, Col } from 'react-bootstrap';

import MaskedInput from 'react-text-mask';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

import inputMasksMap from '../../../utils/inputMasksMap';

registerLocale('ru', ru);
setDefaultLocale('ru');

const DatePicker = ({ name, label, isDisabled, onChange, selected, onBlur, error, col }) => {
  console.log(error, selected);
  return (
    <Form.Group as={Col} md={col} controlId={name}>
      <div className="custom-field">
        <ReactDatePicker
          id={name}
          className={Object.keys(error).length && 'is-invalid'}
          name={name}
          selected={selected}
          onChange={onChange}
          onBlur={onBlur}
          dateFormat="dd.MM.yyyy"
          disabled={isDisabled}
          autoComplete="off"
          customInput={<MaskedInput className="form-control" mask={inputMasksMap.date} />}
        />
        <Form.Label htmlFor={name}>{label}</Form.Label>
        {Object.keys(error).length ? <p className="is-invalid-text mb-0">{error.message}</p> : ''}
      </div>
    </Form.Group>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  error: {},
  onChange: PropTypes.func,
  selected: PropTypes.func,
  onBlur: PropTypes.func,
  col: PropTypes.string,
};

DatePicker.defaultProps = {
  isDisabled: false,
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
    ref: PropTypes.instanceOf(Element),
  }),
  onChange: () => {},
  selected: () => {},
  onBlur: () => {},
  col: '',
};

export default DatePicker;
