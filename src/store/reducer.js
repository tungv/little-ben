import { combineReducers } from 'redux';
import { reducer as activityReducer } from '../activity';

export const reducer = combineReducers({
  activity: activityReducer,
});
