import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as ACTIONS from './actions';
import { findIndex } from 'lodash';
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
  [ACTIONS.ACTIVITIES_REMOVE_BOTTLE](state, { payload }) : Bottle[] {
    const index = findIndex(state, payload);
    if (index >= 0) {
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          hidden: true,
        },
        ...state.slice(index + 1),
      ];
    }

    return state;
  },
}, []);

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
  settings,
});
