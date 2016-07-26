import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import ActivityTimeline from './activity_timeline';
import { connectToMap, connectToValue } from '../../../firebase/utils/FirebaseProvider';
import { map } from 'lodash';
import { push } from 'react-router-redux';
import { setTitle } from '../../../layout';

const getActivities = connectToMap(
  (firebaseMap: any): Object => ({
    activities: map(firebaseMap, (value, key) => ({ ...value, id: key })),
  }),
  ({ routeParams: { childId } }, app) => {
    const ref = app.database().ref(`/child-activities/${childId}`);
    return ref.orderByChild('hidden').equalTo(false);
  },
);

const getChild = connectToValue(
  'child',
  ({ routeParams: { childId } }) => (childId ? `/children/${childId}/name` : false)
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
    setTitle: title => dispatch(setTitle(title)),
  })
);

const decorator = compose(
  getActivities,
  getChild,
  connectToRedux,
  lifecycle({
    componentDidMount() {
      // eslint-disable-next-line immutable/no-this
      this.props.setTitle('Activities');
    },
  })
);

export default decorator(ActivityTimeline);
