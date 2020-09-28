import axios from '../../services/apiService';
import {
  toastMessageError,
  toastMessageSuccess,
} from '../../components/generic/ToastMessage/ToastMessage';
import formDataAtObject from '../../utils/formDataAtObject';

import {
  JOBPOSITIONS_GET_REQUEST,
  JOBPOSITIONS_GET_SUCCESS,
  JOBPOSITIONS_GET_ERROR,
  JOBPOSITION_DELETE_REQUEST,
  JOBPOSITION_DELETE_SUCCESS,
  JOBPOSITION_DELETE_ERROR,
  JOBPOSITION_POST_REQUEST,
  JOBPOSITION_POST_SUCCESS,
  JOBPOSITION_POST_ERROR,
  JOBPOSITION_PUT_REQUEST,
  JOBPOSITION_PUT_SUCCESS,
  JOBPOSITION_PUT_ERROR,
} from '../actions';

/* Все относится к запросу списка должности  */
const getJobpositionsRequested = () => ({
  type: JOBPOSITIONS_GET_REQUEST,
});

const getJobpositionsSuccess = (item) => ({
  type: JOBPOSITIONS_GET_SUCCESS,
  payload: item,
});

const getJobpositionsError = (error) => ({
  type: JOBPOSITIONS_GET_ERROR,
  payload: error,
});

const getJobpositionsRequest = async () => {
  return axios.get('Directory/jobpositions').then((response) => response.data);
};

export const getJobpositions = () => (dispatch) => {
  dispatch(getJobpositionsRequested());
  getJobpositionsRequest()
    .then((data) => dispatch(getJobpositionsSuccess(data)))
    .catch((err) => dispatch(getJobpositionsError(err)));
};
/* --------------------------------------- */

/* Все относится к запросу удаления банка  */
const deleteJobpositionRequested = () => ({
  type: JOBPOSITION_DELETE_REQUEST,
});

const deleteJobpositionError = () => ({
  type: JOBPOSITION_DELETE_ERROR,
});

const deleteJobpositionSuccess = (id) => ({
  type: JOBPOSITION_DELETE_SUCCESS,
  payload: id,
});

const deleteJobpositionRequest = async (id) => {
  return axios.delete(`Directory/jobposition/${id}`).then((response) => response.data);
};

export const deleteJobpositions = (id, onClose) => (dispatch) => {
  dispatch(deleteJobpositionRequested());
  deleteJobpositionRequest(id)
    .then(() => {
      onClose(false);
      toastMessageSuccess('Должность успешно удалена из списка');
      dispatch(deleteJobpositionSuccess(id));
    })
    .catch((err) => {
      toastMessageError(err.response.data);
      dispatch(deleteJobpositionError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу добавления должности  */
const postJobpositionRequested = () => ({
  type: JOBPOSITION_POST_REQUEST,
});

const postJobpositionError = () => ({
  type: JOBPOSITION_POST_ERROR,
});

const postJobpositionSuccess = (object) => ({
  type: JOBPOSITION_POST_SUCCESS,
  payload: object,
});

const postJobpositionRequest = async (formDara) => {
  return axios.post('Directory/jobposition', formDara).then((response) => response.data);
};

export const postJobpositions = (formDara, onClose) => (dispatch) => {
  dispatch(postJobpositionRequested());
  postJobpositionRequest(formDara)
    .then((data) => {
      onClose(false);
      dispatch(postJobpositionSuccess(data));
      toastMessageSuccess('Должность успешна добавлена');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(postJobpositionError());
    });
};
/* --------------------------------------- */
/* Все относится к запросу изменения должности  */
const putJobpositionRequested = () => ({
  type: JOBPOSITION_PUT_REQUEST,
});

const putJobpositionError = () => ({
  type: JOBPOSITION_PUT_ERROR,
});

const putJobpositionSuccess = (object) => ({
  type: JOBPOSITION_PUT_SUCCESS,
  payload: object,
});

const putJobpositionRequest = async (formDara) => {
  return axios.put('Directory/jobposition', formDara).then((response) => response.data);
};

export const putJobpositions = (formDara, onClose) => (dispatch) => {
  dispatch(putJobpositionRequested());
  putJobpositionRequest(formDara)
    .then(() => {
      onClose(false);
      dispatch(putJobpositionSuccess(formDataAtObject(formDara)));
      toastMessageSuccess('Данные о банке успешно изменены');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(putJobpositionError());
    });
};
/* --------------------------------------- */
