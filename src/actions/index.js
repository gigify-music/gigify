import axios from 'axios';
import * as types from '../constants/actionTypes';

let nextEventId = 0;

export const addEvent = value => ({
  type: types.ADD_EVENT,
  id: nextEventId++,
  headliner,
  supporting,
  venuename,
  venuelocation,
  time,
  date,
});

// export const getTestString = () => (dispatch) => {
//   shop.getEntries((products) => {
//     dispatch(receiveProducts(products));
//   });
// };
