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

export function push<T>(): Function {
  return (
    state: Array<T>,
    action: ActionType,
  ): Array<T> => {
    const item = action.payload;
    if (item) {
      return [...state, item];
    }
    return state;
  };
}

export function selectAndPush<T>(path: string): Function {
  return (
    state: T[],
    action: ActionType,
  ): T[] => {
    const item = get(action, `payload.${path}`);
    if (item) {
      return [...state, item];
    }
    return state;
  };
}
