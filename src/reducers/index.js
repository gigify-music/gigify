import { combineReducers } from 'redux';
import events from './events';
// import toggle from './toggle';
import loading from './loading';


const eventsApp = combineReducers({
  events,
  loading,
  // toggle,
});

export default eventsApp;
