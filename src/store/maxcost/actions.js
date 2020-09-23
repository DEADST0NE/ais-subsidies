import axios from '../../services/apiService';
import convertDate from '../../utils/convertDate';
import {
  toastMessageError,
  toastMessageSuccess,
} from '../../components/generic/ToastMessage/ToastMessage';

import {
  MAXCOSTS_GET_REQUEST,
  MAXCOSTS_GET_SUCCESS,
  MAXCOSTS_GET_ERROR,
  MAXCOST_DELETE_REQUEST,
  MAXCOST_DELETE_SUCCESS,
  MAXCOST_DELETE_ERROR,
  MAXCOST_POST_REQUEST,
  MAXCOST_POST_SUCCESS,
  MAXCOST_POST_ERROR,
  MAXCOST_PUT_REQUEST,
  MAXCOST_PUT_SUCCESS,
  MAXCOST_PUT_ERROR,
} from '../actions';

/* Все относится к запросу списка максимальной доля расходов  */
const getMaxcostsRequested = () => ({
  type: MAXCOSTS_GET_REQUEST,
});

const getMaxcostsSuccess = (item) => ({
  type: MAXCOSTS_GET_SUCCESS,
  payload: item,
});

const getMaxcostsError = (error) => ({
  type: MAXCOSTS_GET_ERROR,
  payload: error,
});

const getMaxcostsRequest = async () => {
  return axios.get('Directory/maxcosts').then((response) => response.data);
};

export const getMaxcosts = () => (dispatch) => {
  dispatch(getMaxcostsRequested());
  getMaxcostsRequest()
    .then((data) => dispatch(getMaxcostsSuccess(data)))
    .catch((err) => dispatch(getMaxcostsError(err)));
};
/* --------------------------------------- */

/* Все относится к запросу удаления максимальной доля расходов  */
const deleteMaxcostRequested = () => ({
  type: MAXCOST_DELETE_REQUEST,
});

const deleteMaxcostError = () => ({
  type: MAXCOST_DELETE_ERROR,
});

const deleteMaxcostSuccess = (id) => ({
  type: MAXCOST_DELETE_SUCCESS,
  payload: id,
});

const deleteMaxcostRequest = async (id) => {
  return axios
    .delete('Directory/maxcost', {
      params: {
        id,
      },
    })
    .then((response) => response.data);
};

export const deleteMaxcosts = (id, onClose) => (dispatch) => {
  dispatch(deleteMaxcostRequested());
  deleteMaxcostRequest(id)
    .then(() => {
      onClose(false);
      toastMessageSuccess('Должность успешно удалена из списка');
      dispatch(deleteMaxcostSuccess(id));
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(deleteMaxcostError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу добавления максимальной доля расходов  */
const postMaxcostRequested = () => ({
  type: MAXCOST_POST_REQUEST,
});

const postMaxcostError = () => ({
  type: MAXCOST_POST_ERROR,
});

const postMaxcostSuccess = (object) => ({
  type: MAXCOST_POST_SUCCESS,
  payload: object,
});

const postMaxcostRequest = async (formDara) => {
  return axios.post('Directory/maxcost', formDara).then((response) => response.data);
};

export const postMaxcosts = (formDara, onClose) => (dispatch) => {
  dispatch(postMaxcostRequested());
  postMaxcostRequest(formDara)
    .then((data) => {
      onClose(false);
      postMaxcostSuccess(data);
      toastMessageSuccess('Должность успешна добавлена');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(postMaxcostError());
    });
};
/* --------------------------------------- */

/* Все относится к запросу изменения максимальной доля расходов  */
const putMaxcostRequested = () => ({
  type: MAXCOST_PUT_REQUEST,
});

const putMaxcostError = () => ({
  type: MAXCOST_PUT_ERROR,
});

const putMaxcostSuccess = (object) => ({
  type: MAXCOST_PUT_SUCCESS,
  payload: object,
});

const putMaxcostRequest = async (formDara) => {
  return axios.put('Directory/maxcost', formDara).then((response) => response.data);
};

export const putMaxcosts = (formDara, onClose) => (dispatch) => {
  dispatch(putMaxcostRequested());
  putMaxcostRequest(formDara)
    .then((data) => {
      onClose(false);
      putMaxcostSuccess(data);
      toastMessageSuccess('Данные о банке успешно изменены');
    })
    .catch((err) => {
      toastMessageError(err.title);
      dispatch(putMaxcostError());
    });
};
/* --------------------------------------- */
