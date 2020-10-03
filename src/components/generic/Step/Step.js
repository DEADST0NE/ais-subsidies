import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect, withRouter } from 'react-router-dom';

import Icon from '../Icon';

import './Step.scss';

const array = [
  {
    name: 'Регионы',
    url: '/directory/address/regions',
  },
  {
    name: 'Районы',
    url: '/directory/address/regions/areas',
  },
  {
    name: 'Населенные пункты',
    url: '/directory/address/regions/areas/city',
  },
  {
    name: 'Улицы',
    url: '/directory/address/regions/areas/city/streets',
  },
  {
    name: 'Дома',
    url: '/directory/address/regions/areas/city/streets/house',
  },
  {
    name: 'Квартиры',
    url: '/directory/address/regions/areas/city/streets/house/apartments',
  },
];

const Step = withRouter(({ location, selectedArray }) => {
  const status = (url) => {
    return {
      status: RegExp(
        location.pathname.replace(/\/[\w\d]{8}-([\w\d]{4}-){3}[\w\d]{12}/g, ''),
        'ig'
      ).test(url),
      string: location.pathname.replace(/\/[\w\d]{8}-([\w\d]{4}-){3}[\w\d]{12}/g, ''),
    };
  };
  return (
    <div>
      <Redirect from="/directory/address" to="/directory/address/regions" exact />
      <ul className="steps">
        {array.map((item, idx) => (
          <li
            key={item.url}
            className={`step-wrapper ${
              status(item.url).status ? 'step-wrapper-not-active' : 'step-wrapper-active'
            }`}
          >
            <NavLink
              className={`step ${item.url.indexOf(status(item.url).string) ? 'active' : ''}`}
              key={item.url}
              to={item.url}
              onClick={(e) => {
                if (status(item.url).status) e.preventDefault();
              }}
            >
              {!status(item.url).status ? <Icon name="success" /> : null}
              <div className="step-text">{item.name}</div>
            </NavLink>
            <span
              className={`step-selected ${
                item.url.indexOf(status(item.url).string) ? 'step-selected-active' : ''
              }`}
            >
              {selectedArray[idx]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});

Step.defaultProps = {
  location: {},
};

Step.propTypes = {
  location: PropTypes.objectOf(PropTypes.string),
  selectedArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Step;
