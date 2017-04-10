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
      swipeToSlide: false,
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
                </div>
              </div>
              <a className="carousel-image panorama" onClick={() => this.handleFirst()} />
              <a className="carousel-image govball" onClick={() => this.handleSecond()} />
            </Slider>
          </div>
          <div id="songkick-input">
            <form className="form-inline">
              <div className="search-input form-group">
                <input
                  type="text" className="col-xs-12 input-lg username-input"
                  id="inlineFormInputGroup" placeholder="Enter your Songkick username..."
                  value={this.state.username} onChange={this.handleUsername.bind(this)}
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
            <span className="or-label">OR</span>
            <div className="dropdown">
              <button
                className="input-btn btn btn-lg dropdown-toggle"
                type="button" data-toggle="dropdown">
                Choose a genre  <i className="fa fa-chevron-down" aria-hidden="true" />
              </button>
                <ul className="dropdown-menu genres">
                  <li><a href="#"><i className="fa fa-music" aria-hidden="true"></i> Indie</a></li>
                  <li><a href="#"><i className="fa fa-music" aria-hidden="true"></i> Hip Hop</a></li>
                  <li><a href="#"><i className="fa fa-music" aria-hidden="true"></i> Pop</a></li>
                </ul>
            </div>
          </div>
          <label className="page-subheader"> Create Spotify playlists from your
        upcoming songkick gigs </label>
          <div className="row logos">
            <img src="./assets/Spotify_Icon_RGB_Green.png" className="spotify-logo" alt="Spotify Logo" />
            <img src="./assets/sk-badge-pink.png" className="songkick-logo" alt="Songkick Logo" />
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
