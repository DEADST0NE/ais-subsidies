import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBanks } from '../../../store/banks/actions';

import SearchTable from '../../generic/SearchTable';
import BanksTable from '../../tables/Banks_Table';

import './Banks.scss';

const ConteinerBanks = () => {
  const dispatch = useDispatch();

  const { banks, loading, error } = useSelector(({ banks }) => banks);
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch, searchArray]);

  console.log('banks', searchArray);
  return (
    <div className="banks">
      <SearchTable array={banks} setMass={setSearchArray} />
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
