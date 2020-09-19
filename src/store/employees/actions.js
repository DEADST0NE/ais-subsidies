import axios from '../../services/apiService';

import { EMPLOYESS_GET_REQUEST, EMPLOYESS_GET_SUCCESS, EMPLOYESS_GET_ERROR } from '../actions';

const getEmployeesRequested = () => ({
  type: EMPLOYESS_GET_REQUEST,
});

const getEmployeesSuccess = (item) => ({
  type: EMPLOYESS_GET_SUCCESS,
  payload: item,
});

const getEmployeesError = (error) => ({
  type: EMPLOYESS_GET_ERROR,
  payload: error,
});

const getEmployeesRequest = async () => {
  return axios.get('Directory/Employees').then((response) => response.data);
};

// eslint-disable-next-line import/prefer-default-export
export const getEmployees = () => (dispatch) => {
  dispatch(getEmployeesRequested());
  getEmployeesRequest()
    .then((data) => dispatch(getEmployeesSuccess(data)))
    .catch((err) => dispatch(getEmployeesError(err)));
};
