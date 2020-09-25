import axios from '../../services/apiService';

import {
  EMPLOYES_GET_REQUEST,
  EMPLOYES_GET_SUCCESS,
  EMPLOYES_GET_ERROR,
  EMPLOYE_DELETE_REQUEST,
  EMPLOYE_DELETE_SUCCESS,
  EMPLOYE_DELETE_ERROR,
  EMPLOYE_POST_REQUEST,
  EMPLOYE_POST_SUCCESS,
  EMPLOYE_POST_ERROR,
  EMPLOYE_PUT_REQUEST,
  EMPLOYE_PUT_SUCCESS,
  EMPLOYE_PUT_ERROR,
} from '../actions';

import {
  toastMessageError,
  toastMessageSuccess,
} from '../../components/generic/ToastMessage/ToastMessage';

const getEmployeeRequested = () => ({
  type: EMPLOYES_GET_REQUEST,
});

const getEmployeesSuccess = (item) => ({
  type: EMPLOYES_GET_SUCCESS,
  payload: item,
});

const getEmployeesError = (error) => ({
  type: EMPLOYES_GET_ERROR,
  payload: error,
});

const getEmployeesRequest = async () => {
  return axios.get('Directory/Employees').then((response) => response.data);
};

// eslint-disable-next-line import/prefer-default-export
export const getEmployees = () => (dispatch) => {
  dispatch(getEmployeeRequested());
  getEmployeesRequest()
    .then((data) => dispatch(getEmployeesSuccess(data)))
    .catch((err) => dispatch(getEmployeesError(err)));
};

/* Все относится к запросу удаления банка  */
const deleteEmployeeRequested = () => ({
  type: EMPLOYE_DELETE_REQUEST,
});

const deleteEmployeeError = () => ({
  type: EMPLOYE_DELETE_ERROR,
});

const deleteEmployeeSuccess = (id) => ({
  type: EMPLOYE_DELETE_SUCCESS,
  payload: id,
});

const deleteEmployeeRequest = async (id) => {
  return axios
    .delete('Directory/Employee', {
      params: {
        id,
      },
    })
    .then((response) => response.data);
};

export const deleteEmployee = (id, onClose) => (dispatch) => {
  dispatch(deleteEmployeeRequested());
  deleteEmployeeRequest(id)
    .then(() => {
      onClose(false);
      toastMessageSuccess('Должность успешно удалена из списка');
      dispatch(deleteEmployeeSuccess(id));
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(deleteEmployeeError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу добавления должности  */
const postEmployeeRequested = () => ({
  type: EMPLOYE_POST_REQUEST,
});

const postEmployeeError = () => ({
  type: EMPLOYE_POST_ERROR,
});

const postEmployeeSuccess = (object) => ({
  type: EMPLOYE_POST_SUCCESS,
  payload: object,
});

const postEmployeeRequest = async (formDara) => {
  return axios.post('Directory/jobpositions', formDara).then((response) => response.data);
};

export const postEmployee = (formDara, onClose) => (dispatch) => {
  dispatch(postEmployeeRequested());
  postEmployeeRequest(formDara)
    .then((data) => {
      onClose(false);
      postEmployeeSuccess(data);
      toastMessageSuccess('Должность успешна добавлена');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(postEmployeeError());
    });
};
/* --------------------------------------- */
/* Все относится к запросу изменения должности  */
const putEmployeeRequested = () => ({
  type: EMPLOYE_PUT_REQUEST,
});

const putEmployeeError = () => ({
  type: EMPLOYE_PUT_ERROR,
});

const putEmployeeSuccess = (object) => ({
  type: EMPLOYE_PUT_SUCCESS,
  payload: object,
});

const putEmployeeRequest = async (formDara) => {
  return axios.put('Directory/jobpositions', formDara).then((response) => response.data);
};

export const putEmployee = (formDara, onClose) => (dispatch) => {
  dispatch(putEmployeeRequested());
  putEmployeeRequest(formDara)
    .then((data) => {
      onClose(false);
      putEmployeeSuccess(data);
      toastMessageSuccess('Данные о банке успешно изменены');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(putEmployeeError());
    });
};
/* --------------------------------------- */
