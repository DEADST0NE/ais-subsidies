import { combineReducers } from 'redux';

import user from './user/reducer';
import banks from './banks/reducer';
import sidebar from './sidebar/reducer';
import employees from './employees/reducer';
import livingwages from './livingwage/reducer';
import socialgroups from './socialgroups/reducer';
import jobpositions from './jobpositions/reducer';
import role from './role/reducer';
import orgstructure from './orgstructure/reducer';

const reducers = combineReducers({
  user,
  banks,
  sidebar,
  employees,
  livingwages,
  socialgroups,
  jobpositions,
  role,
  orgstructure,
});

export default reducers;
