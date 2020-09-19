import { EMPLOYESS_GET_REQUEST, EMPLOYESS_GET_SUCCESS, EMPLOYESS_GET_ERROR } from '../actions';

const INIT_STATE = {
  employees: [],
  loading: true,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EMPLOYESS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EMPLOYESS_GET_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };

    case EMPLOYESS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
