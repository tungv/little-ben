// @flow
import { get } from 'lodash';

type ActionType = {
  payload: any,
  meta: ?any,
  error: ?boolean,
};

export const select = (
  path: string,
  defaultValue: any
): Function => (
  state: any,
  action: ActionType
): any => get(action, `payload.${path}`, defaultValue);

export const push = (): Function => (
  state: Array,
  action: ActionType,
): Array => {
  const item = action.payload;
  if (item) {
    return [...state, item];
  }
  return state;
};

export const selectAndPush = (path: string): Function => (
  state: Array,
  action: ActionType,
): Array => {
  const item = get(action, `payload.${path}`);
  if (item) {
    return [...state, item];
  }
  return state;
};
