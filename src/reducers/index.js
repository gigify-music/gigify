import { combineReducers } from 'redux';
import events from './events';
// import toggle from './toggle';
import loading from './loading';
import username from './username';
// import displayEvents from './displayEvents'


const eventsApp = combineReducers({
  events,
  loading,
  username,
  // displayEvents,
  // toggle,
});

export default eventsApp;
