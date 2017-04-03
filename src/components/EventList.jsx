import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import Event from './Event';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
    this.selectEvent = this.selectEvent.bind(this);
    this.generatePlaylist = this.generatePlaylist.bind(this);
  }

  selectEvent(performers) {
    console.log('SELECTED ARTISTS', performers);

    const temp = this.state.selected.slice();
    performers.forEach(performer => temp.push(performer));
    const unique = [...new Set(temp)];
    this.setState({
      selected: unique,
    });
    console.log('NEW STATE', this.state.selected);
  }

  generatePlaylist() {
    axios.post('/api/artists', {
      selected: this.state.selected,
    })
    .then(res =>
      console.log('RESPONSE PLAYLIST', res),
    )
    .catch(err =>
      console.errror(err),
    );
  }

  render() {
    return (
      <div className="event-page-container">
        <button onClick={this.generatePlaylist}>Generate Playlist of Selected</button>
        <div className="event-list-container">

          <ul>
            <label>Selected performers:</label>
            {this.state.selected.map(performer =>
              <li>
                {performer}
              </li>)}
          </ul>

          <ul>
            {this.props.listings.map((event, i) =>
              <Event
                key={i}
                {...event}
                selectEvent={this.selectEvent}
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
    performers: PropTypes.array.isRequired,
    venueName: PropTypes.string.isRequired,
    venueUrl: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired),
};

export default EventList;

            // {loading ? 'Loading...' : ''}
