// @flow
import React from 'react';
import { compose, mapProps, withHandlers } from 'recompose';
import moment from 'moment';

import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { interval } from '../../../utils/hoc/interval';
import * as COPY from '../../copy.json';
import styles from './activity_timeline.css';

export type ActivityType = {
  id: string,
  volume: number,
  natural: ?boolean,
  remaining: number,
  done: boolean,
  startTime: number,
  endTime: ?number,
  hidden: boolean,
};

export type ActivityTimelinePropsType = {
  activities: ActivityType[],
  removeActivity: Function,
  openActivity: Function,
};

const getDurationDescription = ({ startTime, endTime }) : string => {
  const start = moment(startTime);
  const end = moment(endTime);
  return start.to(end, true);
};

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon />
  </IconButton>
);

const ActivityListItem = compose(
  interval(60e3),
  withHandlers({
    // eslint-disable-next-line
    onDelete: props => () => {
      props.removeActivity(props.activity.id);
    },
    // eslint-disable-next-line
    onOpen: props => () => {
      props.openActivity(props.activity.id);
    },
  }),
  // eslint-disable-next-line flowtype/require-return-type, flowtype/require-parameter-type
  mapProps(({ activity, onDelete, onOpen }) => ({
    primaryText: (<span>
      bình <strong>{activity.volume}ml</strong> trong {getDurationDescription(activity)}
      &nbsp;&nbsp;&nbsp;
      <em className={styles.endTime}>({moment(activity.endTime).fromNow()})</em>
    </span>),
    onTouchTap: onOpen,
    rightIconButton: (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          primaryText={COPY.DELETE_ACTIVITY}
          rightIcon={<DeleteIcon />}
          onTouchTap={onDelete}
        />
        <MenuItem
          primaryText={COPY.UPDATE_ACTIVITY}
          rightIcon={<EditIcon />}
          onTouchTap={onOpen}
        />
      </IconMenu>
    ),
  })),
)(ListItem);

// eslint-disable-next-line flowtype/require-return-type
const ActivityTimeline = ({
  activities,
  removeActivity,
  openActivity,
}: ActivityTimelinePropsType) => (
  <List>
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

export default ActivityTimeline;
