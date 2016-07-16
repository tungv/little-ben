import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { compose, mapProps } from 'recompose';
import moment from 'moment';
import { interval } from '../../../utils/hoc/interval';

const ActivityListItem = compose(
  interval(60e3),
  mapProps(({ activity, ...rest }) => ({
    primaryText: `bottle ${activity.volume} (${moment(activity.endTime).fromNow()})`,
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
