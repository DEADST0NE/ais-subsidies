import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRoles, deleteRoles, postRoles, putRoles } from '../../../store/role/actions';

import RoleForm from '../../forms/RoleForm';
import Сonfirmation from '../../generic/Сonfirmation';
import ModalWindow from '../../generic/ModalWindow';
import SearchTable from '../../generic/SearchTable';
import RoleTable from '../../tables/RoleTable';
import Icon from '../../generic/Icon';

import './Role.scss';

const Role = () => {
  const dispatch = useDispatch();

  const [roleId, setRoleId] = useState(''); // id Банка
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPut, setShowWindowFormPut] = useState(false); // Изменение данных банка
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления банка
  const [roleDataVal, setRoleDataVal] = useState(''); // Ткущие данные для изменения
  const { roles, loading, error, postLoading, putLoading, deleteLoading } = useSelector(
    ({ role }) => role
  );
  const [searchArray, setSearchArray] = useState([]);
  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch, searchArray]);

  return (
    <div className="role">
      <div className="сontrol-table-grup">
        <SearchTable array={roles} setMass={setSearchArray} />
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
      <RoleTable
        array={searchArray.length ? searchArray : roles}
        loading={loading}
        error={error}
        setMass={setSearchArray}
        setRoleId={setRoleId}
        setRoleDataVal={setRoleDataVal}
        setShowWindowFormPut={setShowWindowFormPut}
        setShowConfirmation={setShowConfirmation}
      />
      {/* Модальное окно формы изменеиния данных о банке */}
      <ModalWindow
        title="Изменение данных банка"
        show={showWindowFormPut}
        onClosed={setShowWindowFormPut}
      >
        <RoleForm
          onClosed={setShowWindowFormPut}
          jobPositionId={roleId}
          onSuccess={postRoles}
          loading={putLoading}
          defautValueForm={roleDataVal}
        />
      </ModalWindow>

      {/* Модальное окно формы добавления банка */}
      <ModalWindow
        title="Добавление нового банка"
        show={showWindowFormPost}
        onClosed={setShowWindowFormPost}
      >
        <RoleForm onClosed={setShowWindowFormPost} loading={postLoading} onSuccess={putRoles} />
      </ModalWindow>

      {/* Модальное окно подтверждения удаления банка */}
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        loading={deleteLoading}
        onSuccess={() => dispatch(deleteRoles(roleId, setShowConfirmation))}
      />
    </div>
  );
};

export default Role;
