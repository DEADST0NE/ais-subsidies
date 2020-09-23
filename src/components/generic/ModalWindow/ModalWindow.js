import React from 'react';

import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import './ModalWindow.scss';

const ModalWindow = ({ show, onClosed, size, title, children }) => (
  <Modal className="castom-modal-window" size={size} show={show} onHide={() => onClosed(false)}>
    <Modal.Title className="p-4">{title}</Modal.Title>
    <Modal.Body>{children}</Modal.Body>
  </Modal>
);

ModalWindow.defaultProps = {
  size: 'lg',
};

ModalWindow.propTypes = {
  show: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  onClosed: PropTypes.func.isRequired,
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalWindow;
