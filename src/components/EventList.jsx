import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import Event from './Event';


class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      displayWarning: false,
    };
    this.toggleEvent = this.toggleEvent.bind(this);
    this.generatePlaylist = this.generatePlaylist.bind(this);
  }

  toggleEvent(performers, id) {
    console.log('SELECTED PERFORMERS', performers, id);
    console.log('SELECTED STATE', [...new Set([].concat(...(Object.values(this.state.selected))))]);
    const selected = this.state.selected;

    if (selected[id]) {
      delete selected[id];
      this.setState({
        selected,
      });
      [...new Set([].concat(...(Object.values(this.state.selected))))].length <= 5 ? this.setState({ displayWarning: false }) : console.log('OK');
      console.log('AFTER DELETE', [...new Set([].concat(...(Object.values(this.state.selected))))]);
      return;
    }
    selected[id] = performers;
    this.setState({
      selected,
    });
    console.log('ADDED TO STATE', [...new Set([].concat(...(Object.values(this.state.selected))))]);
    const unique = [...new Set([].concat(...(Object.values(this.state.selected))))];

    if (unique.length > 5) {
      console.log('WARNING TRIGGERED HERE', [...new Set([].concat(...(Object.values(this.state.selected))))]);
      this.setState({
        displayWarning: true,
      });
    } else {
      this.setState({
        displayWarning: false,
      });
    }
    console.log('NUMBER SELECTED', unique.length);
  }

  generatePlaylist() {
    const selected = Object.values(this.state.selected);
    const flatten = [].concat(...selected);
    const unique = [...new Set(flatten)];
    axios.post('/api/artists', {
      selected: unique,
    })
    .then((res) => {
      // console.log('RESPONSE PLAYLIST', res);
      this.props.renderPlaylist(res);
    })
    .catch(err =>
      console.error(err),
    );
  }

  render() {
    const selectedPerformers = [...new Set([].concat(...(Object.values(this.state.selected))))];
    console.log('SELECTED PERFORMERS', selectedPerformers);

    return (
      <div id="event-page" className="event-page-container">
        <div className="event-list-sidebar">
          <button onClick={this.generatePlaylist}>Generate Playlist of Selected</button>
          <ToggleDisplay show={this.state.displayWarning}>
            <div className="selectionWarning animated slideInLeft">
              <h3>You've reached the maximum playlist length.</h3>
              <h4>Either deselect an event or press submit to generate your playlist.</h4>
            </div>
          </ToggleDisplay>
        </div>
        <ul className="list-group">
          <text>Selected performers:</text>
          {selectedPerformers.map(performer =>
            <li className="list-group-item">
              {performer}
            </li>)}
        </ul>


        <div className="event-list-container">
          <ul>
            {this.props.listings.map((event, i) =>
              <Event
                key={i}
                {...event}
                toggleEvent={this.toggleEvent}
                locked={this.state.displayWarning}
              />,
        )}
          </ul>
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
