/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

import Icon from '../Icon';

import './FilterTable.scss';

const FilterTable = ({ data }) => {
  return (
    <div className="filter-table">
      <button type="button" className="btn p-0">
        <Icon name="filter" />
        <div className="filter-list">
          <ul>
            <Scrollbars hideTracksWhenNotNeeded autoHeight>
              {data.map((item) => (
                <li key={item.value}> {item.value}</li>
              ))}
            </Scrollbars>
          </ul>
        </div>
      </button>
    </div>
  );
};

FilterTable.defaultProps = {
  data: [],
};

FilterTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ),
};

export default FilterTable;
