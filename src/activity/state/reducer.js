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
  [ACTIONS.ACTIVITIES_COMPLETE_BOTTLE](
    state,
    { payload } : { payload : number }
  ) : Bottle[] {
    if (state.length === 0) {
      return state;
    }

    return [
      {
        ...state[0],
        done: true,
        remaining: 0,
        endTime: payload,
      },
      ...state.slice(1),
    ];
  },
  [ACTIONS.ACTIVITIES_UPDATE_LAST_BOTTLE](state, { payload } : { payload: Bottle }) : Bottle[] {
    if (state.length === 0) {
      return state;
    }

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
  [ACTIONS.ACTIVITIES_COMPLETE_SESSION](state, { payload } : { payload : number }) : Session[] {
    if (state.length === 0) {
      return state;
    }

    return [
      {
        ...state[0],
        endTime: payload,
      },
      ...state.slice(1),
    ];
  },
  [ACTIONS.ACTIVITIES_COMPLETE_BOTTLE](state, { payload } : { payload : number }) : Session[] {
    if (state.length === 0) {
      return state;
    }

    return [
      {
        ...state[0],
        endTime: payload,
      },
      ...state.slice(1),
    ];
  },
}, []);

export const settings = constant({
  defaultVolume: 100,
});

export const selectedActivity = handleActions({
  [ACTIONS.ACTIVITIES_NEW_BOTTLE](state, { payload } : { payload : Bottle }) : string {
    return payload.id;
  },
  [ACTIONS.ACTIVITIES_COMPLETE_BOTTLE]() {
    return '';
  },
  [ACTIONS.ACTIVITIES_SET_CURRENT_ACTIVITY](state, { payload } : { payload : string }) : string {
    return payload;
  },
}, '');

export const reducer = combineReducers({
  activities,
  sessions,
  selectedActivity,
  settings,
});
