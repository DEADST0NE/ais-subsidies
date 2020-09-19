import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBanks } from '../../../store/banks/actions';

import SearchTable from '../../generic/SearchTable';
import BanksTable from '../../tables/BanksTable';
import Icon from '../../generic/Icon';

import './Banks.scss';

const ConteinerBanks = () => {
  const dispatch = useDispatch();

  const { banks, loading, error } = useSelector(({ banks }) => banks);
  const [searchArray, setSearchArray] = useState([]);
  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch, searchArray]);

  return (
    <div className="banks">
      <div className="сontrol-table-grup">
        <SearchTable array={banks} setMass={setSearchArray} />
        <button type="button" className="btn btn-primary">
          <Icon name="addNewInfo" />
        </button>
      </div>
      <BanksTable
        array={searchArray.length ? searchArray : banks}
        loading={loading}
        error={error}
        setMass={setSearchArray}
      />
    </div>
  );
};

export default ConteinerBanks;
