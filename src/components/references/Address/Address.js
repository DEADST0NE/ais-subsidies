import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AddressAreas from './AddressAreas';
import AddressRegions from './AddressRegions';
import AddressCity from './AddressCity';
import Step from '../../generic/Step';
import './Address.scss';

const Address = () => {
  const [selectedArray, setSelectedArray] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Step selectedArray={selectedArray} />
        <Switch>
          <Route path="/directory/address/regions" exact>
            <AddressRegions setSelectedArray={setSelectedArray} />
          </Route>

          <Route path="/directory/address/regions/:reginId?/areas" exact>
            <AddressAreas selectedArray={selectedArray} setSelectedArray={setSelectedArray} />
          </Route>

          <Route path="/directory/address/regions/:reginId?/areas/:areasId?/city" exact>
            <AddressCity selectedArray={selectedArray} setSelectedArray={setSelectedArray} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Address;
