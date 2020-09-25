import axios from '../../services/apiService';
import {
  toastMessageError,
  toastMessageSuccess,
} from '../../components/generic/ToastMessage/ToastMessage';
import formDataAtObject from '../../utils/formDataAtObject';

import {
  BANKS_GET_REQUEST,
  BANKS_GET_SUCCESS,
  BANKS_GET_ERROR,
  BANK_DELETE_REQUEST,
  BANK_DELETE_SUCCESS,
  BANK_DELETE_ERROR,
  BANK_POST_REQUEST,
  BANK_POST_SUCCESS,
  BANK_POST_ERROR,
  BANK_PUT_REQUEST,
  BANK_PUT_SUCCESS,
  BANK_PUT_ERROR,
} from '../actions';

/* Все относится к запросу списка банков  */
const getBanksRequested = () => ({
  type: BANKS_GET_REQUEST,
});

const getBanksSuccess = (item) => ({
  type: BANKS_GET_SUCCESS,
  payload: item,
});

const getBanksError = (error) => ({
  type: BANKS_GET_ERROR,
  payload: error,
});

const getBanksRequest = async () => {
  return axios.get('Directory/banks').then((response) => response.data);
};

export const getBanks = () => (dispatch) => {
  dispatch(getBanksRequested());
  getBanksRequest()
    .then((data) => dispatch(getBanksSuccess(data)))
    .catch((err) => dispatch(getBanksError(err)));
};
/* --------------------------------------- */

/* Все относится к запросу удаления банка  */
const deleteBankRequested = () => ({
  type: BANK_DELETE_REQUEST,
});

const deleteBankError = () => ({
  type: BANK_DELETE_ERROR,
});

const deleteBankSuccess = (id) => ({
  type: BANK_DELETE_SUCCESS,
  payload: id,
});

const deleteBankRequest = async (id) => {
  return axios.delete(`Directory/bank/${id}`).then((response) => response.data);
};

export const deleteBanks = (id, onClose) => (dispatch) => {
  dispatch(deleteBankRequested());
  deleteBankRequest(id)
    .then(() => {
      onClose(false);
      toastMessageSuccess('Банк успешно удален из списка');
      dispatch(deleteBankSuccess(id));
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(deleteBankError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу добавления банка  */
const postBankRequested = () => ({
  type: BANK_POST_REQUEST,
});

const postBankError = () => ({
  type: BANK_POST_ERROR,
});

const postBankSuccess = (object) => ({
  type: BANK_POST_SUCCESS,
  payload: object,
});

const postBankRequest = async (formDara) => {
  return axios.post('Directory/bank', formDara).then((response) => response.data);
};

export const postBanks = (formDara, onClose) => (dispatch) => {
  dispatch(postBankRequested());
  postBankRequest(formDara)
    .then((data) => {
      onClose(false);
      const newObject = formDataAtObject(formDara);
      newObject.id = data;
      postBankSuccess(data);
      toastMessageSuccess('Банк успешно добавлен');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(postBankError());
    });
};
/* --------------------------------------- */
/* Все относится к запросу изменения банка  */
const putBankRequested = () => ({
  type: BANK_PUT_REQUEST,
});

const putBankError = () => ({
  type: BANK_PUT_ERROR,
});

const putBankSuccess = (object) => ({
  type: BANK_PUT_SUCCESS,
  payload: object,
});

const putBankRequest = async (formDara) => {
  return axios.put('Directory/bank', formDara).then((response) => response.data);
};

export const putBanks = (formDara, onClose) => (dispatch) => {
  dispatch(putBankRequested());
  putBankRequest(formDara)
    .then(() => {
      onClose(false);
      dispatch(putBankSuccess(formDataAtObject(formDara)));
      toastMessageSuccess('Данные о банке успешно изменены');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(putBankError());
    });
};
/* --------------------------------------- */
