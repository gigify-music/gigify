import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      checked: 'event-list-item-selected',
      unchecked: '',
      locked: 'locked-item',
      unlocked: '',
      phone: 0,
      eventname: '',
      date: '',

    };
    this.onToggleClick = this.onToggleClick.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.submitquery = this.submitquery.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.reset) {
      this.onToggleClick();
    }
  }

  onToggleClick() {
    if (!this.state.active && this.props.locked) {
      return false;
    }
    this.setState({
      active: !this.state.active,
    });
    this.props.toggleEvent(this.props.performers, this.props.id);
    return true;
  }

  updateNumber(input) {
    this.setState({ phone: input.target.value });
  }

  clickFunction() {
    this.props.getVenue.call(this, {
      currentVenue: this.props.venueName,
      date: `${this.props.date}/2017`,
      eventname: this.props.eventName,
    }, () => {
    });
  }

  submitquery() {
    axios.post('/api/addreminder', {
      date: this.props.currentdate,
      eventname: this.props.currentevent,
      phone: this.state.phone,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  render() {
    return (
      <li className={'noBullets'}>
        <div className={`event-list-item ${this.state.active ? this.state.checked : this.state.unchecked} ${!this.state.active && this.props.locked ? this.state.locked : this.state.unlocked}`}>
          <div role="button" onClick={this.onToggleClick} className="artist-image" style={{ backgroundImage: `url(${this.props.imageUrl})` }}>
            <div className="plus-sign">
              <i className="fa fa-plus-square" aria-hidden="true" />
            </div>
          </div>
          <div
            role="button"
            onClick={this.onToggleClick}
            className="col-sm-7 event-musicians-container"
          >
            <div className="event-musicians">
              <div className="headliner">{this.props.performers[0]}</div>
              <div className="supporting">{
                    this.props.performers.length === 1 ? 'Supporting Acts TBD' : this.props.performers.slice(1).join(', ',
                    )}
              </div>
            </div>
          </div>
          <div className="event-info-container col-sm-3">
            <div className="event-info">
              <div className="date">{this.props.date}</div>
              <div className="time">{this.props.time}</div>
              <div className="location">
                <a
                  className="venue"
                  href={this.props.venueUrl}
                >{this.props.venueName}
                </a>
              </div>
              <div className="info-btns">
                <a
                  target="_blank" rel="noreferrer noopener"
                  href={this.props.eventUrl} className="btn btn-sm ticket-btn"
                >Buy Tickets</a>
                <a
                  className="btn btn-sm ticket-btn" data-toggle="modal"
                  data-target="#trackEventModal" role="button"
                  onClick={() => this.clickFunction}
                >
                Track Event
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade trackEvent"
          id="trackEventModal" tabIndex="-1"
          role="dialog" aria-labelledby="myModalLabel"
        >
          <div className="modal-dialog" role="document">
            <div className="modalAlign">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button" className="close"
                    data-dismiss="modal" aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">Get a reminder via Text</h4>
                </div>
                <div className="modal-body twilio">
                  <form className="form-inline">
                    <div className="row telephone">
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="Enter Phone Number"
                        onChange={() => this.updateNumber}
                      />
                      <button
                        type="submit" className="btn btn-primary"
                        onClick={() => this.submitquery} data-dismiss="modal"
                      >Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

Event.propTypes = {
  locked: PropTypes.bool.isRequired,
  getVenue: PropTypes.func.isRequired,
  eventName: PropTypes.string.isRequired,
  currentdate: PropTypes.string.isRequired,
  currentevent: PropTypes.string.isRequired,
  eventUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  toggleEvent: PropTypes.func.isRequired,
  performers: PropTypes.arrayOf(PropTypes.string).isRequired,
  venueName: PropTypes.string.isRequired,
  venueUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Event;
