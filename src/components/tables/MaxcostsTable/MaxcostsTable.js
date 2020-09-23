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

const MaxcostsTable = ({
  array,
  loading,
  error,
  setId,
  setDefautValueForm,
  setShowConfirmation,
  setShowWindowFormPut,
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
  console.log(arrayTable);
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
                Максимальная доля расходов
                <SortTable
                  array={arrayTable}
                  setMass={setArrayTable}
                  nameSort={sortName}
                  name="maxCost"
                  setSortName={setSortName}
                />
              </div>
            </th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
            <th className="text-center">Действия</th>
          </tr>
        </thead>
      </table>
      <div className="table-content" style={{ height: 'calc(100vh - 315px)' }}>
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
                  <td>{item.maxCost}</td>
                  <td>{item.dateStart}</td>
                  <td>{item.dateStop}</td>
                  <td>
                    <div className="actions-table">
                      <button
                        title="Изменить"
                        className="btn pencil-item-table"
                        type="button"
                        onClick={() => {
                          setId(item.id);
                          setShowWindowFormPut(true);
                          setDefautValueForm(item);
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

MaxcostsTable.defaultProps = {
  array: [],
  error: {},
  setId: () => {},
  setShowConfirmation: () => {},
  setShowWindowFormPut: () => {},
  setDefautValueForm: () => {},
};

MaxcostsTable.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  setId: PropTypes.func,
  setShowConfirmation: PropTypes.func,
  setShowWindowFormPut: PropTypes.func,
  setDefautValueForm: PropTypes.func,
};

export default MaxcostsTable;
