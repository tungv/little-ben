import React from 'react';
import { compose, mapProps, withHandlers } from 'recompose';
import moment from 'moment';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { interval } from '../../../utils/hoc/interval';
import * as COPY from '../../copy.json';
import styles from './activity_item.css';

const getDurationDescription = ({
  startTime,
  endTime,
}: {
  startTime: number,
  endTime: number,
}): string => {
  const start = moment(startTime);
  const end = moment(endTime);
  return start.to(end, true);
};

const iconButtonElement = (
  <IconButton touch tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon />
  </IconButton>
);

const ActivityListItem = compose(
  interval(60e3),
  withHandlers({
    // eslint-disable-next-line
    onDelete: props => () => {
      props.removeActivity(props.activity);
    },
    // eslint-disable-next-line
    onOpen: props => () => {
      props.openActivity(props.activity.id);
    },
  }),
  // eslint-disable-next-line flowtype/require-return-type, flowtype/require-parameter-type
  mapProps(({ activity, onDelete, onOpen }) => ({
    primaryText: (
      <span>
        <strong>{activity.volume}ml</strong> sữa trong {getDurationDescription(activity)}
      </span>
    ),
    secondaryText: moment(activity.endTime).calendar(),
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

export default ActivityListItem;
