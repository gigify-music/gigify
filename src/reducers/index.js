import { combineReducers } from 'redux';
import events from './events';
import loading from './loading';
import username from './username';
import loadingplaylist from './loadingplaylist';
import showplaylist from './showplaylist';
import playlistid from './playlistid';
import loadingfeaturedplaylist from './loadingfeaturedplaylist';


const eventsApp = combineReducers({
  events,
  loading,
  username,
  loadingplaylist,
  showplaylist,
  playlistid,
  loadingfeaturedplaylist,
});

export default eventsApp;
