import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './reducer';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import { identity } from 'lodash';

// const DEBUG = process.env.NODE_ENV !== 'production';

const initialState = {};

const middleware = applyMiddleware(
  reduxThunk,
  routerMiddleware(hashHistory),
);
const devTools = window.devToolsExtension ? window.devToolsExtension() : identity;

export const getStore = () => {
  const enhancer = compose(
    middleware,
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
