import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import { getSocialgroups } from '../../../store/socialgroups/actions';

import Icon from '../../generic/Icon';
import LoadingIndicator from '../../generic/LoadingIndicator';
import ErrorIndicator from '../../generic/ErrorIndicator';

import './Livingwage.scss';

const SocialgroupsTabs = () => {
  const dispatch = useDispatch();
  const { socialgroups, loading, error } = useSelector(({ socialgroups }) => socialgroups);
  useEffect(() => {
    dispatch(getSocialgroups());
  }, [dispatch]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!socialgroups.length) {
    return <Alert variant="warning">Нет данных социальных групп</Alert>;
  }

  return (
    <div className="socialgroups-tabs-link">
      <Redirect
        from="/directory/livingwage"
        to={`/directory/livingwage/${socialgroups[0].id}`}
        exact
      />
      {socialgroups.map((item, idx) => (
        <NavLink
          key={`livingwage${item.id}`}
          to={`/directory/livingwage/${item.id}`}
          exact={idx === 0}
        >
          <div>
            <Icon name={`livingwageTab${item.id}`} />
            {item.name}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default SocialgroupsTabs;
