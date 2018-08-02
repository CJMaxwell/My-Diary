import  { expect } from 'chai';
import request from 'supertest';
import 'babel-polyfill';

import app from '../../../app';


describe('When a User signs up', () => {
  it('Then it should return the user details and Json Web Token', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'Harwaii',
        email: 'harwaii2018@yahoo.co.uk',
        password: 'youtocome',
      });
    expect(response.body.user.username).to.equal('Harwaii');
    expect(response.body.user.email).to.equal('harwaii2018@yahoo.co.uk');
    expect(response.body.token).to.be.a('string');
  });
});

describe('When a User signs in', () => {
  it('Then it should return the user details and Json Web Token', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'Hariman',
        email: 'hariman2018@yahoo.co.uk',
        password: 'youtocome',
      });
    expect(response.body.user.username).to.equal('Hariman');
    expect(response.body.user.email).to.equal('hariman2018@yahoo.co.uk');
    expect(response.body.token).to.be.a('string');
  });
});

describe('When a User signs in with wrong email address', () => {
  it('Then it should return `Email does not exist`', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({});
    expect(response.body.error).to.equal('Email does not exist');
  });
});
