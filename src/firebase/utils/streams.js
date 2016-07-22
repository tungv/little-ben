import { Observable } from 'rxjs';
const ARRAY_EVENTS = ['child_added', 'child_removed', 'child_changed', 'child_moved'];

const getRef = app => path => app.database().ref(path);

export const getCurrentUserObservable = app =>
  Observable.create(observer => {
    app.auth().onAuthStateChanged(observer);
  });

export const getClockSkewObservable = app =>
  Observable.fromEvent(
    getRef(app)('.info/serverTimeOffset'),
    'value',
  ).map(snap => snap.val()).distinct();

export const getObservableFromArray = (app) => (path: string) => {
  const ref = getRef(app)(path);
  const streams = ARRAY_EVENTS.map(event =>
    Observable.fromEvent(
      ref,
      event,
      data => ({ data, event })
    )
  );

  return Observable.merge(...streams);
};

export const getObservableFromValue = app => (path: string) =>
  Observable.fromEvent(
    getRef(app)(path),
    'value',
    data => ({ data, event: 'value' })
  );
