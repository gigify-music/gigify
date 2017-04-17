const username = (state = '', action) => {
  console.log('USERNAME REDUCER', action.payload);
  switch (action.type) {
    case 'SUBMIT_USERNAME':
      return action.payload
    default:
      return state
  }
}


export default username;
