const userModel = require('../../model/User');
const emailController = require('../../controller/Email');
const knex = require('../../../config/knex');
const { RouteError } = require('../../errors');
const { catchAsyncErrors, throwAsRouteError } = require('../../../utils');

const getUsers = query => {
  return knex
    .select('*')
    .where(query)
    .from(userModel.name)
};

/**
 * Finds an existing user and returns it with a jwt token
 * @param id
 * @returns {*|PromiseLike<{user, token: *}>|Promise<{user, token: *}>}
 */
const userWithToken = id => {
  return knex
    .select('*')
    .from(userModel.name)
    .where({ id })
    .then(([user]) => {
      const token = userModel.createToken(user.id);
      return ({ user, token });
    });
};

// Controllers
const get = catchAsyncErrors((req, res) => {
  const query = req.query;
  return getUsers(query)
    .then((users) => res.send(users))
});

// Add tests for this
const create = catchAsyncErrors((req, res) => {
  const { email, password } = req.body;
  const { salt, hash } = userModel.saltHashPassword({ password });
  const newUser = userModel.create({
    ...req.body,
    salt,
    email,
    password: hash,
    token: userModel.randomString(),
  });

  const p1 = throwAsRouteError((err) => {
      const errors = {};

      // this is a mysql error
      if (err && err.code === 'ER_DUP_ENTRY') {
        errors.email = 'Email already exists';
      }

      return errors;
    },
    knex(userModel.name)
      .insert(newUser));

  return p1.then(([id]) => {
    return userWithToken(id)
      .then(userAndToken => {
        const user = userAndToken.user;
        // Send email to a user.
        return emailController
          .activateAccountEmail(user.email, user.token)
          .then(() => res.send(userAndToken));
      })
  });
});

const edit = catchAsyncErrors((req, res) => {
  const { id } = req.params;

  return knex(userModel.name)
    .where({ id })
    .update(req.body)
    .then((rows) => {
      if (rows !== 1) {
        throw new RouteError({
          user: 'Error updating user'
        })
      }

      return knex
        .select('*')
        .from(userModel.name)
        .where({ id })
        .then(([updatedUser]) => res.send(updatedUser));
    });
});

const editPassword = catchAsyncErrors((req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  let salt, hash;

  try {
    const result = userModel.saltHashPassword({ password });
    salt = result.salt;
    hash = result.hash;

  } catch (err) {
    throw new RouteError({ password: 'Error creating password' });
  }

  const newProps = { password: hash, salt, token: '' };

  // get the user
  return knex(userModel.name)
    .select('*')
    .where({ token })
    .then(([user]) => {
      if (!user) {
        throw new RouteError({
          token: 'Reset token is invalid.',
        })
      }
      // get the user's email
      const { email } = user;
      // update the user
      return knex(userModel.name)
        .where({ email })
        .update(newProps)
        .then((rows) => {
          if (rows !== 1) {
            throw new RouteError({
              password: 'Error updating user password'
            });
          }

          return emailController.passwordChangedEmail(email)
            .then(() => res.send({ success: 'ok' }));
        })
    })
});

const remove = catchAsyncErrors((req, res) => {
  const { id } = req.params;

  return knex(userModel.name)
    .where({ id })
    .del()
    .then(affectedRows => {
      if (affectedRows !== 1) throw new RouteError({
        user: 'User to be removed does not exist',
      });
      res.send({ affectedRows });
    })
});

module.exports = {
  getUsers,
  userWithToken,
  // controllers
  editPassword,
  get,
  create,
  edit,
  remove,
};
