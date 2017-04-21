const initialState = { loadingfeaturedplaylist: false };

const loadingfeaturedplaylist = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_FEATURED_PLAYLISTS':
      return { ...state, loadingfeaturedplaylist: action.payload };
    default:
      return state;
  }
};
export default loadingfeaturedplaylist;
