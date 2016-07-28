// @flow
import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { compose, withHandlers, withState } from 'recompose';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import type { ActivityType } from '../../types';
import RecentTab from './recent_tab';
import DailyTab from './daily_tab';

import * as COPY from '../../copy.json';
import styles from './activity_timeline.css';

export type ActivityTimelinePropsType = {
  activities: ActivityType[],
  daily: Object[],
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
  daily,
  currentTab,
  onTabChange,
}: ActivityTimelinePropsType) => (
  <section className={styles.root}>
    <Tabs className={styles.tabs} value={currentTab} onChange={onTabChange}>
      <Tab label={COPY.UI_TAB_RECENT} value="recent">
        <RecentTab
          className={styles.tabContent}
          activities={activities}
          removeActivity={removeActivity}
          openActivity={openActivity}
        />
      </Tab>
      <Tab label={COPY.UI_TAB_DAILY} value="daily" className={styles.tabContent}>
        <DailyTab daily={daily} />
      </Tab>
    </Tabs>
    <footer className={styles.footer}>
      <FloatingActionButton onTouchTap={openCreateForm}>
        <ContentAdd />
      </FloatingActionButton>
    </footer>
  </section>
);

const enhance = compose(
  withState('currentTab', 'changeTab', 'recent'),
  withHandlers({
    onTabChange: props => e => props.changeTab(e),
  })
);

export default enhance(ActivityTimeline);
