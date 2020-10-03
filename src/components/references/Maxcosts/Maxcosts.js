import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getMaxcosts,
  postMaxcosts,
  putMaxcosts,
  deleteMaxcosts,
} from '../../../store/maxcost/actions';

import MaxcostsForm from '../../forms/MaxcostsForm';
import Сonfirmation from '../../generic/Сonfirmation';
import ModalWindow from '../../generic/ModalWindow';
import SearchTable from '../../generic/SearchTable';
import MaxcostsTable from '../../tables/MaxcostsTable';
import Icon from '../../generic/Icon';

import './Maxcosts.scss';

const Maxcosts = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState(''); // id Банка
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPut, setShowWindowFormPut] = useState(false); // Изменение данных банка
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления банка
  const [defautValueForm, setDefautValueForm] = useState(''); // Ткущие данные для изменения
  const { maxcosts, loading, error, postLoading, putLoading, deleteLoading } = useSelector(
    ({ maxcost }) => maxcost
  );
  const [searchArray, setSearchArray] = useState([]);
  useEffect(() => {
    dispatch(getMaxcosts());
  }, [dispatch]);

  return (
    <div className="maxcosts">
      <div className="сontrol-table-grup">
        <SearchTable array={maxcosts} setMass={setSearchArray} />
        <button
          onClick={() => setShowWindowFormPost(true)}
          type="button"
          className="btn btn-primary"
        >
          <Icon name="addNewInfo" />
        </button>
      </div>
      <MaxcostsTable
        array={searchArray}
        loading={loading}
        error={error}
        setMass={setSearchArray}
        setId={setId}
        setDefautValueForm={setDefautValueForm}
        setShowWindowFormPut={setShowWindowFormPut}
        setShowConfirmation={setShowConfirmation}
      />
      {/* Модальное окно формы изменеиния данных о банке */}
      <ModalWindow
        title="Изменение данных банка"
        show={showWindowFormPut}
        onClosed={setShowWindowFormPut}
      >
        <MaxcostsForm
          onClosed={setShowWindowFormPut}
          onSuccess={putMaxcosts}
          loading={putLoading}
          defautValueForm={defautValueForm}
        />
      </ModalWindow>

      {/* Модальное окно формы добавления банка */}
      <ModalWindow
        title="Добавление нового банка"
        show={showWindowFormPost}
        onClosed={setShowWindowFormPost}
      >
        <MaxcostsForm
          onClosed={setShowWindowFormPost}
          loading={postLoading}
          onSuccess={postMaxcosts}
        />
      </ModalWindow>

      {/* Модальное окно подтверждения удаления банка */}
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        loading={deleteLoading}
        onSuccess={() => dispatch(deleteMaxcosts(id, setShowConfirmation))}
      />
    </div>
  );
};

export default Maxcosts;
