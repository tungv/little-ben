import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';

const ARRAY_EVENTS = [
  'child_added',
  'child_removed',
  'child_changed',
  'child_moved',
];

const getRef = app => path => app.database().ref(path);

export const getObservableFromArray = (app) => (path: string) => {
  const ref = getRef(app)(path);
  const streams = ARRAY_EVENTS.map(event =>
    fromEvent(
      ref,
      event,
      data => ({ data, event })
    )
  );

  return merge(...streams);
};

export const getObservableFromValue = app => (path: string) =>
  fromEvent(
    getRef(app)(path),
    'value',
    data => ({ data, event: 'value' })
  );

export const getCurrentUserObservable = app =>
  Observable.create(observer => app.auth().onAuthStateChanged(observer));

export const getClockSkewObservable = app =>
  fromEvent(
    getRef(app)('.info/serverTimeOffset'),
    'value',
    snap => snap.val()
  ).distinct();
