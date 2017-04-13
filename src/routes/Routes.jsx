import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '.././containers/App';
import Login from '.././components/Login';
// import Splash from '.././components/Splash';
import Home from '.././containers/Home';


const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
    </div>
  </Router>
);

export default Routes;
