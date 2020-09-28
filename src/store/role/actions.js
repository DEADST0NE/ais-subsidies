import axios from '../../services/apiService';
import {
  toastMessageError,
  toastMessageSuccess,
} from '../../components/generic/ToastMessage/ToastMessage';
import formDataAtObject from '../../utils/formDataAtObject';

import {
  ROLES_GET_REQUEST,
  ROLES_GET_SUCCESS,
  ROLES_GET_ERROR,
  ROLE_DELETE_REQUEST,
  ROLE_DELETE_SUCCESS,
  ROLE_DELETE_ERROR,
  ROLE_POST_REQUEST,
  ROLE_POST_SUCCESS,
  ROLE_POST_ERROR,
  ROLE_PUT_REQUEST,
  ROLE_PUT_SUCCESS,
  ROLE_PUT_ERROR,
} from '../actions';

/* Все относится к запросу списка должности  */
const getRolesRequested = () => ({
  type: ROLES_GET_REQUEST,
});

const getRolesSuccess = (item) => ({
  type: ROLES_GET_SUCCESS,
  payload: item,
});

const getRolesError = (error) => ({
  type: ROLES_GET_ERROR,
  payload: error,
});

const getRolesRequest = async () => {
  return axios.get('Directory/roles').then((response) => response.data);
};

export const getRoles = () => (dispatch) => {
  dispatch(getRolesRequested());
  getRolesRequest()
    .then((data) => dispatch(getRolesSuccess(data)))
    .catch((err) => dispatch(getRolesError(err)));
};
/* --------------------------------------- */

/* Все относится к запросу удаления банка  */
const deleteRoleRequested = () => ({
  type: ROLE_DELETE_REQUEST,
});

const deleteRoleError = () => ({
  type: ROLE_DELETE_ERROR,
});

const deleteRoleSuccess = () => ({
  type: ROLE_DELETE_SUCCESS,
  // payload: id,
});

const deleteRoleRequest = async (id) => {
  return axios.delete(`Directory/roles/${id}`).then((response) => response.data);
};

export const deleteRoles = (id, onClose) => (dispatch) => {
  dispatch(deleteRoleRequested());
  deleteRoleRequest(id)
    .then(() => {
      dispatch(deleteRoleSuccess(id));
      dispatch(getRoles());
      onClose(false);
      toastMessageSuccess('Должность успешно удалена из списка');
    })
    .catch((err) => {
      toastMessageError(err.data);
      dispatch(deleteRoleError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу добавления должности  */
const postRoleRequested = () => ({
  type: ROLE_POST_REQUEST,
});

const postRoleError = () => ({
  type: ROLE_POST_ERROR,
});

const postRoleSuccess = (object) => ({
  type: ROLE_POST_SUCCESS,
  payload: object,
});

const postRoleRequest = async (formDara) => {
  return axios.post('Directory/role', formDara).then((response) => response.data);
};

export const postRoles = (formDara, onClose) => (dispatch) => {
  dispatch(postRoleRequested());
  postRoleRequest(formDara)
    .then((data) => {
      onClose(false);
      const newObject = formDataAtObject(formDara);
      newObject.id = data;
      dispatch(postRoleSuccess(newObject));
      toastMessageSuccess('Должность успешна добавлена');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(postRoleError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу изменения должности  */
const putRoleRequested = () => ({
  type: ROLE_PUT_REQUEST,
});

const putRoleError = () => ({
  type: ROLE_PUT_ERROR,
});

const putRoleSuccess = (object) => ({
  type: ROLE_PUT_SUCCESS,
  payload: object,
});

const putRoleRequest = async (formDara) => {
  return axios.put('Directory/role', formDara).then((response) => response.data);
};

export const putRoles = (formDara, onClose) => (dispatch) => {
  dispatch(putRoleRequested());
  putRoleRequest(formDara)
    .then(() => {
      onClose(false);
      dispatch(putRoleSuccess(formDataAtObject(formDara)));
      toastMessageSuccess('Данные о банке успешно изменены');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(putRoleError());
    });
};
/* --------------------------------------- */
