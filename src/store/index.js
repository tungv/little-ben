import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './reducer';
import { name, version } from '../../package.json';

import persistState from 'redux-localstorage';

import reduxThunk from 'redux-thunk';
import { identity } from 'lodash';


const initialState = {};

const middleware = applyMiddleware(reduxThunk);
const devTools = window.devToolsExtension ? window.devToolsExtension() : identity;
const persistance = persistState(undefined, {
  key: `${name}@${version.split('.').slice(0, 2).join('.')}`,
});

export const getStore = () => {
  const enhancer = compose(
    middleware,
    persistance,
    devTools,
  );

  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').reducer; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
