import axios from '../../services/apiService';

import {
  SOCIALGROUPS_GET_REQUEST,
  SOCIALGROUPS_GET_SUCCESS,
  SOCIALGROUPS_GET_ERROR,
} from '../actions';

const getSocialgroupsRequested = () => ({
  type: SOCIALGROUPS_GET_REQUEST,
});

const getSocialgroupsSuccess = (item) => ({
  type: SOCIALGROUPS_GET_SUCCESS,
  payload: item,
});

const getSocialgroupsError = (error) => ({
  type: SOCIALGROUPS_GET_ERROR,
  payload: error,
});

const getSocialgroupsRequest = async () => {
  return axios.get('Directory/socialgroups').then((response) => response.data);
};

// eslint-disable-next-line import/prefer-default-export
export const getSocialgroups = () => (dispatch) => {
  dispatch(getSocialgroupsRequested());
  getSocialgroupsRequest()
    .then((data) => dispatch(getSocialgroupsSuccess(data)))
    .catch((err) => dispatch(getSocialgroupsError(err)));
};
