/* eslint-disable */
import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TimelineListItem from './list-item';
import * as COPY from '../../copy.json';

const ActivityTimeline = ({ sessions, currentActivity, onPause }) => (
  <div>
    <Card>
      <CardHeader
        title="Bottle"
        subtitle={`Current bottle ${currentActivity.volume}`}
        avatar="http://lorempixel.com/100/100/nature/"
      />
      <CardActions>
        <FlatButton label={COPY.PAUSE_SESSION} onTouchTap={onPause}/>
        <FlatButton label={COPY.STOP_SESSION} secondary/>
      </CardActions>
    </Card>
    <List>
    {
      sessions.map(session => <TimelineListItem key={session.id} session={session} />)
    }
    </List>
  </div>
);

ActivityTimeline.propTypes = {
  sessions: PropTypes.array.isRequired,
  currentActivity: PropTypes.object.isRequired,
  onPause: PropTypes.func.isRequired,
};

export default ActivityTimeline;
