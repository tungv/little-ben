import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import TimelineActivityCard from './activity_card';
import TimelineListItem from './list-item';

const ActivityTimeline = ({ sessions, currentActivity, onPause, onResume, onComplete }) => (
  <div>
    <TimelineActivityCard
      currentActivity={currentActivity}
      currentSession={sessions[0]}
      onPause={onPause}
      onResume={onResume}
      onComplete={onComplete}
    />
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
  onResume: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ActivityTimeline;
