import React from 'react';
import requests from '../utils/requests';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Login extends React.Component {
  handleAuth() {
    window.location = '/auth/signin';
  }
  render() {
    return (
      <div className="page-container">
        <div className="login-container">
          <Link to="/home">home</Link>
          <label className="page-title"> Gigify </label>
          <label className="page-subheader"> Create playlists based off of your
          upcoming songkick gigs </label>
          <button
            className="btn btn-lg spotify-auth-button" type="button"
            onClick={() => this.handleAuth()}
          >
            <i className="fa fa-spotify fa-3x spotify-icon" aria-hidden="true" />
           Connect with Spotify </button>
        </div>
      </div>
    );
  }
}

export default Login;
