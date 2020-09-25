import axios from '../../../services/apiService';

import {
  ADDRESSES_REGIONS_GET_REQUEST,
  ADDRESSES_REGIONS_GET_SUCCESS,
  ADDRESSES_REGIONS_GET_ERROR,
} from '../../actions';

/* Все относится к запросу списка банков  */
const getAddressesRegionsRequested = () => ({
  type: ADDRESSES_REGIONS_GET_REQUEST,
});

const getAddressesRegionsSuccess = (item) => ({
  type: ADDRESSES_REGIONS_GET_SUCCESS,
  payload: item,
});

const getAddressesRegionsError = (error) => ({
  type: ADDRESSES_REGIONS_GET_ERROR,
  payload: error,
});

const getAddressesRegionsRequest = async () => {
  return axios.get('Directory/addresses/regions').then((response) => response.data);
};

const getAddressesRegions = () => (dispatch) => {
  dispatch(getAddressesRegionsRequested());
  getAddressesRegionsRequest()
    .then((data) => dispatch(getAddressesRegionsSuccess(data)))
    .catch((err) => dispatch(getAddressesRegionsError(err)));
};

export default getAddressesRegions;
/* --------------------------------------- */
