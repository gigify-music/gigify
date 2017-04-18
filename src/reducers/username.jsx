const username = (state = '', action) => {
  switch (action.type) {
    case 'SUBMIT_USERNAME':
      return action.payload;
    default:
      return state;
  }
};


export default username;
