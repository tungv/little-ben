import { PropTypes } from 'react';
import {
  compose,
  withContext,
  mapPropsStream,
  getContext,
  setDisplayName,
} from 'recompose';

import { valueStream } from './firebaseValueStream';
import { mapStream } from './firebaseMapStream';
import type { RefOverloadingType } from './basicStreams';

import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operator/map';
import { partition } from 'rxjs/operator/partition';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { combineLatest } from 'rxjs/operator/combineLatest';
import { debounceTime } from 'rxjs/operator/debounceTime';

import { FromObservable } from 'rxjs/observable/FromObservable';
import isEqual from 'lodash/isEqual';

// import 'rxjs/add/operator/do';

export const withFirebase = compose(
  setDisplayName('FirebaseProvider'),
  withContext({
    firebaseApp: PropTypes.object.isRequired,
  }, ({ firebaseApp }) => ({ firebaseApp }))
);

export const getFirebase = getContext({
  firebaseApp: PropTypes.object.isRequired,
});

const partitionStreams = (reomposeProps$, getRef) =>
  FromObservable
    .create(reomposeProps$)
    ::partition(props => !props.firebaseApp || !getRef(props, props.firebaseApp));

const injectDefault = selector => props => ({
  ...props,
  ...selector({}),
});

const injectFirebaseProps = (
  selector: Function,
  streamFactory: Function,
) => props => streamFactory(props)::map(firebaseMap => ({
  ...props,
  ...selector(firebaseMap),
}));

export const connectToMap = (
  selector: (map: Object) => any,
  getRef: (props: any) => RefOverloadingType|false,
) => compose(
  setDisplayName('FirebaseConnectedMap'),
  getFirebase,
  mapPropsStream(recomposeProps$ => {
    const [noFirebase, hasFirebase] = partitionStreams(recomposeProps$, getRef);

    const firebaseData$ = hasFirebase
      ::map(props => ({
        app: props.firebaseApp,
        path: getRef(props, props.firebaseApp),
      }))
      ::distinctUntilChanged(isEqual)
      ::mergeMap(({ app, path }) => mapStream(app)(path))
      ::debounceTime(200)
      ::map(selector);

    return merge(
      noFirebase::map(injectDefault(selector)),
      hasFirebase
        ::combineLatest(firebaseData$, (a, b) => ({ ...a, ...b }))
        ::distinctUntilChanged()
    );
  }),
);

export const connectToValue = (
  propKey: string,
  getRef: (props: any) => RefOverloadingType|false,
) => compose(
  setDisplayName('FirebaseConnectedValue'),
  getFirebase,
  mapPropsStream(reomposeProps$ => {
    const selector = (obj) => ({ [propKey]: obj });
    const [noFirebase, hasFirebase] = partitionStreams(reomposeProps$, getRef);

    return merge(
      noFirebase::map(injectDefault(selector)),
      hasFirebase::mergeMap(injectFirebaseProps(
        selector,
        (props) => valueStream(props.firebaseApp)(getRef(props, props.firebaseApp))
      )),
    );
  }),
);
