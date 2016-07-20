import './prerequisites';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';
import { MainComponent } from './main/index.js';
import { getStore } from './store';
import moment from 'moment';
import initializeApp, { FirebaseUserType } from './firebase';
import firebaseConfig from './config/firebase';
moment.locale('vi');

const store = getStore();

initializeApp(firebaseConfig, 'little-ben')
  .then(({ user }: { user: ?FirebaseUserType }) => {
    store.dispatch({
      type: 'USER/loggedIn',
      payload: user,
    });
  });

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
