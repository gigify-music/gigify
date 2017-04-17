const showplaylist = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_PLAYLIST':
      return action.payload;
    default:
      return state;
  }
};

export default showplaylist;
