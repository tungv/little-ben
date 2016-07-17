import React, { PropTypes } from 'react';
import { compose, withHandlers, withState } from 'recompose';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedActivityContainer } from '../activity';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { version } from '../../package.json';

const MainComponent = ({ store, showDrawer, onAppBarLeftMenuClick, onDrawerRequestChange }) => (
  <MuiThemeProvider>
    <ReduxProvider store={store}>
      <div>
        <AppBar
          title="Little Ben"
          onLeftIconButtonTouchTap={onAppBarLeftMenuClick}
        />
        <Drawer
          open={showDrawer}
          docked={false}
          onRequestChange={onDrawerRequestChange}
        >
          <MenuItem>Version: {version}</MenuItem>
          <MenuItem>Commit: {process.env.GIT_COMMIT.substr(0, 6) || 'dev'}</MenuItem>
          <MenuItem>{process.env.BUILD_TIME}</MenuItem>
        </Drawer>
        <ConnectedActivityContainer />
      </div>
    </ReduxProvider>
  </MuiThemeProvider>
);

MainComponent.propTypes = {
  store: PropTypes.object.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  onAppBarLeftMenuClick: PropTypes.func.isRequired,
  onDrawerRequestChange: PropTypes.func.isRequired,
};

const EnhancedMainComponent = compose(
  withState('showDrawer', 'setShowDrawer', false),
  withHandlers({
    onAppBarLeftMenuClick: ({ setShowDrawer, showDrawer }) => () => {
      setShowDrawer(!showDrawer);
    },
    onDrawerRequestChange: ({ setShowDrawer }) => open => setShowDrawer(open),
  }),
)(MainComponent);

export default EnhancedMainComponent;
