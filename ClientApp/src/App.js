import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Game from './components/Game/Game';
import { Home } from './components/Home';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import "regenerator-runtime/runtime";

import './sass/app.scss';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout >
        <Route exact path='/' component={Home} />
        <AuthorizeRoute path="/game" component={Game} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
