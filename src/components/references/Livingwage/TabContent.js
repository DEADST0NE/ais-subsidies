import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SearchTable from '../../generic/SearchTable';
import { getLivingwages } from '../../../store/livingwage/actions';
import LivingwageTable from '../../tables/LivingwageTable';
import Icon from '../../generic/Icon';

import './Livingwage.scss';

const TabContent = ({ id }) => {
  const [searchArray, setSearchArray] = useState([]);
  const { livingwages, loading, error } = useSelector(({ livingwages }) => livingwages);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLivingwages(id));
  }, [dispatch, id, searchArray]);
  return (
    <div className="livingwage-tab-content">
      <div className="сontrol-table-grup">
        <SearchTable array={livingwages} setMass={setSearchArray} />
        <button type="button" className="btn btn-primary">
          <Icon name="addNewInfo" />
        </button>
      </div>
      <LivingwageTable
        array={searchArray.length ? searchArray : livingwages}
        loading={loading}
        error={error}
        setMass={setSearchArray}
      />
    </div>
  );
};

TabContent.defaultProps = {
  id: '',
};

TabContent.propTypes = {
  id: PropTypes.string,
};

export default TabContent;
