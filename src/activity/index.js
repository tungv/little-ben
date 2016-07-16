export { reducer } from './state/reducer';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import EmptySession from './components/empty_session/empty_session';
import CurrentActivity from './components/current_activity/current_activity';

import { bindActionCreators } from 'redux';
import * as ACTION_CREATORS from './state/actionCreators';

import { find } from 'lodash';
import { get, takeWhile, filter, flow } from 'lodash/fp';

const getDefaultVolume = get('activity.settings.defaultVolume');
const getActivities = flow([
  get('activity.activities'),
  filter({ hidden: false }),
]);

const getCurrentActivityId = flow([
  getActivities,
  get('[0].id'),
]);

const onlyLatestActivity = activityId => takeWhile({ activityId });

const ConnectedEmptySession = connect(
  state => ({
    defaultVolume: getDefaultVolume(state),
    activities: getActivities(state),
  }),
  dispatch => ({
    onNewSessionAdded: bindActionCreators(ACTION_CREATORS.newAndStartBottle, dispatch),
    removeBottle: bindActionCreators(ACTION_CREATORS.removeBottle, dispatch),
    openActivity: bindActionCreators(ACTION_CREATORS.setCurrentActivity, dispatch),
  }),
)(EmptySession);

const ConnectedCurrentActivity = connect(
  state => ({
    sessions: onlyLatestActivity(getCurrentActivityId(state))(state.activity.sessions),
    currentActivity: find(state.activity.activities, { id: state.activity.selectedActivity }),
  }),
  dispatch => ({
    onPause: bindActionCreators(ACTION_CREATORS.completeSession, dispatch),
    onResume: bindActionCreators(ACTION_CREATORS.resumeBottle, dispatch),
    onComplete: bindActionCreators(ACTION_CREATORS.completeBottle, dispatch),
  }),
)(CurrentActivity);

const ActivityContainer = ({ hasCurrentActivity }) => (
  hasCurrentActivity ?
    <ConnectedCurrentActivity /> :
    <ConnectedEmptySession />
);

ActivityContainer.propTypes = {
  hasCurrentActivity: PropTypes.bool.isRequired,
};

const wrapActivityContainer = connect(
  state => ({
    hasCurrentActivity: !!state.activity.selectedActivity,
  }),
);

const ConnectedActivityContainer = wrapActivityContainer(ActivityContainer);

export { ConnectedActivityContainer };
