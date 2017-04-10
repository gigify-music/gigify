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
      authenticated: false,
    };
  }

  handleUsername(username) {
    this.setState({ username: username.target.value });
  }

  handleLogout() {
    axios.get('/auth/logout')
        .then((res) => {
          if (res.data === 'logout') {
            window.location = '/login';
          }
        })
        .catch(err => console.error(err));
  }
  // onGenerateClick = (username) => {
  //   console.log('Called+++++++++')
  //   this.props.getEvents(username)
  //     .then(() => {
  //       this.setState({ showEventList: true });
  //     });
  // }
  handleFirst() {
    const panoramaPlaylist = {
      data: ['panoramanyc', '3Tx6bcrYcvmAA9sblNLPrH'],
    };
    this.renderPlaylist(panoramaPlaylist);
  }

  componentWillMount(){
    console.log("BEFORE MOUNT")
    axios.get('/api/checksession').then((data) => {
      console.log(data, "RESP CHECK SESSION")
      if(data.data === 'logged'){
        this.setState({ authenticated: true });
        // window.location = '/auth/signin';
      }
      else {
        window.location = '/auth/signin';
        // this.setState({authenticated : true});
      }
    }).catch((err) => {
      this.setState({ authenticated: false });
      window.location = '/auth/signin';
    });
  }

  handleSecond() {
    const govballPlaylist = {
      data: [1265233623, '5lRkpBlgVkBEmVNYSp9BmB'],
    };
    this.renderPlaylist(govballPlaylist);
  }

  handleSubmit(e) {
    const that = this;
    e.preventDefault();
    axios.get('/api/checksession')
    .then((data) => {
      console.log(data, "on submit songkik username");
      if (data.data === 'logged') {
        axios.get(`/api/events/${this.state.username}`)
        .then((response) => {
          that.props.getEvents(response);
          that.setState({ showEventList: true });
        })
        .catch((error) => {
          console.log(error, 'error in get api/events on submit');
        });
      } else {
        window.location = '/auth/signin';
      }
    })
    .catch((err) => {
      console.log(err, 'error in auth check on submit');
    });
  }

  renderPlaylist(playlistId) {
    console.log("HERE IS THE PLAYLIST ID ARRAY IN RENDERPLAYLIST: ", playlistId)
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

    if (this.state.authenticated === false) {
      return (<div />);   //Empty page while authorization is checked before
                          //redirect to login
    }

    return (
      <div>
        <div className="home-page-container">
          <div className="carousel">
            <Slider {...settings}>
              <div id="particles-js" className="top-page-container">
                <div className="top-content-container">
                  <label className="page-title"> Gigify </label>
                  <label className="page-subheader"> Create Spotify playlists from your
                upcoming songkick gigs </label>
                  <div className="row logos">
                    <img src="./assets/Spotify_Icon_RGB_Green.png" className="spotify-logo" alt="Spotify Logo" />
                    <img src="./assets/sk-badge-pink.png" className="songkick-logo" alt="Songkick Logo" />
                  </div>
                </div>
              </div>
              <a className="carousel-image panorama" onClick={() => this.handleFirst()}>
                <div><h1>Panorama Festival Playlist</h1></div>
              </a>
              <a className="carousel-image govball" onClick={() => this.handleSecond()}>
                <div><h1>Governer's Ball</h1></div>
              </a>
            </Slider>
          </div>
          <div id="songkick-input">
            <form className="form-inline">
              <span className="sr-only">songkick Username</span>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                <div className="input-group-addon">@</div>
                <input
                  type="text" className="form-control"
                  id="inlineFormInputGroup" placeholder="songkick Username"
                  value={this.state.username} onChange={this.handleUsername.bind(this)}
                />
              </div>
              <button
                type="submit" className="btn btn-primary"
                onClick={this.handleSubmit.bind(this)}
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
        <ToggleDisplay id="event-list-toggle" show={this.state.showEventList}>
          <EventList
            id="event-list"
            playlistId={this.state.playlistId}
            showEventList={this.state.showEventList}
            renderPlaylist={playlistId => this.renderPlaylist(playlistId)}
            listings={this.props.listings}
          />
        </ToggleDisplay>
      </div>
    );
  }
}

const mapStatetoProps = ({ events }) => ({
  listings: events.eventListings,
});

export default connect(mapStatetoProps, { getEvents })(Home);


/* <div>
  <EventList listings={this.props.listings} />
</div>*/

/*<ToggleDisplay id="playlist-toggle" show={this.state.showPlaylist}>
  <Playlist id="playlist" showPlaylist={this.state.showPlaylist} playlistId={this.state.playlistId} />
</ToggleDisplay>*/
