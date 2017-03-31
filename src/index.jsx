import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './components/App';
import thunk from 'redux-thunk';
import Routes from './routes/Routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();

const store = createStore(
  reducer,
  composeEnhancers(
      applyMiddleware(logger, thunk),
  ),
);

// const el = document.getElementById('app');
//
// const render = () => ReactDOM.render (
//   <App
//     value={store.getState()}
//     onButtonClick={() => store.dispatch({type: 'SUBMIT_NEW' })}
//     />,
//     el
// )
//
// render()
// store.subscribe(render);

// store.dispatch()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
