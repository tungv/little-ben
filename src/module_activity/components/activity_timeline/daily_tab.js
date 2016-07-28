import React from 'react';
import { List, ListItem } from 'material-ui/List';
import moment from 'moment';

import type { DailyType } from '../../types';
import * as COPY from '../../copy.json';

const displayDate = (dateString) => moment(dateString, 'YYYYMMDD').calendar(null, {
  sameDay: '[Hôm nay]',
  nextDay: '[Ngày mai]',
  nextWeek: 'ddd',
  lastDay: '[Hôm qua]',
  lastWeek: 'ddd [vừa rồi]',
  sameElse: 'DD/MM',
});

const DailyTab = ({ daily }) => (
  <List>
  {
    daily.map((eachDay: DailyType) => (
      <ListItem key={eachDay.date}>
        <strong>{displayDate(eachDay.date)}</strong>
        &nbsp;&mdash;&nbsp;
        {eachDay.dayData.volume}ml&nbsp;&nbsp;({eachDay.dayData.count} {COPY.ACTIVITIES_COUNT})
      </ListItem>
    ))
  }
  </List>
);

export default DailyTab;
