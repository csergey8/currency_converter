import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Converter from './components/Converter';
import Exchange from './components/Exchange';
import Layout from './components/Header';
import { BrowserRouter } from 'react-router-dom';

export default () => {
  return (
    <BrowserRouter>
      <Layout>
      </Layout>
      <Switch >
        <Route path="/converter" exact component={Converter} />
        <Route path="/exchange" exact component={Exchange} />
        <Route path="/" exact>
          <Redirect to="/converter" />
        </Route>
      </Switch>

    </BrowserRouter>
  )
}


