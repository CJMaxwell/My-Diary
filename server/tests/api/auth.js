import  { expect } from 'chai';
import request from 'supertest';
import 'babel-polyfill';

import app from '../../../app';


describe('When a User signs up', () => {
  it('Then it should return the user details and Json Web Token', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        userName: 'Maxwell',
        email: 'chukwunonyeremmaxwell@gmail.com',
        password: 'helloWorld',
      });
    expect(response.body.user.userName).to.equal('Maxwell');
    expect(response.body.user.email).to.equal('chukwunonyeremmaxwell@gmail.com');
    expect(response.body.token).to.be.a('string');
  });
});

describe('When a User signs in', () => {
  it('Then it should return the user details and Json Web Token', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        userName: 'Maxwell',
        email: 'chukwunonyeremmaxwell@gmail.com',
        password: 'helloWorld',
      });
    expect(response.body.user.userName).to.equal('Maxwell');
    expect(response.body.user.email).to.equal('chukwunonyeremmaxwell@gmail.com');
    expect(response.body.token).to.be.a('string');
  });
});

describe('When a User signs in with invalid credentials', () => {
  it('Then it should return `Either password or email is incorrect`', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({});
    expect(response.body.error).to.equal('Either password or email is incorrect');
  });
});
