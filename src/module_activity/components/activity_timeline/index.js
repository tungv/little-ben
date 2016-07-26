import { connect } from 'react-redux';
import { compose } from 'redux';
// eslint-disable-next-line
// import * as ACTION_CREATORS from '../state/action_creators';
import ActivityTimeline from './activity_timeline';
import { connectToMap } from '../../../firebase/utils/FirebaseProvider';
import { map } from 'lodash';
import { push } from 'react-router-redux';

const connectToFirebase = connectToMap(
  (firebaseMap: any): Object => ({
    activities: map(firebaseMap, (value, key) => ({ ...value, id: key })),
  }),
  ({ routeParams: { childId } }) => `/child-activities/${childId}`
);

const connectToRedux = connect(
  void 0,
  // eslint-disable-next-line
  (dispatch: Function, { routeParams: { childId }, firebaseApp }: any): Object => ({
    removeActivity: activityId => {
      const ref = firebaseApp.database().ref(`/child-activities/${childId}/${activityId}`);
      ref.update({ hidden: true });
    },
    openActivity: () => console.log('openActivity'),
    openCreateForm: () => dispatch(push(`/child/${childId}/activities/create`)),
  })
);

const decorator = compose(
  connectToFirebase,
  connectToRedux
);

export default decorator(ActivityTimeline);
