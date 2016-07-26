import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';

const ARRAY_EVENTS = [
  'child_added',
  'child_removed',
  'child_changed',
  'child_moved',
];

type PathType = string;
type RefType = {
  path: Object
};
export type PathOverloadingType = PathType|RefType;

const getRef = (app, path: PathOverloadingType) => {
  if (typeof path === 'string') {
    return app.database().ref(path);
  }

  return path;
};

export const getObservableFromArray = (app) => (path: PathOverloadingType) => {
  const ref = getRef(app, path);
  const streams = ARRAY_EVENTS.map(event =>
    fromEvent(
      ref,
      event,
      data => ({ data, event })
    )
  );

  return merge(...streams);
};

export const getObservableFromValue = app => (path: PathOverloadingType) =>
  fromEvent(
    getRef(app, path),
    'value',
    data => ({ data, event: 'value' })
  );

export const getCurrentUserObservable = app =>
  Observable.create(observer => app.auth().onAuthStateChanged(observer));

export const getClockSkewObservable = app =>
  fromEvent(
    getRef(app, '.info/serverTimeOffset'),
    'value',
    snap => snap.val()
  ).distinct();
