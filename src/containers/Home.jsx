import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import ToggleDisplay from 'react-toggle-display';
import EventList from './EventList';
import { setPlaylistIds, showPlaylist, showLoadingPlaylist, loadingFeatured } from '../actions/index';
import SongKick from './Songkick';
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
      loadingFeaturePlaylist: false,
    };
    this.handleFirst = this.handleFirst.bind(this);
    this.handleSecond = this.handleSecond.bind(this);
  }

  componentWillMount() {
    axios.get('/api/checksession').then((data) => {
      if (data.data === 'logged') {
        this.setState({
          authenticate: true,
        });
      } else {
        window.location = '/auth/signin';
      }
    }).catch((err) => {
      this.setState({
        authenticate: false,
      })
      window.location = '/auth/signin';
      console.err(err);
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
    this.props.setPlaylistIds(govballPlaylist.data);
    this.renderFeaturePlaylist(govballPlaylist);
  }


  renderFeaturePlaylist(playlistId) {
    this.props.setPlaylistIds(playlistId.data);
    this.props.showLoadingPlaylist(true);
    this.props.loadingFeatured(true);
    setTimeout(() => {
      $('#loadingModal').modal('hide');
      this.props.showLoadingPlaylist(false);
      this.props.showPlaylist(true);
      $('#homePlaylistModal').modal('show');
    }, 3000)
  }

  renderUserPlaylist(playlistId) {
    this.props.showLoadingPlaylist(true);
    this.setState({
      playlistId: playlistId.data,
      showSelectedPlaylist: false,
    });
    setTimeout(() => {
      this.props.showLoadingPlaylist(false);
      this.props.showPlaylist(true);
      this.setState({ loadingFeaturePlaylist: true });
      $('#loadingModal').modal('hide');
      this.setState({ showSelectedPlaylist: true });
      $('#playlistModal').modal('show');
    }, 3000);
  }

  render() {
    if (this.state.authenticate === false) {
      return (<div />);   //  Empty page while authorization is checked before
                          // redirect to login
    }
    return (
      <div className="home-container">
        <div className="home-page-container">
          <Carousel
            handleFirst={this.handleFirst}
            handleSecond={this.handleSecond}
          />
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
          <h6 className="footer-content container"><img className="footer-logo" src="./assets/gigify-g.svg" alt="Smiley face" /> | <a href="https://github.com/gigify-music/gigify" className="github-link">Gigify Github</a></h6>
        </footer>
      </div>
    );
  }
}

Home.propTypes = {
  listings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    performers: PropTypes.array.isRequired,
    venueName: PropTypes.string.isRequired,
    venueUrl: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired),
  loadingeventlist: PropTypes.bool.isRequired,
  setPlaylistIds: PropTypes.func.isRequired,
  showLoadingPlaylist: PropTypes.func.isRequired,
  showEvents: PropTypes.bool.isRequired,
  showPlaylist: PropTypes.func.isRequired,
  loadingFeatured: PropTypes.func.isRequired,
};

const mapStatetoProps = ({ events, loading }) => ({
  listings: events.eventListings,
  showEvents: events.showEvents,
  loadingeventlist: loading,
});

export default connect(mapStatetoProps,
  { setPlaylistIds, showLoadingPlaylist, showPlaylist, loadingFeatured })(Home);
