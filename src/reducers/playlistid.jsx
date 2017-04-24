const initialState = { playlistid: ['', ''] };

const playlistid = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYLIST_ID':
      return { ...state, playlistid: action.payload };
    default:
      return state;
  }
};

export default playlistid;
