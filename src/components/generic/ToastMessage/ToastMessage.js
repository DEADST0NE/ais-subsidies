import React from 'react';
import { toast } from 'react-toastify';

import Icon from '../Icon';
import './ToastMessage.scss';

export const toastMessageSuccess = (massage) =>
  toast.success(
    <div className="content-toast-message">
      <Icon name="success" />
      <span>{massage}</span>
    </div>,
    {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnFocusLoss: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'toast-success',
    }
  );

export const toastMessageError = (massage) =>
  toast.error(
    <div className="content-toast-message">
      <Icon name="error" />
      <span>{massage}</span>
    </div>,
    {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnFocusLoss: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'toast-error',
    }
  );
