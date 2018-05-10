const jwt = require('jsonwebtoken');
const knex = require('../../../config/knex');
const userModel = require('../../model/User');
const { RouteError } = require('../../errors');

const JWT_SECRET_KEY = process.env.JWT_TOKEN_SECRET_KEY;

const jwtAuth = (req, res, next) => {
  const token = req.header('authorization');

  if (!token) throw new RouteError({
    status: 400,
    error: 'No authorization token sent with request'
  });

  let data;

  try {
    data = jwt.verify(token, JWT_SECRET_KEY);
    if (!data) throw new RouteError({
      status: 400,
      error: 'Invalid JWT token'
    });

    if (!data.userId) throw new RouteError({
      status: 400,
      error: 'JWT token is missing id'
    });
  } catch ({ status, error }) {
    res
      .status(status)
      .send({ error });
  }

  // find 1 user.
  return knex(userModel.name)
    .where({ id: data.userId })
    .select()
    .then(([user]) => {
      if (!user) throw new RouteError({
        status: 404,
        error: 'User not found'
      });

      res.locals.user = user;
      return next();
    })
};

module.exports = jwtAuth;
