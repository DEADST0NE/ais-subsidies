import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './SearchTable.scss';

const SearchTable = ({ array, setMass }) => {
  const [status, setStatus] = useState(false);

  const search = (array, setMass, text) => {
    if (text) {
      const mass = array.filter((itemArr) => {
        let status = false;
        Object.keys(itemArr).forEach((itemObj) => {
          if (RegExp(text, 'ig').test(itemArr[itemObj])) status = !status;
        });
        return status;
      });
      setStatus(!mass.length);
      setMass(mass);
    } else {
      setStatus(false);
    }
  };
  return (
    <div className="search-table-grup">
      <Icon className="search-table-icon" name="search" />
      <input
        type="text"
        placeholder="Поиск..."
        className="search-table-input"
        onChange={(el) => search(array, setMass, el.target.value)}
      />
      {status ? <p>Совпадения не найденны</p> : null}
    </div>
  );
};

SearchTable.defaultProps = {
  array: [],
  setMass: () => {},
};

SearchTable.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ),
  setMass: PropTypes.func,
};

export default SearchTable;
