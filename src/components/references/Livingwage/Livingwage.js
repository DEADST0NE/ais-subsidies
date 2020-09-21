import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SocialgroupsTabs from './SocialgroupsTab';
import TabContent from './TabContent';

import './Livingwage.scss';

const Livingwage = withRouter(({ match }) => (
  <div className="livingwage">
    <SocialgroupsTabs />
    {match?.params?.idSocialgroups ? <TabContent id={match?.params?.idSocialgroups} /> : null}
  </div>
));

Livingwage.defaultProps = {
  match: undefined,
};

Livingwage.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default Livingwage;
