import React from 'react';
import { ListItem } from 'material-ui/List';
import Time from 'react-time';
import { mapProps } from 'recompose';
import * as COPY from '../../copy.json';
import { interval } from '../../../utils/hoc/interval';

const IntervalTime = interval(60e3)(Time);

export const getPrimaryText = (session) => (
  <span>
    <IntervalTime value={session.startTime} relative />
    &nbsp;&mdash;&nbsp;
    {session.endTime ? <IntervalTime value={session.endTime} relative /> : COPY.PRESENT_TIME}
  </span>
);

const SessionListItem = mapProps(({ session }) => ({
  primaryText: getPrimaryText(session),
}))(ListItem);

export default SessionListItem;
