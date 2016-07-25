// import { connect } from 'react-redux';
// eslint-disable-next-line
import { bindAtionsCreator, compose } from 'redux';
// eslint-disable-next-line
// import * as ACTION_CREATORS from '../state/action_creators';
import ActivityTimeline from './activity_timeline';
import { connectToMap } from '../../../firebase/utils/FirebaseProvider';
import { toArray } from 'lodash';
// const reduxConnector = connect(
//   void 0,
//   // eslint-disable-next-line
//   (dispatch: Function): Object => ({
//     removeActivity: () => console.log('removeActivity'),
//     openActivity: () => console.log('openActivity'),
//   })
// );

const firebaseConnector = connectToMap(
  (map: any): Object => ({
    activities: toArray(map),
    removeActivity: () => console.log('removeActivity'),
    openActivity: () => console.log('openActivity'),
  }),
  ({ routeParams: { childId } }) => `/child-activities/${childId}`
);

// const decorator = compose(reduxConnector, firebaseConnector);

export default firebaseConnector(ActivityTimeline);
