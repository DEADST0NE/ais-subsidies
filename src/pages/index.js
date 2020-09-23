import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppLayout from '../components/app/AppLayout';

import LoadingIndicator from '../components/generic/LoadingIndicator';

const HomePage = lazy(() => import('./home-page'));
const BanksPage = lazy(() => import('./banks-page'));
const EmployeesPage = lazy(() => import('./employees-page'));
const NotFoundPage = lazy(() => import('./not-found-page'));
const LivingwagePage = lazy(() => import('./livingwage-page'));
const AddressPage = lazy(() => import('./address-page'));
const JobpositionsPage = lazy(() => import('./jobpositions-page'));
const RolePage = lazy(() => import('./role-page'));
const OrgstructurePage = lazy(() => import('./orgstructure-page'));
const MaxcostsPage = lazy(() => import('./maxcosts-page'));
const RelationsPage = lazy(() => import('./relations-page'));

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
        <Route path="/directory/employees">
          <EmployeesPage />
        </Route>
        <Route path="/directory/livingwage/:idSocialgroups?">
          <LivingwagePage />
        </Route>
        <Route path="/directory/address">
          <AddressPage />
        </Route>
        <Route path="/directory/jobpositions">
          <JobpositionsPage />
        </Route>
        <Route path="/directory/role">
          <RolePage />
        </Route>
        <Route path="/directory/orgstructure">
          <OrgstructurePage />
        </Route>
        <Route path="/directory/maxcosts">
          <MaxcostsPage />
        </Route>
        <Route path="/directory/relations">
          <RelationsPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Suspense>
  </AppLayout>
);

export default AppView;
