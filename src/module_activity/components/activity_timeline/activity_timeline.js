// @flow
import React from 'react';
import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActivityListItem from './activity_item';

import styles from './activity_timeline.css';

export type ActivityType = {
  id: string,
  volume: number,
  natural: ?boolean,
  remaining: ?number,
  done: boolean,
  startTime: number,
  endTime: ?number,
  hidden: boolean,
};

export type ActivityTimelinePropsType = {
  activities: ActivityType[],
  removeActivity: Function,
  openActivity: Function,
  openCreateForm: Function,
};

// eslint-disable-next-line flowtype/require-return-type
const ActivityTimeline = ({
  activities,
  removeActivity,
  openActivity,
  openCreateForm,
}: ActivityTimelinePropsType) => (
  <section className={styles.root}>
    <List className={styles.list}>
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
    <footer className={styles.footer}>
      <FloatingActionButton onTouchTap={openCreateForm}>
        <ContentAdd />
      </FloatingActionButton>
    </footer>
  </section>
);

export default ActivityTimeline;
