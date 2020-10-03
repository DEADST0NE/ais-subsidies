import axios from '../../../services/apiService';

import {
  ADDRESSES_CITY_GET_REQUEST,
  ADDRESSES_CITY_GET_SUCCESS,
  ADDRESSES_CITY_GET_ERROR,
} from '../../actions';

/* Все относится к запросу списка регионов  */
const getAddressesCityRequested = () => ({
  type: ADDRESSES_CITY_GET_REQUEST,
});

const getAddressesCitySuccess = (item) => ({
  type: ADDRESSES_CITY_GET_SUCCESS,
  payload: item,
});

const getAddressesCityError = (error) => ({
  type: ADDRESSES_CITY_GET_ERROR,
  payload: error,
});

const getAddressesCityRequest = async (id) => {
  return axios.get(`Directory/addresses/childs/${id}`).then((response) => response.data);
};

const getAddressesCity = (id) => (dispatch) => {
  dispatch(getAddressesCityRequested());
  getAddressesCityRequest(id)
    .then((data) => dispatch(getAddressesCitySuccess(data)))
    .catch((err) => dispatch(getAddressesCityError(err)));
};

export default getAddressesCity;
/* --------------------------------------- */
