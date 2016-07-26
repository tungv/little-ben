import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { connectToMap } from '../../../firebase/utils/FirebaseProvider';
import { setTitle } from '../../../layout';

const connected = connect(
  state => ({
    userId: state.firebase.currentUser.uid,
  }),
  dispatch => ({
    goToChildPage: id => dispatch(push(`/child/${id}`)),
    setTitle: (title) => dispatch(setTitle(title)),
  })
);

const firebased = connectToMap(
  firebaseMap => ({
    childIdArray: Object.keys(firebaseMap),
  }),
  ({ userId }) => (userId ? `/user-children/${userId}` : false)
);

export default compose(
  connected,
  firebased,
  lifecycle({
    componentDidMount() {
      // eslint-disable-next-line immutable/no-this
      this.props.setTitle(this.props.firebaseApp.auth().currentUser.displayName);
    },
  })
);
