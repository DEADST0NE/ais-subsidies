import { DOCUMENTS_GET_REQUEST, DOCUMENTS_GET_SUCCESS, DOCUMENTS_GET_ERROR } from '../actions';

const INIT_STATE = {
  documentsData: [],
  loading: true,
  error: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DOCUMENTS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DOCUMENTS_GET_SUCCESS:
      return {
        ...state,
        documentsData: action.payload,
        loading: false,
      };

    case DOCUMENTS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
