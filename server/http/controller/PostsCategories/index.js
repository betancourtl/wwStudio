const PostModel = require('../../model/Post');
const PostCategoryModel = require('../../model/PostCategory');
const CategoryModel = require('../../model/Category');
const postController = require('../../controller/Post');
const knex = require('../../../config/knex');

const createPostCategories = (post_id, category_ids = []) => {
  const categories = PostCategoryModel.createFromCategoryIds(post_id, category_ids);
  return knex(PostCategoryModel.name)
    .insert(categories)
    .then(result => {
      return knex
        .select('*')
        .from(PostCategoryModel.name)
        .where({ post_id })
        .then((postWithCategories) => postWithCategories);
    })
    .catch(err => err);
};

const editPostCategories = (post_id, postCategories = []) => {
  return removePostCategories(post_id)
    .then(res => createPostCategories(post_id, postCategories));
};

const getPostCategories = (query) => {
  return knex
    .select(['categories.id', 'categories.name'])
    .where(query)
    .from(PostCategoryModel.name)
    .leftJoin(CategoryModel.name, 'categories.id', 'posts_categories.category_id')
    .then(categories => categories)
    .catch((err) => err);
};

const getPostWithCategories = (query) => {
  return postController.getPosts(query)
    .then(([posts, meta]) => {
      const promises = posts.map(post => {
        const { id: post_id } = post;
        return getPostCategories({ post_id })
          .then(categories => {
            return { ...post, categories }
          });
      });
      return Promise
        .all(promises)
        .then(posts => {
          return { posts, meta };
        });
    });
};

const removePostCategories = (post_id) => {
  return knex(PostCategoryModel.name)
    .where({ post_id })
    .del();
};

/**
 * First delete then create multiple categories related to a post_id
 * @param req
 * @param res
 * @returns {Promise<T>}
 */
const create = (req, res) => {
  const { category_ids = [], ...rest } = req.body;
  const post = PostModel.create(rest);
  // insert the post
  return postController.createPost(post)
    .then(post_id => {
      //insert the post categories
      return createPostCategories(post_id, category_ids)
        .then(post => {
          // return the post with all the categories
          return getPostWithCategories({ id: post_id })
            .then(post => res.send(post))
        })
    })
};

/**
 * Gets the categories of a post from a one to many relationship table
 * @param req
 * @param res
 * @returns {Promise<T>}
 */
const get = (req, res) => {
  return getPostWithCategories(req.query)
    .then(categories => res.send(categories))
    .catch(err => res.status(400).send({ error: 'Error fetching categories' }));
};

/**
 * First delete then create multiple categories related to a post_id
 * @param req
 * @param res
 * @returns {Promise<T>}
 */
const edit = (req, res) => {
  const { category_ids = [], ...post } = req.body;
  const { id: post_id } = req.params;
  const { id: user_id } = res.locals.user;

  return postController.editPost(post_id, user_id, post)
    .then(() => editPostCategories(post_id, category_ids))
    .then(result => {
      return getPostWithCategories({ id: post_id })
        .then(post => res.send(post))
        .catch(err => res.status(400).send({ error: 'Error fetching categories' }));
    });
};

/**
 * Delete multiple categories related to a post_id
 * @param req
 * @param res
 * @returns {Promise<T>}
 */
const remove = (req, res) => {
  const { id: post_id } = req.params;
  const { id: user_id } = res.locals.user;

  return postController.removePost(post_id, user_id)
    .then(result => {
      return getPostWithCategories({ id: post_id })
        .then(post => res.send(post))
        .catch(err => res.status(400).send({ error: 'Error fetching categories' }));
    });
};

module.exports = {
  get,
  edit,
  create,
  remove,
};
