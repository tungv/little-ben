import React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ActivityListItem from './activity_item';
import moment from 'moment';

import type { ActivityType } from '../../types';

const RecentTab = ({ className, activities, removeActivity, openActivity }) => {
  const isEmpty = activities.length === 0;

  if (isEmpty) {
    return <div></div>;
  }

  const latestActivity = activities[0];

  return (<List className={className}>
    <Subheader>Lần cuối ({moment(latestActivity.endTime).fromNow()})</Subheader>
    <ActivityListItem
      key={latestActivity.id}
      activity={latestActivity}
      removeActivity={removeActivity}
      openActivity={openActivity}
    />
    <Divider />
    <Subheader>Trước đó</Subheader>
    {
      // eslint-disable-next-line flowtype/require-return-type
      activities.slice(1).map((activity: ActivityType) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          removeActivity={removeActivity}
          openActivity={openActivity}
        />
      ))
    }
  </List>);
};

export default RecentTab;
