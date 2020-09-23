import {
  RELATIONS_GET_REQUEST,
  RELATIONS_GET_SUCCESS,
  RELATIONS_GET_ERROR,
  RELATION_DELETE_REQUEST,
  RELATION_DELETE_SUCCESS,
  RELATION_DELETE_ERROR,
  RELATION_POST_REQUEST,
  RELATION_POST_SUCCESS,
  RELATION_POST_ERROR,
  RELATION_PUT_REQUEST,
  RELATION_PUT_SUCCESS,
  RELATION_PUT_ERROR,
} from '../actions';

const INIT_STATE = {
  relations: [],
  loading: true,
  error: null,
  deleteLoading: false,
  postLoading: false,
  putLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case RELATIONS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case RELATIONS_GET_SUCCESS:
      return {
        ...state,
        relations: action.payload,
        loading: false,
      };

    case RELATIONS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RELATION_DELETE_REQUEST:
      return {
        ...state,
        loadingDelete: true,
      };

    case RELATION_DELETE_ERROR:
      return {
        ...state,
        loadingDelete: false,
      };

    case RELATION_DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        relations: state.relations.filter((item) => item.id !== action.payload),
      };

    case RELATION_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case RELATION_POST_ERROR:
      return {
        ...state,
        postLoading: false,
      };

    case RELATION_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        relations: state.relations.push(action.payload),
      };

    case RELATION_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
      };

    case RELATION_PUT_ERROR:
      return {
        ...state,
        putLoading: false,
      };

    case RELATION_PUT_SUCCESS:
      return {
        ...state,
        putLoading: false,
        relations: state.relations.map((item) => {
          if (item.id !== action.payload.id) return item;
          return action.payload;
        }),
      };

    default:
      return state;
  }
};
