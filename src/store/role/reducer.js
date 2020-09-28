import {
  ROLES_GET_REQUEST,
  ROLES_GET_SUCCESS,
  ROLES_GET_ERROR,
  ROLE_DELETE_REQUEST,
  ROLE_DELETE_SUCCESS,
  ROLE_DELETE_ERROR,
  ROLE_POST_REQUEST,
  ROLE_POST_SUCCESS,
  ROLE_POST_ERROR,
  ROLE_PUT_REQUEST,
  ROLE_PUT_SUCCESS,
  ROLE_PUT_ERROR,
} from '../actions';

const INIT_STATE = {
  roles: [],
  loading: true,
  error: null,
  deleteLoading: false,
  postLoading: false,
  putLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ROLES_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ROLES_GET_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        loading: false,
      };

    case ROLES_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ROLE_DELETE_REQUEST:
      return {
        ...state,
        loadingDelete: true,
      };

    case ROLE_DELETE_ERROR:
      return {
        ...state,
        loadingDelete: false,
      };

    case ROLE_DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        // roles: state.role.filter((item) => item.id !== action.payload),
      };

    case ROLE_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case ROLE_POST_ERROR:
      return {
        ...state,
        postLoading: false,
      };

    case ROLE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        roles: [...state.roles, action.payload],
      };

    case ROLE_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
      };

    case ROLE_PUT_ERROR:
      return {
        ...state,
        putLoading: false,
      };

    case ROLE_PUT_SUCCESS:
      return {
        ...state,
        putLoading: false,
        roles: state.roles.map((item) => {
          if (String(item.id) !== action.payload.id) return item;
          return action.payload;
        }),
      };

    default:
      return state;
  }
};
