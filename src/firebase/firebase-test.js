import initializeApp from './firebase.js';
import config from '../config/firebase.js';
import { expect } from 'chai';

describe('Firebase', () => {
  describe('# initialize', () => {
    let app;

    before(() => {
      app = initializeApp(config, 'test-app');
    });

    after(done => {
      app.delete().then(() => done());
    });

    it('should use the given app name', () => {
      expect(app.name).equal('test-app');
    });

    it('should have the given interface', () => {
      expect(app).have.property('name');
      expect(app).have.property('auth');
      expect(app).have.property('database');
      expect(app).have.property('delete');
    });
  });
});
