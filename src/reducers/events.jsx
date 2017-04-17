const initialState = {
  eventListings: [],
  showEvents: false,
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENTS_DATA_RECEIVED':
      return { ...state, eventListings: action.payload, showEvents: true };
    default:
      return state;
  }
};

export default events;
