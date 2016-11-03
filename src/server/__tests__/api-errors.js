'use strict';

const app = require('../app');
const config = require('../configure');
const request = require('request');
const status = require('statuses');
const expect = require('chai').expect;

/**
 * Generates random number between 10000 - 65000
 */
const mkPort = () => {
  return 10000 + Math.floor(Math.random() * 55000);
}

const port = mkPort();

const api = request.defaults({
  baseUrl: 'http://localhost:'+port+'/',
  json: true
});

describe('Expensely API', () => {

  before(done => {
    app.listen(port, done);
  });

  it('responds 404 with json payload for non-existing urls', done => {
    api.get('/foo', (err, res, body) => {
      if (err) done(err);
      else {
        expect(res.statusCode).to.equal(status('not found'));
        expect(res.headers['content-type']).to.match(/json/);
        expect(body.message).to.match(/not found/i);
        done();
      }
    });
  })
});
