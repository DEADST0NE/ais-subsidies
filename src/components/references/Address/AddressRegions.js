import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import getAddressesRegions from '../../../store/addresses/regions/actions';
import SearchTable from '../../generic/SearchTable';
import AddressRegionsTable from '../../tables/AddressRegionsTable';

const AddressRegions = ({ setSelectedArray, selectedArray }) => {
  const [searchArray, setSearchArray] = useState([]);
  const { regions, loading, error } = useSelector(({ addressesRegions }) => addressesRegions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddressesRegions());
    setSelectedArray([]);
  }, [dispatch, searchArray]);
  return (
    <div className="address">
      <div className="сontrol-table-grup">
        <SearchTable array={regions} setMass={setSearchArray} />
      </div>
      <AddressRegionsTable
        array={searchArray.length ? searchArray : regions}
        loading={loading}
        error={error}
        selectedArray={selectedArray}
        setSelectedArray={setSelectedArray}
      />
    </div>
  );
};

AddressRegions.defaultProps = {
  setSelectedArray: () => {},
  selectedArray: [],
};

AddressRegions.propTypes = {
  setSelectedArray: PropTypes.func,
  selectedArray: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
};

export default AddressRegions;
