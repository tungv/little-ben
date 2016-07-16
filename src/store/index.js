import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './reducer';

import persistState from 'redux-localstorage';

import reduxThunk from 'redux-thunk';
import { identity } from 'lodash';

const DEBUG = process.env.NODE_ENV !== 'production';

const initialState = {};

const middleware = applyMiddleware(reduxThunk);
const devTools = window.devToolsExtension ? window.devToolsExtension() : identity;
const persistance = DEBUG ? identity : persistState();

const enhancer = compose(
  middleware,
  devTools,
  persistance,
);

export const getStore = () => {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').reducer; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
