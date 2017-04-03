import axios from 'axios';
import * as types from '../constants/actionTypes';

export function getEvents() {
  return dispatch => axios.get('/api/events')
    .then(({ data }) => {
      console.log('GET EVENTS RESULTS', data);
      return dispatch({
        type: types.GET_EVENTS_DATA_RECEIVED,
        payload: data,
      });
    });
}


export const selectEvent = id => ({
  type: 'SELECT_EVENT',
  id,
});
