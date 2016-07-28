import { connect } from 'react-redux';
import { omit } from 'lodash/fp';
import { compose, lifecycle, mapProps } from 'recompose';
import ActivityTimeline from './activity_timeline';
import { connectToValue } from '../../../firebase/utils/FirebaseProvider';
import { push } from 'react-router-redux';
import { setTitle } from '../../../layout';

import { getActivities, getDaily, hideActivity } from '../../firebase-activities';
import * as COPY from '../../copy.json';

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
      hideActivity(firebaseApp, childId, activity.id);
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
      this.props.setTitle(COPY.UI_TOP_TITLE);
    },
  })
);

export default decorator(ActivityTimeline);
