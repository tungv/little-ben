import React, { PropTypes } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { withFirebase } from '../firebase/utils/FirebaseProvider';
import AppRouter from './router';

const RouterFirebaseProvider = withFirebase(AppRouter);

const MainComponent = ({ store, firebaseApp }) => (
  <MuiThemeProvider>
    <ReduxProvider store={store}>
      <RouterFirebaseProvider firebaseApp={firebaseApp} store={store} />
    </ReduxProvider>
  </MuiThemeProvider>
);

// eslint-disable-next-line immutable/no-mutation
MainComponent.propTypes = {
  store: PropTypes.object.isRequired,
  firebaseApp: PropTypes.object.isRequired,
};

export default MainComponent;
