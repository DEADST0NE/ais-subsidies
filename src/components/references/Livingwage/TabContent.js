import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SearchTable from '../../generic/SearchTable';
import {
  getLivingwages,
  deleteLivingwage,
  postLivingwage,
} from '../../../store/livingwage/actions';
import LivingwageForm from '../../forms/LivingwageForm';
import LivingwageTable from '../../tables/LivingwageTable';
import Icon from '../../generic/Icon';
import ModalWindow from '../../generic/ModalWindow';
import Сonfirmation from '../../generic/Сonfirmation';

import './Livingwage.scss';

const TabContent = ({ socialgroupId }) => {
  const [id, setId] = useState(''); // id
  const [searchArray, setSearchArray] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // Подтверждение удаления
  const [showWindowFormPost, setShowWindowFormPost] = useState(false); // Добавления банка
  const { livingwages, loading, error, deleteLoading, postLoading } = useSelector(
    ({ livingwages }) => livingwages
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLivingwages(socialgroupId));
  }, [dispatch, socialgroupId, searchArray]);
  return (
    <div className="livingwage-tab-content">
      <div className="сontrol-table-grup">
        <SearchTable array={livingwages} setMass={setSearchArray} />
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
      <LivingwageTable
        array={searchArray.length ? searchArray : livingwages}
        loading={loading}
        error={error}
        setId={setId}
        setMass={setSearchArray}
        setShowConfirmation={setShowConfirmation}
        setShowWindowFormPost={setShowWindowFormPost}
      />
      <ModalWindow
        title="Добавления прожиточного мимума"
        show={showWindowFormPost}
        onClosed={setShowWindowFormPost}
      >
        <LivingwageForm
          onClosed={setShowWindowFormPost}
          socialGroupId={socialgroupId}
          onSuccess={postLivingwage}
          loading={postLoading}
        />
      </ModalWindow>
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        loading={deleteLoading}
        onSuccess={() => dispatch(deleteLivingwage(id, setShowConfirmation, socialgroupId))}
      />
    </div>
  );
};

TabContent.defaultProps = {
  socialgroupId: '',
};

TabContent.propTypes = {
  socialgroupId: PropTypes.string,
};

export default TabContent;
