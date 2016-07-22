import React, { PropTypes } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedActivityContainer } from '../activity';
import { ConnectedLayoutComponent } from '../layout';
import ConnectedChildrenList from '../module_children/components/children_list';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MainComponent = ({
  store,
}) => (
  <MuiThemeProvider>
    <ReduxProvider store={store}>
      <ConnectedLayoutComponent>
        <ConnectedChildrenList />
        <ConnectedActivityContainer />
      </ConnectedLayoutComponent>
    </ReduxProvider>
  </MuiThemeProvider>
);

MainComponent.propTypes = { // eslint-disable-line
  store: PropTypes.object.isRequired,
};

export default MainComponent;
