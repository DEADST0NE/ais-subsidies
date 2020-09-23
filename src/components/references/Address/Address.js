import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import './Address.scss';

const Address = () => {
  const array = [
    {
      name: 'Регионы',
      url: '/directory/address/regions',
    },
    {
      name: 'Районы',
      url: '/directory/address/areas',
    },
    {
      name: 'Населенные пункты',
      url: '/directory/address/city',
    },
    {
      name: 'Улицы',
      url: '/directory/address/streets',
    },
    {
      name: 'Дома',
      url: '/directory/address/house',
    },
    {
      name: 'Квартиры',
      url: '/directory/address/apartments',
    },
  ];

  return (
    <div>
      <div>
        <Redirect from="/directory/address" to={array[0].url} exact />
        <ul className="steps">
          {array.map((item, idx) => (
            <li key={item.url} className="step-wrapper">
              <NavLink className="step" key={item.url} to={item.url} exact>
                <div className="step-text">{item.name}</div>
              </NavLink>
              {array.length === idx + 1 ? '' : <span className="step-selected">{item.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Address;
