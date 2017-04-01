import { combineReducers } from 'redux';
import events from './events';


const eventsApp = combineReducers({
  events,
});

export default eventsApp;
