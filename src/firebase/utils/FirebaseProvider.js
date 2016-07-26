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
import type { PathOverloadingType } from './basicStreams';

import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operator/map';
import { partition } from 'rxjs/operator/partition';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { FromObservable } from 'rxjs/observable/FromObservable';

export const withFirebase = compose(
  setDisplayName('FirebaseProvider'),
  withContext({
    firebaseApp: PropTypes.object.isRequired,
  }, ({ firebaseApp }) => ({ firebaseApp }))
);

export const getFirebase = getContext({
  firebaseApp: PropTypes.object.isRequired,
});

const partitionStreams = (reomposeProps$, getPath) =>
  FromObservable
    .create(reomposeProps$)
    ::partition(props => !props.firebaseApp || !getPath(props, props.firebaseApp));

const injectDefault = selector => props => ({
  ...props,
  ...selector({}),
});

const injectFirebaseProps = (
  selector: Function,
  getPath: Function,
  streamFactory: Function,
) => props => streamFactory(props)::map(firebaseMap => ({
  ...props,
  ...selector(firebaseMap),
}));

export const connectToMap = (
  selector: (map: Object) => any,
  getPath: (props: any) => PathOverloadingType|false
) => compose(
  setDisplayName('FirebaseConnectedMap'),
  getFirebase,
  mapPropsStream(reomposeProps$ => {
    const [noFirebase, hasFirebase] = partitionStreams(reomposeProps$, getPath);
    return merge(
      noFirebase::map(injectDefault(selector)),
      hasFirebase::mergeMap(injectFirebaseProps(
        selector,
        getPath,
        (props) => mapStream(props.firebaseApp)(getPath(props, props.firebaseApp))
      )),
    );
  }),
);

export const connectToValue = (
  propKey: string,
  getPath: (props: any) => PathOverloadingType|false,
) => compose(
  setDisplayName('FirebaseConnectedValue'),
  getFirebase,
  mapPropsStream(reomposeProps$ => {
    const selector = (obj) => ({ [propKey]: obj });
    const [noFirebase, hasFirebase] = partitionStreams(reomposeProps$, getPath);

    return merge(
      noFirebase::map(injectDefault(selector)),
      hasFirebase::mergeMap(injectFirebaseProps(
        selector,
        getPath,
        (props) => valueStream(props.firebaseApp)(getPath(props, props.firebaseApp))
      )),
    );
  }),
);
