import axios from '../../services/apiService';
import {
  toastMessageError,
  toastMessageSuccess,
} from '../../components/generic/ToastMessage/ToastMessage';

import {
  RELATIONS_GET_REQUEST,
  RELATIONS_GET_SUCCESS,
  RELATIONS_GET_ERROR,
  RELATION_DELETE_REQUEST,
  RELATION_DELETE_SUCCESS,
  RELATION_DELETE_ERROR,
  RELATION_POST_REQUEST,
  RELATION_POST_SUCCESS,
  RELATION_POST_ERROR,
  RELATION_PUT_REQUEST,
  RELATION_PUT_SUCCESS,
  RELATION_PUT_ERROR,
} from '../actions';

/* Все относится к запросу списка банков  */
const getRelationsRequested = () => ({
  type: RELATIONS_GET_REQUEST,
});

const getRelationsSuccess = (item) => ({
  type: RELATIONS_GET_SUCCESS,
  payload: item,
});

const getRelationsError = (error) => ({
  type: RELATIONS_GET_ERROR,
  payload: error,
});

const getRelationsRequest = async () => {
  return axios.get('Directory/relationdependences').then((response) => response.data);
};

export const getRelations = () => (dispatch) => {
  dispatch(getRelationsRequested());
  getRelationsRequest()
    .then((data) => dispatch(getRelationsSuccess(data)))
    .catch((err) => dispatch(getRelationsError(err)));
};
/* --------------------------------------- */

/* Все относится к запросу удаления банка  */
const deleteRelationRequested = () => ({
  type: RELATION_DELETE_REQUEST,
});

const deleteRelationError = () => ({
  type: RELATION_DELETE_ERROR,
});

const deleteRelationSuccess = (id) => ({
  type: RELATION_DELETE_SUCCESS,
  payload: id,
});

const deleteRelationRequest = async (id) => {
  return axios
    .delete('Directory/relationdependences', {
      params: {
        id,
      },
    })
    .then((response) => response.data);
};

export const deleteRelations = (id, onClose) => (dispatch) => {
  dispatch(deleteRelationRequested());
  deleteRelationRequest(id)
    .then(() => {
      onClose(false);
      toastMessageSuccess('Банк успешно удален из списка');
      dispatch(deleteRelationSuccess(id));
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(deleteRelationError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу добавления банка  */
const postRelationRequested = () => ({
  type: RELATION_POST_REQUEST,
});

const postRelationError = () => ({
  type: RELATION_POST_ERROR,
});

const postRelationSuccess = (object) => ({
  type: RELATION_POST_SUCCESS,
  payload: object,
});

const postRelationRequest = async (formDara) => {
  return axios.post('Directory/relationdependences', formDara).then((response) => response.data);
};

export const postRelations = (formDara, onClose) => (dispatch) => {
  dispatch(postRelationRequested());
  postRelationRequest(formDara)
    .then((data) => {
      onClose(false);
      postRelationSuccess(data);
      toastMessageSuccess('Банк успешно добавлен');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(postRelationError());
    });
};
/* --------------------------------------- */
/* Все относится к запросу изменения банка  */
const putRelationRequested = () => ({
  type: RELATION_PUT_REQUEST,
});

const putRelationError = () => ({
  type: RELATION_PUT_ERROR,
});

const putRelationSuccess = (object) => ({
  type: RELATION_PUT_SUCCESS,
  payload: object,
});

const putRelationRequest = async (formDara) => {
  return axios.put('Directory/relationdependences', formDara).then((response) => response.data);
};

export const putRelations = (formDara, onClose) => (dispatch) => {
  dispatch(putRelationRequested());
  putRelationRequest(formDara)
    .then((data) => {
      onClose(false);
      putRelationSuccess(data);
      toastMessageSuccess('Данные о банке успешно изменены');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(putRelationError());
    });
};
/* --------------------------------------- */
