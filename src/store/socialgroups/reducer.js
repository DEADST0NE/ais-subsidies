import {
  SOCIALGROUPS_GET_REQUEST,
  SOCIALGROUPS_GET_SUCCESS,
  SOCIALGROUPS_GET_ERROR,
} from '../actions';

const INIT_STATE = {
  socialgroups: [],
  loading: true,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SOCIALGROUPS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SOCIALGROUPS_GET_SUCCESS:
      return {
        ...state,
        socialgroups: action.payload,
        loading: false,
      };

    case SOCIALGROUPS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
