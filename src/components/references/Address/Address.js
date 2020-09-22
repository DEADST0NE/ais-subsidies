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
      <div className="steps">
        <Redirect from="/directory/address" to={array[0].url} exact />
        <ul>
          {array.map((item, idx) => (
            <li>
              <NavLink key={item.url} to={item.url} exact={item.url}>
                <div className="steps-number">{idx + 1}</div>
                <div className="steps-text">{item.name}</div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Address;
