import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppLayout from '../components/AppLayout';

import LoadingIndicator from '../components/generic/LoadingIndicator';

const HomePage = lazy(() => import('./home-page'));
const BanksPage = lazy(() => import('./banks-page'));
const NotFoundPage = lazy(() => import('./not-found-page'));

const AppView = () => (
  <AppLayout>
    <Suspense fallback={<LoadingIndicator />}>
      <Switch>
        <Redirect from="/" to="/home" exact />
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/directory/bank">
          <BanksPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Suspense>
  </AppLayout>
);

export default AppView;
