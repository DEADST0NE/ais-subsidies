import axios from '../../services/apiService';

import {
  LIVINGWAGES_GET_REQUEST,
  LIVINGWAGES_GET_SUCCESS,
  LIVINGWAGES_GET_ERROR,
} from '../actions';

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
  return axios.get(`Directory/Livingwages/${id}`).then((response) => response.data);
};

// eslint-disable-next-line import/prefer-default-export
export const getLivingwages = (id) => (dispatch) => {
  dispatch(getLivingwagesRequested());
  getLivingwagesRequest(id)
    .then((data) => dispatch(getLivingwagesSuccess(data)))
    .catch((err) => dispatch(getLivingwagesError(err)));
};
