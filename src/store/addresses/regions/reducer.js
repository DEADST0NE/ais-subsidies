import {
  ADDRESSES_REGIONS_GET_REQUEST,
  ADDRESSES_REGIONS_GET_SUCCESS,
  ADDRESSES_REGIONS_GET_ERROR,
} from '../../actions';

const INIT_STATE = {
  regions: [],
  loading: true,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADDRESSES_REGIONS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADDRESSES_REGIONS_GET_SUCCESS:
      return {
        ...state,
        regions: action.payload,
        loading: false,
      };

    case ADDRESSES_REGIONS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
