import React, { PropTypes } from 'react';
import Event from './Event';

const EventList = ({ events }) => (
  <ul>
    {events.map(event =>
      <Event
        key={event.headliner, event.supporting, event.venuename}
        {...event}
      />,
    )}
  </ul>
);

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    headliner: PropTypes.string.isRequired,
    supporting: PropTypes.string.isRequired,
    venuename: PropTypes.string.isRequired,
    venuelocation: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired),
};

export default EventList;
