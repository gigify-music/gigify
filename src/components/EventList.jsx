import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import SweetScroll from 'sweet-scroll';
import ToggleDisplay from 'react-toggle-display';
import Infinite from 'react-infinite';
import Event from './Event';



class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      displayWarning: false,
      currentVenue: '',
      currentdate:'',
      currentevent:'',
    };
    this.toggleEvent = this.toggleEvent.bind(this);
    this.generatePlaylist = this.generatePlaylist.bind(this);
    this.getVenue = this.getVenue.bind(this);
  }

  toggleEvent(performers, id) {
    const selected = this.state.selected;
    if (selected[id]) {
      delete selected[id];
      this.setState({
        selected,
      });
      [...new Set([].concat(...(Object.values(this.state.selected))))].length <= 5 ? this.setState({ displayWarning: false }) : console.log('OK');
      return;
    }
    selected[id] = performers;
    this.setState({
      selected,
    });
    const unique = [...new Set([].concat(...(Object.values(this.state.selected))))];

    if (unique.length > 5) {
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
      selected: selected,
    })
    .then((res) => {
      console.log("RESPONSE FROM SERVER FROM /ARTISTS: ", res);
      this.props.renderPlaylist(res);
    })
    .catch(err =>
      console.error(err),
    );
  }

  getVenue(value, callback) {
    this.setState({
      currentVenue: value.venue,
      currentdate: value.date,
      currentevent: value.eventname,
    }, function () {  //{currentVenue: props}
      console.log('inside getVenue-- currentVenue is: ',
      this.state.currentVenue,
      this.state.currentdate,
      this.state.currentevent
    )
      callback();
      // return { currentVenue:value }
    });
  }

  componentDidMount() {
    this.sweetScroll = new SweetScroll();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.showEventList) {
      console.log("SHOULD SCROLL");
      this.sweetScroll.toElement(document.getElementById('gigify-hr'));
    }
  }

  render() {
    const selectedPerformers = [...new Set([].concat(...(Object.values(this.state.selected))))];
    return (
      <div>
        <div className="top-event-container">
          <img id="gigify-hr" src="./assets/gigifyhr.png" />
          <div className="event-subheader">Click on events to add them to your playlist</div>
        </div>
      <div id="event-page" className="event-page-container">
        <div className="event-list-sidebar col-sm-2">
          <div className="scrolling-display animated fadeIn" data-spy="affix" data-offset-top="620">
            <button className="btn playlist-btn btn-lg" data-toggle="modal" data-target="#playlistModal" onClick={this.generatePlaylist}>Create Playlist</button>
            <ToggleDisplay show={this.state.displayWarning}>
              <div className="selectionWarning animated slideInLeft">
                <h3>You've reached the maximum playlist length.</h3>
                <h4>Either deselect an event or press submit to generate your playlist.</h4>
              </div>
            </ToggleDisplay>
            <ul className="list-group selected-artists">
              <h4 className="selected-artists-header">Selected artists</h4>
              {selectedPerformers.map(performer =>
                <li className="selected-item animated flipInY">
                  {performer}
                </li>)}
            </ul>
          </div>

        </div>

        <div id="events" className="col-sm-10 event-list-container">
          <ul className="list">
            {this.props.listings.map((event, i) =>
              <Event
                key={i}
                {...event}
                toggleEvent={this.toggleEvent}
                locked={this.state.displayWarning}
                getVenue={this.getVenue}
                currentVenue={this.state.currentVenue}
                currentdate={this.state.currentdate}
                currentevent={this.state.currentevent}

              />,
        )}
          </ul>
        </div>
        <div className="modal fade playlist" id="playlistModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">This playlist has been added to your Spotify account!</h4>
              </div>
              <div className="modal-body">
                <iframe
                  src={`https://embed.spotify.com/?uri=spotify:user:${this.props.playlistId[0]}:playlist:${this.props.playlistId[1]}&theme=dark`}
                  width="100%" height="600" frameBorder="0" allowTransparency="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}


EventList.propTypes = {
  listings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    // active: PropTypes.bool.isRequired,
    performers: PropTypes.array.isRequired,
    venueName: PropTypes.string.isRequired,
    venueUrl: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired),
  renderPlaylist: PropTypes.func.isRequired,
};

// const mapStatetoProps = ({ events }) => ({
//   lockedEvents: events.locked,
// });

// export default connect(mapStatetoProps, { lockEvents })(EventList);

export default EventList;

// else if (selected[id]) {
//   delete selected[id];
//   this.setState({
//     selected,
//   });
//   console.log('AFTER DELETE PASSED UNIQUE', [...new Set([].concat(...(Object.values(this.state.selected))))]);
// }

            // {loading ? 'Loading...' : ''}
