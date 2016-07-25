/* eslint-disable */
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { FirebaseProviderMap } from '../../../firebase/utils/FirebaseProvider';

const connected = connect(
  state => ({
    userId: state.firebase.currentUser.uid,
  }),
  dispatch => ({
    goToChildPage: id => dispatch(push(`/child/${id}`)),
  })
);

const firebased = FirebaseProviderMap(
  firebaseMap => ({
    childIdArray: Object.keys(firebaseMap),
  }),
  ({ userId }) => userId ? `/user-children/${userId}` : false
);

export default Component => connected(firebased(Component));
