import { combineReducers } from 'redux';

import user from './user/reducer';
import banks from './banks/reducer';
import sidebar from './sidebar/reducer';
import employees from './employees/reducer';

const reducers = combineReducers({
  user,
  banks,
  sidebar,
  employees,
});

export default reducers;
