import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import Icon from '../generic/Icon';
import './Сonfirmation.scss';

const Сonfirmation = ({ show, onClosed, onSuccess }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        onClosed(false);
      }}
      className="confirmation"
    >
      <Modal.Body>
        <Icon name="siren" />
        <p>Подтвердите действие</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            onClosed(false);
          }}
        >
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSuccess();
            onClosed(false);
          }}
        >
          Oк
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Сonfirmation.propTypes = {
  show: PropTypes.bool.isRequired,
  onClosed: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default Сonfirmation;
