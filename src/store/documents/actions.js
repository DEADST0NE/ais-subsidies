import axios from '../../services/apiService';

import { DOCUMENTS_GET_REQUEST, DOCUMENTS_GET_SUCCESS, DOCUMENTS_GET_ERROR } from '../actions';

const getDocumentsRequested = () => ({
  type: DOCUMENTS_GET_REQUEST,
});

const getDocumentsSuccess = (item) => ({
  type: DOCUMENTS_GET_SUCCESS,
  payload: item,
});

const getDocumentsError = (error) => ({
  type: DOCUMENTS_GET_ERROR,
  payload: error,
});

const getDocumentsRequest = async () => {
  return axios.get('documents').then((response) => response.data);
};

const getDocuments = () => (dispatch) => {
  dispatch(getDocumentsRequested());
  getDocumentsRequest()
    .then((data) => dispatch(getDocumentsSuccess(data)))
    .catch((err) => dispatch(getDocumentsError(err)));
};

export default getDocuments;
