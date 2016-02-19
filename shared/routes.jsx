import React                   from 'react';
import { Route, IndexRoute, Redirect }   from 'react-router';
import App                     from 'components/index';
import Home                    from 'components/Home';
import HomeLogin               from 'components/login/HomeLogin';

export default (
  <Route name="app" component={App}>
      <Route component={Home} path="notes"/>
      <Route path="/" component={HomeLogin}/>
  </Route>
);
