import { BANKS_GET_REQUEST, BANKS_GET_SUCCESS, BANKS_GET_ERROR } from '../actions';

const INIT_STATE = {
  banks: [],
  loading: true,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case BANKS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case BANKS_GET_SUCCESS:
      return {
        ...state,
        banks: action.payload,
        loading: false,
      };

    case BANKS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
