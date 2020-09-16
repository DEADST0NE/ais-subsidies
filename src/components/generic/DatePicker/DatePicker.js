import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Form } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

import inputMasksMap from '../../../utils/inputMasksMap';

registerLocale('ru', ru);
setDefaultLocale('ru');

const DatePicker = ({ name, isDisabled, placeholderText, error, col, defaultValue }) => {
  const [startDate, setStartDate] = useState(defaultValue);
  return (
    <Form.Group as={Col} md={col} controlId={name}>
      <ReactDatePicker
        className={Object.keys(error).length && 'is-invalid'}
        name={name}
        selected={startDate}
        dateFormat="dd.MM.yyyy"
        disabled={isDisabled}
        onChange={(date) => setStartDate(date)}
        autoComplete="off"
        placeholderText={placeholderText}
        customInput={<MaskedInput className="form-control" mask={inputMasksMap.date} />}
      />
      {Object.keys(error).length ? <p className="is-invalid-text mb-0">{error.message}</p> : ''}
    </Form.Group>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  col: PropTypes.string,
  isDisabled: PropTypes.bool,
  placeholderText: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
    ref: PropTypes.instanceOf(Element),
  }),
  defaultValue: PropTypes.string,
};

DatePicker.defaultProps = {
  isDisabled: false,
  placeholderText: '',
  col: '12',
  defaultValue: '',
  error: {},
};

export default DatePicker;
