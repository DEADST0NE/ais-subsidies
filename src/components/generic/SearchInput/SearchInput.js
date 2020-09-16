/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './SearchInput.scss';

const SearchInput = ({ placeholder }) => {
  return (
    <div className="search-grup" tabIndex={0}>
      <input type="text" placeholder={placeholder} />
      <button type="button">
        <Icon name="search" />
      </button>
    </div>
  );
};

SearchInput.defaultProps = {
  placeholder: '',
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
};

export default SearchInput;
