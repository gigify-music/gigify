import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers/App';
import thunk from 'redux-thunk';
import Routes from './routes/Routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();

const store = createStore(
  reducer,
  composeEnhancers(
      applyMiddleware(logger, thunk);
  ),
);

store.dispatch()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
