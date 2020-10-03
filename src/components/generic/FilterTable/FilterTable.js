/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import Icon from '../Icon';

import './FilterTable.scss';

const FilterTable = ({ array, option, loading, error, setMass, name, lastArray }) => {
  const [show, setShow] = useState(false);
  const [cheked, setCheked] = useState('');
  return (
    <div className="filter-table">
      {cheked ? (
        <button
          type="button"
          className="btn p-0 delete-filter"
          onClick={() => {
            setMass(lastArray);
            setCheked('');
          }}
        >
          <Icon name="deleteFilter" />
        </button>
      ) : (
        <button type="button" className="btn p-0" onClick={() => setShow(!show)}>
          <Icon name="filter" />
        </button>
      )}
      <div className="filter-list-wraper">
        <ListFilterTable
          array={array}
          option={option}
          loading={loading}
          error={error}
          setMass={setMass}
          name={name}
          show={show}
          setShow={setShow}
          cheked={cheked}
          setCheked={setCheked}
        />
      </div>
    </div>
  );
};

const ListFilterTable = ({
  show,
  setShow,
  array,
  option,
  loading,
  error,
  setMass,
  name,
  cheked,
  setCheked,
}) => {
  if (loading) return <LoadingIndicator />;
  if (error) return <Icon name="error" />;

  return (
    <div className={`filter-list ${show ? 'active' : ''}`}>
      <Scrollbars hideTracksWhenNotNeeded autoHeight>
        {option.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`btn ${cheked === item.value ? 'selected' : ''}`}
            onClick={() => {
              setMass(array.filter((el) => el[name] === item.value));
              setShow(false);
              setCheked(item.value);
            }}
          >
            {item.value}
          </button>
        ))}
      </Scrollbars>
    </div>
  );
};

ListFilterTable.defaultProps = {
  option: [],
  array: [],
  loading: false,
  error: false,
  setMass: () => {},
  name: () => {},
  show: false,
  cheked: '',
  setShow: () => {},
  setCheked: () => {},
};

ListFilterTable.propTypes = {
  option: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ),
  array: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  setMass: PropTypes.func,
  name: PropTypes.string,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setCheked: PropTypes.func,
  cheked: PropTypes.string,
};

FilterTable.defaultProps = {
  option: [],
  array: [],
  loading: false,
  error: false,
  setMass: () => {},
  lastArray: PropTypes.string,
  name: PropTypes.string,
};

FilterTable.propTypes = {
  lastArray: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ),
  option: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ),
  array: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
  ),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  setMass: PropTypes.func,
  name: PropTypes.string,
};

export default FilterTable;
