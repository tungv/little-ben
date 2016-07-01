import React from 'react';
import { AddActivityButton } from './add_button';
import { partial } from 'lodash';

export const AddActivityContainer = ({ activities, openAddActivityDialog }) => (
  <div>
    {activities.map(({ activityType }) =>
      (<AddActivityButton
        text={activityType}
        onClick={partial(openAddActivityDialog, activityType)}
      />)
    )}
  </div>
);

AddActivityContainer.propTypes = {
  activities: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  openAddActivityDialog: React.PropTypes.func.isRequired,
};
