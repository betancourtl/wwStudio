const jwt = require('jsonwebtoken');
const app = require('../../../app');
const request = require('supertest');
const model = require('../../model/User');

describe('AuthController', () => {
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

  it('create a user and authenticate him', done => {
    createUser(user)
      .then(res => {
        const { user: newUser } = res.body;
        request(app)
          .post('/auth/authenticate')
          .send({ email: user.email, password: user.password })
          .end((err, res) => {
            const { token } = res.body;
            const { userId: tokenUserId } = jwt.decode(token);
            expect(tokenUserId).to.equal(newUser.id);
            done();
          });
      })
  });

  it('should throw error authenticating a user when password is invalid', done => {
    createUser(user)
      .then(res => {
        request(app)
          .post('/auth/authenticate')
          .send({ email: user.email })
          .end((err, res) => {
            expect(res.body.password).to.equal('Invalid Password');
            done();
          });
      })
  });

  it('should throw error authenticating a user when email is invalid', done => {
    createUser(user)
      .then(res => {
        request(app)
          .post('/auth/authenticate')
          .send({ email: null, password: user.password })
          .end((err, res) => {
            expect(res.body.email).to.equal('E-mail does not exist');
            done();
          });
      })
  });

  it('should throw error when the password is wrong', done => {
    createUser(user)
      .then(res => {
        request(app)
          .post('/auth/authenticate')
          .send({ email: user.email, password: '234' })
          .end((err, res) => {
            expect(res.body.password).to.equal('Invalid password');
            done();
          });
      })
  });

  it('should activate a user account and return the new user with a token', done => {
    createUser(user)
      .then(res => {
        const { user: newUser } = res.body;
        request(app)
          .put(`/auth/activate-account/${newUser.token}`)
          .send({ token: newUser.token })
          .end((err, res) => {
            const { user } = res.body;
            expect(user.token).to.equal('');
            expect(user.active).to.equal(1);
            done();
          });
      })
  });

  it('should throw error when token is invalid', done => {
    createUser(user)
      .then(res => {
        request(app)
          .put(`/auth/activate-account/s`)
          .send()
          .end((err, res) => {
            const { user } = res.body;
            expect(user).to.equal('Invalid user token');
            done();
          });
      })
  });

  it('should throw error when the the user id is invalid', done => {
    createUser(user)
      .then(res => {
        request(app)
          .post(`/auth/send-activation-email`)
          .send({ id: '123123' })
          .end((err, res) => {
            expect(res.body.error).to.equal('Cannot read property \'id\' of undefined');
            done();
          });
      })
  });

  it('should throw error when the e-mail is invalid', done => {
    createUser(user)
      .then(res => {
        request(app)
          .post(`/auth/send-reset-password-email`)
          .send({ email: null })
          .end((err, res) => {
            expect(res.body).to.deep.equal({ email: 'E-mail does not exist' });
            done();
          });
      })
  });
});