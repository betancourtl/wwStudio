const { createModel } = require('../utils');

const shape = {
  user_id: '',
  title: '',
  content: '',
};

const create = createModel(shape);

const validate = post => {
  // do some validation
  return {
    valid: true,
    errors: null,
  }
};

const model = {
  name: 'posts',
  create,
  validate,
};

module.exports = model;
