import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getRelations,
  deleteRelations,
  postRelations,
  putRelations,
} from '../../../store/relation/actions';

import Сonfirmation from '../../generic/Сonfirmation';
import RelationsFrom from '../../forms/RelationsFrom';
import ModalWindow from '../../generic/ModalWindow';
import SearchTable from '../../generic/SearchTable';
import RelationsTable from '../../tables/RelationsTable';
import Icon from '../../generic/Icon';

import './Relations.scss';

const Relations = () => {
  const [searchArray, setSearchArray] = useState([]);
  const { relations, loading, error, deleteLoading, postLoading, putLoading } = useSelector(
    ({ relation }) => relation
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRelations());
  }, [dispatch, searchArray]);

  const [id, setId] = useState(''); // id Банка
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPut, setShowWindowFormPut] = useState(false); // Изменение данных банка
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления банка
  const [defautValueForm, setDefautValueForm] = useState('');
  return (
    <div className="relations">
      <div className="сontrol-table-grup">
        <SearchTable array={relations} setMass={setSearchArray} />
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
      <RelationsTable
        array={searchArray.length ? searchArray : relations}
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
        <RelationsFrom
          onClosed={setShowWindowFormPut}
          orgstructureId={id}
          onSuccess={putRelations}
          loading={putLoading}
          defautValueForm={defautValueForm}
          relationsArray={relations}
        />
      </ModalWindow>

      {/* Модальное окно формы добавления банка */}
      <ModalWindow
        title="Добавление нового банка"
        show={showWindowFormPost}
        onClosed={setShowWindowFormPost}
      >
        <RelationsFrom
          onClosed={setShowWindowFormPost}
          loading={postLoading}
          onSuccess={postRelations}
          relationsArray={relations}
        />
      </ModalWindow>

      {/* Модальное окно подтверждения удаления банка */}
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        loading={deleteLoading}
        onSuccess={() => dispatch(deleteRelations(id, setShowConfirmation))}
      />
    </div>
  );
};

export default Relations;
