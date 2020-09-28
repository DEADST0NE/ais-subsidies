import {
  ORGSTRUCTURES_GET_REQUEST,
  ORGSTRUCTURES_GET_SUCCESS,
  ORGSTRUCTURES_GET_ERROR,
  ORGSTRUCTURE_DELETE_REQUEST,
  ORGSTRUCTURE_DELETE_SUCCESS,
  ORGSTRUCTURE_DELETE_ERROR,
  ORGSTRUCTURE_POST_REQUEST,
  ORGSTRUCTURE_POST_SUCCESS,
  ORGSTRUCTURE_POST_ERROR,
  ORGSTRUCTURE_PUT_REQUEST,
  ORGSTRUCTURE_PUT_SUCCESS,
  ORGSTRUCTURE_PUT_ERROR,
} from '../actions';

const INIT_STATE = {
  orgstructures: [],
  loading: true,
  error: null,
  deleteLoading: false,
  postLoading: false,
  putLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ORGSTRUCTURES_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ORGSTRUCTURES_GET_SUCCESS:
      return {
        ...state,
        orgstructures: action.payload,
        loading: false,
      };

    case ORGSTRUCTURES_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ORGSTRUCTURE_DELETE_REQUEST:
      return {
        ...state,
        loadingDelete: true,
      };

    case ORGSTRUCTURE_DELETE_ERROR:
      return {
        ...state,
        loadingDelete: false,
      };

    case ORGSTRUCTURE_DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        orgstructures: state.orgstructures.filter((item) => item.id !== action.payload),
      };

    case ORGSTRUCTURE_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case ORGSTRUCTURE_POST_ERROR:
      return {
        ...state,
        postLoading: false,
      };

    case ORGSTRUCTURE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
      };

    case ORGSTRUCTURE_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
      };

    case ORGSTRUCTURE_PUT_ERROR:
      return {
        ...state,
        putLoading: false,
      };

    case ORGSTRUCTURE_PUT_SUCCESS:
      return {
        ...state,
        putLoading: false,
      };

    default:
      return state;
  }
};
