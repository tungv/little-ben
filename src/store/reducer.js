import { combineReducers } from 'redux';
import { reducer as firebaseReducer } from '../firebase';
import { reducer as layoutReducer } from '../layout';
import { routerReducer } from 'react-router-redux';

export const reducer = combineReducers({
  routing: routerReducer,
  layout: layoutReducer,
  firebase: firebaseReducer,
});
