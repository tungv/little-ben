import * as ACTIONS from './actions';
import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';

import type { Bottle, Session } from '../types';

export const setCurrentActivity = createAction(
  ACTIONS.ACTIVITIES_SET_CURRENT_ACTIVITY,
  (activityId: string) => activityId
);

const newSession = createAction(
  ACTIONS.ACTIVITIES_LOG_SESSION,
  (session: Session) => session
);

export const completeSession = createAction(
  ACTIONS.ACTIVITIES_COMPLETE_SESSION,
  (endTime: number) => endTime
);

const newBottle = createAction(
  ACTIONS.ACTIVITIES_NEW_BOTTLE,
  (bottle: Bottle) => bottle
);

export const newAndStartBottle = ({ volume, ...rest }) => (dispatch) => {
  const startTime = Date.now();
  const bottle = {
    id: uniqueId('bottle_'),
    done: false,
    remaining: volume,
    volume,
    hidden: false,
    startTime,
    ...rest,
  };

  const session = {
    id: uniqueId('session_'),
    activityId: bottle.id,
    startTime,
  };

  dispatch(newBottle(bottle));
  dispatch(newSession(session));
};

export const resumeBottle = (bottleId: string) => newSession({
  id: uniqueId('session_'),
  activityId: bottleId,
  startTime: Date.now(),
});

export const removeBottle = createAction(
  ACTIONS.ACTIVITIES_REMOVE_BOTTLE,
  (bottleId: string) => ({ id: bottleId })
);

export const completeBottle = createAction(
  ACTIONS.ACTIVITIES_COMPLETE_BOTTLE,
  (endTime: number) => endTime
);
