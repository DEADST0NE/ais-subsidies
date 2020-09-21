import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBanks, deleteBanks, postBanks, putBanks } from '../../../store/banks/actions';

import Сonfirmation from '../../generic/Сonfirmation';
import BankForm from '../../forms/BankForm';
import ModalWindow from '../../generic/ModalWindow';
import SearchTable from '../../generic/SearchTable';
import BanksTable from '../../tables/BanksTable';
import Icon from '../../generic/Icon';

import './Banks.scss';

const ConteinerBanks = () => {
  const [searchArray, setSearchArray] = useState([]);
  const { banks, loading, error, deleteLoading, postLoading, putLoading } = useSelector(
    ({ banks }) => banks
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch, searchArray]);

  const [banksId, setBanksId] = useState(''); // id Банка
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPut, setShowWindowFormPut] = useState(false); // Изменение данных банка
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления банка
  const [banksDataVal, setBanksDataVal] = useState('');

  return (
    <div className="banks">
      <div className="сontrol-table-grup">
        <SearchTable array={banks} setMass={setSearchArray} />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowWindowFormPost(true);
          }}
        >
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
        setBanksDataVal={setBanksDataVal}
      />

      {/* Модальное окно формы изменеиния данных о банке */}
      <ModalWindow
        title="Изменение данных банка"
        show={showWindowFormPut}
        onClosed={setShowWindowFormPut}
      >
        <BankForm
          onClosed={setShowWindowFormPut}
          banksId={banksId}
          onSuccess={putBanks}
          loading={putLoading}
          defautValueForm={banksDataVal}
        />
      </ModalWindow>

      {/* Модальное окно формы добавления банка */}
      <ModalWindow
        title="Добавление нового банка"
        show={showWindowFormPost}
        onClosed={setShowWindowFormPost}
      >
        <BankForm onClosed={setShowWindowFormPost} loading={postLoading} onSuccess={postBanks} />
      </ModalWindow>

      {/* Модальное окно подтверждения удаления банка */}
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        loading={deleteLoading}
        onSuccess={() => dispatch(deleteBanks(banksId, setShowConfirmation))}
      />
    </div>
  );
};

export default ConteinerBanks;
