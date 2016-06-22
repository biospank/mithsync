import { expect } from 'chai';
import something from '../../web/static/js/something';

describe('something()', () => {
  it('return something', () => {
    expect(something()).to.be.equal('something');
  })
});
