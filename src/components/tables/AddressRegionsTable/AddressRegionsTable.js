/* eslint-disable import/no-unresolved */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

import LoadingIndicator from '../../generic/LoadingIndicator';
import ErrorIndicator from '../../generic/ErrorIndicator';

import '../GlobalStyleTable.scss';

const MaxcostsTable = withRouter(({ array, loading, error, history, setSelectedArray }) => {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!array.length) {
    return <Alert variant="warning">Нет данных</Alert>;
  }
  return (
    <div className="castom_table">
      <table className="table table-striped">
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '95%' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="text-center">№</th>
            <th>
              <div className="d-flex align-items-center">Наимаеннование</div>
            </th>
          </tr>
        </thead>
      </table>
      <div className="table-content" style={{ height: 'calc(100vh - 405px)' }}>
        <Scrollbars>
          <table className="table table-hover">
            <colgroup>
              <col style={{ width: '5%' }} />
              <col style={{ width: '95%' }} />
            </colgroup>
            <tbody>
              {array.map((item, idx) => (
                <tr
                  key={item.id}
                  className="table-row"
                  onClick={() => {
                    setSelectedArray([item.offName]);
                    history.push(`/directory/address/regions/${item.id}/areas`);
                  }}
                >
                  <td className="text-center">{idx + 1}</td>
                  <td>{item.offName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Scrollbars>
      </div>
    </div>
  );
});

MaxcostsTable.defaultProps = {
  array: [],
  error: {},
  setSelectedArray: () => {},
};

MaxcostsTable.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.objectOf(PropTypes.string),
    createHref: PropTypes.func,
    push: PropTypes.func,
  }),
  setSelectedArray: PropTypes.func,
};

export default MaxcostsTable;
