const postModel = require('../../model/Post');
const knex = require('../../../config/knex');

const createPostMeta = (page, limit, total, offset, count) => ({
  query: {
    page,
    limit,
  },
  meta: {
    total,
    totalPages: Math.ceil(total / limit),
    offset,
    count,
    start: limit * (page - 1),
    end: (limit * (page - 1)) + limit - (limit - count),
  },
});

/**
 * Creates a post and returns a promise with a post.id
 * @param props
 * @returns {*|PromiseLike<*[]>|Promise<*[]>}
 */
const createPost = (props = {}) => {
  return knex(postModel.name)
    .insert(postModel.create(props))
    .then(([id]) => id)
};


/**
 * Utility query used to get the query count.
 * @param query
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
const totalQueryCount = query => {
  return knex
    .select('*')
    .where(query)
    .from(postModel.name)
    .then(rows => rows.length);
};

/**
 * Gets all of the posts matching a query. This is used by PostsCategories controller
 * @param query
 * @returns {Promise<T>}
 */
const getPosts = (query = {}) => {
  const { limit = 10, page = 1, ...postQuery } = query;
  const offset = (page - 1) * limit;
  return knex
    .select('*')
    .limit(limit)
    .where(postQuery)
    .from(postModel.name)
    .offset(offset)
    .then(rows => {
      const count = rows.length;
      return totalQueryCount(postQuery)
        .then(total => {
          const meta = createPostMeta(page, limit, total, offset, count);
          return [rows, meta];
        })
    })
};

/**
 * Edits a post. posts_categories.post_id references post.id. this query does not
 * update the categories. View the PostsCategories controller for that.
 * @param post_id
 * @param user_id
 * @param props
 * @returns {Promise<T>}
 */
const editPost = (post_id, user_id, props = {}) => {
  return knex(postModel.name)
    .where({ id: post_id, user_id })
    .update(props)
};

/**
 * Removes a post. posts_categories.post_id references post.id and it cascades
 * on post deletion.
 * @param post_id
 * @param user_id
 * @returns {Promise<T>}
 */
const removePost = (post_id, user_id) => {
  return knex(postModel.name)
    .where({ id: post_id, user_id })
    .del()
};

module.exports = {
  getPosts,
  editPost,
  createPost,
  removePost,
};
