const { createModel } = require('../utils');

const shape = {
  name: '',
};

const create = createModel(shape);

const validate = (post) => {
  // do some validation
  return {
    valid: true,
    errors: null,
  }
};

const model = {
  name: 'categories',
  create,
  validate,
};

module.exports = model;
