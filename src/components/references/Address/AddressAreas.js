import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import getAddressesAreas from '../../../store/addresses/areas/actions';
import SearchTable from '../../generic/SearchTable';
import AddressAreasOrCityTable from '../../tables/AddressAreasOrCityTable';

const AddressAreas = withRouter(({ setSelectedArray, selectedArray, match }) => {
  const [searchArray, setSearchArray] = useState([]);
  const { areas, loading, error } = useSelector(({ addressesAreas }) => addressesAreas);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddressesAreas(match.params.reginId));
    setSelectedArray([]);
  }, [dispatch, searchArray]);

  return (
    <div className="address">
      <div className="сontrol-table-grup">
        <SearchTable array={areas} setMass={setSearchArray} />
      </div>
      <AddressAreasOrCityTable
        array={searchArray.length ? searchArray : areas}
        loading={loading}
        error={error}
        selectedArray={selectedArray}
        setSelectedArray={setSelectedArray}
      />
    </div>
  );
});

AddressAreas.defaultProps = {
  selectedArray: [],
  setSelectedArray: () => {},
  match: {},
};

AddressAreas.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }),
  setSelectedArray: PropTypes.func,
  selectedArray: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
};

export default AddressAreas;
