import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import EventList from './EventList';
import { setPlaylistIds, showPlaylist, showLoadingPlaylist } from '../actions/index';
import SongKick from './SongKick';
import Playlists from './Playlists';
import HowTo from '../components/HowTo';
import Carousel from '../components/Carousel';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticate: false,
      playlistId: [],
      username: '',
      showLoadingGif: false,
      showSelectedPlaylist: false,
    };
  }

  componentWillMount() {
    console.log('BEFORE MOUNT');
    axios.get('/api/checksession').then((data) => {
      if (data.data === 'logged') {
        this.setState({
          authenticate: true,
        })
      } else {
        window.location = '/auth/signin';
      }
    }).catch((err) => {
      this.setState({
        authenticate: false,
      })
      window.location = '/auth/signin';
    });
  }

  componentWillUpdate() {
    !(this.props.loadingeventlist)
    ? this.props.loadingeventlist
    : this.setState({ showLoadingGif: false, showLoadingGifGenre: false });
  }

  handleFirst() {
    const panoramaPlaylist = {
      data: ['panoramanyc', '3Tx6bcrYcvmAA9sblNLPrH'],
    };
    this.renderFeaturePlaylist(panoramaPlaylist);
  }

  handleSecond() {
    const govballPlaylist = {
      data: [1265233623, '5lRkpBlgVkBEmVNYSp9BmB'],
    };
    this.renderFeaturePlaylist(govballPlaylist);
  }


  renderFeaturePlaylist(playlistId) {
    const that = this;
    this.props.setPlaylistIds(playlistId.data);
    this.props.showLoadingPlaylist(true);
      setTimeout(function() {
        $('#loadingModal').modal('hide');
        that.props.showLoadingPlaylist(false);
        // that.props.showPlaylist(true);
    }, 2000)

    $('#homePlaylistModal').modal('show');
  }

  renderUserPlaylist(playlistId) {
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
    if (this.state.authenticate === false) {
      return (<div />);   //Empty page while authorization is checked before
                          // redirect to login
    }
    return (
      <div className="home-container">
        <div className="home-page-container">
          <Carousel />
          <SongKick />
          <HowTo />
        </div>

        <ToggleDisplay id="event-list-toggle" show={this.props.showEvents}>
          <EventList
            id="event-list"
            playlistId={this.state.playlistId}
            renderPlaylist={playlistId => this.renderUserPlaylist(playlistId)}
            listings={this.props.listings}
            showPlaylist={this.state.showSelectedPlaylist}
          />
        </ToggleDisplay>

        <Playlists />

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

export default connect(mapStatetoProps, { setPlaylistIds, showLoadingPlaylist })(Home);
