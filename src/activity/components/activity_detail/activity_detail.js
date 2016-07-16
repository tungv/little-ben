import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { defaultProps, setPropTypes, withState, mapProps, withHandlers, compose } from 'recompose';
import * as COPY from '../../copy.json';

const ActivityDetailDialog = ({
  activityId,
  open,
  actions,
  activity,
  onVolumeChanged,
}) => (
  <Dialog
    open={open}
    actions={actions}
    key={`activity_${activityId || 'new'}_detail`}
  >
    <div>
      <TextField
        type="number"
        value={activity.volume}
        floatingLabelText={COPY.MILK_VOLUME}
        onChange={onVolumeChanged}
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
  }),
  mapProps(({ initialActivity, changes, closeDialog, onSubmit, ...rest }) => ({
    activityId: initialActivity.id,
    activity: {
      ...initialActivity,
      ...changes,
    },
    actions: [
      <FlatButton label="Save" primary onTouchTap={onSubmit} disabled={isEmpty(changes)} />,
      <FlatButton label="Close" onTouchTap={closeDialog} />,
    ],
    ...rest,
  })),
)(ActivityDetailDialog);

export default EnhancedActivityDetailDialog;
