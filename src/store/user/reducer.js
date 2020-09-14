import jwtDecode from 'jwt-decode';

import {
  SET_USER_DATA,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../actions';

const INIT_STATE = {
  userData: null,
  loading: false,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: jwtDecode(action.payload),
      };

    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userData: jwtDecode(action.payload),
        loading: false,
      };

    case LOGIN_USER_ERROR:
      return {
        ...state,
        userData: null,
        loading: false,
        error: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        userData: null,
      };

    default:
      return state;
  }
};
