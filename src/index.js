import './prerequisites';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';
import { MainComponent } from './main/index.js';
import { getStore } from './store';
import moment from 'moment';

moment.locale('vi');

const store = getStore();

const mainContainer = document.getElementById('main');
render((
  <AppContainer errorReporter={Redbox}>
    <MainComponent store={store} />
  </AppContainer>
), mainContainer);

if (module.hot) {
  module.hot.accept('./main/index.js', () => {
    const Reloaded = require('./main/index.js').MainComponent; // eslint-disable-line global-require
    render((
      <AppContainer errorReporter={Redbox}>
        <Reloaded store={store} />
      </AppContainer>
    ), mainContainer);
  });
}
