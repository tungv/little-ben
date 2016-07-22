import { connect } from 'react-redux';
import EnhancedLayoutComponent from './raw-layout';

export const ConnectedLayoutComponent = connect(
  state => ({
    title: state.user.displayName,
  }),
)(EnhancedLayoutComponent);

export default ConnectedLayoutComponent;
