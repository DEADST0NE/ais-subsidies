import axios from '../../services/apiService';
import {
  toastMessageError,
  toastMessageSuccess,
} from '../../components/generic/ToastMessage/ToastMessage';
import objectOfFormDate from '../../utils/objectOfFormDate';

import {
  LIVINGWAGES_GET_REQUEST,
  LIVINGWAGES_GET_SUCCESS,
  LIVINGWAGES_GET_ERROR,
  LIVINGWAGE_POST_REQUEST,
  LIVINGWAGE_POST_ERROR,
  LIVINGWAGE_POST_SUCCESS,
  LIVINGWAGE_DELETE_REQUEST,
  LIVINGWAGE_DELETE_SUCCESS,
  LIVINGWAGE_DELETE_ERROR,
} from '../actions';

// Все относиться к запросу добавления прожиточного минимума
const getLivingwagesRequested = () => ({
  type: LIVINGWAGES_GET_REQUEST,
});

const getLivingwagesSuccess = (item) => ({
  type: LIVINGWAGES_GET_SUCCESS,
  payload: item,
});

const getLivingwagesError = (error) => ({
  type: LIVINGWAGES_GET_ERROR,
  payload: error,
});

const getLivingwagesRequest = async (id) => {
  return axios.get(`Directory/livingwages/${id}`).then((response) => response.data);
};

export const getLivingwages = (id) => (dispatch) => {
  dispatch(getLivingwagesRequested());
  getLivingwagesRequest(id)
    .then((data) => dispatch(getLivingwagesSuccess(data)))
    .catch((err) => dispatch(getLivingwagesError(err)));
};
//---------------------------------------------------------

/* Все относится к запросу добавления должности  */
const postLivingwageRequested = () => ({
  type: LIVINGWAGE_POST_REQUEST,
});

const postLivingwageError = () => ({
  type: LIVINGWAGE_POST_ERROR,
});

const postLivingwageSuccess = (object) => ({
  type: LIVINGWAGE_POST_SUCCESS,
  payload: object,
});

const postLivingwageRequest = async (formDara) => {
  return axios.post('Directory/livingwage', formDara).then((response) => response.data);
};

export const postLivingwage = (object, onClose) => (dispatch) => {
  dispatch(postLivingwageRequested());
  Object.keys(object.livingwageGrup).forEach((item) => {
    if (object.livingwageGrup[item]) {
      postLivingwageRequest(
        objectOfFormDate({
          socialGroupId: item,
          wageValue: object.livingwageGrup[item],
          dateStart: object.dateStart.toISOString(),
        })
      )
        .then((data) => {
          onClose(false);
          postLivingwageSuccess(data);
          toastMessageSuccess('Прожиточный минимум успешна добавлен');
        })
        .catch((err) => {
          toastMessageError(err.title);
          dispatch(postLivingwageError());
        });
    }
  });
};
/* --------------------------------------- */

/* Все относится к запросу удаления прожиточного минимума  */
const deleteLivingwageRequested = () => ({
  type: LIVINGWAGE_DELETE_REQUEST,
});

const deleteLivingwageError = () => ({
  type: LIVINGWAGE_DELETE_ERROR,
});

const deleteLivingwageSuccess = (id) => ({
  type: LIVINGWAGE_DELETE_SUCCESS,
  payload: id,
});

const deleteLivingwageRequest = async (id) => {
  return axios.delete(`Directory/livingwage/${id}`).then((response) => response.data);
};

export const deleteLivingwage = (id, onClose, socialgroupId) => (dispatch) => {
  dispatch(deleteLivingwageRequested());
  deleteLivingwageRequest(id)
    .then(() => {
      onClose(false);
      dispatch(getLivingwages(socialgroupId));
      dispatch(deleteLivingwageSuccess(id));
      toastMessageSuccess('Прожиточный минимум успешно удалена из списка');
      dispatch(deleteLivingwageSuccess(id));
    })
    .catch((err) => {
      toastMessageError(err.response.title);
      dispatch(deleteLivingwageError());
    });
};
/* --------------------------------------- */
