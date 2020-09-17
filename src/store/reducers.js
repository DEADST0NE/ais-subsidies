import { combineReducers } from 'redux';

import user from './user/reducer';
import banks from './banks/reducer';
import sidebar from './sidebar/reducer';

const reducers = combineReducers({
  user,
  banks,
  sidebar,
});

export default reducers;
