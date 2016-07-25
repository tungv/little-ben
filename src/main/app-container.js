import React, { PropTypes } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ConnectedActivityContainer from '../module_activity/components/activity_timeline/index.js';
import { ConnectedLayoutComponent } from '../layout';
import ConnectedChildrenList from '../module_children/components/children_list';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, hashHistory } from 'react-router';
import Router from 'react-router/lib/Router';
import { syncHistoryWithStore } from 'react-router-redux';
import { withFirebase } from '../firebase/utils/FirebaseProvider';

const DEBUG = process.env.NODE_ENV !== 'production';

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

const RouterFirebaseProvider = withFirebase(Router);

const MainComponent = ({
  store,
  firebaseApp,
}) => (
  <MuiThemeProvider>
    <ReduxProvider store={store}>
      <RouterFirebaseProvider
        firebaseApp={firebaseApp}
        history={syncHistoryWithStore(DEBUG ? hashHistory : browserHistory, store)}
        routes={routeConfig}
      />
    </ReduxProvider>
  </MuiThemeProvider>
);

MainComponent.propTypes = { // eslint-disable-line
  store: PropTypes.object.isRequired,
  firebaseApp: PropTypes.object.isRequired,
};

export default MainComponent;
