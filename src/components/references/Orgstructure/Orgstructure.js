import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getOrgstructures,
  deleteOrgstructure,
  postOrgstructure,
  putOrgstructure,
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
  }, [dispatch]);

  const [id, setId] = useState(''); // id
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPut, setShowWindowFormPut] = useState(false); // Изменение данных
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления
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
        array={searchArray}
        loading={loading}
        error={error}
        setMass={setSearchArray}
        setId={setId}
        setShowConfirmation={setShowConfirmation}
        setShowWindowFormPut={setShowWindowFormPut}
        setDefautValueForm={setDefautValueForm}
      />

      {/* Модальное окно формы изменеиния */}
      <ModalWindow
        title="Изменение данных организационой структуры"
        show={showWindowFormPut}
        onClosed={setShowWindowFormPut}
      >
        <OrgstructureForm
          onClosed={setShowWindowFormPut}
          onSuccess={putOrgstructure}
          loading={putLoading}
          defautValueForm={defautValueForm}
          orgstructuresArray={orgstructures}
        />
      </ModalWindow>

      {/* Модальное окно формы добавления */}
      <ModalWindow
        title="Добавление новой организационой структуры"
        show={showWindowFormPost}
        onClosed={setShowWindowFormPost}
      >
        <OrgstructureForm
          onClosed={setShowWindowFormPost}
          loading={postLoading}
          onSuccess={postOrgstructure}
          orgstructuresArray={orgstructures}
        />
      </ModalWindow>

      {/* Модальное окно подтверждения удаления */}
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        loading={deleteLoading}
        onSuccess={() => dispatch(deleteOrgstructure(id, setShowConfirmation))}
      />
    </div>
  );
};

export default Orgstructure;
