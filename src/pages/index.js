import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppLayout from '../components/AppLayout';

import LoadingIndicator from '../components/generic/LoadingIndicator';

const DocumentsPage = lazy(() => import('./documents-page'));
const ServicesPage = lazy(() => import('./services-page'));
const SmevPage = lazy(() => import('./smev-page'));

const AppView = () => (
  <AppLayout>
    <Switch>
      <Suspense fallback={<LoadingIndicator />}>
        <Redirect to="/documents" exact />
        <Route path="/documents">
          <DocumentsPage />
        </Route>
        <Route path="/services">
          <ServicesPage />
        </Route>
        <Route path="/smev">
          <SmevPage />
        </Route>
      </Suspense>
    </Switch>
  </AppLayout>
);

export default AppView;
