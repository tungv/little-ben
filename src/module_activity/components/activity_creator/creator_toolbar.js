import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import * as COPY from '../../copy.json';

const ActivityCreatorToolBar = ({ children, title, onSubmit, onClose, allowSubmit }) => (
  <AppBar
    title={title}
    children={children}
    iconElementLeft={<IconButton onTouchTap={onClose}><NavigationClose /></IconButton>}
    iconElementRight={allowSubmit ? <FlatButton
      onTouchTap={onSubmit}
      label={COPY.ACTIONS_SAVE}
    /> : null}
  />
);

export default ActivityCreatorToolBar;
