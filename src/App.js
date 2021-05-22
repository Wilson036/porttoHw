import Layout from 'components/Layout';
import page1 from 'page/page1';
import page2 from 'page/page2';
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
          <Route path="/" exact render={() => <Redirect to="/page1" />} />
          <Route path="/page1" component={page1} />
          <Route path="/page2" component={page2} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
