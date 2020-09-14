import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { setAuthData, resetAuthData } from '../../services/authService';

import {
  SET_USER_DATA,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../actions';

const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

const loginUserRequested = () => ({
  type: LOGIN_USER_REQUEST,
});

const loginUserSuccess = (item) => ({
  type: LOGIN_USER_SUCCESS,
  payload: item,
});

const loginUserError = (error) => ({
  type: LOGIN_USER_ERROR,
  payload: error,
});

const logoutUser = (history) => {
  resetAuthData();
  history.push('/');

  return {
    type: LOGOUT_USER,
  };
};

const loginUserRequest = async ({ login, password }) => {
  const formData = new FormData();
  formData.set('login', login);
  formData.set('password', password);

  return axios.post(`${API_URL}connect/token`, formData).then((response) => response.data);
};

const loginUser = (values) => (dispatch) => {
  dispatch(loginUserRequested());
  return loginUserRequest(values)
    .then((data) => {
      setAuthData(data);
      return dispatch(loginUserSuccess(data.token));
    })
    .catch((err) => dispatch(loginUserError(err)));
};

export { setUserData, loginUser, logoutUser };
