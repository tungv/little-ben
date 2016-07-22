import { combineReducers } from 'redux';
import { reducer as activityReducer } from '../activity';
import { reducer as userReducer } from '../module_user';

export const reducer = combineReducers({
  activity: activityReducer,
  user: userReducer,
});
