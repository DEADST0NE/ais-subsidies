import {
  ADDRESSES_CITY_GET_REQUEST,
  ADDRESSES_CITY_GET_SUCCESS,
  ADDRESSES_CITY_GET_ERROR,
} from '../../actions';

const INIT_STATE = {
  city: [],
  loading: true,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADDRESSES_CITY_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADDRESSES_CITY_GET_SUCCESS:
      return {
        ...state,
        city: action.payload,
        loading: false,
      };

    case ADDRESSES_CITY_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
