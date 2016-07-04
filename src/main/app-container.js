import React, { PropTypes } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { ConnectedActivityContainer } from '../activity';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MainComponent = ({ store }) => (
  <MuiThemeProvider>
    <ReduxProvider store={store}>
      <div>
        <AppBar title="Little Ben" />
        <ConnectedActivityContainer />
      </div>
    </ReduxProvider>
  </MuiThemeProvider>
);

MainComponent.propTypes = {
  store: PropTypes.object.isRequired,
};

export default MainComponent;
