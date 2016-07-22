import { connect } from 'react-redux';
import EnhancedLayoutComponent from './raw-layout';
import { get } from 'lodash/fp';

const getTitle = get('firebase.currentUser.displayName');

export const ConnectedLayoutComponent = connect(
  state => ({
    title: getTitle(state),
  }),
)(EnhancedLayoutComponent);

export default ConnectedLayoutComponent;
