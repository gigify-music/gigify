import axios from 'axios';
import * as types from '../constants/actionTypes';

let nextEntryId = 0;

export const addEntry = value => ({
  type: types.ADD_ENTRY,
  id: nextEntryId++,
  value,
});

// export const getTestString = () => (dispatch) => {
//   shop.getEntries((products) => {
//     dispatch(receiveProducts(products));
//   });
// };
