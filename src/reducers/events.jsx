// const event = (state, action) => {
//   switch (action.type) {
//     case 'SELECT_EVENT':
//       if (state.id !== action.id) {
//         return state;
//       }
//       return {
//         ...state,
//         selected: !state.selected,
//       };
//     default:
//       return state;
//   }
// };

const initialState = {
  eventListings: [],
  selectedEvents: [],
};

const events = (state = initialState, action) => {
  switch (action.type) {
    // case 'SELECT_EVENT':
    //   return state.map(s => event(s, action),
    // );
    case 'GET_EVENTS_DATA_RECEIVED':
      return { ...state, eventListings: action.payload };
    default:
      return state;
  }
};


export default events;
