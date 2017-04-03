import React, { PropTypes } from 'react';
import Event from './Event';

const EventList = ({ listings, onEventClick, loading }) => (
  <div className="event-page-container">
    <div className="event-list-container">
      <ul>
        {loading ? 'Loading...' : ''}
        {listings.map((event, i) =>
          <Event
            key={i}
            {...event}
            onClick={() => onEventClick(event.id)}
          />,
    )}
      </ul>
    </div>
  </div>
);

EventList.propTypes = {
  onEventClick: PropTypes.func.isRequired,
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
