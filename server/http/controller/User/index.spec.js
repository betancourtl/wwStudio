const app = require('../../../app');
const model = require('../../model/User');
const request = require('supertest');
const R = require('ramda');

describe('UserController', () => {
  const resHasError = (res) => R.has('error', res.body);

  const user1 = model.create({
    email: 'webdeveloperpr@gmail.com',
    first_name: 'Luis',
    last_name: 'Betancourt',
    password: '123qweasd',
  });

  const user2 = model.create({
    email: 'webdeveloperpr-2@gmail.com',
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

  it('should should get all users matching query', done => {
    Promise
      .all([createUser(user1), createUser(user2)])
      .then(([first]) => {
        request(app)
          .get(`/users?id=${first.body.user.id}`)
          .send()
          .end((err, res) => {
            expect(res.body.length).to.equal(1);
            done();
          });
      })
  });

  it('should get all users', done => {
    Promise
      .all([createUser(user1), createUser(user2)])
      .then(() => {
        request(app)
          .get('/users')
          .send()
          .end((err, res) => {
            expect(res.body.length).to.equal(2);
            done();
          });
      })
  });

  it('should should handle get user errors', done => {
    createUser(null)
      .then(() => {
        request(app)
          .get('/users?test=test')
          .send()
          .end((err, res) => {
            expect(resHasError(res)).to.equal(true);
            done();
          });
      })
  });

  it('should return the correct error when creating an invalid user', done => {
    const user1 = model.create({
      email: null,
      first_name: 'Luis',
      last_name: 'Betancourt',
      password: null,
    });

    createUser(user1)
      .then(res => {
        expect(resHasError(res)).to.equal(true);
        done();
      })
      .catch(err => console.log(err));
  });

  it('should return the correct error when creating a user with an existing email', done => {
    const user1 = model.create({
      email: 'webdeveloperpr@gmail.com',
      first_name: 'Luis',
      last_name: 'Betancourt',
      password: '123',
    });

    Promise.all([
      createUser(user1),
      createUser(user1),
    ])
      .then(([firstUser, secondUser]) => {
        expect(secondUser.body).to.deep.equal({
          email: 'Email already exists'
        });
        done();
      })
      .catch(err => console.log(err));
  });

  it('should create a user', done => {
    createUser(user1)
      .then(res => {
        const { user: newUser } = res.body;
        expect(newUser.email).to.equal(user1.email);
        expect(newUser.first_name).to.equal(user1.first_name);
        expect(newUser.last_name).to.equal(user1.last_name);
        done();
      });
  });

  it('should update a user', done => {
    createUser(user1)
      .then(res => {
        const { id } = res.body.user;
        request(app)
          .put(`/users/edit/${id}`)
          .send({ first_name: 'Ramon' })
          .end((err, res) => {
            const { first_name } = res.body;
            expect(first_name).to.equal('Ramon');
            done();
          });
      });
  });

  it('should throw error when user does not exist', done => {
    createUser(user1)
      .then(res => {
        request(app)
          .put(`/users/edit/5`)
          .send({ first_name: 'Ramon' })
          .then(res => {
            const { user } = res.body;
            expect(user).to.equal('Error updating user');
            done();
          })
      });
  });

  it('should remove a user', done => {
    createUser(user1)
      .then(res => {
        const { id } = res.body.user;
        request(app)
          .delete(`/users/delete/${id}`)
          .send()
          .end((err, res) => {
            const { affectedRows } = res.body;
            expect(affectedRows).to.equal(1);
            done();
          });
      });
  });

  it('should handle errors removing a user', done => {
    createUser(user1)
      .then(res => {
        request(app)
          .delete(`/users/delete/3`)
          .send()
          .end((err, res) => {
            expect(res.body.user).to.equal('User to be removed does not exist');
            done();
          });
      });
  });

  it('should reset the user\'s password', done => {
    createUser(user1)
      .then((res) => {
        const { token } = res.body.user;
        request(app)
          .put(`/users/edit-password/${token}`)
          .send({ password: '12345' })
          .end((err, res) => {
            expect(res.body.success).to.equal('ok');
            done();
          });
      });
  });

  it('should handle errors when editing passwords', done => {
    createUser(user1)
      .then((res) => {
        const { token } = res.body.user;
        request(app)
          .put(`/users/edit-password/${token}`)
          .send({ password: null })
          .end((err, res) => {
            const { password } = res.body;
            expect(password).to.equal('Error creating password');
            done();
          });
      });
  });
});
