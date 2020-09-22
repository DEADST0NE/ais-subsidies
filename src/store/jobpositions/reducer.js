import {
  JOBPOSITIONS_GET_REQUEST,
  JOBPOSITIONS_GET_SUCCESS,
  JOBPOSITIONS_GET_ERROR,
  JOBPOSITION_DELETE_REQUEST,
  JOBPOSITION_DELETE_SUCCESS,
  JOBPOSITION_DELETE_ERROR,
  JOBPOSITION_POST_REQUEST,
  JOBPOSITION_POST_SUCCESS,
  JOBPOSITION_POST_ERROR,
  JOBPOSITION_PUT_REQUEST,
  JOBPOSITION_PUT_SUCCESS,
  JOBPOSITION_PUT_ERROR,
} from '../actions';

const INIT_STATE = {
  jobpositions: [],
  loading: true,
  error: null,
  deleteLoading: false,
  postLoading: false,
  putLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case JOBPOSITIONS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case JOBPOSITIONS_GET_SUCCESS:
      return {
        ...state,
        jobpositions: action.payload,
        loading: false,
      };

    case JOBPOSITIONS_GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case JOBPOSITION_DELETE_REQUEST:
      return {
        ...state,
        loadingDelete: true,
      };

    case JOBPOSITION_DELETE_ERROR:
      return {
        ...state,
        loadingDelete: false,
      };

    case JOBPOSITION_DELETE_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        jobpositions: state.jobpositions.filter((item) => item.id !== action.payload),
      };

    case JOBPOSITION_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case JOBPOSITION_POST_ERROR:
      return {
        ...state,
        postLoading: false,
      };

    case JOBPOSITION_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        jobpositions: state.jobpositions.push(action.payload),
      };

    case JOBPOSITION_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
      };

    case JOBPOSITION_PUT_ERROR:
      return {
        ...state,
        putLoading: false,
      };

    case JOBPOSITION_PUT_SUCCESS:
      return {
        ...state,
        putLoading: false,
        jobpositions: state.jobpositions.map((item) => {
          if (item.id !== action.payload.id) return item;
          return action.payload;
        }),
      };

    default:
      return state;
  }
};
