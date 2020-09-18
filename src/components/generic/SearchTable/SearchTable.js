import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './SearchTable.scss';

const SearchTable = ({ array, setMass }) => {
  const search = (array, setMass, text) => {
    setMass(
      array.filter((itemArr) => {
        let status = false;
        Object.keys(itemArr).forEach((itemObj) => {
          if (RegExp(text, 'ig').test(itemArr[itemObj])) status = !status;
        });
        return status;
      })
    );
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
    </div>
  );
};

SearchTable.defaultProps = {
  array: [],
  setMass: () => {},
};

SearchTable.propTypes = {
  array: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  setMass: PropTypes.func,
};

export default SearchTable;
