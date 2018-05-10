class RouteError extends Error {
  constructor(props = {}, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    this.error = {
      status: 400,
    };
    Object
      .keys(props)
      .forEach(prop => this.error[prop] = props[prop]);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) Error.captureStackTrace(this, RouteError);
  }

  get errors() {
    return { ...this.error };
  }
}

module.exports = {
  RouteError
};