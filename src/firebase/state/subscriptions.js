import { pluck } from 'rxjs/operator/pluck';
import { map } from 'rxjs/operator/map';
import { distinct } from 'rxjs/operator/distinct';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { filter } from 'rxjs/operator/filter';

import {
  getObservableFromArray,
  getObservableFromValue,
  getCurrentUserObservable,
} from '../utils/streams';

import * as ACTION_CREATORS from './actionCreators';

const getUserChildrenStream = app => (user$) =>
  user$
    ::pluck('uid')
    ::distinct()
    ::map(id => `user-children/${id}`)
    ::mergeMap(getObservableFromArray(app))
    ::map(({ data, event }) => ({
      childId: data.key,
      event,
    }));

export const subscribeToFirebase = app => dispatch => {
  const user$ = getCurrentUserObservable(app);
  const userChildren$ = getUserChildrenStream(app)(user$);
  const childRemoved$ = userChildren$
    ::filter(({ event }) => event === 'child_removed')
    ::pluck('childId');

  const childAdded$ = userChildren$
    ::filter(({ event }) => event === 'child_added')
    ::map(({ childId }) => `children/${childId}`)
    ::mergeMap(getObservableFromValue(app))
    ::pluck('data');

  return user$.subscribe(
    user => dispatch(ACTION_CREATORS.updateUser({ user }))
  ).add(childRemoved$.subscribe(
    childId => dispatch(ACTION_CREATORS.removeChild(childId))
  )).add(childAdded$.subscribe(
    data => dispatch(ACTION_CREATORS.addChild(data.val()))
  ));
};
