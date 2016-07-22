import { createAction } from 'redux-actions';
import * as ACTIONS from './actions';

export const updateUser = createAction(ACTIONS.USER_UPDATED);
export const addChild = createAction(ACTIONS.CHILDREN_ADDED);
export const removeChild = createAction(ACTIONS.CHILDREN_REMOVED);
