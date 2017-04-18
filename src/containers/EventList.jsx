import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import SweetScroll from 'sweet-scroll';
import ToggleDisplay from 'react-toggle-display';
import { StickyContainer, Sticky } from 'react-sticky';
import Event from '../components/Event';


class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEvents: [],
      selected: {},
      displayWarning: false,
      currentVenue: '',
      currentdate: '',
      currentevent: '',
      reset: false,
      warningstate: false,
    };
    this.toggleEvent = this.toggleEvent.bind(this);
    this.generatePlaylist = this.generatePlaylist.bind(this);
    this.getVenue = this.getVenue.bind(this);
  }

  componentDidMount() {
    this.sweetScroll = new SweetScroll();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.displayWarning) {
      this.sweetScroll.toElement(document.getElementById('gigify-hr'));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading || prevState.displayWarning) {
      this.sweetScroll.toElement(document.getElementById('gigify-hr'));
    }
  }

  getVenue(value, callback) {
    this.setState({
      currentVenue: value.venue,
      currentdate: value.date,
      currentevent: value.eventname,
    }, () => {
      callback();
    });
  }

  toggleEvent(performers, id) {
    const selected = this.state.selected;
    if (selected[id]) {
      delete selected[id];
      this.setState({
        selected,
      });
      if ([...new Set([].concat(...(Object.values(this.state.selected))))].length <= 23) {
        this.setState({ displayWarning: false });
      }
      return;
    }

    selected[id] = performers;
    this.setState({
      selected,
    });
    const unique = [...new Set([].concat(...(Object.values(this.state.selected))))];

    if (unique.length > 23) {
      this.setState({
        displayWarning: true,
      });
    } else {
      this.setState({
        displayWarning: false,
      });
    }
  }

  generatePlaylist() {
    const selected = [...new Set([].concat(...(Object.values(this.state.selected))))];
    axios.post('/api/artists', {
      selected,
    })
    .then((res) => {
      this.props.renderPlaylist(res);
      setTimeout(() => {
        this.setState({ warningstate: true });
      }, 3000);
      this.props.renderPlaylist(res);
      this.setState({ reset: true });
      this.setState({ selected: {} });
      this.setState({ reset: false });
    })
    .catch(err =>
      console.error(err),
    );
  }

  render() {
    const ids = Object.keys(this.state.selected);

    const eventList = this.props.listings.map(event =>
      <Event
        key={event.id}
        {...event}
        toggleEvent={this.toggleEvent}
        locked={this.state.displayWarning}
        getVenue={this.getVenue}
        currentVenue={this.state.currentVenue}
        currentdate={this.state.currentdate}
        currentevent={this.state.currentevent}
        reset={this.state.reset}
      />,
  );

    const allSelected = eventList.filter((x) => {
      if (ids.includes(x.props.id.toString())) {
        return x;
      }
      return false;
    });

    const allUnselected = eventList.filter((x) => {
      if (!ids.includes(x.props.id.toString())) {
        return x;
      }
      return false;
    });

    const displayList = this.state.displayWarning ? allSelected.concat(allUnselected) : eventList;
    const selectedPerformers = [...new Set([].concat(...(Object.values(this.state.selected))))];
    const assignPerformers = [];

    selectedPerformers.forEach((performer, i) => {
      const newPair = {};
      newPair.name = performer;
      newPair.id = i;
      assignPerformers.push(newPair);
    });

    return (
      <div>
        <div className="top-event-container">
          <img id="gigify-hr" src="./assets/gigifyhr.png" alt="Gigify logo hr" />
          <div className="event-subheader">Click on events to add them to your playlist</div>
        </div>
        <div id="event-page" className="event-page-container">
          <StickyContainer>
            <div className="event-list-sidebar">
              <Sticky>
                <div className="scrolling-display animated fadeIn">
                  <button
                    className="btn playlist-btn btn-lg"
                    data-toggle="modal" data-target="#loadingModal"
                    onClick={this.generatePlaylist}
                  >Create Playlist
                </button>
                  <ToggleDisplay show={this.state.displayWarning}>
                    <div className="selectionWarning animated slideInLeft">
                      <div className="glyphicon glyphicon-exclamation-sign" />
                      <h4 className="warning-header">Maximum playlist length reached.</h4>
                      <h5
                        className="warning-sub"
                      >Please deselect an event or press Create Playlist to generate your playlist.
                      </h5>
                    </div>
                  </ToggleDisplay>
                  <ul className="list-group selected-artists">
                    <h4 className="selected-artists-header">Selected artists</h4>
                    <img
                      id="gigify-hr-selected"
                      alt="Gigify horizontal logo"
                      src="./assets/gigifyhr.png"
                    />

                    {assignPerformers.map(performer =>
                      <li className="selected-item animated flipInY" key={performer.id}>
                        {performer.name}
                      </li>)}
                  </ul>
                </div>
              </Sticky>
            </div>
          </StickyContainer>

          <div id="events" className="event-list-container">
            <ul className="list">
              {displayList}
            </ul>
          </div>
          <ToggleDisplay id="show-selected-playlist" show={this.props.showPlaylist}>
            <div
              className="modal fade playlist"
              id="playlistModal" tabIndex="-1"
              role="dialog" aria-labelledby="myModalLabel"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button" className="close"
                      data-dismiss="modal" aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4
                      className="modal-title" id="myModalLabel"
                    >This playlist has been added to your Spotify account!</h4>
                  </div>
                  <div className="modal-body">
                    <iframe
                      src={this.props.showplaylistStore && this.state.warningstate ? `https://embed.spotify.com/?uri=spotify:user:${this.props.playlistId[0]}:playlist:${this.props.playlistId[1]}&theme=dark` : 'about:blank'}
                      width="100%" height="600" frameBorder="0" allowTransparency="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ToggleDisplay>
        </div>
      </div>
    );
  }
}


EventList.propTypes = {
  listings: PropTypes.array.isRequired,
  renderPlaylist: PropTypes.func.isRequired,
  playlistId: PropTypes.array.isRequired,
  showPlaylist: PropTypes.bool.isRequired,
  showplaylistStore: PropTypes.bool.isRequired,
};

const mapStatetoProps = ({ loading, showplaylist }) => ({
  loading,
  showplaylistStore: showplaylist,
});

export default connect(mapStatetoProps, {})(EventList);
