import {
  LIVINGWAGES_GET_REQUEST,
  LIVINGWAGES_GET_SUCCESS,
  LIVINGWAGES_GET_ERROR,
  LIVINGWAGE_DELETE_REQUEST,
  LIVINGWAGE_DELETE_SUCCESS,
  LIVINGWAGE_DELETE_ERROR,
  LIVINGWAGE_POST_REQUEST,
  LIVINGWAGE_POST_SUCCESS,
  LIVINGWAGE_POST_ERROR,
} from '../actions';

const INIT_STATE = {
  livingwages: [],
  loading: true,
  error: null,
  deleteLoading: false,
  postLoading: false,
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

    case LIVINGWAGE_DELETE_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };

    case LIVINGWAGE_DELETE_ERROR:
      return {
        ...state,
        deleteLoading: false,
      };

    case LIVINGWAGE_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
      };

    case LIVINGWAGE_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case LIVINGWAGE_POST_ERROR:
      return {
        ...state,
        postLoading: false,
      };

    case LIVINGWAGE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
      };

    default:
      return state;
  }
};
