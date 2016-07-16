export { reducer } from './state/reducer';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import EmptySession from './components/empty_session/empty_session';
import CurrentActivity from './components/current_activity/current_activity';

import { bindActionCreators } from 'redux';
import * as ACTION_CREATORS from './state/actionCreators';

import { get, takeWhile } from 'lodash/fp';

const getDefaultVolume = get('activity.settings.defaultVolume');
const getCurrentActivityStatus = get('activity.activities[0].done');
const getCurrentActivityId = get('activity.activities[0].id');
const onlyLatestActivity = activityId => takeWhile({ activityId });

const ConnectedEmptySession = connect(
  state => ({
    defaultVolume: getDefaultVolume(state),
    activities: state.activity.activities,
  }),
  dispatch => ({
    onNewSessionAdded: bindActionCreators(ACTION_CREATORS.newAndStartBottle, dispatch),
  }),
)(EmptySession);

const ConnectedCurrentActivity = connect(
  state => ({
    sessions: onlyLatestActivity(getCurrentActivityId(state))(state.activity.sessions),
    currentActivity: state.activity.activities[0],
  }),
  dispatch => ({
    onPause: bindActionCreators(ACTION_CREATORS.pauseSession, dispatch),
    onResume: bindActionCreators(ACTION_CREATORS.startBottle, dispatch),
    onComplete: bindActionCreators(ACTION_CREATORS.completeBottle, dispatch),
  }),
)(CurrentActivity);

const ActivityContainer = ({ hasCurrentSession }) => (
  hasCurrentSession ?
    <ConnectedCurrentActivity /> :
    <ConnectedEmptySession />
);

ActivityContainer.propTypes = {
  hasCurrentSession: PropTypes.bool.isRequired,
};

const wrapActivityContainer = connect(
  state => ({
    hasCurrentSession: getCurrentActivityStatus(state) === false,
  }),
);

const ConnectedActivityContainer = wrapActivityContainer(ActivityContainer);

export { ConnectedActivityContainer };
