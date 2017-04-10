import React, { PropTypes, Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      checked: 'glyphicon glyphicon-check checkBox animated fadeIn',
      unchecked: 'glyphicon glyphicon-unchecked checkBox',
    };
    this.onToggleClick = this.onToggleClick.bind(this);
  }

  onToggleClick() {
    this.setState({
      active: !this.state.active,
    });
    this.props.toggleEvent(this.props.performers, this.props.id);
  }

  render() {
    return (
      <li className="noBullets">
        <div className="row event-list-item">
          <div className="col-sm-2 event-checkbox">
            <button
              disabled={this.props.locked && !this.state.active}
              className={this.state.active ? this.state.checked : this.state.unchecked}
              onClick={this.onToggleClick}
            />
          </div>
          <div className="col-sm-7 event-musicians-container">
            <div className="event-musicians">
              <label className="headliner">{this.props.performers[0]}</label>
              <label className="supporting">{
                    this.props.performers.length === 1 ? 'Supporting Acts TBD' : this.props.performers.slice(1).join(', ',
                    )}
              </label>
            </div>
          </div>
          <div className="event-info-container col-sm-3">
            <div className="event-info">
              <div className="date">{this.props.date}</div>
              <div className="time">{this.props.time}</div>
              <div className="location"><a className="venue" href={this.props.venueUrl}><p>{this.props.venueName}</p></a></div>
              <div className="info-btns">
                <a target="_blank" href={this.props.eventUrl}  className="btn btn-sm ticket-btn">Buy Tickets</a>
                <a
                  className="btn btn-sm ticket-btn" data-toggle="modal"
                  data-target="#trackEventModal"
                  onClick={this.props.getVenue.bind(this, this.props.venueName, function(data){
                    console.log(this.props.venueName, "INside Event Callback")
                  }.bind(this), this)}
                >
                Track Event
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade trackEvent" id="trackEventModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modalAlign">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Get a reminder via Text  </h4>
              </div>
              <div className="modal-body twilio">
                  <div className="form-inline row telephone">
                      <input className="form-control" type="tel" placeholder="1-(555)-555-5555" id="example-tel-input" />
                      <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </li>
    );
  }

// <button className="btn btn-success btn-lg" data-toggle="modal" data-target="#playlistModal" onClick={this.generatePlaylist}>Create Playlist</button>
}

Event.propTypes = {
  locked: PropTypes.bool.isRequired,
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
