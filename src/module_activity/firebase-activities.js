import { map, sortBy, sum, toArray } from 'lodash';
import { get } from 'lodash/fp';
import { connectToMap } from '../firebase/utils/FirebaseProvider';
import type { RefOverloadingType } from '../firebase/utils/basicStreams';

const getChildIdFromRouteParams = get('routeParams.childId');

const getActivitiesRef = (app, childId = false): RefOverloadingType|false => (
  childId && app.database()
    .ref(`/child-activities/${childId}`)
    .orderByChild('hidden')
    .equalTo(false)
);

export const getActivities = connectToMap(
  (data: any) => ({
    activities: sortBy(
      map(data, (value, key) => ({ ...value, id: key })),
      'startTime'
    ).reverse(),
  }),
  (props, app) => getActivitiesRef(app, getChildIdFromRouteParams(props)),
);

const getDailyAggregation = (data) => ({
  daily: map(data, (dayData, date) => ({
    date,
    dayData: {
      volume: sum(toArray(dayData)),
      count: Object.keys(dayData).length,
    },
  })).reverse(),
});

const getDailyRef = (app, childId = false) => (
  childId && app.database()
    .ref(`/child-activities-aggregations/${childId}/daily/`)
    .orderByKey()
    .limitToLast(30)
);

const getWeeklyRef = (app, childId = false) => (
  childId && app.database()
    .ref(`/child-activities-aggregations/${childId}/weekly/`)
    .orderByKey()
    .limitToLast(30)
);

export const getDaily = connectToMap(
  getDailyAggregation,
  (props, app) => getDailyRef(app, getChildIdFromRouteParams(props)),
);

export const getWeekly = connectToMap(
  (data) => ({
    weekly1: map(data, (weekData, week) => ({
      week,
      weekData: {
        volume: sum(toArray(weekData)),
        count: Object.keys(weekData).length,
      },
    })).reverse(),
  }),
  (props, app) => getWeeklyRef(app, getChildIdFromRouteParams(props)),
);
