import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getEmployees,
  deleteEmployee,
  postEmployee,
  putEmployee,
} from '../../../store/employees/actions';

import ModalWindow from '../../generic/ModalWindow';
import Сonfirmation from '../../generic/Сonfirmation';
import SearchTable from '../../generic/SearchTable';
import EmployessTable from '../../tables/EmployessTable';
import Icon from '../../generic/Icon';
import EmployeeForm from '../../forms/EmployeeForm';

import './Employees.scss';

const ConteinerEmployees = () => {
  const dispatch = useDispatch();

  const { employees, loading, error, deleteLoading, postLoading, putLoading } = useSelector(
    ({ employees }) => employees
  );
  const [searchArray, setSearchArray] = useState([]);
  const [id, setId] = useState(''); // id
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPut, setShowWindowFormPut] = useState(false); // Изменение данных
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления
  const [defautValueForm, setDefautValueForm] = useState('');
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <div className="employess">
      <div className="сontrol-table-grup">
        <SearchTable array={employees} setMass={setSearchArray} />
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
      <EmployessTable
        lastArray={employees}
        array={searchArray}
        loading={loading}
        error={error}
        setMass={setSearchArray}
        setId={setId}
        setShowConfirmation={setShowConfirmation}
        setShowWindowFormPut={setShowWindowFormPut}
        setDefautFormVal={setDefautValueForm}
      />

      {/* Модальное окно формы изменеиния данных сотрудника */}
      <ModalWindow
        title="Изменение данных сотрудника"
        show={showWindowFormPut}
        onClosed={setShowWindowFormPut}
      >
        <EmployeeForm
          onClosed={setShowWindowFormPut}
          id={id}
          onSuccess={putEmployee}
          loading={putLoading}
          defautValueForm={defautValueForm}
        />
      </ModalWindow>

      {/* Модальное окно формы добавления сотрудника */}
      <ModalWindow
        title="Добавление сотрудника"
        show={showWindowFormPost}
        onClosed={setShowWindowFormPost}
      >
        <EmployeeForm
          onClosed={setShowWindowFormPost}
          loading={postLoading}
          onSuccess={postEmployee}
        />
      </ModalWindow>

      {/* Модальное окно подтверждения удаления сотрудника */}
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        loading={deleteLoading}
        onSuccess={() => dispatch(deleteEmployee(id, setShowConfirmation))}
      />
    </div>
  );
};

export default ConteinerEmployees;
