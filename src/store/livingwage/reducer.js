import {
  LIVINGWAGES_GET_REQUEST,
  LIVINGWAGES_GET_SUCCESS,
  LIVINGWAGES_GET_ERROR,
} from '../actions';

const INIT_STATE = {
  livingwages: [],
  loading: true,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIVINGWAGES_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LIVINGWAGES_GET_SUCCESS:
      return {
        ...state,
        livingwages: action.payload,
        loading: false,
      };

    case LIVINGWAGES_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
