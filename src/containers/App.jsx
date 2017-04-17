import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from '.././components/Login';
import Home from './Home';
import '../../public/Styles/main.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default App;
