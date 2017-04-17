import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import axios from 'axios';
import { getEvents, gettingEvents } from '../actions/index';

class Genres extends Component {
  constructor(props) {
    super(props)
    this.handleGenre = this.handleGenre.bind(this);
  }

  handleGenre(username) {
    this.setState({ showLoadingGifGenre: true });
    const that = this;
    that.props.gettingEvents();
    axios.get(`/api/events/${username}`)
    .then((response) => {
      that.props.getEvents(response);
      // that.setState({ showEventList: true });
    })
    .catch((error) => {
      console.log(error, 'error in get api/events on submit');
    });
  }

  render() {
    return (
    <div className="genre-container">
      <div className="dropdown">
        <button
          className="dropdown-btn btn btn-lg dropdown-toggle"
          type="button" data-toggle="dropdown">
          Choose a genre <i className="arrow fa fa-chevron-down" aria-hidden="true" />
        </button>
        <ul className="dropdown-menu genres">
          <li><a onClick={() => this.handleGenre('gigify_edm')}><i className="fa fa-music" aria-hidden="true" /> EDM </a></li>
          <li><a onClick={() => this.handleGenre('gigify_hiphop')}><i className="fa fa-music" aria-hidden="true" /> Hip Hop </a></li>
          <li><a onClick={() => this.handleGenre('gigify_indie')}><i className="fa fa-music" aria-hidden="true" /> Indie </a></li>
          <li><a onClick={() => this.handleGenre('gigify_pop')}><i className="fa fa-music" aria-hidden="true" /> Pop </a></li>
          <li><a onClick={() => this.handleGenre('gigify_rock')}><i className="fa fa-music" aria-hidden="true" /> Rock </a></li>
        </ul>
      </div>
      <div className="nyc-events">(NYC Gigs)</div>
      <ToggleDisplay id="toggle-genre-gif" show={this.props.showLoadingGifGenre}>
        <div className="input-loader">
          <img
            className="input-loader-gif" id="genre-loader"
            src="../assets/loadingring.gif"
          />
        </div>
      </ToggleDisplay>
    </div>
    )
  }
}

const mapStatetoProps = ({ events, loading }) => ({
  listings: events.eventListings,
  showLoadingGifGenre: loading,
});

export default connect(mapStatetoProps, { getEvents, gettingEvents })(Genres);
