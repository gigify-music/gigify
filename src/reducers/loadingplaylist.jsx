const initialState = { loadingplaylist: false };

const loadingplaylist = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_LOADING_PLAYLIST':
      return { ...state, loadingplaylist: action.payload };
    default:
      return state;
  }
};

export default loadingplaylist;
