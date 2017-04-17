import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import Genres from '../components/Genres';
import { getEvents, gettingEvents, submitUsername } from '../actions/index';


class Songkick extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    }

    // this.handleUsername = this.handleUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(username) {
    console.log('USERNAME SONGKICK', username.target.value);
    this.setState({
      username: username.target.value,
    })
  }

  handleSubmit(e) {
    console.log('USERNAME STATE', this.state.username);
    this.props.submitUsername(this.state.username);
    const that = this;
    e.preventDefault();
    axios.get('/api/checksession')
    .then((data) => {
      if (data.data === 'logged') {
        that.props.gettingEvents();
        axios.get(`/api/events/${this.props.username}`)
        .then((response) => {
          that.props.getEvents(response);
          // that.showEvents();
          // that.setState({ showEventList: true });
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
                  onChange={this.handleUsername.bind(this)}
                />
              <span className="input-icon"><img className="sk-input-logo" src="../assets/sk-badge-black.png" /></span>
              </div>
              <div className="form-group">
                <button
                  type="submit" className="submit-btn input-btn btn btn-lg"
                  onClick={this.handleSubmit.bind(this)}
                  >
                  Submit
                </button>
              </div>
            </form>
            <ToggleDisplay id="toggle-search-gif" show={this.props.showLoadingGif}>
              <div className="input-loader">
                <img
                  className="input-loader-gif"
                  id="search-loader"
                  src="../assets/loadingring.gif"
                />
              </div>
          </ToggleDisplay>
          </div>
        <div className="or-container">
          <img className="or" src="../../assets/or.png" />
        </div>

        <Genres />

      </div>

    )
  }
}

const mapStatetoProps = ({ username, loading }) => ({
  username,
  showLoadingGif: loading,
});

export default connect(mapStatetoProps, { submitUsername, gettingEvents, getEvents })(Songkick);
