import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import EventList from '../components/EventList';
import { getEvents } from '../actions/index';
// import Splash from '../components/Splash';
import Playlist from '../components/Playlist';
// import * as types from '../constants/actionTypes';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEventList: false,
      showPlaylist: false,
      playlistId: [],
      username: '',
    };
  }

  handleUsername(username) {
    this.setState({ username: username.target.value });
  }

  // onGenerateClick = (username) => {
  //   console.log('Called+++++++++')
  //   this.props.getEvents(username)
  //     .then(() => {
  //       this.setState({ showEventList: true });
  //     });
  // }
  handleFirst() {
    axios.get('/api/festival1')
    .then((results) => {
      this.renderPlaylist(results);
    });
  }

  handeSecond() {
    axios.get('/api/festival2')
    .then((results) => {
      this.renderPlaylist(results);
    });
  }

  handleSubmit(e) {
    const that = this;
    e.preventDefault();
    axios.get(`/api/events/${this.state.username}`)
    .then(function (response) {
      console.log('PROPS', this.props);
      that.props.getEvents(response);
      that.setState({ showEventList: true });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  renderPlaylist(playlistId) {
    console.log('AH! REAL MONSTERS', playlistId.data);
    this.setState({ showPlaylist: true,
      playlistId: playlistId.data });
  }
  render() {
    const settings = {
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      fade: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
    };
    return (
      <div>
        <div>
          <div className="home-page-container">
            <div className="carousel">
              <Slider {...settings}>
                <a onClick={() => this.handleFirst()}><img className="carousel-image" src="/assets/panorama.png" alt="Sad Face" /></a>
                <a onClick={() => this.handleSecond()}><img className="carousel-image" src="/assets/govball.png" alt="Sad Face" /></a>
              </Slider>
            </div>
            <div id="songkik-input">
              <form className="form-inline">
                <span className="sr-only">Songkik Username</span>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                  <div className="input-group-addon">@</div>
                  <input
                    type="text" className="form-control"
                    id="inlineFormInputGroup" placeholder="Songkik Username"
                    value={this.state.username} onChange={() => this.handleUsername()}
                  />
                </div>
                <button
                  type="submit" className="btn btn-primary"
                  onClick={() => handleSubmit()}
                >
                Submit
                </button>
              </form>
              <span className="or-label"> OR </span>
              <div className="genre-buttons">
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Pop
                </button>
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Rock
                </button>
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Hip<br />Hop
                </button>
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Indie
                </button>
                <button type="button" className="btn btn-success btn-circle btn-lg">
                  Rap
                </button>
              </div>
            </div>
          </div>

        </div>
        <ToggleDisplay show={this.state.showEventList}>
          <EventList
            renderPlaylist={playlistId => this.renderPlaylist(playlistId)}
            listings={this.props.listings}
          />
        </ToggleDisplay>
        <ToggleDisplay show={this.state.showPlaylist}>
          <Playlist playlistId={this.state.playlistId} />
        </ToggleDisplay>
      </div>
    );
  }
}

const mapStatetoProps = ({ events }) => {
  console.log('EVENT MAPPING', events);
  return {
    listings: events.eventListings,
  };
};

export default connect(mapStatetoProps, { getEvents })(Home);


/* <div>
  <EventList listings={this.props.listings} />
</div>*/
