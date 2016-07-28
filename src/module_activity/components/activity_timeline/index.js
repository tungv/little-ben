import { connect } from 'react-redux';
import { omit } from 'lodash/fp';
import { compose, lifecycle, mapProps } from 'recompose';
import ActivityTimeline from './activity_timeline';
import { connectToValue } from '../../../firebase/utils/FirebaseProvider';
import { push } from 'react-router-redux';
import { setTitle } from '../../../layout';
import moment from 'moment';

import { getActivities, getDaily } from '../../firebase-activities';

const omitProps = keys => mapProps(props => omit(keys, props));

const getChild = connectToValue(
  'child',
  ({ routeParams: { childId } }) => (childId ? `/children/${childId}/name` : false)
);

const connectToRedux = connect(
  void 0,
  // eslint-disable-next-line
  (dispatch: Function, { routeParams: { childId }, firebaseApp }: any): Object => ({
    removeActivity: activity => {
      const activityId = activity.id;
      const database = firebaseApp.database();
      const ref = database.ref(`/child-activities/${childId}/${activityId}`);
      ref.update({ hidden: true });

      const endTime = activity.endTime;
      const dayStamp = moment(endTime).format('YYYYMMDD');
      const weekStamp = moment(endTime).format('YYYYww');

      database
        .ref(`/child-activities-aggregations/${childId}/daily/${dayStamp}/${activityId}`)
        .remove();

      database
        .ref(`/child-activities-aggregations/${childId}/weekly/${weekStamp}/${activityId}`)
        .remove();
    },
    openActivity: () => console.log('openActivity'),
    openCreateForm: () => dispatch(push(`/child/${childId}/activities/create`)),
    setTitle: title => dispatch(setTitle(title)),
  })
);

const decorator = compose(
  getActivities,
  getChild,
  getDaily,
  connectToRedux,
  omitProps(['history', 'localtion', 'params', 'route', 'routeParams']),
  lifecycle({
    componentDidMount() {
      // eslint-disable-next-line immutable/no-this
      this.props.setTitle('Activities');
    },
  })
);

export default decorator(ActivityTimeline);
