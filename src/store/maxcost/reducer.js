import {
  MAXCOSTS_GET_REQUEST,
  MAXCOSTS_GET_SUCCESS,
  MAXCOSTS_GET_ERROR,
  MAXCOST_DELETE_REQUEST,
  MAXCOST_DELETE_SUCCESS,
  MAXCOST_DELETE_ERROR,
  MAXCOST_POST_REQUEST,
  MAXCOST_POST_SUCCESS,
  MAXCOST_POST_ERROR,
  MAXCOST_PUT_REQUEST,
  MAXCOST_PUT_SUCCESS,
  MAXCOST_PUT_ERROR,
} from '../actions';

const INIT_STATE = {
  maxcosts: [],
  loading: true,
  error: null,
  deleteLoading: false,
  postLoading: false,
  putLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MAXCOSTS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case MAXCOSTS_GET_SUCCESS:
      return {
        ...state,
        maxcosts: action.payload,
        loading: false,
      };

    case MAXCOSTS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case MAXCOST_DELETE_REQUEST:
      return {
        ...state,
        loadingDelete: true,
      };

    case MAXCOST_DELETE_ERROR:
      return {
        ...state,
        loadingDelete: false,
      };

    case MAXCOST_DELETE_SUCCESS:
      return {
        ...state,
        maxcosts: state.maxcosts.filter((item) => item.id !== action.payload),
        loadingDelete: false,
      };

    case MAXCOST_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case MAXCOST_POST_ERROR:
      return {
        ...state,
        postLoading: false,
      };

    case MAXCOST_POST_SUCCESS:
      return {
        ...state,
        maxcosts: [...state.maxcosts, action.payload],
        postLoading: false,
      };

    case MAXCOST_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
      };

    case MAXCOST_PUT_ERROR:
      return {
        ...state,
        putLoading: false,
      };

    case MAXCOST_PUT_SUCCESS:
      return {
        ...state,
        putLoading: false,
        maxcosts: state.maxcosts.map((item) => {
          if (item.id !== action.payload.id) return item;
          return action.payload;
        }),
      };

    default:
      return state;
  }
};
