import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBanks, deleteBanks } from '../../../store/banks/actions';

import Сonfirmation from '../../Сonfirmation';
import BankForm from '../../forms/BankForm';
import ModalWindow from '../../ModalWindow';
import SearchTable from '../../generic/SearchTable';
import BanksTable from '../../tables/BanksTable';
import Icon from '../../generic/Icon';

import './Banks.scss';

const ConteinerBanks = () => {
  const [searchArray, setSearchArray] = useState([]);
  const { banks, loading, error } = useSelector(({ banks }) => banks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch, searchArray]);

  const [banksId, setBanksId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWindowFormPut, setShowWindowFormPut] = useState(false);

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
        setBanksId={setBanksId}
        setShowConfirmation={setShowConfirmation}
        setShowWindowFormPut={setShowWindowFormPut}
      />
      <ModalWindow
        title="Изменение данных банка"
        show={showWindowFormPut}
        onClosed={setShowWindowFormPut}
        onSuccess={() => console.log(1)}
      >
        <BankForm />
      </ModalWindow>

      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        onSuccess={() => deleteBanks(banksId)}
      />
    </div>
  );
};

export default ConteinerBanks;
