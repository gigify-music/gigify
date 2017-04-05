import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import EventList from '../components/EventList';
import { getEvents } from '../actions';
import Splash from '../components/Splash';
import Playlist from '../components/Playlist';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      showEventList: false,
      showPlaylist: false,
    };
  }
  onGenerateClick(username) {
    console.log('USERNAME', username);
    this.props.getEvents()
      .then(() => {
        this.setState({ showEventList: true });
      });
  }
  renderPlaylist(playListID) {
    console.log('AH! REAL MONSTERS');
    this.setState({ showPlaylist: true });
  }
  render() {
    return (
      <div>
        <Splash onGenerateClick={username => this.onGenerateClick(username)} />
        <ToggleDisplay show={this.state.showEventList}>
          <EventList
            renderPlaylist={playListID => this.renderPlaylist(playListID)}
            listings={this.props.listings}
          />
        </ToggleDisplay>
        <ToggleDisplay show={this.state.showPlaylist}>
          <Playlist />
        </ToggleDisplay>
      </div>
    );
  }
}

const mapStatetoProps = ({ events }) => {
  console.log('EVENT', events);
  return {
    listings: events.eventListings,
  };
};

export default connect(mapStatetoProps, { getEvents })(Home);


/* <div>
  <EventList listings={this.props.listings} />
</div>*/
