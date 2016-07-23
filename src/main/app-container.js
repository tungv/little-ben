import React, { PropTypes } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedActivityContainer } from '../activity';
import { ConnectedLayoutComponent } from '../layout';
import ConnectedChildrenList from '../module_children/components/children_list';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router';
import Router from 'react-router/lib/Router';
import { syncHistoryWithStore } from 'react-router-redux';

type RouteConfigType = {
  path: ?string,
  component: Object,
  indexRoute: ?RouteConfigType,
  childRoutes: ?RouteConfigType[],
};

const routeConfig : RouteConfigType[] = [
  {
    path: '/',
    component: ConnectedLayoutComponent,
    indexRoute: {
      component: ConnectedChildrenList,
    },
    childRoutes: [
      {
        path: '/child/:childId',
        component: ConnectedActivityContainer,
      },
    ],
  },
];

const MainComponent = ({
  store,
}) => (
  <MuiThemeProvider>
    <ReduxProvider store={store}>
      <Router history={syncHistoryWithStore(browserHistory, store)} routes={routeConfig} />
    </ReduxProvider>
  </MuiThemeProvider>
);

MainComponent.propTypes = { // eslint-disable-line
  store: PropTypes.object.isRequired,
};

export default MainComponent;
