import { combineReducers } from 'redux';

import user from './user/reducer';
import documents from './documents/reducer';
import sidebar from './sidebar/reducer';

const reducers = combineReducers({
  user,
  documents,
  sidebar,
});

export default reducers;
