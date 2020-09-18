import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './SortTable.scss';

const SortTable = ({ array, setMass, name }) => {
  const [status, setStatus] = useState('');
  const sort = (array, setMass) => {
    if (status) {
      setMass(array.sort((a, b) => (a[name] > b[name] ? 1 : -1)));
      setStatus(false);
    } else {
      setMass(array.sort((a, b) => (a[name] < b[name] ? 1 : -1)));
      setStatus(true);
    }
  };

  return (
    <div className="sort-table">
      <button
        onClick={() => {
          sort(array, setMass);
        }}
        type="button"
        className="btn p-0"
      >
        <Icon name="sort" />
      </button>
    </div>
  );
};

SortTable.defaultProps = {
  array: [],
  setMass: () => {},
  name: '',
};

SortTable.propTypes = {
  array: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  setMass: PropTypes.func,
  name: PropTypes.string,
};

export default SortTable;
