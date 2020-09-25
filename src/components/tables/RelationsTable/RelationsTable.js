/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import Scrollbars from 'react-custom-scrollbars';
import { Alert, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Icon from '../../generic/Icon';
import SortTable from '../../generic/SortTable';

import LoadingIndicator from '../../generic/LoadingIndicator';
import ErrorIndicator from '../../generic/ErrorIndicator';

import '../GlobalStyleTable.scss';

const RelationsTable = ({
  array,
  loading,
  error,
  setId,
  setShowConfirmation,
  setShowWindowFormPut,
  setDefautValueForm,
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
          <col style={{ width: '5%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '60%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="text-center">№</th>
            <th>
              <div className="d-flex align-items-center">
                Название
                <SortTable
                  array={arrayTable}
                  setMass={setArrayTable}
                  nameSort={sortName}
                  name="name"
                  setSortName={setSortName}
                />
              </div>
            </th>
            <th>Отношения</th>
            <th className="text-center">Действия</th>
          </tr>
        </thead>
      </table>
      <div className="table-content" style={{ height: 'calc(100vh - 315px)' }}>
        <Scrollbars>
          <table className="table">
            <colgroup>
              <col style={{ width: '5%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '60%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <tbody>
              {arrayTable.map((item, idx) => (
                <tr key={item.id} className="table-row">
                  <td className="text-center">{idx + 1}</td>
                  <td>{item.relation.name}</td>
                  <td>
                    {item.relationDependences.map((item) => (
                      <Badge key={item.id} variant="secondary">
                        {item.name}
                      </Badge>
                    ))}
                  </td>
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

RelationsTable.defaultProps = {
  array: [],
  error: {},
  setId: () => {},
  setShowConfirmation: () => {},
  setShowWindowFormPut: () => {},
  setDefautValueForm: () => {},
};

RelationsTable.propTypes = {
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

export default RelationsTable;
