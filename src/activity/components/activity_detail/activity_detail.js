import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import TimePicker from 'material-ui/TimePicker';
// import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import { defaultProps, setPropTypes, withState, mapProps, withHandlers, compose } from 'recompose';
import * as COPY from '../../copy.json';

const ActivityDetailDialog = ({
  activityId,
  open,
  actions,
  activity,
  // showAdvancedOptions,
  onVolumeChanged,
  onStartTimeChanged,
  onEndTimeChanged,
  onAdvancedOptionsCheckboxChanged,
}) => (
  <Dialog
    open={open}
    actions={actions}
    key={`activity_${activityId || 'new'}_detail`}
    title={COPY.DETAIL_DIALOG_TITLE}
  >
    <div>
      <TextField
        fullWidth
        type="number"
        name="volume"
        value={activity.volume}
        floatingLabelText={COPY.MILK_VOLUME}
        onChange={onVolumeChanged}
      />
      <TimePicker
        fullWidth
        floatingLabelText={COPY.START_TIME}
        name="startTime"
        value={activity.startTime && new Date(activity.startTime)}
        onChange={onStartTimeChanged}
        format="24hr"
      />
      <TimePicker
        fullWidth
        floatingLabelText={COPY.END_TIME}
        name="endTime"
        value={activity.endTime && new Date(activity.endTime)}
        onChange={onEndTimeChanged}
        format="24hr"
      />
      <Checkbox
        label="Advanced options"
        onCheck={onAdvancedOptionsCheckboxChanged}
      />
    </div>
  </Dialog>
);

ActivityDetailDialog.propTypes = {
  activityId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  actions: PropTypes.array.isRequired,
  activity: PropTypes.object.isRequired,

  onVolumeChanged: PropTypes.func.isRequired,
  onStartTimeChanged: PropTypes.func.isRequired,
  onEndTimeChanged: PropTypes.func.isRequired,
  onAdvancedOptionsCheckboxChanged: PropTypes.func.isRequired,
};

const EnhancedActivityDetailDialog = compose(
  setPropTypes({
    open: PropTypes.bool.isRequired,
    initialActivity: PropTypes.object,
    closeDialog: PropTypes.func.isRequired,
    updateActivity: PropTypes.func.isRequired,
  }),
  defaultProps({
    initialActivity: {},
  }),
  withState('changes', 'setChanges', {}),
  withState('showAdvancedOptions', 'setShowAdvancedOptions', false),
  withHandlers({
    onSubmit: ({ updateActivity, closeDialog, initialActivity, changes }) => () => {
      updateActivity(initialActivity.id, {
        ...initialActivity,
        ...changes,
      });
      closeDialog();
    },
    onVolumeChanged: ({ setChanges }) => e => {
      setChanges({
        volume: Number(e.target.value),
      });
    },
    onStartTimeChanged: ({ setChanges }) => (e, date) => {
      setChanges({
        startTime: date.getTime(),
      });
    },
    onEndTimeChanged: ({ setChanges }) => (e, date) => {
      setChanges({
        endTime: date.getTime(),
      });
    },
    onAdvancedOptionsCheckboxChanged: ({ setShowAdvancedOptions }) => (e, checked) =>
      setShowAdvancedOptions(checked),
  }),
  mapProps(({ initialActivity, changes, closeDialog, onSubmit, ...rest }) => ({
    activityId: initialActivity.id,
    activity: {
      ...initialActivity,
      ...changes,
    },
    actions: [
      <FlatButton
        label={COPY.ACTIONS_CLOSE}
        onTouchTap={closeDialog}
      />,
      <FlatButton
        label={COPY.ACTIONS_SAVE}
        primary
        onTouchTap={onSubmit}
        disabled={isEmpty(changes)}
      />,
    ],
    ...rest,
  })),
)(ActivityDetailDialog);

export default EnhancedActivityDetailDialog;
