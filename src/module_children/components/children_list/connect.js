import { push } from 'react-router-redux';
import { connect } from 'react-redux';
export default connect(
  state => ({
    childArray: state.firebase.children,
  }),
  dispatch => ({
    goToChildPage: id => dispatch(push(`/child/${id}`)),
  })
);
