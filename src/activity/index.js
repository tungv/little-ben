import { createAction, handleActions } from 'redux-actions';
import { constant } from 'lodash';
import { combineReducers } from 'redux';
import type { Activity } from './types';

const ACTIVITIES_ADD = 'activities/add';
export const addActivity = createAction(ACTIVITIES_ADD, (activity: Activity) => ({
  activity,
}));

export const activities = constant([
  'BREASTFEED',
  'MILK BOTTLED',
  'CHANGE - PEE',
  'CHANGE - WEE',
]);

export const activityLog = handleActions({
  [ACTIVITIES_ADD](state, { payload }) {
    return [
      ...state,
      payload.activity,
    ];
  },
}, []);

export const reducer = combineReducers({
  activities,
  activityLog,
});
