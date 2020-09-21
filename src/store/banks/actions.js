import axios from '../../services/apiService';
import {
  toastMessageError,
  toastMessageSuccess,
} from '../../components/generic/ToastMessage/ToastMessage';

import {
  BANKS_GET_REQUEST,
  BANKS_GET_SUCCESS,
  BANKS_GET_ERROR,
  BANKS_DELETE_SUCCESS,
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
const deleteBanksSuccess = (id) => ({
  type: BANKS_DELETE_SUCCESS,
  payload: id,
});

const deleteBanksRequest = async (id) => {
  return axios
    .delete('Directory/bankss', {
      params: {
        id,
      },
    })
    .then((response) => response.data);
};

export const deleteBanks = (id) => (dispatch) => {
  deleteBanksRequest(id)
    .then(() => {
      toastMessageSuccess('Банк успешно удален из списка');
      dispatch(deleteBanksSuccess(id));
    })
    .catch((err) => toastMessageError(err.title));
};

/* --------------------------------------- */
