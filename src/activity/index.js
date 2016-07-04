export { reducer } from './state/reducer';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import EmptySession from './components/empty_session/empty_session';
import TimeLine from './components/timeline/timeline';

import { bindActionCreators } from 'redux';
import * as ACTION_CREATORS from './state/actionCreators';

import { get } from 'lodash/fp';

const getDefaultVolume = get('activity.settings.defaultVolume');


const ConnectedEmptySession = connect(
  state => ({ defaultVolume: getDefaultVolume(state) }),
  dispatch => ({
    onNewSessionAdded: bindActionCreators(ACTION_CREATORS.newAndStartBottle, dispatch),
  }),
)(EmptySession);

const ConnectedTimeLine = connect(
  state => ({
    sessions: state.activity.sessions,
    currentActivity: state.activity.currentActivity,
  }),
  dispatch => ({
    onPause: bindActionCreators(ACTION_CREATORS.pauseSession, dispatch),
  }),
)(TimeLine);

const ActivityContainer = ({ hasCurrentSession }) => (
  hasCurrentSession ?
    <ConnectedTimeLine /> :
    <ConnectedEmptySession />
);

ActivityContainer.propTypes = {
  hasCurrentSession: PropTypes.bool.isRequired,
};

const wrapActivityContainer = connect(
  state => ({
    hasCurrentSession: state.activity.currentActivity !== null,
  }),
);

const ConnectedActivityContainer = wrapActivityContainer(ActivityContainer);

export { ConnectedActivityContainer };
