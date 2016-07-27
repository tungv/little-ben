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
export type RefOverloadingType = PathType|RefType;

const getRef = (app, ref: RefOverloadingType) => {
  if (typeof ref === 'string') {
    return app.database().ref(ref);
  }

  return ref;
};

export const getObservableFromArray = (app) => (ref: RefOverloadingType) => {
  const arrayRef = getRef(app, ref);
  const streams = ARRAY_EVENTS.map(event =>
    fromEvent(
      arrayRef,
      event,
      data => ({ data, event })
    )
  );

  return merge(...streams);
};

export const getObservableFromValue = app => (ref: RefOverloadingType) =>
  fromEvent(
    getRef(app, ref),
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
