import React, { PropTypes, Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      checked: 'glyphicon glyphicon-check checkBox animated fadeIn',
      unchecked: 'glyphicon glyphicon-unchecked checkBox',
    };
  }

  toggleActive() {
    console.log('TOGGLING ACTIVE');
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <li className="noBullets">
        <div className="event-list-item well well-lg">
          <div className="event-checkbox">
            <button
              className={this.state.active ? this.state.checked : this.state.unchecked}
              onClick={this.props.toggleEvent.bind(this, this.props.performers, this.props.id)}
            />
          </div>
          <div className="event-musicians-container">
            <div className="event-musicians">
              <label className="headliner">{this.props.performers[0]}</label>
              <label className="supporting">{
                    this.props.performers.length === 1 ? 'Supporting Acts TBD' : this.props.performers.slice(1).join(', ',
                    )}
              </label>
            </div>
          </div>
          <div className="event-info-container">
            <div className="event-info">
              <label className="date">{this.props.date}</label>
              <label className="time">{this.props.time}</label>
              <label className="location"><a href={this.props.venueUrl}><p>{this.props.venueName}</p></a></label>
            </div>
          </div>
        </div>
      </li>
    );
  }


}

Event.propTypes = {
  id: PropTypes.number.isRequired,
  toggleEvent: PropTypes.func.isRequired,
  performers: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  venueName: PropTypes.string.isRequired,
  venueUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default Event;

// () => { this.props.toggleEvent.bind(this, this.props.performers, this.props.id); this.toggleActive(); };

// id,
// toggleEvent,
// performers,
// venueName,
// venueUrl,
// date,
// time,
