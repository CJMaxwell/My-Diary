import  { expect } from 'chai';
import request from 'supertest';
import 'babel-polyfill';

import app from '../../../app';
let verified = undefined;
describe('When a user logins in', () => {
  it('Then return token', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'Hariman',
        email: 'hariman2018@yahoo.co.uk',
        password: 'youtocome',
      });
    })
    verified = response.body.token;
  })
  console.log(verified);
describe('When a User enters an entry', () => {
  
  it('Then it should return the entry details', async () => {
    const response = await request(app)
      .post('/api/v1/entries')
      .set({
        Accept: 'application/x-www-form-urlencoded',
        token: verified,
      })
      .send({
        title: 'Sweet Dreams',
        body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      });
      // console.log(response.body);
      expect(response.body.entry.title).to.equal('Sweet Dreams');
      expect(response.body.entry.body).to.equal('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
  });
});
describe('When a User enters an entry', () => {
  it('Then it should return the entry details', async () => {
    const response = await request(app)
      .get('/api/v1/entries')
      .set('Accept', 'application/x-www-form-urlencoded')
      expect(response.body.entries).to.be.an('array');
  });
});

describe('When a User enters an entry', () => {
  it('Then it should return the entry details', async () => {
    const response = await request(app)
      .get('/api/v1/entries/1')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        title: 'Sweet Dreams',
        body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      });
      expect(response.body.entry.title).to.equal('Sweet Dreams');
      expect(response.body.entry.body).to.equal('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
  });
});

describe('When a User enters an entry', () => {
  it('Then it should return the entry details', async () => {
    const response = await request(app)
      .put('/api/v1/entries/1')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        title: 'Good vibes',
        body: 'Lorem Ipsum is simply dummy text of the printing'
      });
      expect(response.body.entry.title).to.equal('Good vibes');
      expect(response.body.entry.body).to.equal('Lorem Ipsum is simply dummy text of the printing');
  });
});
