/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import Scrollbars from 'react-custom-scrollbars';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

import Icon from '../../generic/Icon';
import SortTable from '../../generic/SortTable';

import LoadingIndicator from '../../generic/LoadingIndicator';
import ErrorIndicator from '../../generic/ErrorIndicator';

import '../GlobalStyleTable.scss';

const EmployessTable = ({
  array,
  loading,
  error,
  setId,
  setShowConfirmation,
  setShowWindowFormPut,
  setDefautFormVal,
}) => {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!array.length) {
    return <Alert variant="warning">Нет данных</Alert>;
  }
  const [arrayTable, setArrayTable] = useState(array);
  const [sortName, setSortName] = useState(null);
  return (
    <div className="castom_table">
      <table className="table table-striped">
        <colgroup>
          <col style={{ width: '4%' }} />
          <col style={{ width: '35%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="text-center">№</th>
            <th>
              <div className="d-flex align-items-center">
                ФИО
                <SortTable
                  array={arrayTable}
                  setMass={setArrayTable}
                  nameSort={sortName}
                  name="name"
                  setSortName={setSortName}
                />
              </div>
            </th>
            <th>
              <div className="d-flex align-items-center">
                Должность
                <SortTable
                  array={arrayTable}
                  setMass={setArrayTable}
                  nameSort={sortName}
                  name="address"
                  setSortName={setSortName}
                />
              </div>
            </th>
            <th>Email</th>
            <th>Телефон</th>
            <th className="text-center">Действия</th>
          </tr>
        </thead>
      </table>
      <div className="table-content" style={{ height: 'calc(100vh - 315px)' }}>
        <Scrollbars>
          <table className="table">
            <colgroup>
              <col style={{ width: '4%' }} />
              <col style={{ width: '35%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
            </colgroup>
            <tbody>
              {arrayTable.map((item, idx) => (
                <tr key={item.id} className="table-row">
                  <td className="text-center">
                    <div
                      className="status-employess"
                      title={item.isActive ? 'Работает' : 'Не работает'}
                    >
                      {item.isActive ? (
                        <Icon title="Работает" name="unlock" className="ullock" />
                      ) : (
                        <Icon title="Не работает" name="lock" className="lock" />
                      )}
                      {idx + 1}
                    </div>
                  </td>
                  <td>{item.fio}</td>
                  <td>{item.jobPosition}</td>
                  <td>{item.email ? item.email : '-'}</td>
                  <td>{item.phoneNumber1}</td>
                  <td>
                    <div className="actions-table">
                      <button
                        title="Изменить"
                        className="btn pencil-item-table"
                        type="button"
                        onClick={() => {
                          setShowWindowFormPut(true);
                          setDefautFormVal(item);
                        }}
                      >
                        <Icon name="pencil" />
                      </button>
                      <button
                        title="Удалить"
                        onClick={() => {
                          setId(item.id);
                          setShowConfirmation(true);
                        }}
                        className="btn trash-item-table"
                        type="button"
                      >
                        <Icon name="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Scrollbars>
      </div>
    </div>
  );
};

EmployessTable.defaultProps = {
  array: [],
  error: {},
  setId: () => {},
  setShowConfirmation: () => {},
  setShowWindowFormPut: () => {},
  setDefautFormVal: () => {},
};

EmployessTable.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  setId: PropTypes.func,
  setShowConfirmation: PropTypes.func,
  setShowWindowFormPut: PropTypes.func,
  setDefautFormVal: PropTypes.func,
};

export default EmployessTable;
