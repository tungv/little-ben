import { combineReducers } from 'redux';
import { reducer as firebaseReducer } from '../firebase';
import { routerReducer } from 'react-router-redux';

export const reducer = combineReducers({
  routing: routerReducer,
  firebase: firebaseReducer,
});
