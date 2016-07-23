// @flow
import './prerequisites';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';
import { MainComponent } from './main/index.js';
import { getStore } from './store';
import initFirebase, { authenticate } from './firebase';
import type { FirebaseAppType } from './firebase/types';
import firebaseConfig from './config/firebase';
import { subscribeToFirebase } from './firebase/state/subscriptions';

const mainContainer = document.getElementById('main');
const store = getStore();

initFirebase(firebaseConfig)
  .then(authenticate)
  .then((app: FirebaseAppType) => {
    // eslint-disable-next-line immutable/no-let
    let subscription = subscribeToFirebase(app)(store.dispatch);

    if (module.hot) {
      module.hot.accept('./firebase/state/subscriptions', () => {
        subscription.unsubscribe();
        const nextsubscribeToFirebase = require('./firebase/state/subscriptions').subscribeToFirebase; // eslint-disable-line
        subscription = nextsubscribeToFirebase(app)(store.dispatch);
      });
    }
  });

render((
  <AppContainer errorReporter={Redbox}>
    <MainComponent store={store} />
  </AppContainer>
), mainContainer);

if (module.hot) {
  module.hot.accept('./main/index.js', () => {
    const Reloaded = require('./main/index.js').MainComponent; // eslint-disable-line
    render((
      <AppContainer errorReporter={Redbox}>
        <Reloaded store={store} />
      </AppContainer>
    ), mainContainer);
  });
}
