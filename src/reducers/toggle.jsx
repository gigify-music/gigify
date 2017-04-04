// const event = (state, action) => {
//   console.log('TOGGLE STATE and ACTION', state, action);
//   switch (action.type) {
//     case 'TOGGLE_ACTIVE':
//       if (state.id !== action.id) {
//         return state;
//       }
//       return {
//         ...state,
//         active: !state.active,
//       };
//     default:
//       return state;
//   }
// };
//
// const toggle = (state = [], action) => {
//   switch (action.type) {
//     case 'TOGGLE_ACTIVE':
//       return state.map(s => event(s, action),
//     );
//     default:
//       return state;
//   }
// };
//
// export default toggle;
