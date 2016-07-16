import React from 'react';
import { ListItem } from 'material-ui/List';
import Time from 'react-time';
import { mapProps, compose } from 'recompose';
import * as COPY from '../../copy.json';
import { interval } from '../../../utils/hoc/interval';

export const getPrimaryText = (session) => (
  <span>
    <Time value={session.startTime} relative />
    &nbsp;&mdash;&nbsp;
    {session.endTime ? <Time value={session.endTime} relative /> : COPY.PRESENT_TIME}
  </span>
);

const SessionListItem = compose(
  interval(60e3),
  mapProps(({ session }) => ({
    primaryText: getPrimaryText(session),
  })),
)(ListItem);

export default SessionListItem;
