import { combineReducers } from 'redux';
import entries from './entries';


const entriesApp = combineReducers({
  entries,
});

export default entriesApp;
