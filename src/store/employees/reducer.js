import {
  EMPLOYES_GET_REQUEST,
  EMPLOYES_GET_SUCCESS,
  EMPLOYES_GET_ERROR,
  EMPLOYE_DELETE_REQUEST,
  EMPLOYE_DELETE_SUCCESS,
  EMPLOYE_DELETE_ERROR,
  EMPLOYE_POST_REQUEST,
  EMPLOYE_POST_SUCCESS,
  EMPLOYE_POST_ERROR,
  EMPLOYE_PUT_REQUEST,
  EMPLOYE_PUT_SUCCESS,
  EMPLOYE_PUT_ERROR,
} from '../actions';

const INIT_STATE = {
  employees: [],
  loading: true,
  error: null,
  deleteLoading: false,
  postLoading: false,
  putLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EMPLOYES_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EMPLOYES_GET_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };

    case EMPLOYES_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EMPLOYE_DELETE_REQUEST:
      return {
        ...state,
        loadingDelete: true,
      };

    case EMPLOYE_DELETE_ERROR:
      return {
        ...state,
        loadingDelete: false,
      };

    case EMPLOYE_DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        employees: state.employees.filter((item) => item.id !== action.payload),
      };

    case EMPLOYE_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case EMPLOYE_POST_ERROR:
      return {
        ...state,
        postLoading: false,
      };

    case EMPLOYE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
      };

    case EMPLOYE_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
      };

    case EMPLOYE_PUT_ERROR:
      return {
        ...state,
        putLoading: false,
      };

    case EMPLOYE_PUT_SUCCESS:
      return {
        ...state,
        putLoading: false,
      };

    default:
      return state;
  }
};
