import React from 'react';
import AddEvent from '../containers/AddEvent';
import DisplayEventList from '../containers/DisplayEventList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


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
    <AddEvent />
    <DisplayEventList />
    <Link to="/login">Login</Link>
  </div>
);


export default App;
