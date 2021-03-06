/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import Scrollbars from 'react-custom-scrollbars';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

import convertDate from '../../../utils/convertDate';
import Icon from '../../generic/Icon';
import SortTable from '../../generic/SortTable';

import LoadingIndicator from '../../generic/LoadingIndicator';
import ErrorIndicator from '../../generic/ErrorIndicator';

import '../GlobalStyleTable.scss';

const LivingwageTable = ({ array, loading, error, setShowConfirmation, setId, setMass }) => {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!array.length) {
    return <Alert variant="warning">Нет данных</Alert>;
  }
  const [sortName, setSortName] = useState(null);
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
                  array={array}
                  setMass={setMass}
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
                  array={array}
                  setMass={setMass}
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
                  array={array}
                  setMass={setMass}
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
              {array.map((item, idx) => (
                <tr key={item.id} className="table-row">
                  <td className="text-center">{idx + 1}</td>
                  <td>{item.wageValue}</td>
                  <td>{convertDate(item.dateStart)}</td>
                  <td>{item.dateStop ? convertDate(item.dateStop) : '-'}</td>
                  <td>
                    <div className="actions-table">
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

LivingwageTable.defaultProps = {
  array: [],
  error: {},
  setId: () => {},
  setShowConfirmation: () => {},
  setMass: () => {},
};

LivingwageTable.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
  setMass: PropTypes.func,
  setId: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  setShowConfirmation: PropTypes.func,
  error: PropTypes.objectOf(PropTypes.string),
};

export default LivingwageTable;
