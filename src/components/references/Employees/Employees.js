import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getEmployees } from '../../../store/employees/actions';

import SearchTable from '../../generic/SearchTable';
import EmployessTable from '../../tables/EmployessTable';
import Icon from '../../generic/Icon';

import './Employees.scss';

const ConteinerEmployees = () => {
  const dispatch = useDispatch();

  const { employees, loading, error } = useSelector(({ employees }) => employees);
  const [searchArray, setSearchArray] = useState([]);
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch, searchArray]);

  return (
    <div className="employess">
      <div className="сontrol-table-grup">
        <SearchTable array={employees} setMass={setSearchArray} />
        <button type="button" className="btn btn-primary">
          <Icon name="addNewInfo" />
        </button>
      </div>
      <EmployessTable
        array={searchArray.length ? searchArray : employees}
        loading={loading}
        error={error}
        setMass={setSearchArray}
      />
    </div>
  );
};

export default ConteinerEmployees;
