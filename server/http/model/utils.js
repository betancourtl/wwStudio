const { mergeMatchingProps } = require('../../utils');

const createModel = (shape = {}) => (props = {}) => {
  return mergeMatchingProps(shape, props);
};

module.exports = {
  createModel,
};
