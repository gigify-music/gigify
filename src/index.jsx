import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Routes from './routes/Routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
      applyMiddleware(thunk),
  ),
);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);
