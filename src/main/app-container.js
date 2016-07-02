import React from 'react';
import { AddActivityButton } from '../activity/components/add_button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MainComponent = () => (
  <MuiThemeProvider>
    <AddActivityButton onTouchTap={() => alert('test11')}/>
  </MuiThemeProvider>
);

export default MainComponent;
