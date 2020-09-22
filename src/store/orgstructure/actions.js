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
  return axios
    .delete('Directory/orgstructure', {
      params: {
        id,
      },
    })
    .then((response) => response.data);
};

export const deleteOrgstructures = (id, onClose) => (dispatch) => {
  dispatch(deleteOrgstructureRequested());
  deleteOrgstructureRequest(id)
    .then(() => {
      onClose(false);
      toastMessageSuccess('Должность успешно удалена из списка');
      dispatch(deleteOrgstructureSuccess(id));
    })
    .catch((err) => {
      toastMessageError(err.title);
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

const postOrgstructureSuccess = (object) => ({
  type: ORGSTRUCTURE_POST_SUCCESS,
  payload: object,
});

const postOrgstructureRequest = async (formDara) => {
  return axios.post('Directory/orgstructure', formDara).then((response) => response.data);
};

export const postOrgstructures = (formDara, onClose) => (dispatch) => {
  dispatch(postOrgstructureRequested());
  postOrgstructureRequest(formDara)
    .then((data) => {
      onClose(false);
      postOrgstructureSuccess(data);
      toastMessageSuccess('Должность успешна добавлена');
    })
    .catch((err) => {
      toastMessageError(err.title);
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

const putOrgstructureSuccess = (object) => ({
  type: ORGSTRUCTURE_PUT_SUCCESS,
  payload: object,
});

const putOrgstructureRequest = async (formDara) => {
  return axios.put('Directory/orgstructure', formDara).then((response) => response.data);
};

export const putOrgstructures = (formDara, onClose) => (dispatch) => {
  dispatch(putOrgstructureRequested());
  putOrgstructureRequest(formDara)
    .then((data) => {
      onClose(false);
      putOrgstructureSuccess(data);
      toastMessageSuccess('Данные о банке успешно изменены');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(putOrgstructureError());
    });
};
/* --------------------------------------- */
