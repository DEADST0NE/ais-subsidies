import {
  BANKS_GET_REQUEST,
  BANKS_GET_SUCCESS,
  BANKS_GET_ERROR,
  BANK_DELETE_REQUEST,
  BANK_DELETE_SUCCESS,
  BANK_DELETE_ERROR,
  BANK_POST_REQUEST,
  BANK_POST_SUCCESS,
  BANK_POST_ERROR,
  BANK_PUT_REQUEST,
  BANK_PUT_SUCCESS,
  BANK_PUT_ERROR,
} from '../actions';

const INIT_STATE = {
  banks: [],
  loading: true,
  error: null,
  deleteLoading: false,
  postLoading: false,
  putLoading: false,
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

    case BANK_DELETE_REQUEST:
      return {
        ...state,
        loadingDelete: true,
      };

    case BANK_DELETE_ERROR:
      return {
        ...state,
        loadingDelete: false,
      };

    case BANK_DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        banks: state.banks.filter((item) => item.id !== action.payload),
      };

    case BANK_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case BANK_POST_ERROR:
      return {
        ...state,
        postLoading: false,
      };

    case BANK_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        banks: state.banks.push(action.payload),
      };

    case BANK_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
      };

    case BANK_PUT_ERROR:
      return {
        ...state,
        putLoading: false,
      };

    case BANK_PUT_SUCCESS:
      return {
        ...state,
        putLoading: false,
        banks: state.banks.map((item) => {
          if (item.id !== action.payload.id) return item;
          return action.payload;
        }),
      };

    default:
      return state;
  }
};
