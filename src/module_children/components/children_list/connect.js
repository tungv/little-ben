import { connect } from 'react-redux';
export default connect(
  state => ({
    childArray: state.firebase.children,
  }),
);
