import ActivityCreator from './activity_creator';
import { connectToValue } from '../../../firebase/utils/FirebaseProvider';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { compose } from 'recompose';

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
  updateActivity: (id, activity) => {
    const app = props.firebaseApp;
    const {
      routeParams: {
        childId,
      },
      initialActivity,
    } = props;

    const ref = app.database().ref(`/child-activities/${childId}`);
    const postingActivity = {
      ...initialActivity,
      ...activity,
    };

    ref.push(postingActivity, (error) => console.error(error));
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
