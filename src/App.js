import Layout from 'components/Layout';
import list from 'page/list';
import detail from 'page/detail';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/list" />} />
          <Route path="/list" component={list} />
          <Route path="/detail/:token_id" component={detail} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
