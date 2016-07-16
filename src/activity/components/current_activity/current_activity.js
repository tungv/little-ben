import React, { PropTypes } from 'react';
import { withHandlers } from 'recompose';
import { List } from 'material-ui/List';
import ActivityCard from './activity_card';
import SessionListItem from './list-item';

const CurrentActivity = ({ sessions, currentActivity, onPause, onResume, onComplete }) => (
  <div>
    <ActivityCard
      currentActivity={currentActivity}
      currentSession={sessions[0]}
      onPause={onPause}
      onResume={onResume}
      onComplete={onComplete}
    />
    <List>
    {
      sessions.map(session => <SessionListItem key={session.id} session={session} />)
    }
    </List>
  </div>
);

CurrentActivity.propTypes = {
  sessions: PropTypes.array.isRequired,
  currentActivity: PropTypes.object.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

const EnhandedCurrentActivity = withHandlers({
  onPause: props => () => props.onPause(Date.now()),
  onResume: props => () => props.onResume(props.currentActivity.id),
  onComplete: props => () => props.onComplete(Date.now()),
})(CurrentActivity);

export default EnhandedCurrentActivity;
