import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import SubmitBtn from '../SubmitBtn';
import Icon from '../Icon';
import './Сonfirmation.scss';

const Сonfirmation = ({ show, onClosed, onSuccess, loading }) => (
  <Modal show={show} onHide={() => onClosed(false)} className="confirmation">
    <Modal.Body>
      <Icon name="siren" />
      <p>Подтвердите действие</p>
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={loading} variant="secondary" onClick={() => onClosed(false)}>
        Отмена
      </Button>
      <SubmitBtn
        isSubmitting={loading}
        text="Ок"
        onClick={() => {
          onSuccess();
        }}
      />
    </Modal.Footer>
  </Modal>
);

Сonfirmation.propTypes = {
  show: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  onClosed: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Сonfirmation;
