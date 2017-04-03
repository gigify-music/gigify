import React, { PropTypes, Component } from 'react';
import Event from './Event';

class EventList extends Component {
  constructor({ listings, onPlaylistClick }) {
    super({ listings, onPlaylistClick });
    this.state = {
      selected: [],
    };
    this.selectEvent = this.selectEvent.bind(this);
  }

  selectEvent(eventArtists) {
    console.log('SELECTED ARTISTS', eventArtists);
    const temp = this.state.selected.slice();
    temp.push(eventArtists);
    this.setState({
      selected: temp,
    });
  }

  render() {
    return (
      <div className="event-page-container">
        <div className="event-list-container">
          <ul>
            {listings.map((event, i) =>
              <Event
                key={i}
                {...event}
                onClick={() => this.selectEvent(eventArtists)}
              />,
        )}
          </ul>
        </div>
      </div>
    );
  }
}


EventList.propTypes = {
  // onPlaylistClick: PropTypes.func.isRequired,
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
