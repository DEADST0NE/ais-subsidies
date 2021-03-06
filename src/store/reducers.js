import { combineReducers } from 'redux';

import user from './user/reducer';
import banks from './banks/reducer';
import sidebar from './sidebar/reducer';
import employees from './employees/reducer';
import livingwages from './livingwage/reducer';
import socialgroups from './socialgroups/reducer';
import jobpositions from './jobpositions/reducer';
import role from './role/reducer';
import relation from './relation/reducer';
import orgstructure from './orgstructure/reducer';
import maxcost from './maxcost/reducer';
import addressesRegions from './addresses/regions/reducer';
import addressesAreas from './addresses/areas/reducer';
import addressesCity from './addresses/city/reducer';

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
  maxcost,
  relation,
  addressesRegions,
  addressesAreas,
  addressesCity,
});

export default reducers;
