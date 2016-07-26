import { mapProps } from 'recompose';
import { hashHistory } from 'react-router';
import Router from 'react-router/lib/Router';
import { syncHistoryWithStore } from 'react-router-redux';

import ConnectedActivityContainer from '../module_activity/components/activity_timeline';
import ConnectedActivityCreator from '../module_activity/components/activity_creator';
import { ConnectedLayoutComponent } from '../layout';
import ConnectedChildrenList from '../module_children/components/children_list';

// const DEBUG = process.env.NODE_ENV !== 'production';

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
  {
    path: '/child/:childId/activities/create',
    component: ConnectedActivityCreator,
  },
];

const AppRouter = mapProps(({ store }) => ({
  history: syncHistoryWithStore(hashHistory, store),
  routes: routeConfig,
}))(Router);

export default AppRouter;
