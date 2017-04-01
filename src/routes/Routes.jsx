import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from '.././containers/App';
import Login from '.././components/Login';


const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);

export default Routes;
