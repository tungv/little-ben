import { scan } from 'rxjs/operator/scan';
import { getObservableFromArray, PathOverloadingType } from './basicStreams';
import omit from 'lodash/omit';

const mapHandlers = {
  child_added: (state, { data }) => ({
    ...state,
    [data.key]: data.val(),
  }),
  child_removed: (state, { data: { key } }) => omit(state, key),
  child_changed: (state, { data }) => ({
    ...state,
    [data.key]: data.val(),
  }),
};

const reduceMap = (state, next) => {
  if (typeof mapHandlers[next.event] === 'function') {
    return mapHandlers[next.event](state, next);
  }
  return state;
};

export const mapStream = (app) => (path: PathOverloadingType) => {
  const array$ = getObservableFromArray(app)(path);
  return array$::scan(reduceMap, {});
};
