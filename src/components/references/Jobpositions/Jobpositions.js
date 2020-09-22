import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getJobpositions,
  postJobpositions,
  putJobpositions,
  deleteJobpositions,
} from '../../../store/jobpositions/actions';

import JobpositionsForm from '../../forms/JobpositionsForm';
import Сonfirmation from '../../generic/Сonfirmation';
import ModalWindow from '../../generic/ModalWindow';
import SearchTable from '../../generic/SearchTable';
import JobpositionsTable from '../../tables/JobpositionsTable';
import Icon from '../../generic/Icon';

import './Jobpositions.scss';

const Jobpositions = () => {
  const dispatch = useDispatch();

  const [jobPositionId, setJobPositionId] = useState(''); // id Банка
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPut, setShowWindowFormPut] = useState(false); // Изменение данных банка
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления банка
  const [jobPositionsDataVal, setJobPositionsDataVal] = useState(''); // Ткущие данные для изменения
  const { jobpositions, loading, error, postLoading, putLoading, deleteLoading } = useSelector(
    ({ jobpositions }) => jobpositions
  );
  const [searchArray, setSearchArray] = useState([]);
  useEffect(() => {
    dispatch(getJobpositions());
  }, [dispatch, searchArray]);

  return (
    <div className="jobpositions">
      <div className="сontrol-table-grup">
        <SearchTable array={jobpositions} setMass={setSearchArray} />
        <button
          onClick={() => {
            setShowWindowFormPost(true);
          }}
          type="button"
          className="btn btn-primary"
        >
          <Icon name="addNewInfo" />
        </button>
      </div>
      <JobpositionsTable
        array={searchArray.length ? searchArray : jobpositions}
        loading={loading}
        error={error}
        setMass={setSearchArray}
        setJobPositionId={setJobPositionId}
        setJobPositionsDataVal={setJobPositionsDataVal}
        setShowWindowFormPut={setShowWindowFormPut}
        setShowConfirmation={setShowConfirmation}
      />
      {/* Модальное окно формы изменеиния данных о банке */}
      <ModalWindow
        title="Изменение данных банка"
        show={showWindowFormPut}
        onClosed={setShowWindowFormPut}
      >
        <JobpositionsForm
          onClosed={setShowWindowFormPut}
          jobPositionId={jobPositionId}
          onSuccess={putJobpositions}
          loading={putLoading}
          defautValueForm={jobPositionsDataVal}
        />
      </ModalWindow>

      {/* Модальное окно формы добавления банка */}
      <ModalWindow
        title="Добавление нового банка"
        show={showWindowFormPost}
        onClosed={setShowWindowFormPost}
      >
        <JobpositionsForm
          onClosed={setShowWindowFormPost}
          loading={postLoading}
          onSuccess={postJobpositions}
        />
      </ModalWindow>

      {/* Модальное окно подтверждения удаления банка */}
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        loading={deleteLoading}
        onSuccess={() => dispatch(deleteJobpositions(jobPositionId, setShowConfirmation))}
      />
    </div>
  );
};

export default Jobpositions;
