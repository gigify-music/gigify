import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import EventList from '../components/EventList';
import GenerateList from '../components/GenerateList';
import { getEvents } from '../actions';
import Splash from '../components/Splash';
import ToggleDisplay from 'react-toggle-display';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      showEventList: false,
      showPlaylist: false,
    };
  }
  onGenerateClick() {
    console.log('SUP INTERNET?');
    this.props.getEvents()
      .then(() => {
        this.setState({ showEventList: true });
      });
  }
  render() {
    return (
      <div>
        <Splash onGenerateClick={() => this.onGenerateClick()} />
        <ToggleDisplay show={this.state.showEventList}>
          <EventList listings={this.props.listings} />
        </ToggleDisplay>
      </div>
    );
  }
}

const mapStatetoProps = ({ events }) => {
  console.log('EVENT', events);
  return {
    listings: events.eventListings,
  };
};

export default connect(mapStatetoProps, { getEvents })(Home);


/* <div>
  <EventList listings={this.props.listings} />
</div>*/
