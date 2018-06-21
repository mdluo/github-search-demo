import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Search from './search';

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './home'),
  loading: () => null,
  modules: ['home'],
});

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/search" component={Search} />
  </Switch>
);
