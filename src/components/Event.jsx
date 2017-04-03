import React, { PropTypes } from 'react';

const Event = ({
  selectEvent,
  performers,
  venueName,
  venueUrl,
  date,
  time,
 }) => (
   <li onClick={selectEvent.bind(this, performers)}>

     <div className="event-list-item">
       <div className="event-checkbox" />
       <div className="event-musicians-container">
         <div className="event-musicians">
           <label className="headliner">{performers[0]}</label>
           <label className="supporting">{
               performers.length === 1 ? 'Supporting Acts TBD' : performers.slice(1).join(', ',
               )}
           </label>
         </div>
       </div>
       <div className="event-info-container">
         <div className="event-info">
           <label className="date">{date}</label>
           <label className="time">{time}</label>
           <label className="location"><a href={venueUrl}><p>{venueName}</p></a></label>
         </div>
       </div>
     </div>

   </li>
);

Event.propTypes = {
  selectEvent: PropTypes.func.isRequired,
  performers: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  venueName: PropTypes.string.isRequired,
  venueUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default Event;
