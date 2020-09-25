import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AddressAreas from './AddressAreas';
import AddressRegions from './AddressRegions';
import Step from '../../generic/Step';
// import AddressNextTable from '../../tables/AddressNextTable';
import './Address.scss';

const Address = () => {
  const [selectedArray, setSelectedArray] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Step selectedArray={selectedArray} />
        <Switch>
          <Route path="/directory/address/regions" exact>
            <AddressRegions selectedArray={selectedArray} setSelectedArray={setSelectedArray} />
          </Route>

          <Route path="/directory/address/regions/:parentId?/areas" exact>
            <AddressAreas />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Address;
