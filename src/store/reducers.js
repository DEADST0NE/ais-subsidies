import { combineReducers } from 'redux';

import user from './user/reducer';
import documents from './documents/reducer';

const reducers = combineReducers({
  user,
  documents,
});

export default reducers;
