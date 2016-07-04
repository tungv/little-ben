import './prerequisites';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { MainComponent } from './main/index.js';
import { getStore } from './store';
import moment from 'moment';

moment.locale('vi');

const store = getStore();

const mainContainer = document.getElementById('main');
render((
  <AppContainer>
    <MainComponent store={store} />
  </AppContainer>
), mainContainer);

if (module.hot) {
  module.hot.accept('./main/index.js', () => {
    const Reloaded = require('./main/index.js').MainComponent; // eslint-disable-line global-require
    render((
      <AppContainer>
        <Reloaded store={store} />
      </AppContainer>
    ), mainContainer);
  });
}
