import React from 'react';
import { List } from 'material-ui/List';
import ActivityListItem from './activity_item';

import type { ActivityType } from '../../types';

const RecentTab = ({ className, activities, removeActivity, openActivity }) => (
  <List className={className}>
  {
    // eslint-disable-next-line flowtype/require-return-type
    activities.map((activity: ActivityType) => (
      <ActivityListItem
        key={activity.id}
        activity={activity}
        removeActivity={removeActivity}
        openActivity={openActivity}
      />
    ))
  }
  </List>
);

export default RecentTab;
