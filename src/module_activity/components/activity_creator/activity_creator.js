import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { defaultProps, setPropTypes, withState, mapProps, withHandlers, compose } from 'recompose';

import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Avatar from 'material-ui/Avatar';
// import DatePicker from 'material-ui/DatePicker';
import { CardHeader } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

import Toolbar from './creator_toolbar';
import * as COPY from '../../copy.json';
import styles from './activity_creator.css';

const getCapitalFirst = (string = ' ') => string[0].toUpperCase();


const ActivityCreator = ({
  activity,
  child,
  onVolumeChanged,
  onStartTimeChanged,
  onEndTimeChanged,
  onNaturalMilkToggle,
  allowSubmit,
  onSubmit,
  closeDialog,
}) => (
  <div className={styles.root}>
    <Toolbar
      title={COPY.NEW_ACTIVITY}
      onSubmit={onSubmit}
      onClose={closeDialog}
      allowSubmit={allowSubmit}
    />
    <div className={styles.form}>
      <CardHeader
        title={child.name}
        subtitle={`Create new activity for ${child.name}`}
        avatar={
          <Avatar>
            {getCapitalFirst(child.name)}
          </Avatar>
        }
      />
      <TextField
        type="number"
        fullWidth
        id="volume"
        inputStyle={{ fontSize: '2rem' }}
        value={activity.volume}
        max="300"
        floatingLabelText={COPY.MILK_VOLUME}
        onChange={onVolumeChanged}
      />
      <Toggle
        label="Sữa mẹ"
        toggled={activity.natural}
        onToggle={onNaturalMilkToggle}
      />
      <TimePicker
        className={styles.timeRow__time}
        floatingLabelText={COPY.START_TIME}
        fullWidth
        id="startTime"
        value={activity.startTime && new Date(activity.startTime)}
        onChange={onStartTimeChanged}
        format="ampm"
      />
      <TimePicker
        floatingLabelText={COPY.END_TIME}
        fullWidth
        id="endTime"
        value={activity.endTime && new Date(activity.endTime)}
        onChange={onEndTimeChanged}
        format="ampm"
      />
    </div>
  </div>
);

// eslint-disable-next-line immutable/no-mutation
ActivityCreator.propTypes = {
  activityId: PropTypes.string,
  activity: PropTypes.object.isRequired,

  onVolumeChanged: PropTypes.func.isRequired,
  onStartTimeChanged: PropTypes.func.isRequired,
  onEndTimeChanged: PropTypes.func.isRequired,
  onNaturalMilkToggle: PropTypes.func.isRequired,
};

const EnhancedActivityCreator = compose(
  setPropTypes({
    initialActivity: PropTypes.object,
    closeDialog: PropTypes.func.isRequired,
    updateActivity: PropTypes.func.isRequired,
    child: PropTypes.object.isRequired,
  }),
  defaultProps({
    initialActivity: {},
  }),
  withState('changes', 'setChanges', {}),
  withHandlers({
    onSubmit: ({ updateActivity, closeDialog, initialActivity, changes }) => () => {
      updateActivity(initialActivity.id, {
        ...initialActivity,
        ...changes,
      });
      closeDialog();
    },
    onVolumeChanged: ({ setChanges, changes }) => e => {
      const vol = Math.min(Number(e.target.value), 300);
      setChanges({ ...changes, volume: vol || '' });
    },
    onStartTimeChanged: ({ setChanges, changes }) => (e, date) => {
      setChanges({
        ...changes,
        startTime: date.getTime(),
      });
    },
    onEndTimeChanged: ({ setChanges, changes }) => (e, date) => {
      setChanges({
        ...changes,
        endTime: date.getTime(),
      });
    },
    onNaturalMilkToggle: ({ setChanges, changes }) => (e, checked) => {
      setChanges({
        ...changes,
        natural: checked,
      });
    },
  }),
  mapProps(({ initialActivity, changes, ...rest }) => ({
    activityId: initialActivity.id,
    activity: {
      ...initialActivity,
      ...changes,
    },
    allowSubmit: !initialActivity.id || !isEmpty(changes),
    ...rest,
  })),
  // mapProps(props => {
  //   console.log('props.child', props.child);
  //   return props;
  // })
)(ActivityCreator);

export default EnhancedActivityCreator;
