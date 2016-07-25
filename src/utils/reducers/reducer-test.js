import { select, push, selectAndPush } from './helpers.js';
import { expect } from 'chai';

describe('reducer helpers', () => {
  describe('#select()', () => {
    it('should work without default value', () => {
      const handler = select('path');
      const action = {
        payload: { path: 'after' }
      };
      const actual = handler('before', action);
      expect(actual).to.equal('after');
    });

    it('should work with default value', () => {
      const handler = select('unknownPath', 'default');
      const action = {
        payload: { path: 'after' }
      };
      const actual = handler('before', action);
      expect(actual).to.equal('default');
    });
  });

  describe('#selectAndPush', () => {
    it('should select and push', () => {
      const handler = selectAndPush('path');
      const action = {
        payload: { path: { x: 1 } }
      };
      const actual = handler([{ x: 0 }], action);
      expect(actual).to.deep.equal([
        { x: 0 },
        { x: 1 },
      ]);
    });

    it('should not push empty selection', () => {
      const handler = selectAndPush('pathX');
      const action = {
        payload: { path: { x: 1 } }
      };
      const actual = handler([{ x: 0 }], action);
      expect(actual).to.deep.equal([
        { x: 0 },
      ]);
    });
  });

  describe('#push', () => {
    it('should push', () => {
      const handler = push();
      const action = {
        payload: { x: 1 }
      };
      const actual = handler([{ x: 0 }], action);
      expect(actual).to.deep.equal([
        { x: 0 },
        { x: 1 },
      ]);
    });

    it('should push empty payload', () => {
      const handler = push();
      const action = {
        payload: void 0
      };
      const actual = handler([{ x: 0 }], action);
      expect(actual).to.deep.equal([
        { x: 0 },
      ]);
    });
  });
});
