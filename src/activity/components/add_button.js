import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export const AddActivityButton = (props) => (
  <FloatingActionButton {...props}>
    <ContentAdd />
  </FloatingActionButton>
);
