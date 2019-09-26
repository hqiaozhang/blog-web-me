import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import configureStore from '@/redux/store';
import App from '@/containers/primaryContainer';
import LoginContainer from '@/containers/login';
import AuthorizedRoute from './authorizedRoute';

const store = configureStore();

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/auth/login" component={LoginContainer} />
        <AuthorizedRoute path="/app" component={App} />
        <Redirect to="/auth/login" />
      </Switch>
    </Provider>
  </BrowserRouter>
);

export default hot(module)(Root);
