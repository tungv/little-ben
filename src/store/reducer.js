import { combineReducers } from 'redux';
import { reducer as activityReducer } from '../activity';
import { reducer as firebaseReducer } from '../firebase';

export const reducer = combineReducers({
  activity: activityReducer,
  firebase: firebaseReducer,
});
