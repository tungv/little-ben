import React, { PropTypes } from 'react';
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
    onDelete: props => () => {
      props.removeBottle(props.activity.id);
    },
  }),
  mapProps(({ activity, onDelete }) => ({
    primaryText: (<span>
      bình <strong>{activity.volume}ml</strong>
      &nbsp;&nbsp;&nbsp;
      <em className={styles.endTime}>({moment(activity.endTime).fromNow()})</em>
    </span>),
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
        />
      </IconMenu>
    ),
  })),
)(ListItem);

const ActivityTimeline = ({ activities, removeBottle }) => (
  <List>
  {
    activities.map(activity => (
      <ActivityListItem
        key={activity.id}
        activity={activity}
        removeBottle={removeBottle}
      />
    ))
  }
  </List>
);

ActivityTimeline.propTypes = {
  activities: PropTypes.array.isRequired,
  removeBottle: PropTypes.func.isRequired,
};

export default ActivityTimeline;
