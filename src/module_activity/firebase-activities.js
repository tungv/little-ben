import { map as lodashMap, sortBy, sum, toArray } from 'lodash';
import { get } from 'lodash/fp';
import { connectToMap } from '../firebase/utils/FirebaseProvider';
import type { RefOverloadingType } from '../firebase/utils/basicStreams';
import moment from 'moment';

const getChildIdFromRouteParams = get('routeParams.childId');

const getActivitiesRef = (app, childId = false): RefOverloadingType|false => (
  childId && app.database()
    .ref(`/child-activities/${childId}`)
    .orderByChild('endTime')
    .limitToLast(6)
);

export const getActivities = connectToMap(
  (data: any) => ({
    activities: sortBy(
      lodashMap(data, (value, key) => ({ ...value, id: key })),
      'startTime'
    ).reverse(),
  }),
  (props, app) => getActivitiesRef(app, getChildIdFromRouteParams(props)),
);

const getDailyAggregation = (data) => ({
  daily: lodashMap(data, (dayData, date) => ({
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
    weekly1: lodashMap(data, (weekData, week) => ({
      week,
      weekData: {
        volume: sum(toArray(weekData)),
        count: Object.keys(weekData).length,
      },
    })).reverse(),
  }),
  (props, app) => getWeeklyRef(app, getChildIdFromRouteParams(props)),
);

export const hideActivity = (app, childId, activityId) => {
  const ref = app.database().ref(`/child-activities/${childId}/${activityId}`);
  ref.once('value', snapshot => {
    const activity = snapshot.val();
    const endTime = activity.endTime;
    const dayStamp = moment(endTime).format('YYYYMMDD');
    const weekStamp = moment(endTime).format('YYYYww');

    const activityPath = `/child-activities/${childId}/${activityId}`;
    const archivedPath = `/child-activities-archived/${childId}/${activityId}`;
    const dayPath = `/child-activities-aggregations/${childId}/daily/${dayStamp}/${activityId}`;
    const weekPath = `/child-activities-aggregations/${childId}/daily/${weekStamp}/${activityId}`;

    const updates = ({
      [activityPath]: null,
      [archivedPath]: activity,
      [dayPath]: null,
      [weekPath]: null,
    });

    app.database().ref('/').update(updates);
  });
};
