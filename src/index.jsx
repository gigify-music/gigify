import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers/App';
import thunk from 'redux-thunk';
import Routes from './routes/Routes';
// import requestService from './utils/request-service';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();

const store = createStore(
  reducer,
  composeEnhancers(
      applyMiddleware(logger, thunk),
  ),
);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);

store.dispatch({ type: 'GET_EVENTS_DATA' });
