/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './GlobalSearchInput.scss';

const GlobalSearchInput = ({ placeholder }) => {
  return (
    <div className="search-global-grup">
      <input className="search-global-input" type="text" placeholder={placeholder} />
      <button className="search-global-button" type="button">
        <Icon name="search" />
      </button>
    </div>
  );
};

GlobalSearchInput.defaultProps = {
  placeholder: '',
};

GlobalSearchInput.propTypes = {
  placeholder: PropTypes.string,
};

export default GlobalSearchInput;
