import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './reducer';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

const initialState = {};
const logger = createLogger();
const middleware = applyMiddleware(reduxThunk, logger);
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

export const getStore = () => {
  const store = createStore(reducer, initialState, compose(
    middleware,
    devTools,
  ));

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').reducer; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
