/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './SortTable.scss';

const SortTable = ({ array, setMass, nameSort, setSortName, name }) => {
  const [status, setStatus] = useState(false);
  const sort = (array, setMass) => {
    if (status) {
      setMass(array.sort((a, b) => (a[name] < b[name] ? 1 : -1)));
      setStatus(false);
    } else {
      setMass(array.sort((a, b) => (a[name] > b[name] ? 1 : -1)));
      setStatus(true);
    }
    return null;
  };

  return (
    <div className="sort-table">
      <button
        onClick={() => {
          setSortName(name);
          sort(array, setMass);
        }}
        type="button"
        className="btn p-0"
      >
        {name === nameSort ? (
          status ? (
            <Icon name="sotrDown" />
          ) : (
            <Icon name="sortUp" />
          )
        ) : (
          <Icon name="sort" />
        )}
      </button>
    </div>
  );
};

SortTable.defaultProps = {
  array: [],
  setMass: () => {},
  nameSort: '',
  setSortName: () => {},
  name: '',
};

SortTable.propTypes = {
  array: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  setMass: PropTypes.func,
  nameSort: PropTypes.string,
  setSortName: PropTypes.func,
  name: PropTypes.string,
};

export default SortTable;
