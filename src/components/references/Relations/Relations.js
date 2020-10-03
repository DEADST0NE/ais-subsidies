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
  }, [dispatch]);

  const [id, setId] = useState(''); // id
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPut, setShowWindowFormPut] = useState(false); // Изменение данных
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления
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
        array={searchArray}
        loading={loading}
        error={error}
        setMass={setSearchArray}
        setId={setId}
        setShowConfirmation={setShowConfirmation}
        setShowWindowFormPut={setShowWindowFormPut}
        setDefautValueForm={setDefautValueForm}
      />

      {/* Модальное окно формы изменеиния данных об отношения */}
      <ModalWindow
        title="Изменение данных отношения"
        show={showWindowFormPut}
        onClosed={setShowWindowFormPut}
      >
        <RelationsFrom
          onClosed={setShowWindowFormPut}
          onSuccess={putRelations}
          loading={putLoading}
          defautValueForm={defautValueForm}
          relationsArray={relations}
        />
      </ModalWindow>

      {/* Модальное окно формы добавления отношения */}
      <ModalWindow
        title="Добавление нового отношения"
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

      {/* Модальное окно подтверждения удаления отношения */}
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
