import { connect } from 'react-redux';
// import { updateList } from '../actions';
import EventList from '../components/EventList';

// const filterEntries

// const getDisplayList = (entries) => {
//   return entries
// }

const mapStateToProps = state => ({
  events: state.events,
});
//
// const mapDispatchToProps = {
//   onSubmitClick: updateList,
// };

const DisplayEventList = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(EventList);

export default DisplayEventList;
