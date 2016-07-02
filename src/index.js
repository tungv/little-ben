import './prerequisites';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { MainComponent } from './main/index.js';

const mainContainer = document.getElementById('main');
render((
  <AppContainer>
    <MainComponent />
  </AppContainer>
), mainContainer);

if (module.hot) {
  module.hot.accept('./main/index.js', () => {
    const Reloaded = require('./main/index.js').default; // eslint-disable-line global-require
    render((
      <AppContainer>
        <Reloaded />
      </AppContainer>
    ), mainContainer);
  });
}
