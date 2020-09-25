import {
  ADDRESSES_AREAS_GET_REQUEST,
  ADDRESSES_AREAS_GET_SUCCESS,
  ADDRESSES_AREAS_GET_ERROR,
} from '../../actions';

const INIT_STATE = {
  areas: [],
  loading: true,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADDRESSES_AREAS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADDRESSES_AREAS_GET_SUCCESS:
      return {
        ...state,
        areas: action.payload,
        loading: false,
      };

    case ADDRESSES_AREAS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
