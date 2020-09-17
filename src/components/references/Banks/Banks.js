import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBanks } from '../../../store/banks/actions';

import BanksTable from '../../tables/Banks_Table';

import './Banks.scss';

const ConteinerBanks = () => {
  const dispatch = useDispatch();

  const { banks, loading, error } = useSelector(({ banks }) => banks);

  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch]);

  return (
    <div className="banks">
      <div className="searchBanks">
        <input type="text" placeholder="Поиск..." />
      </div>
      <BanksTable array={banks} loading={loading} error={error} />
    </div>
  );
};

export default ConteinerBanks;
