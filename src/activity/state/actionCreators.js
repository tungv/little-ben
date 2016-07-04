import * as ACTIONS from './actions';
import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';
import { get } from 'lodash/fp';

import type { Bottle, Session } from '../types';

export const newBottle = createAction(
  ACTIONS.ACTIVITIES_NEW_BOTTLE,
  (bottle: Bottle) : Bottle => ({
    id: uniqueId('bottle_'),
    ...bottle,
  })
);

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

const getCurrentSession = get('activity.sessions[0]');

export const startBottle = () => (dispatch, getState) => {
  const { currentActivity: { activityId } } = getState().activity;

  dispatch(newSession({
    activityId,
    startTime: Date.now(),
  }));
};

export const newAndStartBottle = (bottle: Bottle) => (dispatch) => {
  dispatch(newBottle(bottle));
  dispatch(startBottle());
};

export const pauseSession = () => (dispatch, getState) => {
  const currentSession = getCurrentSession(getState());
  dispatch(updateLastSession({
    ...currentSession,
    endTime: Date.now(),
  }));
};
