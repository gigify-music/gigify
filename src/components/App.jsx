import React from 'react';
import AddEntry from '../containers/AddEntry';
import DisplayList from '../containers/DisplayList';


// class App extends Component {
//   static propTypes = {
//     test: PropTypes.string
//   }
//
//   render() {
//     const { test } = this.props;
//       return (
//         <div>
//           <h1>{test}</h1>
//         </div>
//       )
//   }
// }

const App = () => (
  <div>
    <AddEntry />
    <DisplayList />
  </div>
);


export default App;
