const initialState = { showplaylist: false };

const showplaylist = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_PLAYLIST':
      return { ...state, showplaylist: action.payload };
    default:
      return state;
  }
};

export default showplaylist;
