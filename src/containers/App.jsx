import React from 'react';
import { connect } from 'react-redux';


class App extends Component {
  static propTypes = {
    test: PropTypes.string
  }

  render() {
    const { test } = this.props;
      return (
        <div>
          <h1>{test}</h1>
        </div>
      )
  }
}

export default connect(null, {'FUNCTION BINDING TO STORE'})(App);
