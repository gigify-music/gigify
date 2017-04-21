const initialState = { username: '' };

const username = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_USERNAME':
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

export default username;
