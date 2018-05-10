const { createModel } = require('../utils');

const shape = {
  post_id: '',
  category_id: '',
};

const create = createModel(shape);

const createFromCategoryIds = (post_id, category_ids) => {
  return category_ids
    .map(category_id => create({ post_id, category_id }));
};

const validate = (post) => {
  // do some validation
  return {
    valid: true,
    errors: null,
  }
};

const model = {
  name: 'posts_categories',
  create,
  createFromCategoryIds,
  validate,
};

module.exports = model;
