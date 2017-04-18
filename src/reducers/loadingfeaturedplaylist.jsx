const loadingfeaturedplaylist = (state = false, action) => {
  switch (action.type) {
    case 'LOADING_FEATURED_PLAYLISTS':
      return action.payload;
    default:
      return state;
  }
};
export default loadingfeaturedplaylist;
