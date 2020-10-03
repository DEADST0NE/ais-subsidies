import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import getAddressesAreas from '../../../store/addresses/city/actions';
import SearchTable from '../../generic/SearchTable';
import AddressCityTable from '../../tables/AddressCityTable';

const AddressCity = withRouter(({ setSelectedArray, selectedArray, match }) => {
  const [searchArray, setSearchArray] = useState([]);
  const { city, loading, error } = useSelector(({ addressesCity }) => addressesCity);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddressesAreas(match.params.areasId));
  }, [dispatch]);

  return (
    <div className="address">
      <div className="сontrol-table-grup">
        <SearchTable array={city} setMass={setSearchArray} />
      </div>
      <AddressCityTable
        array={searchArray}
        loading={loading}
        error={error}
        selectedArray={selectedArray}
        setSelectedArray={setSelectedArray}
      />
    </div>
  );
});

AddressCity.defaultProps = {
  selectedArray: [],
  setSelectedArray: () => {},
  match: {},
};

AddressCity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }),
  setSelectedArray: PropTypes.func,
  selectedArray: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
};

export default AddressCity;
