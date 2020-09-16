import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppLayout from '../components/AppLayout';

import LoadingIndicator from '../components/generic/LoadingIndicator';

const HomePage = lazy(() => import('./home-page'));

const AppView = () => (
  <AppLayout>
    <Switch>
      <Suspense fallback={<LoadingIndicator />}>
        <Redirect to="/home" exact />
        <Route path="/home">
          <HomePage />
        </Route>
      </Suspense>
    </Switch>
  </AppLayout>
);

export default AppView;
