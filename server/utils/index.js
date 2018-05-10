const R = require('ramda');
const { RouteError } = require('../http/errors');

// Only allow composing keys from the original object.
const mergeMatchingProps = (state = {}, payload = {}) => {
  const keys = R.keys(state);
  const matchingPayloadProps = R.pick(keys, payload);
  return R.mergeDeepLeft(matchingPayloadProps, state);
};

/**
 * routes that execute promises will never return -errors.
 * this wrapper function ensures it does return promise errors
 * @param fn
 * @returns {Function}
 */
const catchAsyncErrors = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
};

/**
 * This function is used to throw errors as route errors by re-throwing them.
 * @param fnOrObj
 * @param p
 * @returns {*|Promise<T>}
 */
const throwAsRouteError = (fnOrObj = {}, p) => {
  return p.catch(err => {
    if (!(err instanceof RouteError)) {
      if (typeof fnOrObj === 'object') {
        throw new RouteError(fnOrObj);
      }

      if (typeof fnOrObj === 'function') {
        throw new RouteError(fnOrObj(err));
      }

      console.log('You must pass an object of a function to throwAsRouteError');

    } else {
      throw err;
    }
  });
};

module.exports = {
  mergeMatchingProps,
  catchAsyncErrors,
  throwAsRouteError,
};
