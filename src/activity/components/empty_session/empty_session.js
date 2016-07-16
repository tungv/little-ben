import React, { PropTypes } from 'react';
import { compose, withHandlers, withState } from 'recompose';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActivityTimeline from '../activity_timeline/activity_timeline';

import styles from './empty_session.css';
import * as COPY from '../../copy.json';

const EmptySession = ({ handleAddButtonClick, volume, onVolumeChanged, activities }) => (
  <div>
    <Paper className={styles.container}>
      <TextField
        type="number"
        floatingLabelText={COPY.MILK_VOLUME}
        value={volume}
        onChange={onVolumeChanged}
      />
      <RaisedButton
        onTouchTap={handleAddButtonClick}
        primary
        label={COPY.START_SESSION}
      />
    </Paper>
    <ActivityTimeline activities={activities} />
  </div>
);

EmptySession.propTypes = {
  handleAddButtonClick: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  onVolumeChanged: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
};

const EnhancedEmptySession = compose(
  withState(
    'volume',
    'setVolumeValue',
    props => props.defaultVolume
  ),
  withHandlers({
    onVolumeChanged: props => event => {
      props.setVolumeValue(Number(event.target.value));
    },
    handleAddButtonClick: props => () => {
      props.onNewSessionAdded({ volume: props.volume });
    },
  }),
)(EmptySession);

EnhancedEmptySession.propTypes = {
  defaultVolume: PropTypes.number.isRequired,
  onNewSessionAdded: PropTypes.func.isRequired,
};

export default EnhancedEmptySession;
