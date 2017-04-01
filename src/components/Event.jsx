import React, { PropTypes } from 'react';

const Event = ({
  headliner,
  supporting,
  venuename,
  venuelocation,
  date,
  time,
 }) => (
   <li>
     <div className="eventItem">
       <h3>{headliner}</h3>
       <p>{supporting}</p>
       <a href="{venuelocation}"><p>{venuename}</p></a>
       <p>{date}</p>
       <p>{time}</p>
     </div>
   </li>
);

Event.propTypes = {
  headliner: PropTypes.string.isRequired,
  supporting: PropTypes.string.isRequired,
  venuename: PropTypes.string.isRequired,
  venuelocation: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default Event;


// Headliner, support (all in array), venue name, venue url,
