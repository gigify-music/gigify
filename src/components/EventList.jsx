import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
// import { connect } from 'react-redux';
// import { toggleActive } from '../actions';
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
    // this.props.toggleActive(id);

    console.log('SELECTED STATE', this.state.selected);
    const selected = this.state.selected;

    if (selected[id]) {
      delete selected[id];
    }

    const items = Object.values(this.state.selected);
    const flatten = [].concat(...items);
    const unique = [...new Set(flatten)];
    console.log('NUMBER SELECTED', unique.length);

    if (unique.length > 5) {
      this.setState({
        displayWarning: true,
      });
    } else {
      selected[id] = performers;
      this.setState({
        displayWarning: false,
        selected,
      });
    }
    console.log('NEW STATE', this.state.selected);
  }

  generatePlaylist() {
    const selected = Object.values(this.state.selected);
    const flatten = [].concat(...selected);
    const unique = [...new Set(flatten)];
    axios.post('/api/artists', {
      selected: unique,
    })
    .then((res) => {
      console.log('RESPONSE PLAYLIST', res);
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
            <div className="selectionWarning">
              HERE IS A WARNING
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
//   activeEvents: events.active,
// });

export default EventList;

            // {loading ? 'Loading...' : ''}
