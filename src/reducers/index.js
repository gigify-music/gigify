import { combineReducers } from 'redux';
import events from './events';
// import toggle from './toggle';
import loading from './loading';
import username from './username';
import loadingplaylist from './loadingplaylist';
import showplaylist from './showplaylist';
import playlistid from './playlistid';
// import displayEvents from './displayEvents'


const eventsApp = combineReducers({
  events,
  loading,
  username,
  loadingplaylist,
  showplaylist,
  playlistid,
  // displayEvents,
  // toggle,
});

export default eventsApp;
