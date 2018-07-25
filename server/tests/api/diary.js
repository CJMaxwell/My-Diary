import  { expect } from 'chai';
import request from 'supertest';
import 'babel-polyfill';

import app from '../../../app';


describe('When a User enters an entry', () => {
  it('Then it should return the entry details', async () => {
    const response = await request(app)
      .post('/api/v1/entries')
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
