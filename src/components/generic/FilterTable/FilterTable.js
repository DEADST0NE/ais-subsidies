/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './FilterTable.scss';

const FilterTable = ({ data, setMass, name, loading, error }) => {
  return (
    <div className="filter-table">
      <button type="button" className="btn p-0">
        <Icon name="filter" />
        <div className="filter-list">
          <ul>
            <li>WebSystems</li>
            <li>WebSystems</li>
            <li>WebSystems</li>
            <li>WebSystems</li>
          </ul>
        </div>
      </button>
    </div>
  );
};

FilterTable.defaultProps = {
  data: [],
  setMass: () => {},
  name: '',
  loading: false,
  error: false,
};

FilterTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ),
  setMass: PropTypes.func,
  name: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

export default FilterTable;
