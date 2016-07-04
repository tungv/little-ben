import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Time from 'react-time';
import * as COPY from '../../copy.json';

export const getPrimaryText = (session) => (
  <span>
    <Time value={session.startTime} relative />
    &nbsp;&mdash;&nbsp;
    {session.endTime ? <Time value={session.endTime} relative /> : COPY.PRESENT_TIME}
  </span>
);

const TimelineListItem = ({ session }) => (
  <ListItem primaryText={getPrimaryText(session)} />
);

TimelineListItem.propTypes = {
  session: PropTypes.object.isRequired,
};

export default TimelineListItem;
