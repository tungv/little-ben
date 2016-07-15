import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DrinkIcon from 'material-ui/svg-icons/maps/local-drink';
import * as COPY from '../../copy.json';

const TimelineActivityCard = ({
  currentSession,
  currentActivity,
  onPause,
  onResume,
  onComplete,
}) => (
  <Card>
    <CardHeader
      title="Bottle"
      subtitle={`Current bottle ${currentActivity.volume}`}
      avatar={<DrinkIcon style={{ width: 36, height: 36 }} />}
    />
    <CardActions>
      <FlatButton
        label={currentSession.endTime ? COPY.RESUME_SESSION : COPY.PAUSE_SESSION}
        onTouchTap={currentSession.endTime ? onResume : onPause}
      />
      <FlatButton
        secondary
        label={COPY.STOP_SESSION}
        onTouchTap={onComplete}
      />
    </CardActions>
  </Card>
);

TimelineActivityCard.propTypes = {
  currentSession: PropTypes.object.isRequired,
  currentActivity: PropTypes.object.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default TimelineActivityCard;
