const playlistid = (state = ['', ''], action) => {
  switch (action.type) {
    case 'PLAYLIST_ID':
      return action.payload;
    default:
      return state;
  }
};

export default playlistid;
