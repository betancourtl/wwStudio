const express = require('express');
const request = require('supertest');
const app = express();
const { RouteError } = require('../../errors');
const errorMiddleware = require('./');

// Test routes
app.get('/route-error', (req, res) => {
  throw new RouteError({
    error: 'route-error',
    status: 422
  });
});

app.get('/normal-error', (req, res) => {
  throw new Error('normal-error');
});

errorMiddleware(app);

describe('routeErrorMiddleware', () => {
  it('should throw a route-error', done => {
    request(app)
      .get('/route-error')
      .send()
      .expect(422, {
        error: 'route-error'
      }, done)
  });

  it('should throw a normal error', (done) => {
    request(app)
      .get('/normal-error')
      .send()
      .then(res => {
        done();
      })
  });
});
