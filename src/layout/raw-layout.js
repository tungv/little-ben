import React, { PropTypes } from 'react';
import { compose, withHandlers, withState } from 'recompose';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { version } from '../../package.json';

const LayoutComponent = ({
  title,
  showDrawer,
  onAppBarLeftMenuClick,
  onDrawerRequestChange,
  children,
}) => (
  <div>
    <AppBar
      title={title}
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
    {children}
  </div>
);

LayoutComponent.propTypes = { // eslint-disable-line
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  onAppBarLeftMenuClick: PropTypes.func.isRequired,
  onDrawerRequestChange: PropTypes.func.isRequired,
};

const EnhancedLayoutComponent = compose(
  withState('showDrawer', 'setShowDrawer', false),
  withHandlers({
    onAppBarLeftMenuClick: ({ setShowDrawer, showDrawer }) => () => {
      setShowDrawer(!showDrawer);
    },
    onDrawerRequestChange: ({ setShowDrawer }) => open => setShowDrawer(open),
  })
)(LayoutComponent);

export default EnhancedLayoutComponent;
