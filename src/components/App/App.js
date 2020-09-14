import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as SvgSprite } from '../../images/sprite.svg';

import AppView from '../../pages';
import LoginPage from '../../pages/login-page';
import NotFoundPage from '../../pages/not-found-page';

import PrivateRoute from '../generic/PrivateRoute';

import { getAccessToken } from '../../services/authService';
import { setUserData } from '../../store/user/actions';

toast.configure({
  pauseOnHover: true,
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      dispatch(setUserData(token));
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>

          <PrivateRoute path="/">
            <AppView />
          </PrivateRoute>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
      <SvgSprite className="d-none" />
    </>
  );
};

export default App;
