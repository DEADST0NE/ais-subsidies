import axios from '../../services/apiService';
import {
  toastMessageError,
  toastMessageSuccess,
} from '../../components/generic/ToastMessage/ToastMessage';

import {
  ORGSTRUCTURES_GET_REQUEST,
  ORGSTRUCTURES_GET_SUCCESS,
  ORGSTRUCTURES_GET_ERROR,
  ORGSTRUCTURE_DELETE_REQUEST,
  ORGSTRUCTURE_DELETE_SUCCESS,
  ORGSTRUCTURE_DELETE_ERROR,
  ORGSTRUCTURE_POST_REQUEST,
  ORGSTRUCTURE_POST_SUCCESS,
  ORGSTRUCTURE_POST_ERROR,
  ORGSTRUCTURE_PUT_REQUEST,
  ORGSTRUCTURE_PUT_SUCCESS,
  ORGSTRUCTURE_PUT_ERROR,
} from '../actions';

/* Все относится к запросу списка должности  */
const getOrgstructuresRequested = () => ({
  type: ORGSTRUCTURES_GET_REQUEST,
});

const getOrgstructuresSuccess = (item) => ({
  type: ORGSTRUCTURES_GET_SUCCESS,
  payload: item,
});

const getOrgstructuresError = (error) => ({
  type: ORGSTRUCTURES_GET_ERROR,
  payload: error,
});

const getOrgstructuresRequest = async () => {
  return axios.get('Directory/orgstructures').then((response) => response.data);
};

export const getOrgstructures = () => (dispatch) => {
  dispatch(getOrgstructuresRequested());
  getOrgstructuresRequest()
    .then((data) => dispatch(getOrgstructuresSuccess(data)))
    .catch((err) => dispatch(getOrgstructuresError(err)));
};
/* --------------------------------------- */

/* Все относится к запросу удаления организованной структуры   */
const deleteOrgstructureRequested = () => ({
  type: ORGSTRUCTURE_DELETE_REQUEST,
});

const deleteOrgstructureError = () => ({
  type: ORGSTRUCTURE_DELETE_ERROR,
});

const deleteOrgstructureSuccess = (id) => ({
  type: ORGSTRUCTURE_DELETE_SUCCESS,
  payload: id,
});
const deleteOrgstructureRequest = async (id) => {
  return axios.delete(`Directory/orgstructure/${id}`).then((response) => response.data);
};

export const deleteOrgstructure = (id, onClose) => (dispatch) => {
  dispatch(deleteOrgstructureRequested());
  deleteOrgstructureRequest(id)
    .then(() => {
      dispatch(getOrgstructures());
      onClose(false);
      toastMessageSuccess('Организационная структура успешно удалена из списка');
      dispatch(deleteOrgstructureSuccess(id));
    })
    .catch((err) => {
      toastMessageError(err.response.data);
      dispatch(deleteOrgstructureError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу добавления организованной структуры   */
const postOrgstructureRequested = () => ({
  type: ORGSTRUCTURE_POST_REQUEST,
});

const postOrgstructureError = () => ({
  type: ORGSTRUCTURE_POST_ERROR,
});

const postOrgstructureSuccess = () => ({
  type: ORGSTRUCTURE_POST_SUCCESS,
});

const postOrgstructureRequest = async (formDara) => {
  return axios.post('Directory/orgstructure', formDara).then((response) => response.data);
};

export const postOrgstructure = (formDara, onClose) => (dispatch) => {
  dispatch(postOrgstructureRequested());
  postOrgstructureRequest(formDara)
    .then(() => {
      onClose(false);
      dispatch(getOrgstructures());
      postOrgstructureSuccess();
      toastMessageSuccess('Организационная структура успешна добавлена');
    })
    .catch((err) => {
      toastMessageError(err.response.data);
      dispatch(postOrgstructureError());
    });
};
/* --------------------------------------- */
/* Все относится к запросу изменения организованной структуры  */
const putOrgstructureRequested = () => ({
  type: ORGSTRUCTURE_PUT_REQUEST,
});

const putOrgstructureError = () => ({
  type: ORGSTRUCTURE_PUT_ERROR,
});

const putOrgstructureSuccess = () => ({
  type: ORGSTRUCTURE_PUT_SUCCESS,
});

const putOrgstructureRequest = async (formDara) => {
  return axios.put('Directory/orgstructure', formDara).then((response) => response.data);
};

export const putOrgstructure = (formDara, onClose) => (dispatch) => {
  dispatch(putOrgstructureRequested());
  putOrgstructureRequest(formDara)
    .then(() => {
      dispatch(getOrgstructures());
      dispatch(putOrgstructureSuccess());
      onClose(false);
      toastMessageSuccess('Данные о организационой структуры успешно изменены');
    })
    .catch((err) => {
      toastMessageError(err.response.data);
      dispatch(putOrgstructureError());
    });
};
/* --------------------------------------- */
