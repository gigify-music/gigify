import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import EventList from '../components/EventList';
import { getEvents, gettingEvents } from '../actions/index';
// import Playlist from '../components/Playlist';
import '../../public/Styles/input.scss';
import '../../public/Styles/howto.scss';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEventList: false,
      showPlaylist: false,
      playlistId: [],
      username: '',
      authenticated: false,
      showLoading: false,
      showLoadingGif: false,
      showLoadingGifGenre: false,
      showSelectedPlaylist: false,
    };
    this.renderPlaylist2 = this.renderPlaylist2.bind(this);
  }

  // onGenerateClick = (username) => {
  //   console.log('Called+++++++++')
  //   this.props.getEvents(username)
  //     .then(() => {
  //       this.setState({ showEventList: true });
  //     });
  // }


  componentWillMount() {
    console.log('BEFORE MOUNT');
    axios.get('/api/checksession').then((data) => {
      console.log(data, 'RESP CHECK SESSION');
      if (data.data === 'logged') {
        this.setState({ authenticated: true });
        // window.location = '/auth/signin';
      } else {
        window.location = '/auth/signin';
        // this.setState({authenticated : true});
      }
    }).catch((err) => {
      this.setState({ authenticated: false });
      window.location = '/auth/signin';
    });
  }

  componentWillUpdate() {
    !(this.props.loadingplaylist)
    ? this.props.loadingplaylist
    : this.setState({ showLoadingGif: false, showLoadingGifGenre: false });
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

  handleFirst() {
    const panoramaPlaylist = {
      data: ['panoramanyc', '3Tx6bcrYcvmAA9sblNLPrH'],
    };
    this.renderPlaylist(panoramaPlaylist);
  }

  handleSecond() {
    const govballPlaylist = {
      data: [1265233623, '5lRkpBlgVkBEmVNYSp9BmB'],
    };
    this.renderPlaylist(govballPlaylist);
  }

  handleSubmit(e) {
    this.setState({ showLoadingGif: true });
    const that = this;
    e.preventDefault();
    axios.get('/api/checksession')
    .then((data) => {
      console.log(data, "on submit songkik username");
      if (data.data === 'logged') {
        that.props.gettingEvents();
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

  handleGenre(username) {
    this.setState({ showLoadingGifGenre: true });
    const that = this;
    that.props.gettingEvents();
    axios.get(`/api/events/${username}`)
    .then((response) => {
      that.props.getEvents(response);
      that.setState({ showEventList: true });
    })
    .catch((error) => {
      console.log(error, 'error in get api/events on submit');
    });
  }

  renderPlaylist(playlistId) {
    // console.log("HERE IS THE PLAYLIST ID ARRAY IN RENDERPLAYLIST: ", playlistId)
    const that = this;
    this.setState({
      playlistId: playlistId.data,
      showPlaylist:false });
    this.setState({ showLoading: true }, function () {
      setTimeout(function() {
        $('#loadingModal').modal('hide');
        that.setState({ showLoading:false, showPlaylist: true });
    }, 2000)

    });
    $('#homePlaylistModal').modal('show');
  }

  renderPlaylist2(playlistId) {
    // console.log("HERE IS THE PLAYLIST ID ARRAY IN RENDERPLAYLIST: ", playlistId)
    const that = this;
    this.setState({
      playlistId: playlistId.data,
      showSelectedPlaylist: false,
      showLoading: true,
    });
    setTimeout(function(){
      $('#loadingModal').modal('hide');
      that.setState({ showSelectedPlaylist: true });
    }, 3000)
  }

  render() {
    const settings = {
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      fade: false,
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
      <div className="home-container">
        <div className="home-page-container">
          <div className="carousel">
            <Slider {...settings}>
              <div className="top-page-container">
                <div className="home-carousel">
                  <img className="home-header-logo" src="./assets/gigify.svg"/>
                </div>
              </div>
              <a className="carousel-image panorama" data-toggle="modal"  data-target="#loadingModal" onClick={() => this.handleFirst()} />
              <a className="carousel-image govball" data-toggle="modal" data-target="#loadingModal" onClick={() => this.handleSecond()} />
            </Slider>
          </div>
          <div id="songkick-input">
              <div className="search-container">
                <form className="username-form form-group">
                  <div className="search-input form-group">
                    <input
                      type="text" className="username-input input-lg"
                      autoComplete="off"
                      id="inlineFormInputGroup" placeholder="Enter Songkick username..."
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
                <ToggleDisplay id="toggle-search-gif" show={this.state.showLoadingGif}>
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
              <ToggleDisplay id="toggle-genre-gif" show={this.state.showLoadingGifGenre}>
                <div className="input-loader">
                  <img
                    className="input-loader-gif" id="genre-loader"
                    src="../assets/loadingring.gif"
                  />
                </div>
              </ToggleDisplay>
              </div>
          </div>
          <div className="howto-container">
            <div className="howto-header">How to Gigify</div>
            <div className="howto-logos">
              <div className="howto col-xs">
                <img src="./assets/sk-badge-black.png" className="howto-logo" alt="Songkick Logo" />
                <p>Find all the upcoming gigs your favorite artists are playing</p>
              </div>
              <i className="fa fa-chevron-right fa-2x" aria-hidden="true"></i>
              <div className="howto col-xs">
                <img src="./assets/music_playlist.svg" className="howto-logo" alt="Playlist Logo" />
                <p>Pick the gigs you'd like to add to your playlist</p>
              </div>
              <i className="fa fa-chevron-right fa-2x" aria-hidden="true"></i>
              <div className="howto col-xs">
                <img src="./assets/Spotify_Icon_RGB_Black.png" className="howto-logo" alt="Spotify Logo" />
                <p>Jam out to your favorite artists and the folks they have tagging along</p>
              </div>
            </div>
          </div>
        </div>
        <ToggleDisplay id="event-list-toggle" show={this.state.showEventList}>
          <EventList
            id="event-list"
            playlistId={this.state.playlistId}
            showEventList={this.state.showEventList}
            renderPlaylist={playlistId => this.renderPlaylist2(playlistId)}
            listings={this.props.listings}
            showPlaylist={this.state.showSelectedPlaylist}
          />
        </ToggleDisplay>

        <ToggleDisplay id="playlist-toggle" show={this.state.showLoading}>
            <div className="modal fade playlist" id="loadingModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content-loading">
                <div className="modal-body loading-animation" >
                  <img className="loading-ring" src="./assets/ring.svg" />
                </div>
              </div>
            </div>
          </div>
          </ToggleDisplay>

      <ToggleDisplay id="show-playlist" show={this.state.showPlaylist}>
        <div className="modal fade playlist" id="homePlaylistModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Gigify Spotlight Playlist</h4>
            </div>
            <div className="modal-body">
              <iframe
                src={`https://embed.spotify.com/?uri=spotify:user:${this.state.playlistId[0]}:playlist:${this.state.playlistId[1]}&theme=dark`}
                width="100%" height="600" frameBorder="0" allowTransparency="true"
              />
            </div>
          </div>
        </div>
      </div>
    </ToggleDisplay>
      <footer className="footer">
        <h6 className="footer-content container"><img className="footer-logo" src="./assets/gigify-g.svg"/> | <a href="https://github.com/gigify-music/gigify" className="github-link">Gigify Github</a></h6>
      </footer>
      </div>
    );
  }
}

const mapStatetoProps = ({ events, loading }) => ({
  listings: events.eventListings,
  loadingplaylist: loading,
});

export default connect(mapStatetoProps, { getEvents, gettingEvents })(Home);


/* <div>
  <EventList listings={this.props.listings} />
</div>*/

/*<ToggleDisplay id="playlist-toggle" show={this.state.showPlaylist}>
  <Playlist id="playlist" showPlaylist={this.state.showPlaylist} playlistId={this.state.playlistId} />
</ToggleDisplay>*/
