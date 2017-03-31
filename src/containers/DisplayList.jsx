import { connect } from 'react-redux';
import { updateList } from '../actions';
import Entries from '../components/Entries';

// const filterEntries

// const getDisplayList = (entries) => {
//   return entries
// }

const mapStateToProps = state => ({
  entries: state.entries,
});
//
// const mapDispatchToProps = {
//   onSubmitClick: updateList,
// };

const DisplayList = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Entries);

export default DisplayList;
