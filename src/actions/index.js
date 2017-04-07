import axios from 'axios';
import * as types from '../constants/actionTypes';

export function getEvents({ data }) {
  console.log('DATA', data);
  data.forEach((event, i) => { event.id = i; });
  return {
    type: types.GET_EVENTS_DATA_RECEIVED,
    payload: data,
  };
}

// export function lockEvents() {
//   return ({
//     type: types.TOGGLE_LOCKED,
//     payload: id,
//   });
// }
