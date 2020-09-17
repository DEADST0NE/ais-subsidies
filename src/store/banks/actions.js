import axios from '../../services/apiService';

import { BANKS_GET_REQUEST, BANKS_GET_SUCCESS, BANKS_GET_ERROR } from '../actions';

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

// eslint-disable-next-line import/prefer-default-export
export const getBanks = () => (dispatch) => {
  dispatch(getBanksRequested());
  getBanksRequest()
    .then((data) => dispatch(getBanksSuccess(data)))
    .catch((err) => dispatch(getBanksError(err)));
};
