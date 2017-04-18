const loadingplaylist = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_LOADING_PLAYLIST':
      return action.payload;
    default:
      return state;
  }
};

export default loadingplaylist;
