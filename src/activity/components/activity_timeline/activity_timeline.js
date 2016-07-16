import React, { PropTypes } from 'react';
import { compose, mapProps } from 'recompose';
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
  mapProps(({ activity, ...rest }) => ({
    primaryText: `bottle ${activity.volume} (${moment(activity.endTime).fromNow()})`,
    rightIconButton: (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          primaryText={COPY.DELETE_ACTIVITY}
          rightIcon={<DeleteIcon />}
        />
        <MenuItem
          primaryText={COPY.UPDATE_ACTIVITY}
          rightIcon={<EditIcon />}
        />
      </IconMenu>
    ),
    ...rest,
  })),
)(ListItem);

const ActivityTimeline = ({ activities }) => (
  <List>
  {
    activities.map(activity => (
      <ActivityListItem key={activity.id} activity={activity} />
    ))
  }
  </List>
);

ActivityTimeline.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default ActivityTimeline;
