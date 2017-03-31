const entry = (state, action) => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        id: action.id,
        value: action.value,
      };
    default:
      return state;
  }
};

const entries = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return [
        ...state,
        entry(undefined, action),
      ];
    default:
      return state;
  }
};

export default entries;
