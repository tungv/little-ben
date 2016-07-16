import * as ACTIONS from './actions';
import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';
import { get } from 'lodash/fp';

import type { Bottle, Session } from '../types';

const getCurrentSession = get('activity.sessions[0]');

export const newSession = createAction(
  ACTIONS.ACTIVITIES_LOG_SESSION,
  (session: Session) : Session => ({
    id: uniqueId('session_'),
    ...session,
  })
);

export const updateLastSession = createAction(
  ACTIONS.ACTIVITIES_UPDATE_LAST_SESSION,
  (session: Session) : Session => session
);

export const pauseSession = () => (dispatch, getState) => {
  const currentSession = getCurrentSession(getState());

  if (currentSession.endTime) {
    // do nothing if it's already ended
    return;
  }

  dispatch(updateLastSession({
    ...currentSession,
    endTime: Date.now(),
  }));
};

export const newBottle = createAction(
  ACTIONS.ACTIVITIES_NEW_BOTTLE,
  (bottle: Bottle) : Bottle => ({
    id: uniqueId('bottle_'),
    done: false,
    remaining: bottle.volume,
    ...bottle,
  })
);

export const updateLastBottle = createAction(
  ACTIONS.ACTIVITIES_UPDATE_LAST_BOTTLE,
  (bottle: Bottle) : Bottle => bottle
);

export const startBottle = () => (dispatch, getState) => {
  const currentActivity = getState().activity.activities[0];
  const startTime = Date.now();

  if (!currentActivity.startTime) {
    dispatch(updateLastBottle({
      ...currentActivity,
      startTime,
    }));
  }

  dispatch(newSession({
    activityId: currentActivity.id,
    startTime,
  }));
};

export const newAndStartBottle = (bottle: Bottle) => (dispatch) => {
  dispatch(newBottle(bottle));
  dispatch(startBottle());
};

export const completeBottle = () => (dispatch, getState) => {
  dispatch(pauseSession);
  const currentActivity = getState().activity.activities[0];

  dispatch(updateLastBottle({
    ...currentActivity,
    done: true,
    remaining: 0,
    endTime: Date.now(),
  }));
};
