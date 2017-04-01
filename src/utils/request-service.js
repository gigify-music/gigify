import axios from 'axios';

// const requestService = store => next => (action) => {
//   next(action);
//   switch (action.type) {
//     case 'GET_EVENTS_DATA':
//       return axios.get('/api/events')
//       .then((res) => {
//         console.log('EVENTS RECEIVED', res.data);
//         next({
//           type: 'GET_EVENTS_DATA_RECEIVED',
//           payload: data,
//         })
//       })
//       .catch(err => next({
//         type: 'GET_EVENTS_DATA_ERROR',
//         err,
//       })
//     default:
//       return state;
//   }
// };
//
// export default requestService;
