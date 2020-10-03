import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import getAddressesRegions from '../../../store/addresses/regions/actions';
import SearchTable from '../../generic/SearchTable';
import AddressRegionsTable from '../../tables/AddressRegionsTable';

const AddressRegions = ({ setSelectedArray }) => {
  const [searchArray, setSearchArray] = useState([]);
  const { regions, loading, error } = useSelector(({ addressesRegions }) => addressesRegions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddressesRegions());
    setSelectedArray([]);
  }, [dispatch]);
  return (
    <div className="address">
      <div className="сontrol-table-grup">
        <SearchTable array={regions} setMass={setSearchArray} />
      </div>
      <AddressRegionsTable
        array={searchArray.length ? searchArray : regions}
        loading={loading}
        error={error}
        setSelectedArray={setSelectedArray}
      />
    </div>
  );
};

AddressRegions.defaultProps = {
  setSelectedArray: () => {},
};

AddressRegions.propTypes = {
  setSelectedArray: PropTypes.func,
};

export default AddressRegions;
