import ActivityCreator from './activity_creator';
import { connectToValue } from '../../../firebase/utils/FirebaseProvider';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { compose } from 'recompose';

import moment from 'moment';

const mapStateToProps = () => ({
  initialActivity: {
    volume: 100,
    startTime: Date.now(),
    endTime: Date.now() + 5 * 60e3,
    natural: true,
    done: true,
    hidden: false,
  },
});

const mapDispatchToProps = (dispatch, props) => ({
  closeDialog: () => dispatch(goBack()),
  updateActivity: (id, changes) => {
    const app = props.firebaseApp;
    const {
      routeParams: {
        childId,
      },
      initialActivity,
    } = props;

    const database = app.database();
    const ref = database.ref(`/child-activities/${childId}`);
    const postingActivity = {
      ...initialActivity,
      ...changes,
    };

    const { key } = ref.push(postingActivity);

    // push to aggregation
    const { endTime, volume } = changes;
    const dayStamp = moment(endTime).format('YYYYMMDD');
    const dailyPath = `/child-activities-aggregations/${childId}/daily/${dayStamp}/${key}`;
    const dailyRef = database.ref(dailyPath);
    dailyRef.set(volume);
  },
});

const decorator = compose(
  connectToValue(
    'child',
    ({ routeParams: { childId } }) => (childId ? `/children/${childId}` : false)
  ),
  connect(mapStateToProps, mapDispatchToProps)
);

export default decorator(ActivityCreator);
