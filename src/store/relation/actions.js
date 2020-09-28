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
    .catch((err) => dispatch(getRelationsError(err?.response?.data)));
};
/* --------------------------------------- */

/* Все относится к запросу удаления отношения  */
const deleteRelationRequested = () => ({
  type: RELATION_DELETE_REQUEST,
});

const deleteRelationError = () => ({
  type: RELATION_DELETE_ERROR,
});

const deleteRelationSuccess = () => ({
  type: RELATION_DELETE_SUCCESS,
});

const deleteRelationRequest = async (id) => {
  return axios.delete(`Directory/relation/${id}`).then((response) => response.data);
};

export const deleteRelations = (id, onClose) => (dispatch) => {
  dispatch(deleteRelationRequested());
  deleteRelationRequest(id)
    .then(() => {
      onClose(false);
      toastMessageSuccess('Банк успешно удален из списка');
      dispatch(deleteRelationSuccess(id));
      dispatch(getRelations());
    })
    .catch((err) => {
      toastMessageError(err?.response?.data);
      dispatch(deleteRelationError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу добавления отношения  */
const postRelationRequested = () => ({
  type: RELATION_POST_REQUEST,
});

const postRelationError = () => ({
  type: RELATION_POST_ERROR,
});

const postRelationSuccess = () => ({
  type: RELATION_POST_SUCCESS,
});

const postRelationRequest = async (formDara) => {
  return axios.post('Directory/relationdependence', formDara).then((response) => response.data);
};

export const postRelations = (formDara, onClose) => (dispatch) => {
  dispatch(postRelationRequested());
  postRelationRequest(formDara)
    .then(() => {
      onClose(false);
      dispatch(postRelationSuccess());
      dispatch(getRelations());
      toastMessageSuccess('Отношение успешно добавлено');
    })
    .catch((err) => {
      toastMessageError(err?.response?.data?.title);
      dispatch(postRelationError());
    });
};
/* --------------------------------------- */
/* Все относится к запросу изменения отношения  */
const putRelationRequested = () => ({
  type: RELATION_PUT_REQUEST,
});

const putRelationError = () => ({
  type: RELATION_PUT_ERROR,
});

const putRelationSuccess = () => ({
  type: RELATION_PUT_SUCCESS,
});

const putRelationRequest = async (formDara) => {
  return axios.put('Directory/relationdependence', formDara).then((response) => response.data);
};

export const putRelations = (formDara, onClose) => (dispatch) => {
  dispatch(putRelationRequested());
  putRelationRequest(formDara)
    .then(() => {
      dispatch(putRelationSuccess());
      dispatch(getRelations());
      onClose(false);
      toastMessageSuccess('Данные о банке успешно изменены');
    })
    .catch((err) => {
      toastMessageError(err?.response?.data?.title);
      dispatch(putRelationError());
    });
};
/* --------------------------------------- */
