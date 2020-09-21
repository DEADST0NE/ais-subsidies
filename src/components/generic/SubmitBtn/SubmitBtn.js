import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const SubmitBtn = ({ isSubmitting, form, text, variant, onClick, className }) => (
  <Button
    type="submit"
    form={form}
    variant={variant}
    disabled={isSubmitting}
    onClick={() => onClick()}
    className={className}
  >
    {isSubmitting ? (
      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
    ) : (
      text
    )}
  </Button>
);

SubmitBtn.defaultProps = {
  form: null,
  text: 'Добавить',
  variant: 'primary',
  onClick: () => {},
  className: '',
};

SubmitBtn.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  form: PropTypes.string,
  text: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default SubmitBtn;
