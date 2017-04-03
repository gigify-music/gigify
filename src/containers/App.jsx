import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddEvent from '../containers/AddEvent';
import EventList from '../components/EventList';
import GenerateList from '../components/GenerateList';
import { getEvents } from '../actions';

// class App extends Component {
//   static propTypes = {
//     test: PropTypes.string
//   }
//
//   render() {
//     const { test } = this.props;
//       return (
//         <div>
//           <h1>{test}</h1>
//         </div>
//       )
//   }
// }

class App extends Component {

onGenerateClick = () => {
  this.props.getEvents()
}

// onEventClick = () => {
//   this.props.
// }

  render() {
    console.log('RENDER LIST', this.props.listings);
    return (
      <div>
        <GenerateList onGenerateClick={this.onGenerateClick} />
        <EventList listings={this.props.listings} onPlaylistClick={this.onPlaylistClick} />
      </div>
    );
  }
}

const mapStatetoProps = ({ events }) => {
  console.log('EVENT', events);
  return {
  listings: events.eventListings
  }
}

export default connect(mapStatetoProps, { getEvents } )(App);
