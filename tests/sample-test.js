import chai from 'chai';
import hello from '../hello';
chai.should();


describe('sample test', () => {
  it('Should be equal to Hello World', () => {
    const greeting = hello();
    greeting.should.equal('Hello World');
  });
});
