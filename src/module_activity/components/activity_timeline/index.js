// @flow
/* eslint-disable */
import { connect } from 'react-redux';
import { bindAtionsCreator } from 'redux';
import * as ACTION_CREATORS from '../state/action_creators';
import ActivityTimeline, { ActivityTimelinePropsType } from './activity_timeline';

const decorator = connect(
  (state: any): Object => ({
    activities: state.activities,
  }),
  (dispatch: Function): Object => ({
    removeActivity: console.log('removeActivity'),
    openActivity: console.log('openActivity'),
  })
);

export default decorator(ActivityTimeline);
