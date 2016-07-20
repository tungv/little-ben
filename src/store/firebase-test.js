import initializeApp from './firebase.js';
import config from '../config/firebase.js';

describe('Firebase', () => {
  describe('# initialize', () => {
    it('should initial app', () => {
      initializeApp(config);
    });
  });
});
