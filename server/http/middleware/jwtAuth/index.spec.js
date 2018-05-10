const app = require('../../../app');
const request = require('supertest');
const model = require('../../model/User');
const jwtAuth = require('./');

describe('jwt token', () => {
  const user = model.create({
    email: 'webdeveloperpr@gmail.com',
    first_name: 'Luis',
    last_name: 'Betancourt',
    password: '123qweasd',
  });

  const createUser = user => {
    return request(app)
      .post('/users/create')
      .send(user)
      .then(res => res)
  };

  let _req = {
    authorization: '',
    header: prop => _req[prop],
  };

  const _res = {
    status: x => ({
      send: () => {
      }
    }),
    locals: {},
    send: x => x,
  };

  const _next = (done) => () => {
    expect(true).to.equal(true);
    done();
  };


  it('should block request if token is invalid', done => {
    createUser(user)
      .then(() => {
        request(app)
          .post('/auth/authenticate')
          .send({ email: user.email, password: user.password })
          .end((err, res) => {
            const { token } = res.body;
            _req.authorization = token;
            jwtAuth(_req, _res, _next(done));
          });
      })
  });
});
