import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers/App';
import thunk from 'redux-thunk';
import Routes from './routes/Routes';
import particleConfig from '../particlesjs-config.json';
// import requestService from './utils/request-service';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

document.addEventListener('DOMContentLoaded', () => {
  particlesJS('particles-js', particleConfig,
   !1);
  particlesJS('home-particles-js', particleConfig,
    !1);
});

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
