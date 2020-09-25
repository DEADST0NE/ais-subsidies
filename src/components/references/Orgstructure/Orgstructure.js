import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getOrgstructures,
  deleteOrgstructures,
  postOrgstructures,
  putOrgstructures,
} from '../../../store/orgstructure/actions';

import Сonfirmation from '../../generic/Сonfirmation';
import OrgstructureForm from '../../forms/OrgstructureForm';
import ModalWindow from '../../generic/ModalWindow';
import SearchTable from '../../generic/SearchTable';
import OrgstructureTable from '../../tables/OrgstructureTable';
import Icon from '../../generic/Icon';

import './Orgstructure.scss';

const Orgstructure = () => {
  const [searchArray, setSearchArray] = useState([]);
  const { orgstructures, loading, error, deleteLoading, postLoading, putLoading } = useSelector(
    ({ orgstructure }) => orgstructure
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrgstructures());
  }, [dispatch, searchArray]);

  const [id, setId] = useState(''); // id Банка
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPut, setShowWindowFormPut] = useState(false); // Изменение данных банка
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления банка
  const [defautValueForm, setDefautValueForm] = useState('');
  return (
    <div className="orgstructure">
      <div className="сontrol-table-grup">
        <SearchTable array={orgstructures} setMass={setSearchArray} />
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
      <OrgstructureTable
        array={searchArray.length ? searchArray : orgstructures}
        loading={loading}
        error={error}
        setMass={setSearchArray}
        setId={setId}
        setShowConfirmation={setShowConfirmation}
        setShowWindowFormPut={setShowWindowFormPut}
        setDefautValueForm={setDefautValueForm}
      />

      {/* Модальное окно формы изменеиния данных о банке */}
      <ModalWindow
        title="Изменение данных банка"
        show={showWindowFormPut}
        onClosed={setShowWindowFormPut}
      >
        <OrgstructureForm
          onClosed={setShowWindowFormPut}
          id={id}
          onSuccess={putOrgstructures}
          loading={putLoading}
          defautValueForm={defautValueForm}
          orgstructuresArray={orgstructures}
        />
      </ModalWindow>

      {/* Модальное окно формы добавления банка */}
      <ModalWindow
        title="Добавление нового банка"
        show={showWindowFormPost}
        onClosed={setShowWindowFormPost}
      >
        <OrgstructureForm
          onClosed={setShowWindowFormPost}
          loading={postLoading}
          onSuccess={postOrgstructures}
          orgstructuresArray={orgstructures}
        />
      </ModalWindow>

      {/* Модальное окно подтверждения удаления банка */}
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        loading={deleteLoading}
        onSuccess={() => dispatch(deleteOrgstructures(id, setShowConfirmation))}
      />
    </div>
  );
};

export default Orgstructure;
