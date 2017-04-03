import { combineReducers } from 'redux';
import events from './events';
import loading from './loading';


const eventsApp = combineReducers({
  events,
  loading,
});

export default eventsApp;
