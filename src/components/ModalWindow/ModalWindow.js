import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ModalWindow = ({ show, onClosed, onSuccess, size, title, children }) => (
  <Modal size={size} show={show} onHide={() => onClosed(false)}>
    <Modal.Title>{title}</Modal.Title>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => onClosed(false)}>
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

ModalWindow.defaultProps = {
  size: 'lg',
};

ModalWindow.propTypes = {
  show: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  onClosed: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalWindow;
