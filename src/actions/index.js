import axios from 'axios';
import * as types from '../constants/actionTypes';

export function getEvents() {
  return dispatch => axios.get('/api/events')
    .then(({ data }) => {
      // data.forEach((event) => { event.active = false; });
      data.forEach((event, i) => { event.id = i; });
      console.log('GET EVENTS RESULTS', data);
      return dispatch({
        type: types.GET_EVENTS_DATA_RECEIVED,
        payload: data,
      });
    });
}

// export function toggleActive(id) {
//   return ({
//     type: types.TOGGLE_ACTIVE,
//     payload: id,
//   });
// }
