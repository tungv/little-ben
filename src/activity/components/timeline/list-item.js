import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Time from 'react-time';
import { lifecycle } from 'recompose';
import * as COPY from '../../copy.json';

const IntervalTime = lifecycle({
  componentDidMount() {
    this.timer = setInterval(() => {
      this.forceUpdate();
    }, 60e3);
  },
  componentWillUnmount() {
    clearInterval(this.timer);
  },
})(Time);

export const getPrimaryText = (session) => (
  <span>
    <IntervalTime value={session.startTime} relative />
    &nbsp;&mdash;&nbsp;
    {session.endTime ? <IntervalTime value={session.endTime} relative /> : COPY.PRESENT_TIME}
  </span>
);

const TimelineListItem = ({ session }) => (
  <ListItem primaryText={getPrimaryText(session)} />
);

TimelineListItem.propTypes = {
  session: PropTypes.object.isRequired,
};

export default TimelineListItem;
