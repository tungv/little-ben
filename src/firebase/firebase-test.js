import initializeApp from './index.js';
import config from '../config/firebase.js';
import { expect } from 'chai';

describe('Firebase', () => {
  describe('# initialize', () => {
    let app;

    before((done) => {
      initializeApp(config).then(_app => {
        app = _app;
        done()
      });
    });

    after(done => {
      app.delete().then(() => done());
    });

    it('should have the given interface', () => {
      expect(app).have.property('name');
      expect(app).have.property('auth');
      expect(app).have.property('database');
      expect(app).have.property('delete');
    });
  });
});
