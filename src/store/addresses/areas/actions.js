import axios from '../../../services/apiService';

import {
  ADDRESSES_AREAS_GET_REQUEST,
  ADDRESSES_AREAS_GET_SUCCESS,
  ADDRESSES_AREAS_GET_ERROR,
} from '../../actions';

/* Все относится к запросу списка регионов  */
const getAddressesAreasRequested = () => ({
  type: ADDRESSES_AREAS_GET_REQUEST,
});

const getAddressesAreasSuccess = (item) => ({
  type: ADDRESSES_AREAS_GET_SUCCESS,
  payload: item,
});

const getAddressesAreasError = (error) => ({
  type: ADDRESSES_AREAS_GET_ERROR,
  payload: error,
});

const getAddressesAreasRequest = async (id) => {
  return axios.get(`Directory/addresses/childs/${id}`).then((response) => response.data);
};

const getAddressesAreas = (id) => (dispatch) => {
  dispatch(getAddressesAreasRequested());
  getAddressesAreasRequest(id)
    .then((data) => dispatch(getAddressesAreasSuccess(data)))
    .catch((err) => dispatch(getAddressesAreasError(err)));
};

export default getAddressesAreas;
/* --------------------------------------- */
