const { RouteError } = require('../../errors');

/**
 * Handle a Custom error.
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const routeErrorMiddleware = (err, req, res, next) => {
  if (err instanceof RouteError) {
    const { status, ...errors } = err.errors;
    return res
      .status(status)
      .send(errors);
  } else {
    next(err);
  }
};

/**
 * Handle the default express error
 * @param err
 * @param req
 * @param res
 * @param next
 */
const normalErrorMiddleware = (err, req, res, next) => {
  if (err instanceof Error) {
    res
      .status(400)
      .send({ error: err.message });
  } else {
    next(err);
  }
};

/**
 * Handle general errors.
 * @param err
 * @param req
 * @param res
 * @param next
 */
const otherErrorMiddleware = (err, req, res, next) => {
  res
    .status(400)
    .send({ error: err });
};

/**
 * Add all of the error middleware in here. Note that order is important.
 * @param app
 */
const appErrorMiddleware = app => {
  app.use(routeErrorMiddleware);
  // Do not change order below here
  app.use(normalErrorMiddleware);
  app.use(otherErrorMiddleware);
};

module.exports = appErrorMiddleware;
