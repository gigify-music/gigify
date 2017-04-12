import React, { PropTypes, Component } from 'react';
import axios from 'axios';


class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      checked: '',
      unchecked: '',
      phone:0,
      eventname:'',
      date:'',

    };
    this.onToggleClick = this.onToggleClick.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.submitquery = this.submitquery.bind(this);
  }

  onToggleClick() {
    this.setState({
      active: !this.state.active,
    });
    console.log('THIS IMAGE', this.props.imageUrl);
    this.props.toggleEvent(this.props.performers, this.props.id);
  }

  updateNumber(input) {
    this.setState({ phone: input.target.value });
    // console.log(this.state.phone, "PHONEEE");
    // callback();

    // axios.get(`api/addreminder/${this.state.query}`)

  }

  clickFunction(phone) {
    this.props.getVenue.call(this, {
      currentVenue: this.props.venueName,
      date:`${this.props.date}/2017`,
      eventname:this.props.eventName,
    }, function () {

      console.log(this.props.venueName, this.props.currentevent, this.props.currentdate, this.state.phone, "INside Event Callback")
    }.bind(this), this);
    // this.updateNumber(phone, function () {
    //   console.log("done");
    // });
  }

  submitquery() {
    // let query = `insert into reminder (date, eventname, phone, status) values ('${this.props.currentdate}', '${this.props.currentevent}', ${this.state.phone}, 0)`;
    // query.replace(/'/g, '"');
    // console.log(query, 'query here');
    axios.post(`/api/addreminder`, {
      date:this.props.currentdate,
      eventname:this.props.currentevent,
      phone:this.state.phone,
    })
    .then((response) => {
      console.log(response, "response frok reminder api")
    })
    .catch((error) => {
      console.log(error, 'error in get api/reminder on submit');
    });
  }


  render() {
    // const eventStyling = 'event-list-item' +
    // console.log(this.state.phone, "PHONEEE");
    // console.log(this.props, "state phone heree")
    return (
      <li onClick={this.onToggleClick} className="noBullets" disabled={this.props.locked && !this.state.active}>
        <div
          className={`event-list-item ${this.state.active ? this.state.checked : this.state.unchecked}`}>
            <div className="artist-image col-sm-3" style={{ 'background-image': `url(${this.props.imageUrl})` }}>
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
              <div className="location"><a className="venue" href={this.props.venueUrl}>{this.props.venueName}</a></div>
              <div className="info-btns">
                <a target="_blank" href={this.props.eventUrl}  className="btn btn-sm ticket-btn">Buy Tickets</a>
                <a
                  className="btn btn-sm ticket-btn" data-toggle="modal"
                  data-target="#trackEventModal"
                  onClick={this.clickFunction.bind(this)}
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
                      <input
                        className="form-control" type="tel"
                        placeholder="1-(555)-555-5555"
                        id="example-tel-input"
                        onChange={this.updateNumber.bind(this)}
                      />
                    <button type="submit" className="btn btn-primary" onClick={this.submitquery.bind(this)}>Submit</button>
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
  imageUrl: PropTypes.string.isRequired,
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


// <div className="col-sm-4 event-checkbox">
// <button

//   onClick={this.onToggleClick}
// />
// </div>
