import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import ToggleDisplay from 'react-toggle-display';
import Genres from './Genres';
import { getEvents, gettingEvents, submitUsername } from '../actions/index';


class Songkick extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      onSubmitLoadingGif: false,
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(username) {
    this.setState({
      username: username.target.value,
    });
  }

  handleSubmit(e) {
    this.setState({ onSubmitLoadingGif: true });
    this.props.submitUsername(this.state.username);
    e.preventDefault();
    axios.get('/api/checksession')
    .then((data) => {
      if (data.data === 'logged') {
        this.props.gettingEvents();
        axios.get(`/api/events/${this.props.username}`)
        .then((response) => {
          this.props.getEvents(response);
          this.setState({ onSubmitLoadingGif: false });
        })
        .catch((error) => {
          console.error(error);
        });
      } else {
        window.location = '/auth/signin';
      }
    })
    .catch((err) => {
      console.log(err, 'error in auth check on submit');
    });
  }

  render() {
    return (
      <div id="songkick-input">
        <div className="search-container">
          <form className="username-form form-group">
            <div className="search-input form-group">
              <input
                type="text" className="username-input input-lg"
                autoComplete="off"
                id="inlineFormInputGroup" placeholder="Enter Songkick username..."
                value={this.state.username}
                onChange={this.handleUsername}
              />
              <span className="input-icon">
                <img
                  className="sk-input-logo"
                  src="../assets/sk-badge-black.png"
                  alt="Smiley face"
                />
              </span>
            </div>
            <div className="form-group">
              <button
                type="submit" className="submit-btn input-btn btn btn-lg"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
          <ToggleDisplay id="toggle-search-gif" show={this.state.onSubmitLoadingGif}>
            <div className="input-loader">
              <img
                className="input-loader-gif"
                id="search-loader"
                src="../assets/loadingring.gif"
                alt="Smiley face"
              />
            </div>
          </ToggleDisplay>
        </div>
        <div className="or-container">
          <img className="or" src="../../assets/or.png" alt="Smiley face" />
        </div>

        <Genres />

      </div>

    );
  }
}

Songkick.propTypes = {
  username: PropTypes.string.isRequired,
  submitUsername: PropTypes.func.isRequired,
  gettingEvents: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
};

const mapStatetoProps = ({ username, loading }) => ({
  username,
  showLoadingGif: loading,
});

export default connect(mapStatetoProps, { submitUsername, gettingEvents, getEvents })(Songkick);
