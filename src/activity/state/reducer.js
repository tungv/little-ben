import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as ACTIONS from './actions';
import { constant } from 'lodash/fp';

import type { Bottle, Session } from '../types.js';

export const activities = handleActions({
  [ACTIONS.ACTIVITIES_NEW_BOTTLE](state, { payload } : { payload: Bottle }) : Bottle[] {
    return [
      payload,
      ...state,
    ];
  },
  [ACTIONS.ACTIVITIES_UPDATE_LAST_BOTTLE](state, { payload } : { payload: Bottle }) : Bottle[] {
    return [
      payload,
      ...state.slice(1),
    ];
  },
}, []);

export const currentActivity = handleActions({
  [ACTIONS.ACTIVITIES_NEW_BOTTLE](state, { payload } : { payload: ?Bottle }) : ?string {
    return payload ? payload.id : null;
  },
}, null);

export const sessions = handleActions({
  [ACTIONS.ACTIVITIES_LOG_SESSION](state, { payload } : { payload: Session }) : Session[] {
    return [
      payload,
      ...state,
    ];
  },
  [ACTIONS.ACTIVITIES_UPDATE_LAST_SESSION](state, { payload } : { payload: Session }) : Session[] {
    return [
      payload,
      ...state.slice(1),
    ];
  },
}, []);

export const settings = constant({
  defaultVolume: 100,
});

export const reducer = combineReducers({
  activities,
  sessions,
  currentActivity,
  settings,
});
