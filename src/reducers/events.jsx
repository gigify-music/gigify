const initialState = {
  eventListings: [],
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENTS_DATA_RECEIVED':
      return { ...state, eventListings: action.payload };
    default:
      return state;
  }
};

export default events;
