import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { mapProps } from 'recompose';
import moment from 'moment';

const ActivityListItem = mapProps(({ activity, ...rest }) => ({
  primaryText: `bottle ${activity.volume} (${moment(activity.endTime).fromNow()})`,
  ...rest,
}))(ListItem);

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
