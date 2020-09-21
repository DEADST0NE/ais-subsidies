/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import Scrollbars from 'react-custom-scrollbars';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

import Icon from '../../generic/Icon';
import SortTable from '../../generic/SortTable';
import Сonfirmation from '../../generic/Сonfirmation';

import LoadingIndicator from '../../generic/LoadingIndicator';
import ErrorIndicator from '../../generic/ErrorIndicator';

import '../GlobalStyleTable.scss';

const LivingwageTable = ({ array, loading, error }) => {
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  return (
    <div className="castom_table">
      <table className="table table-striped">
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '40%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="text-center">№</th>
            <th>
              <div className="d-flex align-items-center">
                Размер заработной платы
                <SortTable
                  array={arrayTable}
                  setMass={setArrayTable}
                  nameSort={sortName}
                  name="wageValue"
                  setSortName={setSortName}
                />
              </div>
            </th>
            <th>
              <div className="d-flex align-items-center">
                Дата начала
                <SortTable
                  array={arrayTable}
                  setMass={setArrayTable}
                  nameSort={sortName}
                  name="dateStart"
                  setSortName={setSortName}
                />
              </div>
            </th>
            <th>
              <div className="d-flex align-items-center">
                Дата окончания
                <SortTable
                  array={arrayTable}
                  setMass={setArrayTable}
                  nameSort={sortName}
                  name="dateStop"
                  setSortName={setSortName}
                />
              </div>
            </th>
            <th className="text-center">Действия</th>
          </tr>
        </thead>
      </table>
      <div className="table-content" style={{ height: 'calc(100vh - 395px)' }}>
        <Scrollbars>
          <table className="table">
            <colgroup>
              <col style={{ width: '5%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <tbody>
              {arrayTable.map((item, idx) => (
                <tr key={item.id} className="table-row">
                  <td className="text-center">{idx + 1}</td>
                  <td>{item.wageValue}</td>
                  <td>{item.dateStart}</td>
                  <td>{item.dateStop ? item.dateStop : '-'}</td>
                  <td>
                    <div className="actions-table">
                      <button title="Изменить" className="btn pencil-item-table" type="button">
                        <Icon name="pencil" />
                      </button>
                      <button
                        title="Удалить"
                        onClick={() => {
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
      <Сonfirmation
        show={showConfirmation}
        onClosed={setShowConfirmation}
        onSuccess={() => {
          console.log(1);
        }}
      />
    </div>
  );
};

LivingwageTable.defaultProps = {
  array: [],
  error: {},
};

LivingwageTable.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
};

export default LivingwageTable;
