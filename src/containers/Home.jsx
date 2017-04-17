import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import EventList from '../components/EventList';
import { getEvents, gettingEvents, setPlaylistIds, showPlaylist, showLoadingPlaylist } from '../actions/index';
import SongKick from '../components/SongKick';
import HomePlaylist from '../components/HomePlaylist';
import Genres from '../components/Genres';
import HowTo from '../components/HowTo';


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
      showSelectedPlaylist: false,
    };
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
    !(this.props.loadingeventlist)
    ? this.props.loadingeventlist
    : this.setState({ showLoadingGif: false, showLoadingGifGenre: false });
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


  renderPlaylist(playlistId) {
    // console.log("HERE IS THE PLAYLIST ID ARRAY IN RENDERPLAYLIST: ", playlistId)
    const that = this;
    this.props.setPlaylistIds(playlistId.data);
    this.props.showLoadingPlaylist(true);
      setTimeout(function() {
        $('#loadingModal').modal('hide');
        that.props.showLoadingPlaylist(false);
        that.props.showPlaylist(true);
    }, 2000)

    $('#homePlaylistModal').modal('show');
  }

  renderPlaylist2(playlistId) {
    // console.log("HERE IS THE PLAYLIST ID ARRAY IN RENDERPLAYLIST: ", playlistId)
    const that = this;
    this.props.showLoadingPlaylist(true);
    this.setState({
      playlistId: playlistId.data,
      showSelectedPlaylist: false,
    });
    setTimeout(function(){
      that.props.showLoadingPlaylist(false);
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
                          // redirect to login
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

          <SongKick />
          <HowTo />
        </div>
        <ToggleDisplay id="event-list-toggle" show={this.props.showEvents}>
          <EventList
            id="event-list"
            playlistId={this.state.playlistId}
            showEventList={this.state.showEventList}
            renderPlaylist={playlistId => this.renderPlaylist2(playlistId)}
            listings={this.props.listings}
            showPlaylist={this.state.showSelectedPlaylist}
          />
        </ToggleDisplay>


        <HomePlaylist />

      <footer className="footer">
        <h6 className="footer-content container"><img className="footer-logo" src="./assets/gigify-g.svg"/> | <a href="https://github.com/gigify-music/gigify" className="github-link">Gigify Github</a></h6>
      </footer>
      </div>
    );
  }
}

const mapStatetoProps = ({ events, loading }) => ({
  listings: events.eventListings,
  showEvents: events.showEvents,
  loadingplaylist: loading,
});

export default connect(mapStatetoProps, { getEvents, gettingEvents, setPlaylistIds, showPlaylist, showLoadingPlaylist })(Home);
